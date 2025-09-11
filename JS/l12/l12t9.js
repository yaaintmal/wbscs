let start = 0;
const tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
// getting content and dom objects
const userInput = document.getElementById("userInput");
const inputValue = userInput.value;
const quotesContainer = document.querySelector("ul");
const reloadButton = document.getElementById("reload");

// adding event listener

addEventListener("submit", (e) => {
  e.preventDefault();
  const inputObject = {
    id: self.crypto.randomUUID(),
    content: inputValue,
  };
  if (inputObject.content.trim() !== "") {
    storeUserInput(inputObject);
    userInput.value = "";
    renderTasks();
  } else {
    console.log("Invalid input");
  }
});

// creating an object for every user input with the following properties: id, content
const storeUserInput = (task) => {
  if (task && task.content) {
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
};

// retrieving data
// adding new li-item to ul after submitting
// adding cool red delete button within list-item
const addListItem = (task) => {
  if (task && task.content) {
    const li = document.createElement("li");
    li.textContent = task.content;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.classList = "bg-red-500 text-white px-2 py-1 rounded";
    deleteButton.addEventListener("click", () => {
      tasks.splice(tasks.indexOf(task), 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      li.remove();
    });
    li.appendChild(deleteButton);
    quotesContainer.appendChild(li);
  }
};

const renderTasks = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
  tasks.forEach((task) => {
    addListItem(task);
  });
};

renderTasks();

reloadButton.addEventListener("click", () => {
  location.reload();
});
