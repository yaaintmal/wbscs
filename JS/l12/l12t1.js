function hello() {
  console.log("Hello, world!");
}
const intervalID = setInterval(hello, 1000);

function stopHello() {
  clearInterval(intervalID);
}

setTimeout(stopHello, 6000);

function helloAgain() {
  console.log("Hello again, world!");
}

const messageContainer = document.getElementById('message-container');
