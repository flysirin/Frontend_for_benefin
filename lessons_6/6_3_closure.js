// Замыкание – это функция, которая запоминает свои внешние переменные и может получить к ним доступ.
// В некоторых языках это невозможно, или функция должна быть написана специальным образом,
// чтобы получилось замыкание. Но, как было описано выше, в JavaScript, все функции изначально являются замыканиями

// То есть они автоматически запоминают, где были созданы, с помощью скрытого свойства [[Environment]],
// и все они могут получить доступ к внешним переменным.

// вложенная функция присваивается новому объекту в конструкторе:
// функция-конструктор возвращает новый объект
// function User(name) {
//   // методом объекта становится вложенная функция
//   this.sayHi = function() {
//     console.log(name);
//   };
// }
//
// let user = new User("John");
// user.sayHi(); // "John" (у кода метода "sayHi" есть доступ к внешней переменной

//

// Мы также можем использовать «простые» блоки кода {...}, чтобы изолировать переменные в «локальной области видимости».

//

// «immediately-invoked function expressions» (аббревиатура IIFE), что означает функцию, запускаемую сразу после объявления.
// Это не то, что мы должны использовать сегодня, но, так как вы можете встретить это в старых скриптах,
// полезно понимать принцип работы.
// IIFE выглядит так:
// (function() {
//   let message = "Hello";
//   console.log(message); // Hello
// })();

//

// Кроме скобок, существуют и другие пути показать JavaScript, что мы имеем в виду Function Expression:
// Пути создания IIFE:
// (function() {
//   console.log("Скобки вокруг функции");
// })();
//
// (function() {
//   console.log("Скобки вокруг всего");
// }());
//
// !function() {
//   console.log("Выражение начинается с логического оператора NOT");
// }();
//
// +function() {
//   console.log("Выражение начинается с унарного плюса");
// }();

//

// мы можем увидеть не ту внешнюю переменную при совпадающих названиях:
// let value = "Сюрприз!";
// function f() {
//   let value = "ближайшее значение";
//   function g() {
//     debugger; // в консоли: напишите alert(value); Сюрприз!
//   }
//   return g;
// }
// let g = f();
// g();


//----------------------------------------------------------------------------------------------------------------------

// Здесь мы делаем два счётчика: counter и counter2, используя одну и ту же функцию makeCounter.
// Они независимы? Что покажет второй счётчик? 0,1 или 2,3 или что-то ещё?

// function makeCounter() {
//   let count = 0;
//
//   return function() {
//     return count++;
//   };
// }
//
// let counter = makeCounter();
// let counter2 = makeCounter();

// console.log( counter() ); // 0
// console.log( counter() ); // 1
//
// console.log( counter2() ); // 0
// console.log( counter2() ); // 1

//----------------------------------------------------------------------------------------------------------------------

// Здесь объект счётчика создан с помощью функции-конструктора.
// Будет ли он работать? Что покажет?

// function Counter() {
//   let count = 0;
//
//   this.up = function() {
//     return ++count;
//   };
//   this.down = function() {
//     return --count;
//   };
// }
//
// let counter = new Counter();
//
// console.log( counter.up() ); // 1
// console.log( counter.up() ); // 2
// console.log( counter.down() ); // 1

//----------------------------------------------------------------------------------------------------------------------
// "use strict"
// Какой будет результат у вызова на последней строке?
let phrase = "Hello";
{
    let user = "John";

    function sayHi() {
        console.log(`${phrase}, ${user}`);
    }
}
// console.log(user);
// console.log(typeof sayHi());
// sayHi(); // Hello, John - if we use "loose mode"
// "use strict" - wrong

//----------------------------------------------------------------------------------------------------------------------

// Напишите функцию sum, которая работает таким образом: sum(o)(O) = o+O.

// =)
function sum(o) {
    function O(O) {
        return O + o
    }

    return O
}

function sum_2(a) {
    return (b) => a + b
}

// console.log(sum(1)(2)); // 3
// console.log(sum(5)(-1)); // 4
//
// console.log(sum_2(1)(2)); // 3
// console.log(sum_2(5)(-1)); // 4

//----------------------------------------------------------------------------------------------------------------------

// У нас есть встроенный метод arr.filter(f) для массивов. Он фильтрует все элементы с помощью функции f.
// Если она возвращает true, то элемент добавится в возвращаемый массив.
//
// Сделайте набор «готовых к употреблению» фильтров:
//
// inBetween(a, b) – между a и b (включительно).
// inArray([...]) – находится в данном массиве.
// Они должны использоваться таким образом:
//
// arr.filter(inBetween(3,6)) – выбирает только значения между 3 и 6 (включительно).
// arr.filter(inArray([1,2,3])) – выбирает только элементы, совпадающие с одним из элементов массива


function inBetween(a, b) {
    return (item) => (a <= item && item <= b)
}

function inArray(arr) {
    return (item) => arr.includes(item)
}

let arr = [1, 2, 3, 4, 5, 6, 7];

// console.log(arr.filter(inBetween(3, 6))); // 3,4,5,6
// console.log(arr.filter(inArray([1, 2, 10]))); // 1,2

//----------------------------------------------------------------------------------------------------------------------

// У нас есть массив объектов, который нужно отсортировать:
let users = [
    {name: "John", age: 20, surname: "Johnson"},
    {name: "Pete", age: 18, surname: "Peterson"},
    {name: "Ann", age: 19, surname: "Hathaway"}
];

// по имени (Ann, John, Pete)
// users.sort((a, b) => a.name > b.name ? 1 : -1);
// по возрасту (Pete, Ann, John)
// users.sort((a, b) => a.age > b.age ? 1 : -1);

// То есть чтобы вместо функции мы просто писали byField(fieldName).
// Напишите функцию byField, которая может быть использована для этого.

// v1.0
function byField(value) {
    if (value === 'name') {
        return (a, b) => a.name > b.name ? 1 : -1
    } else if (value === 'age') {
        return (a, b) => a.age - b.age
    }
}

// users.sort(byField('name')); console.log(users);
// users.sort(byField('age')); console.log(users);

//v2.0 by book lesson
function byField_2(field) {
    return (a, b) => a[field] > b[field] ? 1 : -1;
}

// users.sort(byField_2('name'));
// users.forEach(user => console.log(user.name)); // Ann, John, Pete

// users.sort(byField_2('age'));
// users.forEach(user => console.log(user.name)); // Pete, Ann, John

//----------------------------------------------------------------------------------------------------------------------

// Следующий код создаёт массив из стрелков (shooters).
// Каждая функция предназначена выводить их порядковые номера. Но что-то пошло не так…

// ... у всех стрелков будет номер 10, вместо 0, 1, 2, 3...
// Почему у всех стрелков одинаковые номера? Почините код, чтобы он работал как задумано.


let army = makeArmy();
army[0](); // у 0-го стрелка будет номер 10
army[5](); // и у 5-го стрелка тоже будет номер 10
army[8](); // и у 5-го стрелка тоже будет номер 10

// v1.0
function makeArmy() {
    let shooters = [];
    let i = 0; // i  - rewrite
    while (i < 10) {  // here is independent env,
        let shooter = function (number_shooter) { // функция shooter
            return () => console.log(number_shooter); // должна выводить порядковый номер
        };
        shooters.push(shooter(i));
        i++;
    }
    return shooters;
}


//v2.0 from book lesson
function makeArmy_2() {
    let shooters = [];
    for (let i = 0; i < 10; i++) { // here is independent env and personal "i" for every env iteration cycle
        let shooter = function () { // функция shooter
            console.log(i); // должна выводить порядковый номер
        };
        shooters.push(shooter);
    }
    return shooters;
}

let army_2 = makeArmy_2();

army_2[0](); // 0
army_2[5](); // 5
army_2[8](); // 5


// Примитивы копируются «по значению», поэтому мы получаем совершенно независимую копию i,
// принадлежащую текущей итерации цикла.
function makeArmy_3() {
    let shooters = [];

    let i = 0;
    while (i < 10) {
        let j = i; // primitive obj to copy only value in JS
        let shooter = function () { // функция shooter
            console.log(j); // должна выводить порядковый номер
        };
        shooters.push(shooter);
        i++;
    }
    return shooters;
}

let army_3 = makeArmy_3();

army_3[0](); // 0
army_3[5](); // 5
army_3[8](); // 5
