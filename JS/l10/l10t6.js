class Book {
  constructor(title, author, pages, isRead = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  summary() {
    let alreadyRead = this.isRead
      ? "You have already read this book"
      : "You have not read this book yet";
    return `Title: ${this.title} , Author: ${this.author}, Pages: ${this.pages} , ${alreadyRead}`;
  }
}

const book1 = new Book("The Great Mal", "P. Malick Fitzsenald", 180);
console.log(book1.summary());

const book2 = new Book("(how) To Kill a Mockingbird", "Eminem", 281, true);
console.log(book2.summary());
