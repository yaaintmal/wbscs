// 1
const numbers = [1, 2, 3, 4, 5];
// 2
numbers.forEach((number) => {
  console.log(number);
});
// 3
let sum = 0;
numbers.forEach((number) => {
  sum += number;
});
console.log(sum);

// 4
const squaredNumbers = [1, 4, 9, 16, 25];

squaredNumbers.forEach((number) => {
  console.log(number * number);
});

// 5 / optional alternative of 4
const sqNumbers = squaredNumbers.map((number) => {
  return number * number;
});
console.log(sqNumbers);
