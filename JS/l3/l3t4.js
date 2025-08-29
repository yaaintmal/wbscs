let start = 0;

let age = 25;
const birthYear = 1999;
let name = "John Doe";

const isStudent = true;
console.log(isStudent);

age = 26;
name = "Jane Doe";

console.log(`Your Name is ${name} & your ${age} yrs old `);
console.log(`You were born in ${birthYear}`);
if (isStudent) {
  console.log("You are a student");
} else {
  console.log("You are not a student");
}

let favoriteColor = "blue";
console.log(`Your favorite color is ${favoriteColor}`);
favoriteColor = "green";
if (favoriteColor === "blue") {
  console.log(`Your favorite color is still ${favoriteColor}`);
} else {
  console.log(`Your favorite color is now ${favoriteColor}`);
}
