// Синтаксис для объявления функции:
// let func = new Function([arg1, arg2, ...argN], functionBody);

// Функция создаётся с заданными аргументами arg1...argN и телом functionBody.

// let sum = new Function('a', 'b', 'return a + b');

// А вот функция без аргументов, в этом случае достаточно указать только тело:
// let sayHi = new Function('alert("Hello")');

// Но new Function позволяет превратить любую строку в функцию. Например, можно получить новую функцию с сервера и затем выполнить её:
// let str = ... код, полученный с сервера динамически ...
// let func = new Function(str);
// func();

// Эти 3 объявления ниже эквивалентны:
// new Function('a', 'b', 'return a + b'); // стандартный синтаксис
// new Function('a,b', 'return a + b'); // через запятую в одной строке
// new Function('a , b', 'return a + b'); // через запятую с пробелами в одной строке
// Функции, объявленные через new Function, имеют [[Environment]], ссылающийся на глобальное лексическое окружение,
// а не на родительское. Поэтому они не могут использовать внешние локальные переменные. Но это очень хорошо,
// потому что страхует нас от ошибок. Переданные явно параметры – гораздо лучшее архитектурное решение,
// которое не вызывает проблем у минификаторов.

//----------------------------------------------------------------------------------------------------------------------

// Задача: написать функции для JSON.parse и JSON.stringify, которые позволят клонировать объект
// вместе с его методами. Начните с простых методов без аргументов.

let obj = {
    name: "John",
    surname: "Smith",
    fullName() {
        return this.name + ' ' + this.surname;
    },
};


// from book
function stringify(key, value) {
if (typeof value === 'function') {
let str = value.toString();
let start = str.indexOf('{');
let end = str.lastIndexOf('}');
let body = str.split('').filter( (letter, index) => index > start && index < end ).join('').trim();

let startArg = str.indexOf('(');
let endArg = str.indexOf(')');
let args = str.split('').filter( (letter, index) => index > startArg && index < endArg ).join('').split(',');
return {body: body, arg: args};
}
return value;
}

function parse(key, value) {
if (value.body) return new Function(...value.arg, value.body);
return value;
}

let json = JSON.stringify(obj, stringify);
let clone = JSON.parse(json, parse);

console.log(clone.fullName()); // John Smith
