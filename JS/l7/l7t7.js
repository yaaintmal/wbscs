// 1
const numbers = [1, 2, 3, 4, 5];
console.log(numbers);

// 2
const doubledNumbers = numbers.map((number) => {
  return number * 2;
});

// 3
const stringNumbers = numbers.map((number) => {
  return number.toString();
});
console.log(stringNumbers);

// 4
const numberObjects = numbers.map((number) => {
  return { original: number, squared: number * number };
});
console.log(numberObjects);
