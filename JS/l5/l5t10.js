// You can work here or download the template!
// Array 1: Use splice() method
const array1 = [10, 20, 30, 40, 50];
// Modify array1 in place by removing and adding elements, then print the result
// syntax: array.splice(start, deleteCount, item1, item2, ...)
array1.splice(2, 1, 35, 36);
console.log(array1);
// Array 2: Use toSpliced() method
const array2 = ["x", "y", "z"];
// Create a modified copy of array2 and print both arrays
const array2Mod = array2.toSpliced(1, 1, "a", "b");
console.log(array2Mod);
