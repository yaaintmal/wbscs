let start = 0;
const quotes = JSON.parse(localStorage.getItem("quotes")) ?? [];

const userInput = document.getElementById("userInput");
const quotesContainer = document.querySelector("ul");
const reloadButton = document.getElementById("reload");

addEventListener("submit", (e) => {
  e.preventDefault();
  storeUserInput(userInput.value);
  addQuote(userInput.value);
  userInput.value = "";
});

const storeUserInput = (quote) => {
  // making sure quote input is not empty
  if (quote) {
    quotes.push(quote);
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }
};

const addQuote = (quote) => {
  const li = document.createElement("li");
  li.textContent = quote;
  quotesContainer.appendChild(li);
};

reloadButton.addEventListener("click", () => {
  quotesContainer.innerHTML = "";
  quotes.forEach((quote) => {
    addQuote(quote);
  });
});

quotes.forEach((quote) => {
  addQuote(quote);
});
