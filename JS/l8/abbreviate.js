function abbrevName(name) {
  const myArray = name.split(" ");
  return `${myArray[0].charAt(0).toUpperCase()}\.${myArray[1]
    .charAt(0)
    .toUpperCase()}`;
}

console.log(abbrevName("Sam Harris"));
console.log(abbrevName("Patrick Feeney"));
console.log(abbrevName("Evan Cole"));
console.log(abbrevName("paul Favuzzi"));
