let start = 0;

const legendEL = document.querySelector("legend");
legendEL.textContent = "# Guess-THE-Number ";

legendEL.style.color = "fuchsia";
legendEL.style.fontSize = "2.5rem";
legendEL.style.textShadow = "2px 2px 3px indigo";
legendEL.style.textAlign = "center";
legendEL.classList = "text-shadow-lg text-shadow-indigo-500/10";

const resultEL = document.querySelector("#result");
resultEL.style.color = "fuchsia";
resultEL.style.fontSize = "3rem";
resultEL.style.textShadow = "2px 2px 3px indigo";
resultEL.style.textAlign = "center";
resultEL.classList = "text-shadow-lg text-shadow-indigo-500/10";

const formEl = document.getElementById("number-guess-form");
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const numberInput = document.getElementById("number-input");
  const number = Number(numberInput.value);
  console.log(number);
  if (number > 50) {
    resultEL.textContent = "Too High";
  } else if (number < 1) {
    resultEL.textContent = "Too Low";
  } else {
    resultEL.textContent = "You Guessed It!";
  }
});

const datalistEl = document.getElementById("possibleNumbers");
for (let i = 1; i <= 100; i++) {
  const optionEl = document.createElement("option");
  optionEl.value = i;
  datalistEl.appendChild(optionEl);
}

// console.dir(formEl);
// console.dir(numberInput);

resultEL.addEventListener("click", () => {
  resultEL.textContent = "?";
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = "yay, WBS/CS wins again!";
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 1000);
});

document.startViewTransition(() => {
  document.getElementById("toast-container").appendChild(toast);
});
