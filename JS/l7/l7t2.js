// Array of numbers
const numbers = [1, 2, 3, 4, 5];

// Log each number multiplied by 2
console.info("Logging each number multiplied by 2:");
numbers.forEach((number, index) => {
  console.log(`Index ${index}: ${number * 2}`);
});

// Update array elements
// Mutating the array is technically possible but discouraged!
console.info("Updating array elements to be squared:");
const whateverItReturns = numbers.forEach((number, index, arr) => {
  arr[index] = number * number;
});
console.log("Squared Numbers: ", numbers);
console.log("forEach does not return anything: ", whateverItReturns);

// Create a new array of squares of the original numbers
console.info("New array with squared numbers");
const squares = numbers.map((number) => number * number);
console.log("Squares:", squares);

// Array of objects
const people = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 30 },
  { name: "Carol", age: 35 },
];

// Increase age by 1 and add a new field 'canVote'
console.info("New array with additional properties");
const updatedPeople = people.map((person) => ({
  ...person,
  age: person.age + 1,
  canVote: person.age >= 18,
}));
console.log("The original people array remains the same:", people);
console.log("Updated People:", updatedPeople);

// Convert objects to array of names
const names = people.map((person) => person.name);
console.log("Names:", names);
