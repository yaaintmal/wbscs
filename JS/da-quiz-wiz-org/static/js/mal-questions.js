const questions = [
  {
    question: "What is the primary purpose of a 'div' element in HTML?",
    answers: [
      { text: "To define a division or a section.", correct: true },
      { text: "To create a list.", correct: false },
      { text: "To apply text formatting.", correct: false },
      { text: "To link to an external stylesheet.", correct: false },
    ],
    penalty: 3,
    category: "HTML",
  },
  {
    question: "Which of the following is NOT a valid JavaScript data type?",
    answers: [
      { text: "Boolean", correct: false },
      { text: "Number", correct: false },
      { text: "Float", correct: true },
      { text: "String", correct: false },
    ],
    penalty: 3,
    category: "JS",
  },
  {
    question: "Talking about CSS: what does the 'C' stand for in 'CSS'?",
    answers: [
      { text: "Creative", correct: false },
      { text: "Cascading", correct: true },
      { text: "Colorful", correct: false },
      { text: "Computer", correct: false },
    ],
    penalty: 5,
    category: "CSS",
  },
  {
    question:
      "Which of the following CSS properties is used to control the spacing between lines of text?",
    answers: [
      { text: "font-spacing", correct: false },
      { text: "line-height", correct: true },
      { text: "text-spacing", correct: false },
      { text: "letter-spacing", correct: false },
    ],
    penalty: 2,
    category: "CSS",
  },
  {
    question: "In JavaScript, what is the '===' operator used for?",
    answers: [
      { text: "To compare values only.", correct: false },
      { text: "To assign a value to a variable.", correct: false },
      { text: "To compare values and types.", correct: true },
      { text: "To perform a logical OR operation.", correct: false },
    ],
    penalty: 4,
    category: "JS",
  },
  {
    question: "Which HTML tag is used to create a hyperlink?",
    answers: [
      { text: "<a>", correct: true },
      { text: "<link>", correct: false },
      { text: "<href>", correct: false },
      { text: "<h1_link>", correct: false },
    ],
    penalty: 5,
    category: "HTML",
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Creative Style Sheets", correct: false },
      { text: "Cascading Style Sheets", correct: true },
      { text: "Computer Style Sheets", correct: false },
      { text: "Colorful Style Sheets", correct: false },
    ],
    penalty: 3,
    category: "CSS",
  },
  {
    question:
      "How do you declare a variable which can be changed in JavaScript?",
    answers: [
      { text: "variable myVar;", correct: false },
      { text: "let myVar;", correct: true },
      { text: "v myVar;", correct: false },
      { text: "create myVar;", correct: false },
    ],
    penalty: 4,
    category: "JS",
  },
  {
    question: "Which of the following is an example of an HTML semantic tag?",
    answers: [
      { text: "<footer>", correct: true },
      { text: "<div>", correct: false },
      { text: "<span>", correct: false },
      { text: "<p>", correct: false },
    ],
    penalty: 3,
    category: "HTML",
  },
  {
    question:
      "What is the purpose of the 'querySelector()' method in JavaScript?",
    answers: [
      {
        text: "To select all elements that match a CSS selector.",
        correct: false,
      },
      { text: "To modify the style of an element.", correct: false },
      { text: "To create a new HTML element.", correct: false },
      {
        text: "To select the first element that matches a CSS selector.",
        correct: true,
      },
    ],
    penalty: 2,
    category: "JS",
  },
  {
    question: "In CSS, what is the 'box model'?",
    answers: [
      { text: "A method for creating responsive layouts.", correct: false },
      { text: "A set of rules for positioning elements.", correct: false },
      {
        text: "A visual formatting model where each element is rendered as a box.",
        correct: true,
      },
      { text: "A way to define the shape of an element.", correct: false },
    ],
    penalty: 3,
    category: "CSS",
  },
  {
    question: "What is the correct syntax for a JavaScript 'for' loop?",
    answers: [
      { text: "for (i = 0; i <= 5; i++)", correct: true },
      { text: "for (i <= 5; i++)", correct: false },
      { text: "for (i = 0; i <= 5)", correct: false },
      { text: "for i = 1 to 5", correct: false },
    ],
    penalty: 5,
    category: "JS",
  },
];
export { questions };
