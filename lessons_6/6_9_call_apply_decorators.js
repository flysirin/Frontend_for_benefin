// сделаем worker.slow кеширующим
// let worker = {
//   someMethod() {
//     return 1;
//   },
//   slow(x) {
//     // здесь может быть страшно тяжёлая задача для процессора
//     console.log("Called with " + x);
//     return x * this.someMethod(); // (*)  Функция пытается получить доступ к this.someMethod и завершается с ошибкой
//   }
// };
//
// // тот же код, что и выше
// function cachingDecorator(func) {
//   let cache = new Map();
//   return function(x) {
//     if (cache.has(x)) {
//       return cache.get(x);
//     }
//     let result = func(x); // (**) декоратор вызывает оригинальную функцию как func(x), и она в данном случае получает this = undefined.
//     cache.set(x, result);
//     return result;
//   };
// }

// console.log( worker.slow(1) ); // оригинальный метод работает
// worker.slow = cachingDecorator(worker.slow); // теперь сделаем его кеширующим
// console.log( worker.slow(2) ); // Ой! Ошибка: не удаётся прочитать свойство 'someMethod' из 'undefined'
//
// Когда мы вызываем метод на объекте, например, worker.slow(2), JavaScript автоматически устанавливает this
// равным объекту, на котором был вызван метод, т.е. объекту worker. Это происходит неявно и за кулисами.
// Однако, когда мы передаем метод worker.slow в качестве аргумента функции cachingDecorator, мы теряем связь
// между объектом worker и методом worker.slow. Функция cachingDecorator принимает метод slow как аргумент и
// сохраняет его в переменной func. Поскольку func является обычной функцией, а не методом объекта, this внутри
// func больше не ссылается на объект worker.
// Далее, когда мы вызываем let result = func(x); внутри декоратора, func не может получить доступ к методу
// someMethod, который определен как свойство this в объекте worker. Вместо этого this внутри func становится
// undefined, поскольку не связан с объектом worker.

// Мы бы наблюдали похожую ситуацию, если бы попытались запустить:
// let func = worker.slow;
// func(2);

// ---------------------------------------------------------------------------------------------------------------------

// function sayHi() {
//   console.log(this.name); // this(!)
// }
//
// let user = { name: "John" };
// let admin = { name: "Admin" };
//
// // используем 'call' для передачи различных объектов в качестве 'this'
// sayHi() // undefined
// sayHi.call( user ); // John
// sayHi.call( admin ); // Admin

//

// Здесь мы используем call для вызова say с заданным контекстом и фразой:
// function say(phrase) {
//   alert(this.name + ': ' + phrase);
// }
// let user = { name: "John" };
// 'user' становится 'this', и "Hello" становится первым аргументом
// say.call( user, "Hello" ); // John: Hello

//----------------------------------------------------------------------------------------------------------------------

// можем использовать call в обёртке для передачи контекста в исходную функцию:
// let worker = {
//   someMethod() {
//     return 1;
//   },
//   slow(x) {
//     console.log("Called with " + x);
//     return x * this.someMethod(); // (*)
//   }
// };
//
// function cachingDecorator(func) {
//   let cache = new Map();
//   return function(x) {
//     if (cache.has(x)) {
//       return cache.get(x);
//     }
//     let result = func.call(this, x); // теперь 'this' передаётся правильно
//     cache.set(x, result);
//     return result;
//   };
// }
// worker.slow = cachingDecorator(worker.slow); // теперь сделаем её кеширующей
// console.log( worker.slow(2) ); // работает
// console.log( worker.slow(2) ); // работает, не вызывая первоначальную функцию (кешируется)

// Чтобы всё было понятно, давайте посмотрим глубже, как передаётся this:
// 1) После декорации worker.slow становится обёрткой function (x) { ... }.
// 2) Так что при выполнении worker.slow(2) обёртка получает 2 в качестве аргумента и this=worker (так как это объект перед точкой).
// 3) Внутри обёртки, если результат ещё не кеширован, func.call(this, x) передаёт текущий this (=worker) и текущий аргумент (=2) в оригинальную функцию.

//----------------------------------------------------------------------------------------------------------------------

// Вот более мощный cachingDecorator:
let worker = {
    slow(min, max) {
        console.log(`Called with ${min},${max}`);
        return min + max;
    }
};

function cachingDecorator(func, hash) {
    let cache = new Map();
    return function () {
        let key = hash(arguments); // (*)
        if (cache.has(key)) {
            return cache.get(key);
        }
        let result = func.call(this, ...arguments); // (**)
        cache.set(key, result);
        return result;
    };
}

// Мы берём (заимствуем) метод join из обычного массива [].join. И используем [].join.call,
// чтобы выполнить его в контексте arguments.
function hash(args) {
    return [].join.call(args);
}

// worker.slow = cachingDecorator(worker.slow, hash);
// console.log( worker.slow(3, 5) ); // работает
// console.log( "Again " + worker.slow(3, 5) ); // аналогично (из кеша)


//----------------------------------------------------------------------------------------------------------------------

// реализации cachingDecorator мы изучили методы:
// func.call(context, arg1, arg2…) – вызывает func с данным контекстом и аргументами.
// func.apply(context, args) – вызывает func, передавая context как this и псевдомассив args как список аргументов.

// В основном переадресация вызова выполняется с помощью apply:
// let wrapper = function(original, arguments) {
//   return original.apply(this, arguments);
// };

//----------------------------------------------------------------------------------------------------------------------

// Создайте декоратор spy(func), который должен возвращать обёртку, которая сохраняет все вызовы функции
// в своём свойстве calls.
// Каждый вызов должен сохраняться как массив аргументов.

function work(a, b) {
    console.log(a + b);
}

function spy(func) {
    function wrap(...x) {
        wrap.calls.push(x);
        return func.apply(this, x);
    }

    wrap.calls = [];
    return wrap;
}

work = spy(work);
// work(1, 2); // 3
// work(4, 5); // 9
// console.log(work.calls); // [ [ 1, 2 ], [ 4, 5 ] ]


// Если функция func использует this в своем теле и ожидает, что она будет вызываться в определенном контексте
// (например, если она определена как метод объекта), то при вызове функции через func(args[0], args[1], ...)
// мы можем потерять контекст вызова.
// const obj = {
//   value: 42,
//   getValue() {
//     return this.value;
//   }
// };
//
// const getValueSpy = spy(obj.getValue);
//
// console.log(getValueSpy()); // undefined

// В этом примере мы создаем объект obj с методом getValue, который возвращает значение свойства value.
// Затем мы создаем декоратор getValueSpy для метода getValue с помощью функции spy. Если мы вызовем getValueSpy()
// через getValueSpy(), то мы потеряем контекст вызова, и метод getValue будет возвращать undefined,
// потому что this будет ссылаться на глобальный объект, а не на объект obj.


//----------------------------------------------------------------------------------------------------------------------

// Создайте декоратор delay(f, ms), который задерживает каждый вызов f на ms миллисекунд. Например:

// function f(x) {
//   console.log(x);
// }

// v1.0 my version, wrong
// function delay(func, time) {
//     function wrapper(...args) {
//         return setTimeout(func, time, ...args);
//     }
//     return wrapper
// }

//

// v2.0
// function delay(f, ms) {
//   return function() {
//     setTimeout(() => f.apply(this, arguments), ms);
//   };
// }

// Обратите внимание, как здесь используется функция-стрелка. Как мы знаем, функция-стрелка не имеет собственных
// this и arguments, поэтому f.apply(this, arguments) берет this и arguments из обёртки.
// Если мы передадим обычную функцию, setTimeout вызовет её без аргументов и с this=window
// (при условии, что код выполняется в браузере).

// Мы всё ещё можем передать правильный this, используя промежуточную переменную, но это немного громоздко:
// function delay(f, ms) {
//   return function(...args) {
//     let savedThis = this; // сохраняем this в промежуточную переменную
//     setTimeout(function() {
//       f.apply(savedThis, args); // используем её
//     }, ms);
//   };
// }

// создаём обёртки
// let f1000 = delay(f, 1000);
// let f1500 = delay(f, 1500);
// let f5500 = delay(f, 5500);
//
// f1000("test 1000ms"); // показывает "test" после 1000 мс
// f1500("test 1500ms"); // показывает "test" после 1500 мс
// f5500("test 5500ms"); // показывает "test" после 5500 мс

// Другими словами, delay(f, ms) возвращает вариант f с «задержкой на ms мс».
// В приведённом выше коде f – функция с одним аргументом, но ваше решение должно передавать все аргументы
// и контекст this.


//----------------------------------------------------------------------------------------------------------------------

// Результатом декоратора debounce(f, ms) должна быть обёртка, которая передаёт вызов f не более одного раза в ms
// миллисекунд. Другими словами, когда мы вызываем debounce, это гарантирует, что все остальные вызовы будут
// игнорироваться в течение ms.
let f = debounce(console.log, 1000);
// f(1); // выполняется немедленно
// f(2); // проигнорирован
// f(3); // проигнорирован
//
// setTimeout(() => f(3), 100); // проигнорирован (прошло только 100 мс)
// setTimeout(() => f(4), 1100); // выполняется
// setTimeout(() => f(5), 1500); // проигнорирован (прошло только 400 мс от последнего вызова)
// На практике debounce полезен для функций, которые получают/обновляют данные, и мы знаем, что повторный вызов в течение короткого промежутка времени не даст ничего нового. Так что лучше не тратить на него ресурсы.


// my version
// function debounce(func, time) {
//     let is_first = true;
//     let last_time = Date.now();
//     function wrapper(...args) {
//         if (is_first || Date.now() - last_time > time) {
//             last_time = Date.now();
//             is_first = false;
//             return func.apply(this, args);
//         }
//     }
//     return wrapper
// }


// v2.0 from book
function debounce(func, time) {
    let isReady = true;
    return function () {
        if (isReady) {
            func.apply(this, arguments);
            isReady = false;
            setTimeout(() => isReady = true, time);
        }
    }
}


//----------------------------------------------------------------------------------------------------------------------

// Создайте «тормозящий» декоратор throttle(f, ms), который возвращает обёртку, передавая вызов в f не более одного
// раза в ms миллисекунд. Те вызовы, которые попадают в период «торможения», игнорируются.
// Отличие от debounce – если проигнорированный вызов является последним во время «задержки», то он выполняется в конце.
// Давайте рассмотрим реальное применение, чтобы лучше понять это требование и выяснить, откуда оно взято.
// Например, мы хотим отслеживать движения мыши.
// В браузере мы можем объявить функцию, которая будет запускаться при каждом движении указателя и получать его
// местоположение. Во время активного использования мыши эта функция запускается очень часто, это может происходить
// около 100 раз в секунду (каждые 10 мс).
// Мы бы хотели обновлять информацию на странице при передвижениях.
// …Но функция обновления update() слишком ресурсоёмкая, чтобы делать это при каждом микродвижении.
// Да и нет смысла делать обновление чаще, чем один раз в 1000 мс.
// Поэтому мы обернём вызов в декоратор: будем использовать throttle(update, 1000) как функцию, которая будет
// запускаться при каждом перемещении указателя вместо оригинальной update(). Декоратор будет вызываться часто,
// но передавать вызов в update() максимум раз в 1000 мс.
// Визуально это будет выглядеть вот так:
// Для первого движения указателя декорированный вариант сразу передаёт вызов в update. Это важно, т.к. пользователь
// сразу видит нашу реакцию на его перемещение.
// Затем, когда указатель продолжает движение, в течение 1000 мс ничего не происходит. Декорированный вариант
// игнорирует вызовы.
// По истечению 1000 мс происходит ещё один вызов update с последними координатами.
// Затем, наконец, указатель где-то останавливается. Декорированный вариант ждёт, пока не истечёт 1000 мс,
// и затем вызывает update с последними координатами. В итоге окончательные координаты указателя тоже обработаны.

function fun_1(a) {
    console.log(a)
}

// f1000 передаёт вызовы f максимум раз в 1000 мс
let f1000 = throttle(fun_1, 1000);

f1000(1); // показывает 1
f1000(2); // (ограничение, 1000 мс ещё нет)
f1000(3); // (ограничение, 1000 мс ещё нет)

// когда 1000 мс истекли ...
// ...выводим 3, промежуточное значение 2 было проигнорировано
// P.S. Аргументы и контекст this, переданные в f1000, должны быть переданы в оригинальную f.


// v 0.5 ...
// function throttle(func, time) {
//     let isReady = true;
//     let start_time = Date.now();
//
//     function wrapper(...arguments) {
//         const last_args = arguments;
//         if (isReady) {
//             func.apply(this, last_args);
//             isReady = false;
//             setTimeout(() => isReady = true, time);
//             let timerID = setTimeout(() => true, 1);
//         } else {
//             clearTimeout(timerID);
//             let timerID = setTimeout(() => func.apply(this, last_args), time);
//         }
//     }
//
//     return wrapper
// }



// form book lesson
function throttle(func, ms) {

  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) { // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments); // (1)

    isThrottled = true;

    setTimeout(function() {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }
  return wrapper;
}

// Вызов throttle(func, ms) возвращает wrapper.
// Во время первого вызова обёртка просто вызывает func и устанавливает состояние задержки (isThrottled = true).
// В этом состоянии все вызовы запоминаются в saveArgs / saveThis. Обратите внимание, что контекст и аргументы
// одинаково важны и должны быть запомнены. Они нам нужны для того, чтобы воспроизвести вызов позднее.
// … Затем по прошествии ms миллисекунд срабатывает setTimeout. Состояние задержки сбрасывается (isThrottled = false).
// И если мы проигнорировали вызовы, то «обёртка» выполняется с последними запомненными аргументами и контекстом.
// На третьем шаге выполняется не func, а wrapper, потому что нам нужно не только выполнить func,
// но и ещё раз установить состояние задержки и таймаут для его сброса.

//

// Ключевое слово arguments в JavaScript представляет собой массив-подобный объект, который содержит все аргументы,
// переданные функции во время ее вызова. Он предоставляется автоматически каждой функции в JavaScript и не
// требует явного объявления.
// В данном коде, arguments используется в строке (1) для передачи всех аргументов из wrapper()
// в оригинальную функцию func(), на которую применяется задержка. Также, в строке (2) переменные
// savedArgs и savedThis используются для сохранения аргументов и контекста this,
// если функция wrapper() была вызвана в период задержки. В строке (3), если savedArgs были сохранены,
// то wrapper() вызывается повторно с сохраненными аргументами и контекстом this.







