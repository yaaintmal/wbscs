class MyArray extends Array {
  // my refactored filter method
  myFilter(callback) {
    const filteredArr = new MyArray();
    for (let i = 0; i < this.length; i++) {
      if (callback(this[i], i, this)) {
        filteredArr.push(this[i]);
      }
    }
    return filteredArr;
  }

  // myFind sounds even better
  myFind(callback) {
    for (let i = 0; i < this.length; i++) {
      if (callback(this[i], i, this)) {
        return this[i];
      }
    }
    return undefined;
  }
}

// Example Usage
const numbers = new MyArray(1, 2, 3, 4, 5, 6);

const evenNumbers = numbers.myFilter((num) => num % 2 === 0);
console.log(evenNumbers); // Output: MyArray(3) [2, 4, 6]

const foundNumber = numbers.myFind((num) => num > 4);
console.log(foundNumber); // Output: 5

// without class extending

function myFilterTwo(arr, callback) {
  const filteredArr = [];
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (callback(element, i, arr)) {
      filteredArr.push(element);
    }
  }
  return filteredArr;
}

function myFindTwo(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (callback(element, i, arr)) {
      return element;
    }
  }
  return undefined;
}
// again: Usage!
const numbersTwo = [1, 2, 3, 4, 5, 6];

// Using myFilter as a utility function
const evenNumbersTwo = myFilterTwo(numbersTwo, (num) => num % 2 === 0);
console.log(evenNumbersTwo); // Output: [2, 4, 6]

// Using myFind as a utility function
const foundNumberTwo = myFindTwo(numbersTwo, (num) => num > 4);
console.log(foundNumberTwo); // Output: 5
