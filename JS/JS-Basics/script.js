let start = 0;

console.log("a hello from mal");

// document.querySelector("h1").textContent = "a hello from mal again";
// console.log(5 + "5");

const age = 27;
const minimumAge = 18;

if (age >= minimumAge) {
  console.log("You are old enough to drive");
}

// logical short circuting
// wird nur ausgeführt wenn die erste Bedingung wahr ist
42 === 42 && console.log("42");
// wird nur ausgeführt wenn die erste Bedingung falsch ist
43 !== 43 && console.log("43");

if (age >= minimumAge && age < 65) {
  console.log("You are old enough to drive but not old enough to retire");
}
