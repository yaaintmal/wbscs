function playGame() {
  const readline = require("node:readline");
  const { stdin: input, stdout: output } = require("node:process");
  const rl = readline.createInterface({ input, output });
  const choices = ["rock", "paper", "scissors"];
  const choiceComputer = choices.at(Math.floor(Math.random() * choices.length));

  rl.question("What's your choice? ", (choiceHuman) => {
    console.log(`You choose: ${choiceHuman}`);
    console.log("CPU chooses " + choiceComputer);
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

    rl.question("Play again? (y/n) ", (answer) => {
      if (answer === "y") {
        console.log("Restarting...");
        playGame(); // Call the playGame function recursively
      } else {
        console.log("Goodbye!");
        rl.close();
      }
    });
  });
}

playGame(); // Start the game
