// Declare two variables, one with const and one with let
const someConst = "3.1415926";
let someFlexVar = "someLet";
// Give each one any value you'd like (string, number, array, object, boolean)
// 👍🏾

// Log the values of each one of them to the console
console.log(someConst);
console.log(someFlexVar);

// Create an ES5 function (function keyword) with no parameters that prints a string to the console. Then call it.
function ES5Function() {
  console.log("a string");
}
ES5Function();

// Create an ES5 function that takes 2 parameters and **RETURNS** a string that includes those 2 parameters using template literal. Then log the value of that function to the console.

function anotherFunc(a, b) {
  return `a: ${a}, b: ${b}`;
}
console.log(anotherFunc("a", "b"));

// Transform the 2 ES5 functions from the previous exercises into ES6 arrow functions.

const ES6Func = () => console.log("a string");
ES6Func();

// Create an array containing 5 elements.
const someArray = [1, 2, 3, 4, 5];

// Log the first 2 values to the console
console.log(someArray.slice(0, 2));
console.log(someArray[0], someArray[1]);

// Log the last element in the array to the console
console.log(someArray[someArray.length - 1]);

// Log elements 3 and 4 in the array to the console
const anotherArray = [10, 20, 30, 40, 50];
console.log(anotherArray.slice(2, 4));

// Create an object with the keys "name", "age", "occupation" and "hobbies" (hobbies should be an array)
const personObj = {
  name: "Mal",
  age: 25,
  occupation: "fullstack dev",
  hobbies: ["Coding", "Reading", "Gaming"],
};

// Log the name to the console
console.log(personObj.name);

// Log the occupation and age to the console
console.log(`Occupation: ${personObj.occupation} # Age: ${personObj.age}`);

// Log all the hobbies to the console
console.log(personObj.hobbies);
// Log only the first hobby to the console
console.log(personObj.hobbies[0]);

// Create an array containing 3 objects. The objects should have the same keys as the one in the previous exercise
const arrayOfObjects = [
  {
    name: "John",
    age: 27,
    occupation: "designer",
    hobbies: ["fotography", "cooking", "gaming"],
  },
  {
    name: "Hanibal",
    age: 33,
    occupation: "lector",
    hobbies: ["eating", "Reading", "cooking"],
  },
  {
    name: "Smith",
    age: 42,
    occupation: "fullstack dev",
    hobbies: ["Coding", "Reading", "Gaming"],
  },
];

// Loop through the array of objects and log all the names to the console
for (const obj in arrayOfObjects) {
  console.log(arrayOfObjects[obj].name);
}
