let start = 0;

const choices = ["rock", "paper", "scissors"];
const choiceHuman = process.argv[2];
const choiceComputer = choices.at(Math.floor(Math.random() * choices.length)); // Math.floor(Math.random() * choices.length + 1) but we're using index;

console.log("CPU chooses " + choiceComputer);
console.log("Human chooses " + choiceHuman);

if (choiceHuman === choiceComputer) {
  console.log("Draw");
} else if (
  (choiceHuman === "rock" && choiceComputer === "scissors") ||
  (choiceHuman === "paper" && choiceComputer === "rock") ||
  (choiceHuman === "scissors" && choiceComputer === "paper")
) {
  console.log("Human wins");
} else {
  console.log("Computer wins");
}
