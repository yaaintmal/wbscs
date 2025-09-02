function invert(array) {
  const newArray = [];
  array.forEach((element) => {
    if (element > 0) {
      element = element * -1;
    } else if (element < 0) {
      element = element * -1;
    }
    newArray.push(element);
  });
  return newArray;
}

console.log(invert([1, 2, -3, 4, 5]));
