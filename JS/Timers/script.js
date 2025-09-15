// console.log("Running before timeout");
// setTimeout(() => {
//   console.log("timeout end");
// }, 1500);
// console.log("Running after timeout");

// setInterval(() => {
//   console.log("Running every 2 seconds");
// }, 2000);

// setting interval with a break
// let counter = 0;
// setInterval(() => {
//   console.log("Running every 2 seconds");
//   counter++;
//   if (counter === 5) {
//     clearInterval();
//   }
// }, 2000);

const intervalID = setInterval(() => {
  console.log("Running every 2 seconds");
}, 2000);

setTimeout(() => {
  clearInterval(intervalID);
}, 10000);
