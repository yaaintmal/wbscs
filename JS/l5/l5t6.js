let start = 0;
const ourGreatArray = ["Borussia", "Dortmund", "1909"];

// not need though but there we go being descruct--- ehh: descriptive!
let helpArray;

// starting iterating
console.log("iterating right here:\n");
for (let joiner = 0; joiner < ourGreatArray.length; joiner++) {
  helpArray = ourGreatArray.join(" ");
}
console.log(helpArray);

const arrayMe = [10, 20, 30];
for (let i = 0; i < arrayMe.length; i++) {
  console.log(arrayMe[i]);
}

for (const number of arrayMe) {
  console.log(number);
}
