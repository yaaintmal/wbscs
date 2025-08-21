// You can work here or download the template!
const array = [2, 4, 6, 8, 10, 12, 14, 16];
const startArray = array;
// Extract different portions of the array and print the results
const portion1 = array.slice(0, 3);
const portion2 = array.slice(3, 6);
const portion3 = array.slice(6, 9);
const portion4 = array.slice(7, 8);
console.log(portion1);
console.log(portion2);
console.log(portion3);
console.log(portion4);
console.log(`Original array: ${array}`);

if (startArray === array) {
  console.log("The original array has not been modified.");
} else {
  console.log("The original array has been modified.");
}
