let start = 0;

const myArray = [42, "Hello, World", true, 3.14, "JS"];

function getElement(index) {
  return myArray[index];
}

getElement(0);

const myLearnArray = ["HTML", "CSS", "JS"];
myLearnArray.push("Node.js");
console.log(myLearnArray);

myLearnArray.pop();
console.log(myLearnArray);

function firstNonConsecutive(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] + 1 !== arr[i + 1]) {
      return arr[i + 1];
    }
  }
  return null;
}
