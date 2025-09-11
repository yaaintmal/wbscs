let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// getting dome and user input
const userInput = document.getElementById("userInput");
const quotesContainer = document.querySelector("ul");
const reloadButton = document.getElementById("reload");
const form = document.querySelector("form");

const storeUserInput = (task) => {
  // check if task and task.content are defined
  if (task && task.content) {
    tasks.unshift(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
};

// adding list items to ul
const addListItem = (task) => {
  if (task && task.content) {
    const li = document.createElement("li");
    // we get task.id and content of our object
    li.id = task.id;
    li.textContent = task.content;
    li.classList.add(
      "flex",
      "justify-between",
      "items-center",
      "p-2",
      "border-b",
      "border-gray-200"
    );

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add(
      "bg-red-500",
      "text-white",
      "px-2",
      "py-1",
      "rounded"
    );

    // adding REAL delete button :3
    deleteButton.addEventListener("click", () => {
      // logging of the deleted item
      console.log(`Deleting item with id: ${task.id}`);

      // Filter out the task to be deleted from the tasks array
      tasks = tasks.filter((item) => item.id !== task.id);
      localStorage.setItem("tasks", JSON.stringify(tasks));

      // removing the deleted item from list
      li.remove();
    });

    li.appendChild(deleteButton);
    // Prepend the new list item to the top of the quotes container
    quotesContainer.prepend(li);
  }
};

const renderTasks = () => {
  // clearing existing list before rendering
  quotesContainer.innerHTML = "";
  tasks.forEach((task) => {
    addListItem(task);
  });
};

// submitting form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = userInput.value.trim();

  if (inputValue !== "") {
    const inputObject = {
      // Remove hyphens and prepend "task-" to create a valid id
      id: `task-${self.crypto.randomUUID().replace(/-/g, "")}`,
      content: inputValue,
    };
    storeUserInput(inputObject);
    userInput.value = ""; // resetting
    renderTasks(); // rendering
  } else {
    console.log("Invalid input: Cannot be empty.");
  }
});

// reload
reloadButton.addEventListener("click", () => {
  location.reload();
});

// initial load
window.addEventListener("load", renderTasks);
