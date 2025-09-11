console.info("Function constructors");

function Person(name, age) {
  this.name = name;
  this.age = age;

  this.describe = function () {
    return `${this.name} is ${this.age} years old.`;
  };
}

let alice = new Person("Alice", 25);
let sarah = new Person("Sarah", 30);
console.log(alice.describe()); // Outputs: "Alice is 25 years old."
console.log(sarah.describe()); // Outputs: "Sarah is 30 years old."

console.info("Classes");
class Human {
  // Sorry, couldn't reuse Person :D
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  describe() {
    return `${this.name} is ${this.age} years old.`;
  }
}

const bob = new Human("Bob", 30);
console.log(bob.describe()); // Outputs: "Bob is 30 years old."

/* 
Both a class and a function constructor, are internally functions
Classes are just syntax sugar and brought JS closes to the way objects work in 
other languages
*/
console.info("Syntax sugar");
console.log(typeof Person);
console.log(typeof Human);

class Robot {
  constructor(name, kindaHuman = false) {
    this.name = name;
    this.kindaHuman = kindaHuman;
    /* get current date and time*/
    this.born = Date.now();
    /* refactor born to readable date */
    this.born = new Date(this.born).toLocaleDateString();
  }
  getInfo() {
    if (this.kindaHuman) {
      return `My name is ${this.name} and I was born ${this.born}`;
    } else {
      return `My name is ${this.name} and I am a robot`;
    }
  }
}

const myRobot = new Robot("R2D2");
console.log(myRobot.getInfo());

let yourRobot = new Robot("C-3PO", true);
console.log(yourRobot.getInfo());
// console.log(yourRobot.kindaHuman);
