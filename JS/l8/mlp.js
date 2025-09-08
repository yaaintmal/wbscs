import { createInterface } from "node:readline";
import { stdin as input, stdout as output } from "node:process";

// we are defining a static set of rules who wins over who
const winSituation = {
  Mario: ["Princess Daisy", "Omle T."], // would he ever beat Daisy?
  Luigi: ["Mario", "Omle T."], // should he even be better than Mario?
  "Princess Peach": ["Luigi", "Mario"],
  "Princess Daisy": ["Princess Peach", "Luigi"],
  "Omle T.": ["Princess Daisy", "Princess Peach"],
};

// setting a function to determine who wins according our rules(-array)
function whoWins(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "Draw!";
  }
  if (
    winSituation[playerChoice] &&
    winSituation[playerChoice].includes(computerChoice)
  ) {
    return "You win!";
  }
  return "The computer wins!";
}

// starting game, getting input, displaying options, asking questions, dislaying results
function playGame() {
  const rl = createInterface({ input, output });
  const choices = Object.keys(winSituation);
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];

  // display player choices
  console.log(">>> Character Select <<<");
  let start = 1;
  choices.forEach((choice) => console.log(`${start++}. ${choice}`));
  console.log("------------------------");

  rl.question("What's your choice? ", (playerChoice) => {
    switch (playerChoice) {
      case "1":
        playerChoice = "Mario";
        break;
      case "2":
        playerChoice = "Luigi";
        break;
      case "3":
        playerChoice = "Princess Peach";
        break;
      case "4":
        playerChoice = "Princess Daisy";
        break;
      case "5":
        playerChoice = "Omle T."; // getting hungry now somehow
        break;
    }
    console.log(`You chose: ${playerChoice}`);
    console.log(`The computer chose: ${computerChoice}`);

    const result = whoWins(playerChoice, computerChoice);
    console.log(result);

    rl.question("Play again? (y/n) ", (playAgain) => {
      if (playAgain.toLowerCase() === "y") {
        console.log("Restarting..."); // you can't see me!
        rl.close();
        playGame(); // calling the playGame function again
      } else {
        // no means no, close the interface!
        console.log("Thanks for playing - Goodbye!");
        rl.close();
      }
    });
  });
}

// lemme in!
playGame();
