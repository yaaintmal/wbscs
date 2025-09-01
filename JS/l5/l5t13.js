let start = 0;

// 1
const numberArray = [10, 20, 30, 40, 50];

// 2
console.log("iterating with for-loop");
for (let i = 0; i < numberArray.length; i++) {
  console.log(numberArray[i]);
}

// 3
console.log("iterating with for...of-loop");
for (const number of numberArray) {
  console.log(number);
}

// end

const ttt = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const sliceT = ttt[1][1];
console.log(sliceT);
console.log(ttt);
