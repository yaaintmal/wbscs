let start = 0;

const animals = ["lion", "tiger", "bear", "giraffe", "zebra", "monkey"];

let totalanimals = 0;

// iterating over the array
for (animal in animals) {
  totalanimals++;
}
console.log(animal);

// reset counter
totalanimals = 0;

let i = 0;
while (i < animals.length) {
  if (animals[i].length >= 5) {
    totalanimals++;
  }
  i++;
}
console.log(totalanimals);

// reset again
totalanimals = 0;
i = 0;
do {
  totalanimals++;
  i++;
} while (animals[i].toLowerCase().startsWith("m"));

console.log("3\n2"); // just coz were pretty cool
console.log(totalanimals);
console.log("GO!");
