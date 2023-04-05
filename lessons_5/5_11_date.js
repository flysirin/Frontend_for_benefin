//                                 Date

// let date = new Date("2017-01-26"); // Thu Jan 26 2017 04:00:00 GMT+0400 (Грузия, стандартное время)

//

// getFullYear()  - Получить год (4 цифры)
// getMonth()  - Получить месяц, от 0 до 11.
// getDate()  - Получить день месяца, от 1 до 31, что несколько противоречит названию метода.
// getHours(), getMinutes(), getSeconds(), getMilliseconds() - Получить, соответственно, часы, минуты, секунды или миллисекунды.
// getDay() - Вернуть день недели от 0 (воскресенье) до 6 (суббота)
// getUTCFullYear(), getUTCMonth(), getUTCDay() - UTC-варианты, возвращающие день, месяц, год для временной зоны UTC+0:

// getTime() - Для заданной даты возвращает таймстамп – количество миллисекунд, прошедших с 1 января 1970 года UTC+0.
// getTimezoneOffset() - Возвращает разницу в минутах между UTC и местным часовым поясом

//

// Следующие методы позволяют установить компоненты даты и времени:
// setFullYear(year, [month], [date])
// setMonth(month, [date])
// setDate(date)
// setHours(hour, [min], [sec], [ms])
// setMinutes(min, [sec], [ms])
// setSeconds(sec, [ms])
// setMilliseconds(ms)
// setTime(milliseconds) (устанавливает дату в виде целого количества миллисекунд, прошедших с 01.01.1970 UTC)
// У всех этих методов, кроме setTime(), есть UTC-вариант, например: setUTCHours().

//
// Автоисправление
// let date = new Date(2013, 0, 32); // 32 Jan 2013 ?!?
// alert(date); // ...1st Feb 2013!

// let date = new Date(2016, 1, 28);
// date.setDate(date.getDate() + 2); // date = 1 Mar 2016

// получим дату «спустя 70 секунд с текущего момента»:
// let date = new Date();
// date.setSeconds(date.getSeconds() + 70);

//

// let date = new Date(2016, 0, 2); // 2 Jan 2016
// date.setDate(1); // задать первое число месяца, date = Fri Jan 01 2016 00:00:00 GMT+0400
// date.setDate(0); // первый день месяца -- это 1, так что выводится последнее число предыдущего месяца
// alert( date ); // 31 Dec 2015

//

// let date = new Date();
// alert(+date); // количество миллисекунд, то же самое, что date.getTime()

//

// let start = Date.now(); // количество миллисекунд с 1 января 1970 года

//

// Современные интерпретаторы JavaScript начинают применять продвинутые оптимизации только к «горячему коду»,
// выполняющемуся несколько раз (незачем оптимизировать то, что редко выполняется).
// Так что в примере выше первые запуски не оптимизированы должным образом. Нелишним будет добавить
// предварительный запуск для «разогрева»:

// добавляем для "разогрева" перед основным циклом
// bench(diffSubtract);
// bench(diffGetTime);

// а теперь тестируем производительность
// for (let i = 0; i < 10; i++) {
//   time1 += bench(diffSubtract);
//   time2 += bench(diffGetTime);
// }

//

// Метод Date.parse(str) считывает дату из строки.
// Формат строки должен быть следующим: YYYY-MM-DDTHH:mm:ss.sssZ, где:
//
// YYYY-MM-DD – это дата: год-месяц-день.
// Символ "T" используется в качестве разделителя.
// HH:mm:ss.sss – время: часы, минуты, секунды и миллисекунды.
// Необязательная часть 'Z' обозначает часовой пояс в формате +-hh:mm. Если указать просто букву Z, то получим UTC+0.
// Возможны и более короткие варианты, например, YYYY-MM-DD или YYYY-MM, или даже YYYY.
//
// Вызов Date.parse(str) обрабатывает строку в заданном формате и возвращает таймстамп (количество миллисекунд с
// 1 января 1970 года UTC+0). Если формат неправильный, возвращается NaN.

//

// метод performance.now(), возвращающий количество миллисекунд с начала загрузки страницы с точностью до микросекунд
// (3 цифры после точки):
// alert(`Загрузка началась ${performance.now()}мс назад`);

//----------------------------------------------------------------------------------------------------------------------

// Создайте объект Date для даты: 20 февраля 2012 года, 3 часа 12 минут. Временная зона – местная.

let date_1 = new Date(2012, 1, 20, 3, 12); // Month start with 0
// console.log(date_1); // 2012-02-19T23:12:00.000Z

//----------------------------------------------------------------------------------------------------------------------

// Напишите функцию getWeekDay(date), показывающую день недели в коротком формате:
// «ПН», «ВТ», «СР», «ЧТ», «ПТ», «СБ», «ВС».
let date_2 = new Date(2012, 0, 3);  // 3 января 2012 года
// console.log( getWeekDay(date_2) );        // нужно вывести "ВТ"

function getWeekDay(date) {
    return ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'].at(date.getDay())
}

//----------------------------------------------------------------------------------------------------------------------

// Напишите функцию getLocalDay(date), которая возвращает «европейский» день недели для даты date.
let date_3 = new Date(2012, 0, 2);  // 3 января 2012 года
// console.log( getLocalDay(date_3) );       // вторник, нужно показать 2

function getLocalDay(date) {
    return [7, 1, 2, 3, 4, 5, 6].at(date.getDay())
    // return (date.getDay() === 0) ? 7: date.getDay()
}

//----------------------------------------------------------------------------------------------------------------------

// Создайте функцию getDateAgo(date, days), возвращающую число, которое было days дней назад от даты date.
// К примеру, если сегодня двадцатое число, то getDateAgo(new Date(), 1) вернёт девятнадцатое и
// getDateAgo(new Date(), 2) – восемнадцатое.
// Функция должна надёжно работать при значении days=365 и больших значениях:

let date_4 = new Date(2015, 0, 2);
// console.log( getDateAgo(date_4, 1) ); // 1, (1 Jan 2015)
// console.log( getDateAgo(date_4, 2) ); // 31, (31 Dec 2014)
// console.log( getDateAgo(date_4, 365) ); // 2, (2 Jan 2014)


// v1.0
function getDateAgo(date, days) {
    let res_date = new Date(+date - days * 1000 * 3600 * 24);
    return res_date.getDate()
}

//v2.0
// function getDateAgo(date, days) {
//     let copy_date = new Date();
//     copy_date.setDate(date.getDate() - days);
//     return copy_date.getDate()
// }

//----------------------------------------------------------------------------------------------------------------------

// Напишите функцию getLastDayOfMonth(year, month), возвращающую последнее число месяца.
// Иногда это 30, 31 или даже февральские 28/29.
//
// year – год из четырёх цифр, например, 2012.
// month – месяц от 0 до 11.
// console.log(getLastDayOfMonth(2012, 1)) // = 29 (високосный год, февраль).
// console.log(getLastDayOfMonth(2012, 0)) // = 31 (високосный год, февраль).

//v1.0
// function getLastDayOfMonth(year, month) {
//     let date = new Date(year, month + 1);
//     date.setDate(date.getDate() - 1)
//     return date.getDate()
// }

//v2.0 если передать 0, то это значение будет соответствовать «один день перед первым числом месяца

function getLastDayOfMonth(year, month) {
    let date = new Date(year, month + 1, 0);
    return date.getDate()
}

//----------------------------------------------------------------------------------------------------------------------

// Напишите функцию getSecondsToday(), возвращающую количество секунд с начала сегодняшнего дня.
//
// Например, если сейчас 10:00, и не было перехода на зимнее/летнее время, то:
//
// Функция должна работать в любой день, т.е. в ней не должно быть конкретного значения сегодняшней даты.


//v1.0
function getSecondsToday() {
    let start_day = new Date().setHours(0, 0, 0, 0);
    let sec_day = Date.now() - start_day;
    return Math.floor(sec_day / 1000);
}

//v2.0
function getSecondsToday_2() {
    let now = new Date();
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let diff = now - today;
    return Math.round(diff / 1000);
}

//v3.0
function getSecondsToday_3() {
    let d = new Date();
    return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
}

// console.log(getSecondsToday());
// console.log(getSecondsToday_2());
// console.log(getSecondsToday_3());

//----------------------------------------------------------------------------------------------------------------------

// Создайте функцию getSecondsToTomorrow(), возвращающую количество секунд до завтрашней даты.
// getSecondsToTomorrow() == 3600
// P.S. Функция должна работать в любой день, т.е. в ней не должно быть конкретного значения сегодняшней даты.

function getSecondsToTomorrow() {
    let date = new Date();
    let sec_in_day = 24 * 3600;
    return sec_in_day - (date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds())
}

// console.log(getSecondsToTomorrow());

//----------------------------------------------------------------------------------------------------------------------

// Напишите функцию formatDate(date), форматирующую date по следующему принципу:
//
// Если спустя date прошло менее 1 секунды, вывести "прямо сейчас".
// В противном случае, если с date прошло меньше 1 минуты, вывести "n сек. назад".
// В противном случае, если меньше часа, вывести "m мин. назад".
// В противном случае, полная дата в формате "DD.MM.YY HH:mm". А именно: "день.месяц.год часы:минуты",
// всё в виде двух цифр, т.е. 31.12.16 10:00.

console.log(formatDate(new Date(new Date - 1))); // "прямо сейчас"
console.log(formatDate(new Date(new Date - 30 * 1000))); // "30 сек. назад"
console.log(formatDate(new Date(new Date - 5 * 60 * 1000))); // "5 мин. назад"
console.log(formatDate(new Date(new Date - 86400 * 1000)));


// v1.0 My version
function formatDate(date) {
    let diff_date = new Date() - date;

    if (diff_date < 1000) {
        return "прямо сейчас"

    } else if (diff_date < 60 * 1000) {
        return Math.floor(diff_date / 1000) + " sek ago"

    } else if (diff_date < (3600 * 1000)) {
        return Math.floor(diff_date / (1000 * 60)) + " мин. назад"
    }
    let fullDate = date.toLocaleDateString().slice(0, 6) + date.toLocaleDateString().slice(-2);
    return fullDate + ' ' + date.toLocaleTimeString().slice(0, 5)
}


// v0.5 from book_lesson
function formatDate_2(date) {
    let diff = new Date() - date;

    if (diff < 1000) {
        return 'прямо сейчас';
    }
    if (diff < 60 * 1000) {
        return Math.floor(diff / 1000) + ' сек. назад';
    }
    if (diff < 60 * 60 * 1000) {
        return Math.floor(diff / (60000)) + ' мин. назад';
    }

    let d = date;
    d = [
        '0' + d.getDate(),
        '0' + (d.getMonth() + 1),
        '' + d.getFullYear(),
        '0' + d.getHours(),
        '0' + d.getMinutes()
    ].map(component => component.slice(-2)); // взять последние 2 цифры из каждой компоненты

    // соединить компоненты в дату
    return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
}


// console.log( formatDate_2(new Date(new Date - 1)) ); // "прямо сейчас"
// console.log( formatDate_2(new Date(new Date - 30 * 1000)) ); // "30 сек. назад"
// console.log( formatDate_2(new Date(new Date - 5 * 60 * 1000)) ); // "5 мин. назад"
// console.log( formatDate_2(new Date(new Date - 86400 * 1000)) ); // вчера
