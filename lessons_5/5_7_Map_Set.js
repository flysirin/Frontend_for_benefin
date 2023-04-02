// Map – коллекция пар ключ-значение.
//
//   new Map([iterable]) – создаёт коллекцию, можно указать перебираемый объект (обычно массив) из пар [ключ,значение] для инициализации.
//   map.set(key, value) – записывает по ключу key значение value.
//   map.get(key) – возвращает значение по ключу или undefined, если ключ key отсутствует.
//   map.has(key) – возвращает true, если ключ key присутствует в коллекции, иначе false.
//   map.delete(key) – удаляет элемент по ключу key.
//   map.clear() – очищает коллекцию от всех элементов.
//   map.size – возвращает текущее количество элементов.
//   map.keys() – возвращает итерируемый объект по ключам,
//   map.values() – возвращает итерируемый объект по значениям,
//   map.entries() – возвращает итерируемый объект по парам вида [ключ, значение],
// этот вариант используется по умолчанию в for..of.

// Map имеет встроенный метод forEach, схожий со встроенным методом массивов Array:
// recipeMap.forEach((value, key, map) => {
//   alert(`${key}: ${value}`); // огурец: 500 и так далее
// });

// Есть метод Object.fromEntries, который делает противоположное: получив массив пар вида [ключ, значение],
// он создаёт из них объект:
// let prices = Object.fromEntries([
//   ['banana', 1],
//   ['orange', 2],
//   ['meat', 4]
// ]);
// prices = { banana: 1, orange: 2, meat: 4 }

// let obj = Object.fromEntries(map); // убрать .entries()

// Отличия от обычного объекта Object:
// Что угодно может быть ключом, в том числе и объекты.
// Есть дополнительные методы, свойство size.
//


//   Set -  Методы и свойства:
//
//   new Set(iterable) – создаёт Set, можно указать перебираемый объект со значениями для инициализации.
//   set.add(value) – добавляет значение (если оно уже есть, то ничего не делает), возвращает тот же объект set.
//   set.delete(value) – удаляет значение, возвращает true если value было в множестве на момент вызова, иначе false.
//   set.has(value) – возвращает true, если значение присутствует в множестве, иначе false.
//   set.clear() – удаляет все имеющиеся значения.
//   set.size – возвращает количество элементов в множестве.
//   set.keys() – возвращает перебираемый объект для значений,
//   set.values() – то же самое, что и set.keys(), присутствует для обратной совместимости с Map,
//   set.entries() – возвращает перебираемый объект для пар вида [значение, значение],
// присутствует для обратной совместимости с Map.

// Мы можем перебрать содержимое объекта set как с помощью метода for..of, так и используя forEach:
// let set = new Set(["апельсин", "яблоко", "банан"]);
// set.forEach((value, valueAgain, set) => {
//   alert(value);
// });


//----------------------------------------------------------------------------------------------------------------------

// Создайте функцию unique(arr), которая вернёт массив уникальных, не повторяющихся значений массива arr.

function unique(arr) {
  return Array.from(new Set(values))
}

let values = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

// console.log( unique(values) ); // Hare,Krishna,:-O

//----------------------------------------------------------------------------------------------------------------------

// Напишите функцию aclean(arr), которая возвращает массив слов, очищенный от анаграмм.

// My func
function anagramClean(arr) {
    let sort_arr = [];
    let res_arr = [];
    for (let item of arr) {
        let sort_item = Array.from(item.toLowerCase()).sort().join('');
        if (!sort_arr.includes(sort_item)) {
            sort_arr.push(sort_item);
            res_arr.push(item);
        }
    }
    return res_arr
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];
// console.log(anagramClean(arr))


// func from lesson for example
function aclean(arr) {
  let map = new Map();
  for (let word of arr) {
    let sorted = word.toLowerCase().split("").sort().join("");
    map.set(sorted, word);
  }
  return Array.from(map.values());
}
//----------------------------------------------------------------------------------------------------------------------

// Мы хотели бы получить массив ключей map.keys() в переменную и далее работать с ними,
// например, применить метод .push.
let map = new Map();
map.set("name", "John");

// let keys = map.keys();
// console.log(keys); // [Map Iterator] { 'name' }

// Error: keys.push is not a function
// keys.push("more");

// Почему? Что нужно поправить в коде, чтобы вызов keys.push сработал?
// .push() - это метод для Array, поэтому, а map.keys() возвращает объект итератор, поэтому нужно его преобразовать
// в массив

let keys = Array.from(map.keys());
keys.push("more");
console.log(keys);

























