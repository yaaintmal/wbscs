// importing questions
import { questions } from "./mal-questions.js";
import { wizQuestion, wizHappy, wizSad, wizInfo } from "./mal-wizard.js";

// declaring DOM elements
const startButton = document.getElementById("start-button");
const questionContainer = document.getElementById("question-container");
const questionTextElement = document.getElementById("question-text");
const answerButtonsElement = document.getElementById("answer-buttons");
const feedbackMessageElement = document.getElementById("feedback-message");
const scoreDisplay = document.getElementById("score-display");
const highScoreDisplay = document.getElementById("high-score-display");
const wizardPrompt = document.getElementById("wizard-prompt");
const healthBarContainer = document.getElementById("health-bar-container");
const categoryTitleContainer = document.getElementById("categorie-title");
const lvlTitleContainer = document.getElementById("level-title");

//* not used at the moment
// const wizardAvatar = document.getElementById("wizard-avatar");
// const healthBarFill = document.getElementById("health-bar-fill");
// const wpContainer = document.getElementById("game-container");

// * Further Implementations:
//* RND BG SWITCHER (yeah, really for both classes!) /*edited: those damn pseudo-classes- not working as intended... YET!*/

// document.addEventListener("DOMContentLoaded", function () {
//   // Check if the container element exists
//   if (!wpContainer) {
//     console.error(
//       "Error: Container element not found. Please check your HTML selector."
//     );
//     return; // Exit the function if the element is not found
//   }

//   const loadWP = () => {
//     const wpArray = [
//       "/static/img/worlds/world-1.png",
//       "/static/img/worlds/world-2.png",
//       "/static/img/worlds/world-3.png",
//       "/static/img/worlds/world-4.png",
//     ];

//     const selectedWP = wpArray[Math.floor(Math.random() * wpArray.length)];
//     const img = new Image();
//     img.src = selectedWP;

//     img.onerror = () => {
//       console.error(`Error loading image: ${selectedWP}`);
//     };

//     img.onload = () => {
//       wpContainer.style.setProperty("background-image", `url('${selectedWP}')`);
//       console.log(`Background image set to: ${selectedWP}`);
//     };
//   };
//   // loadWP(); // Call the function to set the background
// });

// Initialising variables
const pointsPerQuestion = 10; // user defined point system right here!!
let currentQuestionIndex = 0;
let score = 0;
let isGameActive = false;
let highScore = localStorage.getItem("highScore") || 0; // Load high score from local storage
highScoreDisplay.textContent = highScore;
let health = 100;
let actualLvl = 1; // setting the starting level, we'll add +1 for each level later

// Function to update the health bar
function updateHealthBar(penaltyPoints) {
  health -= penaltyPoints;
  if (health <= 0) {
    health = 0;
    healthBarContainer.innerHTML = "";
    healthBarContainer.innerHTML = `<div class="health-bar-fill" id="health-bar-fill" style="width: ${health}%"></div>`;
    // setting currentQuestionIndex to 999 to end the game
    // as endgame() with currentQuestionIndex < questions.length will trigger a new question
    currentQuestionIndex = 999;
    // second thought: probably better to set currentQuestionIndex to questions.length, in case we got over 1000 questions :)))
  } else {
    healthBarContainer.innerHTML = "";
    healthBarContainer.innerHTML = `<div class="health-bar-fill" id="health-bar-fill" style="width: ${health}%"></div>`;
  }
}

// function to update the level title container > actual level to display
//* FURTHER IMPLMENTATION IDEA : adding some cool effects in case we level up!
function lvlUpdater() {
  if (score <= 0) {
    lvlTitleContainer.textContent = `Novice (${actualLvl})`;
  }
  if (score > 30) {
    lvlTitleContainer.textContent = `Apprentice (${actualLvl + 1})`;
  }
  if (score > 55) {
    lvlTitleContainer.textContent = `Young Gun Wiz (${actualLvl + 2})`;
  }
  if (score > 85) {
    lvlTitleContainer.textContent = `Ninja (${actualLvl + 3})`;
  }
}

// ** Further logic for mana bar
// * will be implemented later
// Function to update the mana bar
let castCost = 10; // will get its value from an extra function
// function updateManaBar(castCost) {
//   health -= penaltyPoints;
//   if (health <= 0) {
//     health = 0;
//     healthBarContainer.innerHTML = "";
//     healthBarContainer.innerHTML = `<div class="health-bar-fill" id="health-bar-fill" style="width: ${health}%"></div>`;
//     // setting currentQuestionIndex to 999 to end the game
//     // as endgame() with currentQuestionIndex < questions.length will trigger a new question
//     currentQuestionIndex = 999;
//     // second thought: probably better to set currentQuestionIndex to questions.length, in case we got over 1000 questions :)))
//   } else {
//     healthBarContainer.innerHTML = "";
//     healthBarContainer.innerHTML = `<div class="health-bar-fill" id="health-bar-fill" style="width: ${health}%"></div>`;
//   }
// }

// Where the fun begins...

//* GAME LOGIC

function startGame() {
  isGameActive = true;
  startButton.style.display = "none"; // Hide start button
  currentQuestionIndex = 0;
  score = 0;
  scoreDisplay.textContent = score;
  feedbackMessageElement.textContent = "";
  questionContainer.style.display = "block"; // Ensure question container is visible
  wizardPrompt.textContent = "Let's test your knowledge, adventurer!";
  showQuestion();
  healthBarContainer.innerHTML = `<div class="health-bar-fill" id="health-bar-fill" style="width: ${health}%"></div>`;
  healthBarContainer.style.display = "block";
}

function showQuestion() {
  // Reset state
  answerButtonsElement.innerHTML = "";
  feedbackMessageElement.textContent = "";
  wizQuestion();
  wizardPrompt.textContent = `Question ${currentQuestionIndex + 1}:`;

  if (currentQuestionIndex < questions.length) {
    let currentQuestion = questions[currentQuestionIndex];

    //* at this point we should set all question related stuff, variables n ish
    //* check >> console.log(currentQuestion); / we got errthing we need right here,
    //* console to see all content of currentQuestion
    //
    // console.log(currentQuestionIndex);
    // console.log(currentQuestion);

    // setting category title
    categoryTitleContainer.textContent = `Kategorie: ${currentQuestion.category}`;
    lvlUpdater();

    // setting questions
    questionTextElement.textContent = currentQuestion.question;
    // looping through answers
    currentQuestion.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.textContent = answer.text;
      button.classList.add("answer-btn");
      if (answer.correct) {
        button.dataset.correct = answer.correct;
        button.dataset.penaltyPoints = questions.penalty;
      }
      button.addEventListener("click", selectAnswer);
      answerButtonsElement.appendChild(button);
    });
  } else {
    // if currentQuestionIndex >= questions.length / we reached the end of the questions-array
    endGame();
  }
}

function selectAnswer(e) {
  // Check if the selected answer is correct
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === "true";
  let penaltyPoints = questions[currentQuestionIndex].penalty || 0;

  if (penaltyPoints > 0) {
    penaltyPoints = parseInt(penaltyPoints);
  }
  // console.log(penaltyPoints);

  if (isCorrect) {
    score += pointsPerQuestion;
    feedbackMessageElement.textContent =
      "Correct! ✨ You won " + pointsPerQuestion + " points.";
    selectedButton.classList.add("correct");
    wizHappy();
  } else {
    feedbackMessageElement.textContent =
      "Incorrect. ❌\nYou lost " + penaltyPoints + " points.";
    selectedButton.classList.add("incorrect");
    score -= penaltyPoints;
    updateHealthBar(penaltyPoints * 10);
    wizSad();
  }
  scoreDisplay.textContent = score;

  // Disable all buttons after an answer is selected
  Array.from(answerButtonsElement.children).forEach((button) => {
    button.disabled = true;
  });

  // Automatically move to the next question after a short delay
  setTimeout(() => {
    currentQuestionIndex++;
    showQuestion();
    pointsPerQuestion;
  }, 2500); // 1.5 second delay /* using 2.5 for testing purposes */
}

function endGame() {
  wizInfo();
  isGameActive = false;
  feedbackMessageElement.textContent = "";
  questionTextElement.textContent = "Quiz complete!";
  answerButtonsElement.innerHTML = "";
  feedbackMessageElement.textContent = `You scored ${score} out of ${questions.length} questions!`;
  startButton.textContent = "Play Again";
  startButton.style.display = "block";
  wizardPrompt.textContent = "Thanks for playing!";

  // Reset health bar
  healthBarContainer.style.display = "none";
  health = 100;
  healthBarContainer.innerHTML = `<div class="health-bar-fill" id="health-bar-fill" style="width: ${health}%"></div>`;

  // block automatically starting of new game
  // edited: realisied via updateHealthBar() function

  // should we save the high score? / not sure yet, it's late!
  // prob not as it's already using local storage
  // let highScore = localStorage.getItem("highScore");
  // if (highScore === null) {
  //   highScore = 0;
  // }

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
    highScoreDisplay.textContent = highScore;
    feedbackMessageElement.textContent += " New high score! 🎉";
  }
}

// THE button Event Listeners ---
startButton.addEventListener("click", () => {
  startGame();
});

//* Further TODO list:
//* RND BG SWITCHER (yeah, really for both classes!)
//* RND AVATAR SWITCHER
//* Mana bar logic & Styling
//* replacing bg-images
// * (need more high for responsive design > comment out in css width&height values actually set to fixed px")
//* Joker logic
// Further further TODO list:
// refactoring to a wiz class > initiating different wizards classes << MP? POOOOAHHHH
// different avatars for different wizards
// different jokers for different wizards
/// FURTHER FURTHER - collab
/// level design, switching to different stages at different levels
///
