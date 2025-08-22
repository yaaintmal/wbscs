const somePersonObj = {
  name: "Mal",
  age: 27,
  isStudent: true,
  getInfo() {
    infoMsg = `Name: ${this.name}, Age: ${this.age}, Student: ${this.isStudent}`;
    return infoMsg;
  },
};

console.log(somePersonObj.getInfo());

console.log(somePersonObj["name"]);
console.log(somePersonObj["age"]);
console.log(somePersonObj["isStudent"]);

/* Differences in 'Notation accessing properties' or whatever you want to call it
/ Dot Noation:
/ + Pros: It's more concise, easier to read, and is the standard convention for static property names.
/ + Cons: It can't be used with property names that are stored in variables, contain special characters (like hyphens or spaces), or start with a number.
/
/ Bracket Notation
/ + Pros: allows you to use a variable for the property name, access properties with special characters or spaces (e.g., person['first-name']), or access properties that are numbers (e.g., array[0]).
/ + Cons: more verbose and can be slightly less performant in some JavaScript engines, though this difference is often negligible.
*/
