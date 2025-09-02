// 1 - initialize array
const numbers = [4, 8, 15, 16, 23, 42];

// 2 - using some
const resultSome = numbers.some((number) => number > 20);
console.log(resultSome);

// 3 - using every
const resultEvery = numbers.every((number) => number < 50);
console.log(resultEvery);

// 4 - initialz object
const students = [
  { name: "Alice", age: 25, passed: true },
  { name: "Bob", age: 22, passed: false },
  { name: "Carol", age: 27, passed: true },
  { name: "David", age: 20, passed: true },
];

// 5 - using some
const failCheck = students.some((student) => !student.passed);
console.log(failCheck);

// 6 - using every
const ageCheck = students.every((student) => student.age > 18);
console.log(ageCheck);
