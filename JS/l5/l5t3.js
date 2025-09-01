const numbers = [1, 2, 3, 4, 5];

numbers.push(6);
const newVal = numbers.push(6);
console.log("pushed 6");
console.log(numbers); // [1, 2, 3, 4, 5, 6]
console.log("newVal is ", newVal);

numbers.pop();
console.log("popped");
console.log(numbers); // [1, 2, 3, 4, 5]

numbers.shift();
console.log("shifted");
console.log(numbers); // [2, 3, 4, 5]

numbers.unshift(0);
console.log("unshifted");
console.log(numbers); // [0, 2, 3, 4, 5]

console.log("original array: ", numbers);
const numbersReversed = numbers.reverse();
console.log(numbersReversed); // [5, 4, 3, 2, 1]

const numbersSorted = numbers.sort();
console.log(numbersSorted); // [1, 2, 3, 4, 5]

const numbersSortedDesc = numbers.sort((a, b) => b - a);
console.log(numbersSortedDesc); // [5, 4, 3, 2, 1]

const numbersSortedAsc = numbers.sort((a, b) => a - b);
console.log(numbersSortedAsc); // [1, 2, 3, 4, 5]

const numbersToReverse = numbers.toReversed();
console.log(numbersToReverse); // [5, 4, 3, 2, 1]
