class test {
  #name;
  constructor(name, age) {
    this.#name = name;
    this.age = age;
  }
}
test.prototype.getinfo = function () {
  return `Name: ${this.name}, Age: ${this.age}`;
};
console.log(new test("John Doe", 25).getinfo());
