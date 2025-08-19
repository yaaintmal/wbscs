function greet() {
  console.log("Hello, world!");
}
greet();

function square(x) {
  return x * x;
}
square(5);
console.log(square(5));

function getDayName(i) {
  switch (i) {
    case 0:
      return "Monday";
    case 1:
      return "Tuesday";
    case 2:
      return "Wednesday";
    case 3:
      return "Thursday";
    case 4:
      return "Friday";
    case 5:
      return "Saturday";
    case 6:
      return "Sunday";
    default:
      return "Invalid day";
  }
}
console.log(getDayName(3));

const greetExpression = () => {
  console.log("Hello, world!");
};
greetExpression();

const squareExpression = (x) => {
  return x * x;
};
console.log(squareExpression(16));

const getDayNameExpression = (i) => {
  switch (i) {
    case 0:
      return "Monday";
    case 1:
      return "Tuesday";
    case 2:
      return "Wednesday";
    case 3:
      return "Thursday";
    case 4:
      return "Friday";
    case 5:
      return "Saturday";
    case 6:
      return "Sunday";
    default:
      return "Invalid day";
  }
};
console.log(getDayNameExpression(6));

// differences between function declaration (+) and expression (-):
// + function declaration are hoisted, therfor can be called before declaration
// + Pros: Hoisting
// + Cons: unexpected behavior due to hoisting
// - function expressions while be created while assigning
// - Pros: Control and Flexibility, often used for callback functions like setTimeout() or map()
// - Cons: No hoisting, will result in TypeError or ReferenceError if called before declaration
