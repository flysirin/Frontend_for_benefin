// Чтобы сделать range итерируемым (и позволить for..of работать с ним), нам нужно добавить в объект метод
// с именем Symbol.iterator (специальный встроенный Symbol, созданный как раз для этого).
// Когда цикл for..of запускается, он вызывает этот метод один раз (или выдаёт ошибку, если метод не найден).
// Этот метод должен вернуть итератор – объект с методом next.
// Дальше for..of работает только с этим возвращённым объектом.
// Когда for..of хочет получить следующее значение, он вызывает метод next() этого объекта.
// Результат вызова next() должен иметь вид {done: Boolean, value: any}, где done=true означает,
// что цикл завершён, в противном случае value содержит очередное значение.
// Вот полная реализация range с пояснениями:

let range = {
  from: 1,
  to: 5
};

// 1. вызов for..of сначала вызывает эту функцию
range[Symbol.iterator] = function() {

  // ...она возвращает объект итератора:
  // 2. Далее, for..of работает только с этим итератором, запрашивая у него новые значения
  return {
    current: this.from,
    last: this.to,

    // 3. next() вызывается на каждой итерации цикла for..of
    next() {
      // 4. он должен вернуть значение в виде объекта {done:.., value :...}
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    }
  };
};

// теперь работает!
// for (let num of range) {
//   console.log(num); // 1, затем 2, 3, 4, 5
// }

//----------------------------------------------------------------------------------------------------------------------

let str = "Hello";

// делает то же самое, что и
// for (let char of str) alert(char);

let iterator = str[Symbol.iterator]();

// while (true) {
//   let result = iterator.next();
//   if (result.done) break;
//   console.log(result.value); // выводит символы один за другим
// }

//----------------------------------------------------------------------------------------------------------------------

let arrayLike = {
  0: "Hello",
  1: "World",
  length: 2
};

let arr = Array.from(arrayLike); // (*)
for (let item of arr) {
    console.log(item);
}
// console.log(arr.pop()); // World (метод работает)

//----------------------------------------------------------------------------------------------------------------------

// Полный синтаксис Array.from позволяет указать необязательную «трансформирующую» функцию:
// Array.from(obj[, mapFn, thisArg])
// Необязательный второй аргумент может быть функцией, которая будет применена к каждому элементу
// перед добавлением в массив, а thisArg позволяет установить this для этой функции.

// range взят из примера выше
// возводим каждое число в квадрат
let arr_2 = Array.from(range, num => num * num);
// console.log(arr_2); // 1,4,9,16,25

//----------------------------------------------------------------------------------------------------------------------

// Мы можем даже создать slice, который поддерживает суррогатные пары:

function slice(str, start, end) {
  return Array.from(str).slice(start, end).join('');
}

let str_2 = '𝒳😂𩷶';

console.log( slice(str_2, 1, 3) ); // 😂𩷶

// а вот встроенный метод не поддерживает суррогатные пары
console.log( str_2.slice(1, 3) ); // мусор (две части различных суррогатных пар)

//----------------------------------------------------------------------------------------------------------------------
