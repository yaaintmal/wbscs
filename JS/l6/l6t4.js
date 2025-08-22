const book = {
  title: "1984",
  author: "George Orwell",
  pages: 328,
  genre: "Dystopian",
  publicationYear: 1949,
  isRead: true,
  getSummary() {
    if (this.isRead) {
      readmsg = "You already have read this book";
    } else {
      readmsg = "You haven't read this book yet";
    }
    infoMsg = `The title of the book is ${this.title} by ${this.author}. It has ${this.pages} pages.\n${readmsg}`;
    return infoMsg;
  },
};

console.log(book.getSummary());
