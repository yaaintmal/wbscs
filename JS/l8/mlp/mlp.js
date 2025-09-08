import { createInterface } from "node:readline";
import { stdin as input, stdout as output } from "node:process";
import path from "path";
import { fileURLToPath } from "url";
import player from "play-sound";

// we are defining a static set of rules who wins over who
const winSituation = {
  Mario: ["Princess Daisy", "Omle T."],
  Luigi: ["Mario", "Omle T."],
  "Princess Peach": ["Luigi", "Mario"],
  "Princess Daisy": ["Princess Peach", "Luigi"],
  "Omle T.": ["Princess Daisy", "Princess Peach"],
};

// ANSI escape codes for styling
const green = "\x1b[32m";
const red = "\x1b[31m";
const yellow = "\x1b[33m";
const cyan = "\x1b[36m";
const bold = "\x1b[1m";
const underline = "\x1b[4m";
const reset = "\x1b[0m";
const bgBlue = "\x1b[44m";

// setting a function to determine who wins according our rules(-array)
function whoWins(playerChoice, computerChoice) {
  // Use import.meta.url to get the current file's directory
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Define the paths to the sound files
  const winSoundPath = path.join(__dirname, "mario-win.mp3");
  const loseSoundPath = path.join(__dirname, "mario-lose.mp3");
  const drawSoundPath = path.join(__dirname, "mario-draw.mp3");

  if (playerChoice === computerChoice) {
    player().play(drawSoundPath, (err) => {
      if (err) console.error(`Could not play win sound: ${err}`);
    });
    return `${bold}${yellow}Draw!${reset}`;
  }
  if (
    winSituation[playerChoice] &&
    winSituation[playerChoice].includes(computerChoice)
  ) {
    // Play the win sound asynchronously
    player().play(winSoundPath, (err) => {
      if (err) console.error(`Could not play win sound: ${err}`);
    });
    return `${bold}${green}You win!${reset}`;
  }
  // Play the lose sound asynchronously
  player().play(loseSoundPath, (err) => {
    if (err) console.error(`Could not play lose sound: ${err}`);
  });
  return `${bold}${red}The computer wins!${reset}`;
}

// starting game, getting input, displaying options, asking questions, dislaying results
function playGame() {
  const rl = createInterface({ input, output });
  const choices = Object.keys(winSituation);
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];

  // Display choices with improved styling
  console.log(`\n${bgBlue}${bold}>>> Character Select <<<${reset}`);
  let start = 1;
  choices.forEach((choice) =>
    console.log(`${underline}${cyan}${start++}.${reset} ${choice}`)
  );
  console.log("------------------------");

  rl.question(`${bold}What's your choice?${reset} `, (playerChoice) => {
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
        playerChoice = "Omle T.";
        break;
      default:
        console.log("Invalid choice, please select a number from 1 to 5.");
        rl.close();
        playGame();
        return;
    }

    // Using colors and bolding for the result messages
    console.log(`\n${underline}You chose:${reset} ${playerChoice}`);
    console.log(`${underline}The computer chose:${reset} ${computerChoice}\n`);

    const result = whoWins(playerChoice, computerChoice);
    console.log(result);

    setTimeout(() => {
      rl.question(`\n${bold}Play again? (y/n)${reset} `, (playAgain) => {
        if (playAgain.toLowerCase() === "y") {
          console.log("Restarting...");
          rl.close();
          playGame();
        } else {
          console.log("Thanks for playing - Goodbye!");
          rl.close();
        }
      });
    }, 4500); // 4.5 seconds timeout due to music
  });
}

playGame();
