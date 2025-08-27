// You can work here or download the template!
// Initial array
const fruits = ["apple", "banana", "cherry", "date"];

// declaring first and second element of fruit-array
let fruit1 = fruits[0];
let fruit2 = fruits[1];
console.log(fruit1, "and", fruit2);

// extracting first and third element of fruit-array
const firstAndThird = [fruits[0], fruits[2]];
console.log(firstAndThird);

// Initial object
const person = {
  name: "John Doe",
  age: 30,
  address: {
    city: "New York",
    zip: "10001",
  },
};

// extracting name and age of person
const { name, age } = person;
console.log(name, "is", age, "years old.");

// extracting name and city of person
const {
  name: personName,
  address: { city: personCity },
} = person;
console.log(personName, "lives in", personCity);

// Initial function
function displayPerson(person) {
  console.log(`Name: ${person.name}, Age: ${person.age}`);
}

//adding function call
displayPerson(person);

// adding modified function
function displayPersonDestructured({ name, age }) {
  console.log(`Name: ${name}, Age: ${age}`);
}
displayPersonDestructured(person);

// adding modified function 2
function displayPersonDestructured2(person) {
  const { name, age } = person;
  console.log(`Name: ${name}, Age: ${age}`);
}
displayPersonDestructured2(person);
