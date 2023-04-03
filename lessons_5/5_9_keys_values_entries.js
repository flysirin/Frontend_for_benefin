//                                Object.keys, values, entries

// Для простых объектов доступны следующие методы:
// Object.keys(obj) – возвращает массив ключей.
// Object.values(obj) – возвращает массив значений.
// Object.entries(obj) – возвращает массив пар [ключ, значение].

let user = {
    name: "John",
    age: 30
};
// console.log(Object.keys(user)) //= ["name", "age"]
// console.log(Object.values(user)) // = ["John", 30]
// console.log(Object.entries(user)) // = [ ["name","John"], ["age",30] ]

//----------------------------------------------------------------------------------------------------------------------

// пример использования Object.values для перебора значений свойств в цикле:
let user_1 = {
    name: "John",
    age: 30
};

// перебор значений
for (let value of Object.values(user_1)) {
    // console.log(value); // John, затем 30
}

//----------------------------------------------------------------------------------------------------------------------

//                                     Трансформации объекта
// У объектов нет множества методов, которые есть в массивах, например map, filter и других.
// Если мы хотели бы их применить, то можно использовать Object.entries с последующим вызовом Object.fromEntries:
// Вызов Object.entries(obj) возвращает массив пар ключ/значение для obj.
// На нём вызываем методы массива, например, map.
// Используем Object.fromEntries(array) на результате, чтобы преобразовать его обратно в объект.
// Например, у нас есть объект с ценами, и мы хотели бы их удвоить:

let prices = {
    banana: 1,
    orange: 2,
    meat: 4,
};

let doublePrices = Object.fromEntries(
    // преобразовать в массив, затем map, затем fromEntries обратно объект
    Object.entries(prices).map(([key, value]) => [key, value * 2])
);

// console.log(doublePrices.meat); // 8
// console.log(doublePrices); // { banana: 2, orange: 4, meat: 8 }

//----------------------------------------------------------------------------------------------------------------------

// Есть объект salaries с произвольным количеством свойств, содержащих заработные платы.
// Напишите функцию sumSalaries(salaries), которая возвращает сумму всех зарплат с помощью метода
// Object.values и цикла for..of.
// Если объект salaries пуст, то результат должен быть 0.
// let new_obj = {}
// console.log((Object.values(new_obj)))

let salaries = {
    "John": 100,
    "Pete": 300,
    "Mary": 250
};

console.log(sumSalaries(salaries)); // 650

function sumSalaries(objSalaries) {
    let list_of_salaries = Object.values(objSalaries);
    return (list_of_salaries.length) ? Object.values(objSalaries).reduce((a, b) => a + b) : 0
}

// console.log(Object.values(salaries).reduce((a, b) => a + b, 0))

//----------------------------------------------------------------------------------------------------------------------

// Напишите функцию count(obj), которая возвращает количество свойств объекта:
let user_3 = {
  name: 'John',
  age: 30
};

console.log( count(user_3) ); // 2

function count(objUser) {
    return Object.keys(objUser).length
}
