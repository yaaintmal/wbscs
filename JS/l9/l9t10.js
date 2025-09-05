// instructions
// Add an event listener to handle form submission.
// Validate that all fields are not empty.

//     If validation passes, output the form data to the console and display it in the p element as a list (ul)
//     If not output an error message in the p element, style it as an error. Maybe something red and flashy?
//     Make sure to toggle the error and success styles!
//     Clear the form fields

//     BONUS for myself: Add a button to clear the form

let start = 0;

const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const outputElement = document.getElementById("output");
const clearBtn = document.getElementById("clear-form-btn");

// adding event listener to the form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Alternative Version, good as well:
  // try {
  //   if (!name) {
  //     throw new Error("Name is required");
  //   }
  // } catch (error) {
  //   outputElement.textContent = error.message;
  //   outputElement.style.color = "red";
  // }

  if (
    nameInput.value === "" ||
    emailInput.value === "" ||
    messageInput.value === ""
  ) {
    outputElement.textContent = "Please fill in all fields.";
    outputElement.style.color = "red"; // or any other style you want to apply
  } else {
    outputElement.textContent = "Form submitted successfully!";
    outputElement.style.color = "green"; // or any other style you want to apply

    const formData = {
      name: nameInput.value,
      email: emailInput.value,
      message: messageInput.value,
    };
    console.log(formData);
    outputElement.insertAdjacentHTML(
      "afterend",
      `<ul><li>Name: ${formData.name}</li><li>Email: ${formData.email}</li><li>Message: ${formData.message}</li></ul>`
    );
    form.reset();
  }
});

// clearing the form
clearBtn.addEventListener("click", () => {
  form.reset();
  outputElement.textContent = "";
  outputElement.style.color = "";
});
