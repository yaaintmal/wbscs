// working with math
const arr = ["Pichau", "Bulbasaur", "Charmander", "Mew", "Glumanda", "Enton"];
const randomInd = Math.floor(Math.random() * arr.length);

console.log(arr[randomInd]);

console.log(Math.max(1, 2, 3, 4, 5));
console.log(Math.min(1, 2, 3, 4, 5));

// data constructor
const date = new Date();
console.log(date);

console.log(date.getFullYear());
console.log(date.getMonth());
console.log(date.getDate());
console.log(date.getDay());
console.log(date.getHours());
console.log(date.getMinutes());
console.log(date.getSeconds());
console.log(date.getMilliseconds());

console.log(date.toLocaleString());
console.log(date.toLocaleDateString());
console.log(date.toLocaleTimeString());

console.log(date.toISOString());
console.log(date.toUTCString());

console.log(date.toDateString());
console.log(date.toTimeString());

console.log(date.getTime());

console.log(date.valueOf());

console.log(date.getUTCFullYear());
console.log(date.getUTCMonth());
console.log(date.getUTCDate());
console.log(date.getUTCDay());
console.log(date.getUTCHours());
console.log(date.getUTCMinutes());
console.log(date.getUTCSeconds());
console.log(date.getUTCMilliseconds());

function adder(x) {
  return function (y) {
    return x + y;
  };
}

const addTwo = adder(2);
const addThree = adder(3);
const addFour = adder(4);
console.log(addTwo(3)); // Outputs: 5
console.log(addThree(3)); // Outputs: 6
console.log(addFour(3)); // Outputs: 7

// using map to transform an array
function arrayTransformer(arr, callback) {
  const out = [];
  for (const element of arr) {
    out.push(callback(element));
  }
  return out;
}

const oldArray = [1, 2, 3, 4, 5];
const transformedArray = arrayTransformer(oldArray, (x) => x * x);
console.log(transformedArray);

const stringNumbers = arrayTransformer(oldArray, (x) =>
  console.log(`-> ${x} <-`)
);

// refactoring transformedArray() so I can use zahlen.arrayTransformer(func) just as like a map function

// using filter to filter an array
const filteredArray = arrayTransformer(oldArray, (x) => x % 2 === 0);
console.log(filteredArray);

const filteredArray2 = arrayTransformer(oldArray, (x) => x % 2 !== 0);
console.log(filteredArray2);

// using forEach
const newArray = [1, 2, 3, 4, 5];
newArray.forEach((x) => console.log(x));

// using filter /returns a new array
const filteredArray3 = newArray.filter((x) => x % 2 === 0);
console.log(filteredArray3);

// using find /returns the first element
const foundElement = newArray.find((x) => x % 2 === 0);
console.log(foundElement);

//using some & every
const someArray = [1, 2, 3, 4, 5];
console.log(
  "Some: ",
  someArray.some((x) => x % 2 === 0)
);
console.log(
  "Every: ",
  someArray.every((x) => x % 2 === 0)
);

// using reduce /returns a single value
const reduceArray = [1, 2, 3, 4, 5];
const sum = reduceArray.reduce((acc, x) => acc + x, 0);
console.log("Reduce sum: ", sum);

const product = reduceArray.reduce((acc, x) => acc * x, 1);
console.log("Reduce product: ", product);

const max = reduceArray.reduce((acc, x) => (x > acc ? x : acc), 0);
console.log("Reduce max: ", max);

const min = reduceArray.reduce((acc, x) => (x < acc ? x : acc), reduceArray[0]);
console.log("Reduce min: ", min);

const average = reduceArray.reduce((acc, x) => acc + x, 0) / reduceArray.length;
console.log("Reduce average: ", average);

const count = reduceArray.reduce((acc, x) => acc + 1, 0);
console.log("Reduce count: ", count);

const sumOdd = reduceArray.reduce((acc, x) => (x % 2 === 0 ? acc + 1 : acc), 0);
console.log("Reduce count2: ", count);

// using group-by
const groupBy = reduceArray.reduce((acc, x) => {
  if (acc[x % 2] === undefined) {
    acc[x % 2] = [];
  }
  acc[x % 2].push(x);
  return acc;
}, {});
console.log("Reduce groupBy: ", groupBy);

const items = [
  { name: "Bike", price: 100 },
  { name: "TV", price: 200 },
  { name: "Album", price: 10 },
  { name: "Book", price: 5 },
  { name: "Phone", price: 500 },
  { name: "Computer", price: 1000 },
  { name: "Keyboard", price: 25 },
];
const filteredItems = items.filter((item) => {
  return item.price <= 100;
});
console.log("Filtered items: ", filteredItems);

const itemNames = items.map((item) => {
  return item.name;
});
console.log("Item names: ", itemNames);

const itemNamesTwo = items.find((item) => {
  return item.name === "Computer";
});
console.log("Item names: ", itemNamesTwo);

items.forEach((item) => {
  console.log(item.name);
});

const totalPrice = items.reduce((acc, item) => {
  return acc + item.price;
}, 0);
console.log("Total price: ", totalPrice);

const hasInexpensiveItems = items.some((item) => {
  return item.price <= 100;
});
console.log("Has inexpensive items: ", hasInexpensiveItems);

const hasExpensiveItems = items.every((item) => {
  return item.price > 100;
});
console.log("Has ONLY expensive items: ", hasExpensiveItems);

const includeComputer = items.some((item) => {
  return item.name === "Computer";
});

// using includes() on array to check whether a computer with any price is in array
const includeArray = ["Computer", "Laptop", "Tablet", "Smartphone", "Printer"];

const arrayIncludesComputer = includeArray.includes("Computer");
console.log("Includes computer: ", arrayIncludesComputer);
