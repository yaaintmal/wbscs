// JavaScript:

//     Listen for a click on the play button.
// declaring all necessary elements

const playButton = document.getElementById("play-button");
const btnPaper = document.getElementById("paper");
const btnRock = document.getElementById("rock");
const btnScissors = document.getElementById("scissors");
const resultDiv = document.getElementById("result");

let playerChoice = "";
let computerChoice = "";
let playerScore = 0;
let computerScore = 0;
let selectionElement = document.getElementById("selection");

// effects for btn-selection
// adding an outline to the selected button to get a visual feedback
// paper
function paperSelect() {
  btnPaper.classList.add("outline");
  btnPaper.style.outlineOffset = "2px";
  btnPaper.style.boxShadow = "0 0 10px 5px rgba(255, 165, 0, 0.5)";
  btnRock.style.outlineOffset = "0px";
  btnRock.style.boxShadow = "";
  btnScissors.style.outlineOffset = "0px";
  btnScissors.style.boxShadow = "";
  playerChoice = "paper";
}
// rock
function rockSelect() {
  btnRock.classList.add("outline");
  btnRock.style.outlineOffset = "2px";
  btnRock.style.boxShadow = "0 0 10px 5px rgba(255, 165, 0, 0.5)";
  btnPaper.style.outlineOffset = "0px";
  btnPaper.style.boxShadow = "";
  btnScissors.style.outlineOffset = "0px";
  btnScissors.style.boxShadow = "";
  playerChoice = "rock";
}
// scissors
function scissorsSelect() {
  btnScissors.classList.add("outline");
  btnScissors.style.outlineOffset = "2px";
  btnScissors.style.boxShadow = "0 0 10px 5px rgba(255, 165, 0, 0.5)";
  btnRock.style.outlineOffset = "0px";
  btnRock.style.boxShadow = "";
  btnPaper.style.outlineOffset = "0px";
  btnPaper.style.boxShadow = "";
  playerChoice = "scissors";
}

// adding eventlistern to the paper, rock and stone buttons
btnPaper.addEventListener("click", () => {
  paperSelect();
  console.log("You selected: " + playerChoice);
});
btnRock.addEventListener("click", () => {
  rockSelect();
  console.log("You selected: " + playerChoice);
});
btnScissors.addEventListener("click", () => {
  scissorsSelect();
  console.log("You selected: " + playerChoice);
});

// let computer take a random choice
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  console.log("Computer choice: " + choices[randomIndex]);
  return choices[randomIndex];
}

// function playRound for the logic to choose the winner
function playRound(playerSelection, computerSelection) {
  let resultMsg = "";
  if (playerSelection === computerSelection) {
    resultMsg = `You and the computer selected ${playerSelection}. It's a tie!`;
    playerScore++;
    computerScore++;
    return resultMsg;
  } else if (
    (playerSelection === "rock" && computerSelection === "scissors") ||
    (playerSelection === "paper" && computerSelection === "rock") ||
    (playerSelection === "scissors" && computerSelection === "paper")
  ) {
    resultMsg = `You selected ${playerSelection}, computer selected ${computerSelection}. You win!`;
    playerScore++;
    return resultMsg;
  } else {
    resultMsg = `You selected ${playerSelection}, computer selected ${computerSelection}. You lose!`;
    computerScore++;
    return resultMsg;
  }
  // adding result to result div
}

// function to update the score / obsolete in refactoring, maybe for the future with some animations and stuff
// function updateScore(result) {
//   if (result === "You win!") {
//     playerScore++;
//   } else if (result === "You lose!") {
//     computerScore++;
//   }
//   document.getElementById("user-score").textContent = playerScore;
//   document.getElementById("computer-score").textContent = computerScore;
// }

// function to reset the selection
function resetSelection() {
  btnPaper.classList.remove("outline");
  btnRock.classList.remove("outline");
  btnScissors.classList.remove("outline");
}

// function update score and dom
function updateScore() {
  document.getElementById("user-score").textContent = playerScore;
  document.getElementById("computer-score").textContent = computerScore;
}

// adding eventlistener on the click button and checking if the user selected something
playButton.addEventListener("click", () => {
  const userSelection = playerChoice;
  const computerSelection = getComputerChoice();

  if (userSelection === "") {
    alert("Please select a choice.");
    return;
  }
  const result = playRound(userSelection, computerSelection);
  resultDiv.textContent = result;
  //   updateScore(result); / see refactored msg
  // updating score and dom
  updateScore();
  resetSelection(); // reset the selection after each round // tbc: not working as expected
});

// checking if the user selected something; if not, alert the user.

//     Mark the user selected button in some way.
//     Randomly select Rock, Paper, or Scissors for the computer.
//     Compare the user’s selection with the computer’s selection.
//     Display the result in the output area.

//     Update the score and the DOM accordingly.
