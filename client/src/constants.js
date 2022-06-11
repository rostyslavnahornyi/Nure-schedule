export const PAIR_TIMES = [
    ["07:45", "09:20"],
    ["09:30", "11:05"],
    ["11:15", "12:50"],
    ["13:10", "14:45"],
    ["14:55", "16:30"],
    ["16:40", "18:15"],
    ["18:25", "20:00"],
    ["20:10", "21:45"],
];

export const isToday = (date) => {
    const today = new Date();
    date = new Date(date);

    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
};

export const pairNames = [
    { value: 0, name: "Лекция" },
    { value: 1, name: "Практическое занятие" },
    { value: 2, name: "Лабораторная работа" },
    { value: 3, name: "Консультация" },
    { value: 4, name: "Зачет" },
    { value: 5, name: "Экзамен" },
    { value: 6, name: "Курсовая работа" },
];

export const defaultPairColors = [
    "255, 123, 0", // value pair
    "21, 255, 0",
    "212, 0, 255",
    "70, 70, 70",
    "0, 30, 255",
    "255, 41, 41",
    "255, 0, 225",
];
