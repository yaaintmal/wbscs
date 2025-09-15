import { createInterface } from "node:readline";
import { stdin, stdout } from "node:process";

const playGame = () => {
  const rl = createInterface({
    input: stdin,
    output: stdout,
  });

  const choices = ["rock", "paper", "scissors"];
  const choiceComputer = choices[Math.floor(Math.random() * choices.length)];

  rl.question(
    "So... someone choose rock, paper or scissors. What's your choice? ",
    (choiceHuman) => {
      console.log(`You choose: ${choiceHuman}`);
      console.log(`CPU chooses: ${choiceComputer}`);

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
        if (answer.toLowerCase() === "y") {
          console.log("Restarting...");
          playGame();
        } else {
          console.log("Goodbye!");
          rl.close();
        }
      });
    }
  );
};

playGame();
