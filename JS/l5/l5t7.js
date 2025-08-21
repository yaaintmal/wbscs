const myArray = [42, "Hello, world!", true, 3.14, "JavaScript"];
console.log(myArray);

for (let i = 0; i < myArray.length; i++) {
  console.log(myArray[i]);
}

for (let i = myArray.length - 1; i >= 0; i--) {
  console.log(myArray[i]);
}

myArray.slice(1, 3);
myArray.splice(1, 0, "Changed Value");
console.log(myArray);
