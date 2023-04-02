// Для добавления / удаления элементов:
// push (...items) – добавляет элементы в конец,
// pop() – извлекает элемент с конца,
// shift() – извлекает элемент с начала,
// unshift(...items) – добавляет элементы в начало.
// splice(pos, deleteCount, ...items) – начиная с индекса pos удаляет deleteCount элементов и вставляет items.
// slice(start, end) – создаёт новый массив, копируя в него элементы с индекса start до end (не включая end).
// concat(...items) – возвращает новый массив: копирует все члены текущего массива и добавляет к нему items. Если какой-то из items является массивом, тогда берутся его элементы.

// Для поиска среди элементов:
// indexOf / lastIndexOf(item, pos) – ищет item, начиная с позиции pos, и возвращает его индекс или -1, если ничего не найдено.
// includes(value) – возвращает true, если в массиве имеется элемент value, в противном случае false.
// find / filter(func) – фильтрует элементы через функцию и отдаёт первое/все значения, при прохождении которых через функцию возвращается true.
// findIndex похож на find, но возвращает индекс вместо значения.

// Для перебора элементов:
// forEach(func) – вызывает func для каждого элемента. Ничего не возвращает.

// Для преобразования массива:
// map(func) – создаёт новый массив из результатов вызова func для каждого элемента.
// sort(func) – сортирует массив «на месте», а потом возвращает его.
// reverse() – «на месте» меняет порядок следования элементов на противоположный и возвращает изменённый массив.
// split / join – преобразует строку в массив и обратно.
// reduce / reduceRight(func, initial) – вычисляет одно значение на основе всего массива, вызывая func для каждого элемента и передавая промежуточный результат между вызовами.

// Дополнительно:
// Array.isArray(arr) проверяет, является ли arr массивом.
// Пожалуйста, обратите внимание, что методы sort, reverse и splice изменяют исходный массив.
//
// arr.some(fn) / arr.every(fn) проверяет массив.

// arr.fill(value, start, end) – заполняет массив повторяющимися value, начиная с индекса start до end.
// arr.copyWithin(target, start, end) – копирует свои элементы, начиная с позиции start и заканчивая end, в себя, на позицию target (перезаписывая существующие).
// arr.flat(depth) / arr.flatMap(fn) создаёт новый плоский массив из многомерного массива.
// Array.from, который принимает итерируемый объект или псевдомассив и делает из него «настоящий» Array
//----------------------------------------------------------------------------------------------------------------------

// Напишите функцию camelize(str), которая преобразует строки вида «my-short-string» в «myShortString».
// То есть дефисы удаляются, а все слова после них получают заглавную букву.
//
// camelize("background-color") == 'backgroundColor';
// camelize("list-style-image") == 'listStyleImage';
// camelize("-webkit-transition") == 'WebkitTransition';
// P.S. Подсказка: используйте split, чтобы разбить строку на массив символов, потом переделайте
// всё как нужно и методом join соедините обратно.

// true
function camelize(str) {
    let max_index = str.length - 1;
    let res_str = '';
    let i = 0;
    while (i <= max_index) {
        if (str[i] === '-' && i < max_index && str[i + 1] !== '-') {
            res_str += str[++i].toUpperCase();

        } else if (str[i] !== '-') {
            res_str += str[i];
        }
        ++i;
    }
    return res_str
}


function camelize3(str) {
    const words = str.split('-');
    if (words.length <= 1) {
        return words.join('');
    }
    const upperFirst = function (w) {
        if (!w) {
            return '';
        }
        return w[0].toUpperCase() + w.slice(1);
    };
    return [words[0], ... (words.slice(1).map(upperFirst))].filter(w => w !== '').join('');
}

// tests
// console.log(camelize("-------list-sty------------le-ima--ge---------Dilemma------"));
// console.log(camelize("background-color"));
// console.log(camelize("list-style-image"));
// console.log(camelize("-webkit-transition"));


// function camelize(str) {
//   return str.split('-').map((word, index) => index == 0 ? word : word[0].toUpperCase() + word.slice(1)).join('');
// }
// Это решение из учебника упадет со строками: "-webkit-transition-", "list--style-image", и т.д.

//----------------------------------------------------------------------------------------------------------------------

// Напишите функцию filterRange(arr, a, b), которая принимает массив arr, ищет элементы со значениями
// больше или равными a и меньше или равными b и возвращает результат в виде массива.
// Функция должна возвращать новый массив и не изменять исходный.

function filterRange(arr, a, b) {
    return arr.filter(value => value >= a && value <= b)
}


let arr = [5, 3, 8, 1];
let filtered = filterRange(arr, 1, 4);
// console.log( filtered ); // 3,1 (совпадающие значения)
// console.log( arr ); // 5,3,8,1 (без изменений)

//----------------------------------------------------------------------------------------------------------------------

// Напишите функцию filterRangeInPlace(arr, a, b), которая принимает массив arr и удаляет из него все значения
// кроме тех, которые находятся между a и b. То есть, проверка имеет вид a ≤ arr[i] ≤ b.
// Функция должна изменять принимаемый массив и ничего не возвращать.

function filterRangeInPlace(arr, a, b) {
    let i = 0;
    let max_index = arr.length - 1;
    while (i <= max_index) {
        if (arr[i] < a || arr[i] > b) {
            arr.splice(i, 1);
            --max_index;
        } else ++i;
    }
}

// let arr_2 = [5, 3, 8, 1];
// filterRangeInPlace(arr_2, 1, 4); // удалены числа вне диапазона 1..4
// console.log(arr_2); // [3, 1]

//----------------------------------------------------------------------------------------------------------------------

function compareNumeric(a, b) {
    if (a > b) return 1;
    if (a == b) return 0;
    if (a < b) return -1;
}

// Сортировать в порядке по убыванию
let arr_3 = [5, 2, 1, -10, 8];
arr_3.sort((a, b) => b - a)
// console.log( arr_3 ); // 8, 5, 2, 1, -10

//----------------------------------------------------------------------------------------------------------------------

// У нас есть массив строк arr. Нужно получить отсортированную копию, но оставить arr неизменённым.
// Создайте функцию copySorted(arr), которая будет возвращать такую копию.

// v1
// function copySorted(arr) {
//     let new_arr = arr.slice().sort();
//     return new_arr.sort()
// }

// v2.0
function copySorted(arr) {
    return arr.slice().sort();
}

let arr_4 = ["HTML", "JavaScript", "CSS"];
let sorted = copySorted(arr_4);
// console.log(sorted); // CSS, HTML, JavaScript
// console.log(arr_4); // HTML, JavaScript, CSS (без изменений)

//----------------------------------------------------------------------------------------------------------------------

// Создайте функцию конструктор Calculator, которая создаёт «расширяемые» объекты калькулятора.

function Calculator() {
    this['+'] = (a, b) => a + b;
    this['-'] = (a, b) => a - b;
    this.addMethod = function (str, func) {
        if (typeof (func) !== 'function') {
            console.log("Can't write, first argument must be function");
            return;
        }
        this[str] = func;
    };
    this.calculate = function (str) {
        let arr = str.split(' ')
        if (arr.length !== 3) {
            return `Incorrect input '${str}', Use input like this: '2 + 3', only with two numbers, separated by spaces`
        }
        let a_value = arr[0], key_func = arr[1], b_value = arr[2];
        if (typeof this[key_func] !== 'function') {
            return `Function '${key_func}' did not write.`

        } else if (!(isFinite(a_value) && isFinite(b_value))) {
            return `Are you joking? ${a_value} or ${key_func} are not numbers!`

        } else if (isNaN(this[key_func](+a_value, +b_value))) {
            return `Something wrong, but we already working on it`
        }
        return this[key_func](+a_value, +b_value)
    }
}

let powerCalc = new Calculator;
powerCalc.addMethod("*", (a, b) => a * b);
powerCalc.addMethod("/", (a, b) => a / b);
powerCalc.addMethod("**", (a, b) => a ** b);
powerCalc.addMethod("%", (a, b) => a % b);
powerCalc.addMethod("//", (a, b) => Math.floor(a / b));


// let arr_test = ["2 * 3", "2 / 3", "10 ** 3000", "2 + 3", "2 - 3", "2 % 3", "16 // 5", "2 ^ 3", "2 + 3v", "0 / 0"];
// for (let key of arr_test) {
//     console.log(powerCalc.calculate(key))
// }

////////

function Calculator_from_lesson() {
    this.methods = {
        "-": (a, b) => a - b,
        "+": (a, b) => a + b
    };
    this.calculate = function (str) {
        let split = str.split(' '),
            a = +split[0],
            op = split[1],
            b = +split[2]
        if (!this.methods[op] || isNaN(a) || isNaN(b)) {
            return NaN;
        }
        return this.methods[op](a, b);
    }
    this.addMethod = function (name, func) {
        this.methods[name] = func;
    };
}

//----------------------------------------------------------------------------------------------------------------------

// У вас есть массив объектов user, и в каждом из них есть user.name. Напишите код, который преобразует их в массив имён.
// let vasya = { name: "Вася", age: 25 };
// let petya = { name: "Петя", age: 30 };
// let masha = { name: "Маша", age: 28 };
//
// let users = [ vasya, petya, masha ];
//
// let names = users.map(object => object.name)

// console.log( names ); // Вася, Петя, Маша

//----------------------------------------------------------------------------------------------------------------------

// У вас есть массив объектов user, и у каждого из объектов есть name, surname и id.
// Напишите код, который создаст ещё один массив объектов с параметрами id и fullName,
// где fullName – состоит из name и surname.

// let vasya = {name: "Вася", surname: "Пупкин", id: 1};
// let petya = {name: "Петя", surname: "Иванов", id: 2};
// let masha = {name: "Маша", surname: "Петрова", id: 3};
//
// let users = [vasya, petya, masha];
// let usersMapped = users.map(obj => ({fullName: obj.name + ' ' + obj.surname, id: obj.id}))

// console.log(usersMapped[0].id) // 1
// console.log(usersMapped[0].fullName) // Вася Пупкин
// console.log(usersMapped) // 1

//----------------------------------------------------------------------------------------------------------------------

// Напишите функцию sortByAge(users), которая принимает массив объектов со свойством age и сортирует их по нему.

let vasya = {name: "Вася", age: 25};
let petya = {name: "Петя", age: 30};
let masha = {name: "Маша", age: 28};

let arr_5 = [vasya, petya, masha];

sortByAge(arr_5);

// теперь: [vasya, masha, petya]
// console.log(arr_5[0].name); // Вася
// console.log(arr_5[1].name); // Маша
// console.log(arr_5[2].name); // Петя

function sortByAge(list_objects) {
    list_objects.sort((a, b) => (a.age - b.age))
}

// arr.sort((a, b) => a.age > b.age ? 1 : -1);

//----------------------------------------------------------------------------------------------------------------------

// Напишите функцию shuffle(array), которая перемешивает (переупорядочивает случайным образом) элементы массива.
// Многократные прогоны через shuffle могут привести к разным последовательностям элементов. Например:

// v1.0
function shuffle(array) {
    array.sort(() => (Math.random() - 0.5))
}


// Тасование Фишера — Йетса
function fShuffle(array) {
    let j = 0;
    for (let i = array.length - 1; i >= 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// let arr_7 = [];
// for (let i = 1; i <= 100; i++) {
//     arr_7.push(i)
// }
// fShuffle(arr_7);
// console.log(arr_7)

//----------------------------------------------------------------------------------------------------------------------

// Напишите функцию getAverageAge(users), которая принимает массив объектов со свойством age
// и возвращает средний возраст.
// Формула вычисления среднего арифметического значения: (age1 + age2 + ... + ageN) / N.

let vasya_1 = {name: "Вася", age: 25};
let petya_1 = {name: "Петя", age: 30};
let masha_1 = {name: "Маша", age: 29};

// let arr_8 = [vasya_1, petya_1, masha_1];
// console.log(getAverageAge(arr_8)); // (25 + 30 + 29) / 3 = 28

function getAverageAge(arr) {
    return arr.reduce((sum, b) => sum + b.age, 0) / arr.length
}

//----------------------------------------------------------------------------------------------------------------------

// Напишите функцию unique(arr), которая возвращает массив, содержащий только уникальные элементы arr.

// v1.3
function unique(arr) {
    let new_arr = [];
    for (let item of arr) {
        if (!new_arr.includes(item)) {
            new_arr.push(item)
        }
    }
    return new_arr
}


let strings = ["кришна", "кришна", "харе", "харе",
    "харе", "харе", "кришна", "кришна", ":-O", ":-O"
];
// console.log( unique(strings) ); // кришна, харе, :-O

//----------------------------------------------------------------------------------------------------------------------

// Допустим, мы получили массив пользователей в виде {id:..., name:..., age:... }.
// Создайте функцию groupById(arr), которая создаст из него объект с id в качестве ключа и
// элементами массива в качестве значений.

/*
// после вызова у нас должно получиться:
usersById = {
  john: {id: 'john', name: "John Smith", age: 20},
  ann: {id: 'ann', name: "Ann Smith", age: 24},
  pete: {id: 'pete', name: "Pete Peterson", age: 31},
}
*/
// Такая функция очень удобна при работе с данными, которые приходят с сервера.
// В этой задаче мы предполагаем, что id уникален. Не может быть двух элементов массива с одинаковым id.
// Используйте метод .reduce в решении.

let users = [
    {id: 'john', name: "John Smith", age: 20},
    {id: 'ann', name: "Ann Smith", age: 24},
    {id: 'pete', name: "Pete Peterson", age: 31},
];
// let usersById = groupById(users);
// console.log(usersById);

//v1.0
function groupById(arr) {
    let new_obj = {};
    for (let item of arr) {
        new_obj[item.id] = item
    }
    return new_obj
}

// v2.0
function groupById_2(arr) {
    return arr.reduce(function (obj, item) {
       obj[item.id] = item;
       return obj
    }, {})
}

// console.log(groupById_2(users));


