// added readline for some functionality
// import the built-in readline module / require won't work with nodejs
import readline from "readline";

// creating a readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Array of objects representing people
const people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Carol", age: 35 },
];

// needed for readline, won't be defined otherwise
let searchName;

// prompt user on the cli for a name input
rl.question("What name do you want to find? ", (searchName) => {
  console.info("Find Entry with name", searchName);
  // Find a person named 'Bob'
  const bob = people.find((person) => person.name === searchName);

  console.log("Founded entries: ", bob);
  rl.close();
});

// console.info("Try to find Rumpelstilzchen");
// const rumpelstilzchen = people.find(
//   (person) => person.name === "Rumpelstilzchen"
// );
// console.log("Found Rumpelstilzchen: ", rumpelstilzchen);

// // Array of numbers
// const numbers = [10, 20, 30, 40, 50];

// console.info("Find first number larger than condition");
// // Find the first number greater than 25
// const firstLargeNumber = numbers.find((number) => number > 25);
// console.log("First number greater than 25: ", firstLargeNumber);
