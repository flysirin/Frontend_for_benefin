// пример деструктуризации массива на переменные:
// let arr = ["Ilya", "Kantor"];
// let [firstName, surname] = arr;
// console.log(firstName); // Ilya
// console.log(surname);  // Kantor

//

// let [firstName, surname] = "Ilya Kantor".split(' ');

//

// let [firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
// console.log( title ); // Consul

//

// let [a, b, c] = "abc";
// let [one, two, three] = new Set([1, 2, 3]);

//

// можно присвоить свойству объекта:
// let user = {};
// [user.name, user.surname] = "Ilya Kantor".split(' ');
// user.name = Ilya // user.surname = Kanto

//

// let user = {
//   name: "John",
//   age: 30
// };
//
// // цикл по ключам и значениям
// for (let [key, value] of Object.entries(user)) {
//   alert(`${key}:${value}`); // name:John, затем age:30
// }

//

// let user = new Map();
// user.set("name", "John");
// user.set("age", "30");

// for (let [key, value] of user) {
//   alert(`${key}:${value}`); // name:John, затем age:30
// }

//

// let [name1, name2] = ["Julius", "Caesar", "Consul", "of the Roman Republic"]; // name1 = "Julius", name2 = "Caesar"

//

// let [name1, name2, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
// rest это массив элементов, начиная с 3-го
// rest[0] = Consul, rest[1] = of the Roman Republic; rest.length = 2

//

// let [firstName, surname] = []; firstName = undefined, surname = undefined

//

// Если мы хотим, чтобы значение «по умолчанию» заменило отсутствующее, мы можем указать его с помощью =:
// let [name = "Guest", surname = "Anonymous"] = ["Julius"];
// name = Julius (из массива), surname = Anonymous

//

// prompt запустится только для surname
// let [name = prompt('name?'), surname = prompt('surname?')] = ["Julius"];
// name = Julius (из массива), surname = результат prompt

//

// let {var1, var2} = {var1:…, var2:…} // Деструктурирующее присваивание также работает с объектами.

//

// let options = {
//   title: "Menu",
//   width: 100,
//   height: 200
// };
//
// let {title, width, height} = options;
//
// title = Menu, width = 100, height = 200
// Свойства options.title, options.width и options.height присваиваются соответствующим переменным.

// изменён порядок в let {...}
// let {height, width, title} = { title: "Menu", height: 200, width: 100 };
// console.log(height, width, title); // height, width, title = 200, 100, Menu

// Если мы хотим присвоить свойство объекта переменной с другим названием, например, свойство options.width
// присвоить переменной w, то мы можем использовать двоеточие:
// { sourceProperty: targetVariable }
// let {width: w, height: h, title} = options;
// width -> w, height -> h, title -> title

// взять только title, игнорировать остальное
// let { title } = options;

// title = свойство с именем title
// rest = объект с остальными свойствами
// let {title, ...rest} = options;

// сейчас title="Menu", rest={height: 200, width: 100}
// rest.height = 200, rest.width = 100
//

// В коде ниже prompt запросит width, но не title:
// let options = {
//   title: "Menu"
// };
// let {width = prompt("width?"), title = prompt("title?")} = options;

//

// Чтобы показать JavaScript, что это не блок кода, мы можем заключить выражение в скобки (...):
// let title, width, height;
// сейчас всё работает
// ({title, width, height} = {title: "Menu", width: 200, height: 100});
// а так нет:
// {title, width, height} = {title: "Menu", width: 200, height: 100};

//

// В приведённом ниже коде options хранит другой объект в свойстве size и массив в свойстве items. Шаблон в левой части присваивания имеет такую же структуру, чтобы извлечь данные из них:
// let options = {
//   size: {
//     width: 100,
//     height: 200
//   },
//   items: ["Cake", "Donut"],
//   extra: true
// };
//
// // деструктуризация разбита на несколько строк для ясности
// let {
//   size: { // положим size сюда
//     width,
//     height
//   },
//   items: [item1, item2], // добавим элементы к items
//   title = "Menu" // отсутствует в объекте (используется значение по умолчанию)
// } = options;

//

// Мы можем передать параметры как объект, и функция немедленно деструктурирует его в переменные:
// мы передаём объект в функцию
// let options = {
//   title: "My menu",
//   items: ["Item1", "Item2"]
// };
//
// // ...и она немедленно извлекает свойства в переменные
// function showMenu({title = "Untitled", width = 200, height = 100, items = []}) {
//   // title, items – взято из options,
//   // width, height – используются значения по умолчанию
//   alert( `${title} ${width} ${height}` ); // My Menu 200 100
//   alert( items ); // Item1, Item2
// }

// showMenu(options); (!!!)


//

// showMenu({}); // ок, все значения - по умолчанию
// showMenu(); // так была бы ошибка

// // Мы можем исправить это, сделав {} значением по умолчанию для всего объекта параметров:
// function showMenu({ title = "Menu", width = 100, height = 200 } = {}) {
//   alert( `${title} ${width} ${height}` );
// }
// showMenu(); // Menu 100 200

//

// let {prop : varName = default, ...rest} = object
//
// let [item1 = default, item2, ...rest] = array

//----------------------------------------------------------------------------------------------------------------------

// Напишите деструктурирующее присваивание, которое:
// свойство name присвоит в переменную name.
// свойство years присвоит в переменную age.
// свойство isAdmin присвоит в переменную isAdmin (false, если нет такого свойства)
// Пример переменных после вашего присваивания:

let user = {name: "John", years: 30};

let {name, years: age, isAdmin = false} = user // years -> age
// console.log( name ); // John
// console.log( age ); // 30
// console.log( isAdmin ); // false

//----------------------------------------------------------------------------------------------------------------------

// Создайте функцию topSalary(salaries), которая возвращает имя самого высокооплачиваемого сотрудника.
// Если объект salaries пустой, то нужно вернуть null.
// Если несколько высокооплачиваемых сотрудников, можно вернуть любого из них.
// P.S. Используйте Object.entries и деструктурирование, чтобы перебрать пары ключ/значение.
let salaries = {
    "John": 100,
    "Pete": 300,
    "Mary": 250
};

let sal = {};

function topSalary(salaries) {
    let name = null;
    let current_salary = 0;
    for (let [key, value] of Object.entries(salaries)) {
        if (current_salary < value) {
            name = key;
            current_salary = value;
        }
    }
    return name
}

console.log(topSalary(sal));
console.log(topSalary(salaries));
