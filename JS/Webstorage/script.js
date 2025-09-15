console.log(localStorage);
localStorage.setItem("name", "John");

// converting string to json

const user = { name: "John", age: 30 };
localStorage.setItem("user", JSON.stringify(user));

// converting json to string
const user2 = JSON.parse(localStorage.getItem("user"));
console.log(user2);

// localStorage.removeItem("name");
// localStorage.clear();
