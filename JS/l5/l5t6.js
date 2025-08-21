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
