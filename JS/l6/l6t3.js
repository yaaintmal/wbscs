// Basics
const fruits = ["apple", "banana", "cherry"];
const [first, second, third] = fruits;

console.log(first); // 'apple'
console.log(second); // 'banana'
console.log(third); // 'cherry'

// Skipping
const colors = ["red", "green", "blue", "yellow"];
const [, , thirdColor] = colors;

console.log(thirdColor); // 'blue'

// Rest Pattern
const numbers = [1, 2, 3, 4, 5];
const [firstfirst, secondsecond, ...rest] = numbers;

console.log(firstfirst); // 1
console.log(secondsecond); // 2
console.log(rest); // [3, 4, 5]

// setting defaults
const guests = ["Mal"];
const [guest1, guest2 = "Nina"] = guests;

console.log(guest1); // 'Mal'
console.log(guest2); // 'Nina'
