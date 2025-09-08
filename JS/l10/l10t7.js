class LibraryItem {
  #title;
  #author;

  constructor(title, author) {
    this.#title = title;
    this.#author = author;
  }
  getInfo() {
    return `Title: ${this.#title}, Author: ${this.#author}`;
  }
}

// using library class
const book1 = new LibraryItem("The Great Gatsby", "F. Scott Fitzgerald");
console.log(book1.getInfo());

// will be 'undefined' since it's private
console.log(book1.title);

// extending class
class Book extends LibraryItem {
  #pages;
  constructor(title, author, pages) {
    super(title, author);
    this.#pages = pages;
  }
  getinfo() {
    return `Title: ${this.title}, Author: ${this.author}, Pages: ${
      this.#pages
    }`;
  }
}
// using book class
const book2 = new Book("To Kill a Mockingbird", "Harper Lee", 281);
console.log(book2.getinfo());
// both will be 'undefined' since they are private
console.log(book2.title);
console.log(book2.pages);

class Member extends LibraryItem {
  #name;
  #booksCheckedOut;
  constructor(name, booksCheckedOut) {
    super(title, author);
    this.#name = name;
    this.#booksCheckedOut = booksCheckedOut;
  }
  checkOutBook(book) {
    this.#booksCheckedOut.push(book);
  }
  returnBook(book) {
    this.#booksCheckedOut.splice(this.#booksCheckedOut.indexOf(book), 1);
  }
  listBooks() {
    return this.#booksCheckedOut;
  }
}
