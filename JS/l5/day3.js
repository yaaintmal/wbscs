let start = 0;

const numbers = [1, 2, "wizard", true, [2, 3, 4, 5]];

console.log(`length of the array: ${numbers.length}`);

console.log(numbers[0]); // 1
console.log(numbers[1]); // 2
console.log(numbers[2]); // wizard
console.log(numbers[3]); // true
console.log(numbers[4]); // [2, 3, 4, 5
console.log(numbers[4][2]); // 4

console.log(numbers.indexOf("wizard")); // 2
console.log(numbers.indexOf(1)); // 0

console.log(numbers.at(0)); // 1
console.log(numbers.at(1)); // 2
console.log(numbers.at(2)); // wizard

console.log(numbers.at(-1)); // [2, 3, 4, 5]
console.log(numbers.at(-2)); // true
console.log(numbers.at(-3)); // wizard

console.log(numbers[start++]); // 1
console.log(numbers[start++]); // 2
console.log(numbers[start++]); // wizard
console.log(numbers[start++]); // true
console.log(numbers[start++]); // [2, 3, 4, 5

console.log(numbers.at(start++)); // 1
console.log(numbers.at(start++)); // 2
console.log(numbers.at(start++)); // wizard
console.log(numbers.at(start++)); // true
console.log(numbers.at(start++)); // [2, 3, 4, 5

numbers[3] = false;
console.log(numbers);

numbers[3] = true;
console.log(numbers);

for (const element of numbers) {
  console.log("for .... of:", element);
}

console.log(numbers.slice(3, 5)); // start index, end index
