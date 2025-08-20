let start = 0;

const someArray = [5, 10, 15, 20];
const mappedArray = someArray.map((item) => item * 2);
console.log(mappedArray);

someArray.shift();
console.log(someArray);
someArray.unshift(0);
console.log(someArray);

someArray.push(25);
console.log(someArray);

someArray.pop();
console.log(someArray);

const fruits = ["Apfel", "Banane", "Kirsche", "Dattel", "Feige"];
let a = 1;
let b = 3;
const favFruits = fruits.slice(a, b); // index > a: start, b: end
console.log(fruits);
console.log(favFruits);
