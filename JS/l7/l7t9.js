// 1 initialising
const numbers = [5, 10, 15, 20, 25, 30];

// 2 using filter
const numbersGreaterThan15 = numbers.filter((num) => num > 15);
console.log(numbersGreaterThan15);

// 3 initialing
const students = [
  { name: "Alice", grade: 85 },
  { name: "Bob", grade: 92 },
  { name: "Charlie", grade: 78 },
  { name: "David", grade: 87 },
  { name: "Eve", grade: 95 },
];

// 4 using filter
let gradeToPass = 80;
const passingStudents = students.filter(
  (student) => student.grade >= gradeToPass
);
console.log(passingStudents);
