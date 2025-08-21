// You can work here or download the template!
const array = ["apple", "banana", "cherry", "date"];

// Create different strings by joining the array elements with various delimiters
// Default delimiter (comma)

// Using dash as delimiter
const dashDelimiter = array.join("-");
// Using space as delimiter;
const spaceDelimiter = array.join(" ");
// Using ' and ' as delimiter
const andDelimiter = array.join(" and ");
// Without any delimiter
const woDelimiter = array.join("");

console.log(dashDelimiter); // Output: 'apple-banana-cherry-date'
console.log(spaceDelimiter); // Output: 'apple banana cherry date'
console.log(andDelimiter); // Output: 'apple and banana and cherry and date'
console.log(woDelimiter); // Output: 'applebananacherrydate'
