// 1
const numbers = [1, 2, 3, 4, 5];
console.log(numbers);

// 2
const doubledNumbers = numbers.map((number) => number * 2);
console.log(doubledNumbers);

// 3
const stringNumbers = numbers.map((number) => {
  return number.toString();
});
console.log(stringNumbers);

// doing the same but with the prefix "Number: " + its index
const stringNumbers2 = numbers.map((number, index) => {
  return "Number " + index + ": " + number.toString();
});
console.log(stringNumbers2);

// 4
const numberObjects = numbers.map((number) => {
  return { original: number, squared: number * number };
});
console.log(numberObjects);
