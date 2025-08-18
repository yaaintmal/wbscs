// Constants
const BOARD_SIZE = 8;
const CANDY_TYPES = ["❤️", "😊", "⭐", "🌈", "🍭"]; // Heart, Blushed Smiley, Star, Rainbow, Lollipop
const EMPTY_CELL = null; // Represents an empty spot on the board

const gameBoardElement = document.getElementById("game-board");
const scoreDisplayElement = document.getElementById("score-display");

let board = [];
let selectedCandy = null; // Stores { row, col, element } of the currently selected candy
let score = 0;
let isProcessing = false; // To prevent multiple clicks during animations/processing

// --- Game Initialization ---
function initGame() {
  score = 0;
  updateScoreDisplay();
  generateBoard();
  renderBoard();
}

// Generates the initial board with random candies
function generateBoard() {
  board = Array(BOARD_SIZE)
    .fill(0)
    .map(() => Array(BOARD_SIZE).fill(0));
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      board[r][c] = getRandomCandy();
    }
  }
}
// Get a random candy emoji
function getRandomCandy() {
  const randomIndex = Math.floor(Math.random() * CANDY_TYPES.length);
  return CANDY_TYPES[randomIndex];
}

// --- Rendering ---
function renderBoard() {
  gameBoardElement.innerHTML = ""; // Clear existing board
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      const candyWrapper = document.createElement("div");
      candyWrapper.classList.add("candy-wrapper");
      candyWrapper.dataset.row = r;
      candyWrapper.dataset.col = c;

      const candyEmoji = document.createElement("span");
      candyEmoji.classList.add("candy");
      candyEmoji.textContent = board[r][c] === EMPTY_CELL ? "" : board[r][c];

      const wbsLabel = document.createElement("span");
      wbsLabel.classList.add("label");
      wbsLabel.textContent = "wbs";

      candyWrapper.appendChild(candyEmoji);
      candyWrapper.appendChild(wbsLabel);
      candyWrapper.addEventListener("click", handleCandyClick);
      gameBoardElement.appendChild(candyWrapper);
    }
  }
}

function updateScoreDisplay() {
  scoreDisplayElement.textContent = `Score: ${score}`;
}

// --- Game Logic (yeah really needed) ---

async function handleCandyClick(event) {
  if (isProcessing) return;

  const clickedWrapper = event.currentTarget;
  const row = parseInt(clickedWrapper.dataset.row);
  const col = parseInt(clickedWrapper.dataset.col);

  if (!selectedCandy) {
    selectedCandy = { row, col, element: clickedWrapper };
    clickedWrapper.classList.add("selected");
  } else {
    const { row: oldRow, col: oldCol, element: oldElement } = selectedCandy;

    oldElement.classList.remove("selected");

    if (isAdjacent(oldRow, oldCol, row, col)) {
      isProcessing = true; // Start processing

      await animateSwap(oldRow, oldCol, row, col);

      // Swap logic in the board array
      [board[oldRow][oldCol], board[row][col]] = [
        board[row][col],
        board[oldRow][oldCol],
      ];

      // Re-render immediately after swap to reflect new positions for match checking
      renderBoard();

      let matchesFound = await processAllMatches();

      if (!matchesFound) {
        // If no matches, swap back and show feedback
        await animateSwap(oldRow, oldCol, row, col); // Animate swap back
        [board[oldRow][oldCol], board[row][col]] = [
          board[row][col],
          board[oldRow][oldCol],
        ];
        renderBoard(); // Re-render after swapping back
      }
      isProcessing = false; // End processing
    } else {
      selectedCandy = { row, col, element: clickedWrapper };
      clickedWrapper.classList.add("selected");
    }
    selectedCandy = null; // Reset selection
  }
}

function isAdjacent(r1, c1, r2, c2) {
  const rowDiff = Math.abs(r1 - r2);
  const colDiff = Math.abs(c1 - c2);
  return (rowDiff === 1 && colDiff === 0) || (colDiff === 1 && rowDiff === 0);
}

// Animates the swap of two candies
function animateSwap(r1, c1, r2, c2) {
  return new Promise((resolve) => {
    const wrapper1 = gameBoardElement.querySelector(
      `[data-row="${r1}"][data-col="${c1}"]`
    );
    const wrapper2 = gameBoardElement.querySelector(
      `[data-row="${r2}"][data-col="${c2}"]`
    );

    if (!wrapper1 || !wrapper2) {
      resolve(); // Can't animate if elements not found
      return;
    }

    const rect1 = wrapper1.getBoundingClientRect();
    const rect2 = wrapper2.getBoundingClientRect();

    // Calculate relative movement
    const dx = rect2.left - rect1.left;
    const dy = rect2.top - rect1.top;

    // Apply transforms
    wrapper1.style.transition = "transform 0.2s ease-in-out";
    wrapper2.style.transition = "transform 0.2s ease-in-out";

    wrapper1.style.transform = `translate(${dx}px, ${dy}px)`;
    wrapper2.style.transform = `translate(${-dx}px, ${-dy}px)`;

    // Listen for transition end to reset and resolve
    let transitionCount = 0;
    const onTransitionEnd = () => {
      transitionCount++;
      if (transitionCount === 2) {
        // Both elements finished
        wrapper1.style.transition = "";
        wrapper2.style.transition = "";
        wrapper1.style.transform = "";
        wrapper2.style.transform = "";
        wrapper1.removeEventListener("transitionend", onTransitionEnd);
        wrapper2.removeEventListener("transitionend", onTransitionEnd);
        resolve();
      }
    };
    wrapper1.addEventListener("transitionend", onTransitionEnd);
    wrapper2.addEventListener("transitionend", onTransitionEnd);
  });
}

// Processes all matches (clearing, falling, refilling, re-checking)
async function processAllMatches() {
  let matchesFound = false;
  let currentMatches = checkMatches();

  while (currentMatches.length > 0) {
    matchesFound = true;
    score += currentMatches.length * 10; // Award points for matches
    updateScoreDisplay();

    // Animate removal of matched candies
    await animateMatches(currentMatches);

    // Clear matched candies from the board array
    currentMatches.forEach(({ row, col }) => {
      board[row][col] = EMPTY_CELL;
    });

    applyGravity();

    // Refill board with new candies
    refillBoard();

    // Re-render after gravity and refill
    renderBoard();

    currentMatches = checkMatches();

    // Add a small delay to see the cascade effect
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  return matchesFound;
}

// Animates matched candies (pop effect)
function animateMatches(matchedCells) {
  return new Promise((resolve) => {
    let animationsPending = matchedCells.length;
    if (animationsPending === 0) {
      resolve();
      return;
    }

    matchedCells.forEach(({ row, col }) => {
      const wrapper = gameBoardElement.querySelector(
        `[data-row="${row}"][data-col="${col}"]`
      );
      if (wrapper) {
        wrapper.classList.add("pop-animation");
        wrapper.addEventListener("animationend", function handler() {
          wrapper.removeEventListener("animationend", handler);
          wrapper.classList.remove("pop-animation");
          animationsPending--;
          if (animationsPending === 0) {
            resolve();
          }
        });
      } else {
        animationsPending--; // If element not found, count it as done
      }
    });
  });
}

// Checks for horizontal and vertical matches of 3 or more
function checkMatches() {
  const matched = new Set();

  // Check horizontal matches
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE - 2; c++) {
      const candy = board[r][c];
      if (
        candy !== EMPTY_CELL &&
        candy === board[r][c + 1] &&
        candy === board[r][c + 2]
      ) {
        // Found a match of 3 or more
        let currentMatchLength = 0;
        for (let k = c; k < BOARD_SIZE; k++) {
          if (board[r][k] === candy) {
            matched.add(JSON.stringify({ row: r, col: k }));
            currentMatchLength++;
          } else {
            break;
          }
        }
      }
    }
  }

  // Check vertical matches
  for (let c = 0; c < BOARD_SIZE; c++) {
    for (let r = 0; r < BOARD_SIZE - 2; r++) {
      const candy = board[r][c];
      if (
        candy !== EMPTY_CELL &&
        candy === board[r + 1][c] &&
        candy === board[r + 2][c]
      ) {
        // Found a match of 3 or more
        let currentMatchLength = 0;
        for (let k = r; k < BOARD_SIZE; k++) {
          if (board[k][c] === candy) {
            matched.add(JSON.stringify({ row: k, col: c }));
            currentMatchLength++;
          } else {
            break;
          }
        }
      }
    }
  }
  return Array.from(matched).map((str) => JSON.parse(str));
}

// Applies gravity, moving candies down to fill empty spaces
function applyGravity() {
  for (let c = 0; c < BOARD_SIZE; c++) {
    let emptySlots = []; // Track empty slots in this column
    for (let r = BOARD_SIZE - 1; r >= 0; r--) {
      if (board[r][c] === EMPTY_CELL) {
        emptySlots.push(r);
      } else if (emptySlots.length > 0) {
        const targetRow = emptySlots.shift(); //
        board[targetRow][c] = board[r][c];
        board[r][c] = EMPTY_CELL;
        emptySlots.push(r);
      }
    }
  }
}

// Refills empty spaces at the top of the board with new candies
function refillBoard() {
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (board[r][c] === EMPTY_CELL) {
        board[r][c] = getRandomCandy();
      }
    }
  }
}

window.addEventListener("load", initGame);
