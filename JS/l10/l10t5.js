function Book(title, author, pages, isRead = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.summary = function () {
    let alreadyRead = this.isRead
      ? "You have already read this book"
      : "You have not read this book yet";
    return `Title: ${this.title} , Author: ${this.author}, Pages: ${this.pages} , ${alreadyRead}`;
  };
}

const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 180);
console.log(book1.summary());

const book2 = new Book("To Kill a Mockingbird", "Harper Lee", 281, true);
console.log(book2.summary());

const book3 = new Book("1984", "George Orwell", 328);
console.log(book3.summary());

Book.prototype.favChapter = function (intChapter) {
  let favoriteChapter = intChapter;
  console.log(
    `Your favorite chapter of ${this.title} is chapter ${favoriteChapter}`
  );
};

book1.favChapter(2);

// console.log(book1.summary());
// console.log(book1.favChapter());
