let start = 0;

function mal(a, b, ...rest) {
  console.log(a, b, rest);
  console.log(arguments);
  console.log("Rest", rest.length);
  console.log(rest);
  console.log("a+b ", (a + b).length);
  console.log("all ", (a + b + rest).length);
  console.log("args", arguments.length);
}

// console.log("all input:", process.argv);
const result = process.argv.slice(2);
mal(...result);
