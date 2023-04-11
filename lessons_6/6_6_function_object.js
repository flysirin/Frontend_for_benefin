//                                    Объект функции, NFE

function sayHi() {
    alert("Hi");
}

// console.log(sayHi.name); // sayHi

//

// В спецификации это называется «контекстное имя»: если функция не имеет name, то JavaScript пытается определить его из контекста.
// Также имена имеют и методы объекта:
let user = {
    sayHi() {
        // ...
    },
    sayBye: function () {
        // ...
    }
}
// console.log(user.sayHi.name); // sayHi
// console.log(user.sayBye.name); // sayBye

//

// функция объявлена внутри массива
let arr = [function () {
}];
console.log(arr[0].name); // <пустая строка>
// здесь отсутствует возможность определить имя, поэтому его нет

//

// Ещё одно встроенное свойство «length» содержит количество параметров функции в её объявлении. Например:
function f1(a) {
}

function f2(a, b) {
}

function many(a, b, ...more) {
}

// console.log(f1.length); // 1
// console.log(f2.length); // 2
// console.log(many.length); // 2

//

// function ask(question, ...handlers) {
//   let isYes = confirm(question);
//
//   for(let handler of handlers) {
//     if (handler.length == 0) {
//       if (isYes) handler();
//     } else {
//       handler(isYes);
//     }
//   }
// }
// для положительных ответов вызываются оба типа обработчиков
// для отрицательных - только второго типа
// ask("Вопрос?", () => alert('Вы ответили да'), result => alert(result));
// Это частный случай так называемого Ad-hoc-полиморфизма – обработка аргументов в зависимости от их типа или,
// как в нашем случае – от значения length. Эта идея имеет применение в библиотеках JavaScript.

//

// Мы также можем добавить свои собственные свойства.
// Давайте добавим свойство counter для отслеживания общего количества вызовов:
function sayHi_2() {
    console.log("Hi");
    // давайте посчитаем, сколько вызовов мы сделали
    sayHi_2.counter++;
}

sayHi_2.counter = 0; // начальное значение
// sayHi_2(); // Hi
// sayHi_2(); // Hi
// console.log( `Вызвана ${sayHi_2.counter} раза` ); // Вызвана 2 раза

// Свойство функции, назначенное как sayHi.counter = 0, не объявляет локальную переменную counter внутри неё.
// Другими словами, свойство counter и переменная let counter – это две независимые вещи.
// Мы можем использовать функцию как объект, хранить в ней свойства, но они никак не влияют на её выполнение.
// Переменные – это не свойства функции и наоборот. Это два параллельных мира.

//

// Иногда свойства функции могут использоваться вместо замыканий. Например, мы можем переписать функцию-счётчик
// из главы Замыкание, используя её свойство:
// function makeCounter() {
//     // вместо
//     // let count = 0
//     function counter() {
//         return counter.count++;
//     }
//
//     counter.count = 0;
//     return counter;
// }
//
// let counter = makeCounter();
// console.log( counter() ); // 0
// console.log( counter() ); // 1

// Основное отличие в том, что если значение count живёт во внешней переменной, то оно не доступно для внешнего кода.
// Изменить его могут только вложенные функции. А если оно присвоено как свойство функции, то мы можем его получить:
// counter.count = 10
// console.log(counter()) // 10

//

// Named Function Expression или NFE – это термин для Function Expression, у которого есть имя.
// Например, давайте объявим Function Expression:

// let sayHi_3 = function(who) {
//   alert(`Hello, ${who}`);
// };
// И присвоим ему имя:

// let sayHi_3 = function func(who) {
//   console.log(`Hello, ${who}`);
// };
// Для начала заметим, что функция всё ещё задана как Function Expression. Добавление "func" после function не превращает
// объявление в Function Declaration, потому что оно все ещё является частью выражения присваивания.

///

// Есть две важные особенности имени func, ради которого оно даётся:
// Оно позволяет функции ссылаться на себя же.
// Оно не доступно за пределами функции.
// Например, ниже функция sayHi вызывает себя с "Guest", если не передан параметр who:

let sayHi_4 = function func(who) {
    if (who) {
        console.log(`Hello, ${who}`);
    } else {
        func("Guest"); // использует func, чтобы снова вызвать себя же
    }
};

// sayHi_4(); // Hello, Guest

// А вот так - не cработает:
// func(); // Ошибка, func не определена (недоступна вне функции)

// Функция может быть присвоена другой переменной, и тогда код начнёт выдавать ошибки,
// поэтому мы используем имя для Function Expression

//

// Трюк с «внутренним» именем, описанный выше, работает только для Function Expression и не работает для
// Function Declaration. Для Function Declaration синтаксис не предусматривает возможность
// объявить дополнительное «внутреннее» имя.
// Зачастую, когда нам нужно надёжное «внутреннее» имя, стоит переписать Function Declaration на
// Named Function Expression.


//----------------------------------------------------------------------------------------------------------------------

// Измените код makeCounter() так, чтобы счётчик мог уменьшать и устанавливать значение:
//
// counter() должен возвращать следующее значение (как и раньше).
// counter.set(value) должен устанавливать счётчику значение value.
// counter.decrease() должен уменьшать значение счётчика на 1.
// Посмотрите код из песочницы с полным примером использования.

// P.S. Для того, чтобы сохранить текущее значение счётчика, можно воспользоваться как замыканием, так и свойством функции.
// Или сделать два варианта решения: и так, и так.

// from property, my version
// function makeCounter() {
//   function counter() {
//     return counter.count++;
//   }
//   counter.count = 0;
//   counter.set = function set(value) {
//       counter.count = value;
//     }
//   counter.decrease = function () {
//       counter.count--;
//   }
//   return counter;
// }


//

// from book lesson
// В решении использована локальная переменная count, а методы сложения записаны прямо в counter.
// Они разделяют одно и то же лексическое окружение и также имеют доступ к текущей переменной count.

function makeCounter() {
    let count = 0;

    function counter() {
        return count++;
    }

    counter.set = value => count = value;
    counter.decrease = () => count--;
    return counter;
}

// let counter = makeCounter();
// counter.set(20);
// counter.decrease()
// counter.decrease()
// console.log( counter() ); // 18

//----------------------------------------------------------------------------------------------------------------------

// Напишите функцию sum, которая бы работала следующим образом:

// console.log(`${sum(1)(2)}` ) //  3
// console.log(`${sum(1)(2)(3)}`) // 6
// console.log(`${sum(5)(-1)(2)}`) // 6
// console.log(`${sum(6)(-1)(-2)(-3)}`) // 0
// console.log(`${sum(0)(1)(2)(3)(4)(5)}`) // 15
//

// Brain fu...
// function sum(a) {
//   let currentSum = a;
//   function f(b) {
//     currentSum += b;
//     return f;
//   }
//   f[Symbol.toPrimitive] = function (){
//       return currentSum
//   }
//   return f;
// }

// 1) функция sum выполняется лишь однажды и просто возвращает функцию f.

// 2) Далее, при каждом последующем вызове, f суммирует свой аргумент со значением currentSum и возвращает себя же.

// 3) В нашем случае мы просто возвращаем функцию, не вызывая её:
// function f(b) {
//   currentSum += b;
//   return f; // <-- не вызывает себя. Просто возвращает
// }
// Функция f будет использоваться в последующем вызове и снова возвращать себя столько раз, сколько будет необходимо.
// Затем, при использовании в качестве числа или строки, метод toString возвращает currentSum – число.
// Также здесь мы можем использовать Symbol.toPrimitive или valueOf для преобразования.


// v2.0
// function sum(a){
//         sum.count += a;
// 	return sum;
// }
// sum.count = 0;
//
// sum.toString = function(){
// 	let count = sum.count;
// 	sum.count = 0;
// 	return count;
// }
//
// console.log(`${sum(1)(2)}` ) //  3
// console.log(`${sum(1)(2)(3)}` ) //  6


//

// v3_0 from book lesson
function sum(a) {
    sum.count = a;
    function calc(b) {
        if (arguments.length === 0) {
            return sum.count;
        }
        sum.count += b;
        return calc;
    }
    return calc;
}


// console.log(sum(1)(2)()); // 3
// console.log(sum(5)(-1)(2)()); // 6
// console.log(sum(6)(-1)(-2)(-3)()); // 0
// console.log(sum(0)(1)(2)(3)(4)(5)()); // 15
