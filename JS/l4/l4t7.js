let start = 0;

// global & function scope
var someValue = 5;
console.log(someValue);

function globalVar() {
  var somevalue = 7;
  console.log(somevalue);
}
globalVar();

// block scope
if (true) {
  let flexVar = 7;
  const constVar = 1;
  flexVar = 8;
  //   constVar = 0; // can't really be changed due to const
}

var anotherGlobalVar = 0;
if (true) {
  anotherGlobalVar = 3; // will also changed the var out of the block
  console.log(anotherGlobalVar);
}
console.log(anotherGlobalVar);

const myArray = ["☕", "🖤", "💛", "🐕", "🌭"];
const myObject = {
  name: "John",
  age: 30,
};
console.log(myArray);
myArray.pop();
console.log(myArray);

console.log(myObject);
myObject.age = 27; // we'll die with 27 or never!
myObject.name = "Jane";
console.log(myObject);

// discussion points:
// var in a block is function-scoped, not block-scoped, therefor it is accessible from outside the block
// generally safer for controlling scope because it is not accessible from outside the block, prevents unintentional changes or hoisting issues
