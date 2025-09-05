let start = 0;
let randomTask = "";

// Array of 10 random tasks as strings
const tasks = [
  "Complete the project",
  "Attend the meeting",
  "Write a report",
  "Review the code",
  "Fix the bugs",
  "Update the documentation",
  "Plan the next sprint",
  "Conduct user testing",
  "Optimize the performance",
  "Design",
];

// selecting random task from the tasks-array
const rndTask = function () {
  randomTask = tasks[Math.floor(Math.random() * tasks.length)];
};
// attaching an event to the first button to create new li in the ul with the random task
document.getElementById("add-item-btn").addEventListener("click", () => {
  // calling the function to get a new random task
  rndTask();
  start++;
  // creating a new li and adding it to the ul
  const li = document.createElement("li");
  li.textContent = `${start}. ${randomTask}`;
  document.querySelector("ul").appendChild(li);
  // scroll to the last added item
  li.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  // attaching an event to the li to remove it
  li.addEventListener("click", () => {
    li.remove();
  });
  // attaching an event to the li to remove it
  li.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    li.remove();
  });
});

//
// to refactor: Event-Delegation >> attach an event to the ul, replace having an event to each li
//

// adding an event to the second button to show an alert with the random task
document.getElementById("alert-btn").addEventListener("click", () => {
  rndTask();
  alert(randomTask);
});

// adding an event to the third button to log the random task to the console
document.getElementById("console-btn").addEventListener("click", () => {
  rndTask();
  console.log(randomTask);
});
