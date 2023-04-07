//                        For understand recursion need to understand recursion

// 1) Это «простой» отдел с массивом – тогда мы сможем суммировать зарплаты в простом цикле.

// 2) Это объект с N подотделами – тогда мы можем сделать N рекурсивных вызовов, чтобы получить сумму для каждого
// из подотделов, и объединить результаты.

// let company = { // тот же самый объект, сжатый для краткости
//   sales: [{name: 'John', salary: 1000}, {name: 'Alice', salary: 600 }],
//   development: {
//     sites: [{name: 'Peter', salary: 2000}, {name: 'Alex', salary: 1800 }],
//     internals: [{name: 'Jack', salary: 1300}]
//   }
// };
//
// // Функция для подсчёта суммы зарплат
// function sumSalaries(department) {
//   if (Array.isArray(department)) { // случай (1)
//     return department.reduce((prev, current) => prev + current.salary, 0); // сумма элементов массива
//   } else { // случай (2)
//     let sum = 0;
//     for (let subdep of Object.values(department)) {
//       sum += sumSalaries(subdep); // рекурсивно вызывается для подотделов, суммируя результаты
//     }
//     return sum;
//   }
// }
//
// console.log(sumSalaries(company)); // 6700

//----------------------------------------------------------------------------------------------------------------------

//                                         Recursive linked list

// let list = {
//   value: 1,
//   next: {
//     value: 2,
//     next: {
//       value: 3,
//       next: {
//         value: 4,
//         next: null
//       }
//     }
//   }
// };

// Alternative
// let list_1 = { value: 1 };
// list_1.next = { value: 2 };
// list_1.next.next = { value: 3 };
// list_1.next.next.next = { value: 4 };
//
// // divide list
// let secondList = list.next.next;
// list.next.next = null;
//
// // unite list
// list.next.next = secondList;

//

// для добавления нового элемента нам нужно обновить первый элемент списка:
// let list = {value: 1};
// list.next = {value: 2};
// list.next.next = {value: 3};
// list.next.next.next = {value: 4};
//
// // добавление нового элемента в список
// list = {value: "new item", next: list};
//
// // Чтобы удалить элемент из середины списка, нужно изменить значение next предыдущего элемента:
// list.next = list.next.next;

//

// Списки могут быть улучшены:
// Можно добавить свойство prev в дополнение к next для ссылки на предыдущий элемент,
// чтобы легко двигаться по списку назад.
// Можно также добавить переменную tail, которая будет ссылаться на последний элемент списка
// (и обновлять её при добавлении/удалении элементов с конца).

//----------------------------------------------------------------------------------------------------------------------

// Напишите функцию sumTo(n), которая вычисляет сумму чисел 1 + 2 + ... + n.

// Сделайте три варианта решения:
// С использованием цикла.
// Через рекурсию, т.к. sumTo(n) = n + sumTo(n-1) for n > 1.
// С использованием формулы арифметической прогрессии.

// function sum(n) {
//     let sum = 0;
//     for (let i = n; i >= 1; i--) {
//         sum += i
//     }
//     return sum
// }
// console.log(sum(100));

//

// function sum(n) {
//     return (n <= 1) ? 1 : sum(n - 1) + n
// }
// console.log(sum(100));

//

// function sum(n) {
//     return (1 + n) * n / 2
// }
// console.log(sum(100));

//----------------------------------------------------------------------------------------------------------------------

// написать функцию factorial(n), которая возвращает n!, используя рекурсию.

function factorial(n) {
    return (n == 1) ? 1 : n * factorial(n - 1);
}

// console.log(factorial(5));

//----------------------------------------------------------------------------------------------------------------------

// Напишите функцию fib(n) которая возвращает n-е число Фибоначчи.


// console.log(fib(3)); // 2
// console.log(fib(4)); // 3
// console.log(fib(7)); // 13
// console.log(fib(8)); // 21
// console.log(fib(77)); // 5527939700884757

// by recursive
// function fib(n) {
//     return (n < 3) ? 1 : fib(n - 1) + fib(n - 2)
// }

// by iterative
function fib(n) {
    if (n < 2) {
        return 1
    }
    let a = 1, b = 1;
    for (let i = 3; i <= n; i++) {
        [b, a] = [a, a + b]
    }
    return a
}

//----------------------------------------------------------------------------------------------------------------------

// У нас есть односвязный список (как описано в главе Рекурсия и стек)
// Напишите функцию printList(list), которая выводит элементы списка по одному.
// Сделайте два варианта решения: используя цикл и через рекурсию.

let list = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
            next: {
                value: 4,
                next: null
            }
        }
    }
};

// by cycle
// function printList(list) {
//     let next_elem = list;
//     while (next_elem !== null) {
//         console.log(next_elem.value);
//         // console.log(Object.values(next_elem));
//         next_elem = next_elem.next;
//     }
// }
// printList(list);


// by recursive
function printList(list) {
    console.log(list.value);
    // console.log(Object.values(list));
    if (list.next !== null) {
        printList(list.next);
    }
}

// printList(list);

//----------------------------------------------------------------------------------------------------------------------

// Выведите односвязный список из предыдущего задания Вывод односвязного списка в обратном порядке.
// Сделайте два решения: с использованием цикла и через рекурсию.

// by iterative
// function printListReverse(list) {
//     let next_elem = list;
//     let arr_elem = [];
//     while (next_elem !== null) {
//         arr_elem.push(next_elem.value);
//         next_elem = next_elem.next;
//     }
//     console.log(...arr_elem.reverse());
// }
//
// printListReverse(list);


// by recursive
function printListReverse(list) {
    if (list.next) {
        printListReverse(list.next);
    }
    console.log(list.value);
}

printListReverse(list);
