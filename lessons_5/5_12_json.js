
// JSON.stringify для преобразования объектов в JSON.
// let json = JSON.stringify(value, [replacer, space]) //
// replacer - Массив свойств для кодирования или функция соответствия function(key, value)

// JSON.parse для преобразования JSON обратно в объект.
// let value = JSON.parse(str, [reviver]);
// reviver - Необязательная функция, которая будет вызываться для каждой пары (ключ, значение) и может преобразовывать значение.
//

// JSON поддерживает следующие типы данных:
//
// Объекты { ... }
// Массивы [ ... ]
// Примитивы:
// строки,
// числа,
// логические значения true/false,
// null.

// JSON.stringify пропускает некоторые специфические свойства объектов JavaScript.
//
// Свойства-функции (методы).
// Символьные ключи и значения.
// Свойства, содержащие undefined.

//

// не должно быть циклических ссылок.

// let room = {
//   number: 23
// };
//
// let meetup = {
//   title: "Conference",
//   participants: ["john", "ann"]
// };
//
// meetup.place = room;       // meetup ссылается на room
// room.occupiedBy = meetup; // room ссылается на meetup
//
// JSON.stringify(meetup); // Ошибка: Преобразование цикличной структуры в

//

// let room = {
//   number: 23
// };
//
// let meetup = {
//   title: "Conference",
//   participants: [{name: "John"}, {name: "Alice"}],
//   place: room // meetup ссылается на room
// };
//
// room.occupiedBy = meetup; // room ссылается на meetup
// console.log( JSON.stringify(meetup, ['title', 'participants', 'place', 'name', 'number']) );
// {"title":"Conference","participants":[{"name":"John"},{"name":"Alice"}],"place":{"number":23}}

// Функция будет вызываться для каждой пары (key, value), и она должна возвращать заменённое значение,
// которое будет использоваться вместо исходного. Или undefined, чтобы пропустить значение.

//

// метод toJSON для преобразования в JSON. JSON.stringify автоматически вызывает его, если он есть.
// let room = {
//   number: 23
// };
//
// let meetup = {
//   title: "Conference",
//   date: new Date(Date.UTC(2017, 0, 1)),
//   room
// };
//
// console.log( JSON.stringify(meetup) );
// {"title":"Conference","date":"2017-01-01T00:00:00.000Z","room":{"number":23}}

// давайте добавим собственную реализацию метода toJSON в наш объект room (2):
// let room = {
//   number: 23,
//   toJSON() {
//     return this.number;
//   }
// };
//
// let meetup = {
//   title: "Conference",
//   room
// };
// console.log( JSON.stringify(meetup) ); // {"title":"Conference","room":23}
// console.log( JSON.stringify(room) ); // 23


//

// передадим JSON.parse функцию восстановления вторым аргументом, которая возвращает все значения «как есть», но date станет Date:
//
// let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
//
// let meetup = JSON.parse(str, function(key, value) {
//   if (key == 'date') return new Date(value);
//   return value;
// });
//
// console.log( meetup.date.getDate() ); // 30 - теперь работает

// это работает и для вложенных объектов:
// let schedule = `{
//   "meetups": [
//     {"title":"Conference","date":"2017-11-30T12:00:00.000Z"},
//     {"title":"Birthday","date":"2017-04-18T12:00:00.000Z"}
//   ]
// }`;
//
// schedule = JSON.parse(schedule, function(key, value) {
//   if (key == 'date') return new Date(value);
//   return value;
// });
//
// console.log( schedule.meetups[1].date.getDate() ); // 18 - отлично!

//H/W
//----------------------------------------------------------------------------------------------------------------------

// Преобразуйте user в JSON, затем прочитайте этот JSON в другую переменную.
// let user = {
//   name: "Василий Иванович",
//   age: 35
// };
//
// user_json = JSON.stringify(user);
// console.log(user_json);
// user_obj = JSON.parse(user_json);
// console.log(user_obj);

//----------------------------------------------------------------------------------------------------------------------

// Напишите функцию replacer для JSON-преобразования, которая удалит свойства, ссылающиеся на meetup:
let room = {
  number: 23
};

let meetup = {
  title: "Совещание",
  occupiedBy: [{name: "Иванов"}, {name: "Петров"}],
  place: room
};

// цикличные ссылки
room.occupiedBy = meetup;
meetup.self = meetup;

// v1.0
// console.log( JSON.stringify(meetup, function replacer(key, value) {
//   if (key == "self" || value == meetup && key == "occupiedBy") {
//       return undefined
//   }
//   return value
// }));


//v2.0

console.log( JSON.stringify(meetup, function replacer(key, value) {
  return (key != "" && value == meetup) ? undefined : value;
}));


// В функции replacer, если key не является пустой строкой, то это означает, что текущее свойство объекта
// не является корневым узлом, а является дочерним свойством другого свойства объекта. Это означает,
// что текущий объект не является корневым объектом, который будет сериализован в итоговый JSON-объект,
// а будет включен в качестве свойства другого объекта.
// (key != "" && value == meetup) - исключаем все не корневые объекты, которые ссылаются на meetup
// Первый вызов – особенный. Ему передаётся специальный «объект-обёртка»: {"": meetup}.
// Другими словами, первая (key, value) пара имеет пустой ключ, а значением является целевой объект в общем.


console.log()
console.log( JSON.stringify(meetup, function replacer(key, value) {
  return (key != "") ? undefined : value;
}));
// В данном примере, функция replacer возвращает undefined для всех свойств, кроме корневого объекта.
// Это означает, что все дочерние объекты будут исключены из сериализации и не будут включены в итоговый JSON-объект.
// Таким образом, если корневой объект meetup не содержит никаких других свойств, кроме свойства title,
// то функция replacer удалит свойство title и вернет undefined, поскольку key для этого свойства не является
// пустой строкой.
