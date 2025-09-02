// 1
const numbers = [10, 20, 30, 40, 50];

// 2
const firstGreaterThan25 = numbers.find((number) => number > 25);
console.log(firstGreaterThan25); // 30

// 3
const people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 },
  { name: "David", age: 40 },
];

// 4
const whereIsCharlie = people.find((item) => {
  return item.name === "Charlie";
});
console.log(whereIsCharlie); // { name: "Charlie", age: 35 }

// 5 / bonus
const oldestPerson = people.find(
  (person) => person.age === Math.max(...people.map((person) => person.age))
);
console.log(oldestPerson); // { name: "David", age: 40 }

const oldestReducedPerson = people.reduce((oldest, currentPerson) => {
  return currentPerson.age > oldest.age ? currentPerson : oldest;
}, people[0]); // `people[0]` is the initial value for the comparison
console.log(oldestReducedPerson); // { name: "David", age: 40 }
