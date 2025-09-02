const numberArray = [1, 2, 3, 4, 5];

Array.prototype.arrayTransformer = function (callback) {
  const out = [];
  for (const element of this) {
    const val = callback(element);
    out.push(val);
  }
  return out;
};

const sqNumbers = numberArray.arrayTransformer((x) => x * x);

console.log(numberArray);
console.log(sqNumbers);
