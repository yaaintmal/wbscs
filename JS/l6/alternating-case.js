String.prototype.toAlternatingCase = function () {
  return this.split("")
    .map((a) => (a === a.toUpperCase() ? a.toLowerCase() : a.toUpperCase()))
    .join("");
};

console.log("hello world".toAlternatingCase());
console.log("HELLO WORLD".toAlternatingCase());
console.log("hello WORLD".toAlternatingCase());
console.log("HeLLo WoRLD".toAlternatingCase());
console.log("12345".toAlternatingCase());

function warnTheSheep(queue) {
  const totalanimals = queue.length;
  // Find the index of the wolf by looping through the array.
  let wolfAtIndex = -1;

  for (let i = 0; i < totalanimals; i++) {
    if (queue[i] === "wolf") {
      wolfAtIndex = i;
      break; // Exit the loop once the wolf is found.
    }
  }

  // reverse logic, -1 > index
  const sheepInDanger = totalanimals - wolfAtIndex - 1;
  if (sheepInDanger === 0) {
    return "Pls go away and stop eating my sheep";
  } else {
    // Otherwise, calculate the sheep's position relative to the front of the queue.
    // The sheep is one position closer to the front than the wolf.
    return `Oi! Sheep number ${sheepInDanger}! You are about to be eaten by a wolf!`;
  }
}

console.log(warnTheSheep(["wolf", "sheep", "sheep"]));
console.log(warnTheSheep(["wolf", "sheep", "sheep", "sheep"]));
console.log(warnTheSheep(["sheep", "sheep", "sheep", "sheep", "wolf"]));
