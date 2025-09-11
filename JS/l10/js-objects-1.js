const marbleTrack = {
  name: "The Marble Track",
  price: 65.48,
  url: "https://marb.le/marble-track",
  author: "John Doe",
  year: 2022,
  notes: {
    color: "#13e087",
  },
};

marbleTrack.myProperty = "42";
console.log(marbleTrack.myProperty);

console.log(marbleTrack.notes.color);
marbleTrack.prepare = function () {
  console.log(`Prepare ${this.name}`);
};

marbleTrack.prepare();

// function Gift(name, price, url) {
//   this.name = name;
//   this.price = price;
//   this.url = url;
// }

// const newMarbleTrack = new Gift(
//   "The Marble Track",
//   65.48,
//   "https://marb.le/marble-track"
// );
// console.log(newMarbleTrack);

// const newMarbleTrack2 = new Gift(
//   "The Marble Track Reloaded",
//   99.99,
//   "https://marb.le/marble-track-two"
// );
// console.log(newMarbleTrack2);

class Gift {
  constructor(name, price, url) {
    this.name = name;
    this.price = price;
    this.url = url;
  }

  prepare() {
    console.log(`Prepare ${this.name}`);
  }

  wrap() {
    const paperAmount = this.url.length * this.name.length * (this.price / 10);
    console.log(`Wrap ${this.name} with ${paperAmount} paper`);
  }
}

const newMarbleTrack = new Gift(
  "The Marble Track",
  65.48,
  "https://marb.le/marble-track"
);
console.log(newMarbleTrack);
marbleTrack.prepare();

class NewGift extends Gift {
  constructor(name, price, url, author) {
    super(name, price, url);
    this.author = author;
  }
}

const newMarbleTrack2 = new NewGift(
  "The Marble Track Reloaded",
  99.99,
  "https://marb.le/marble-track-two",
  "John Doe"
);
console.log(newMarbleTrack2);
newMarbleTrack2.prepare();
newMarbleTrack2.wrap();

class BirthdayGift extends NewGift {
  #year;
  constructor(name, price, url, author, year) {
    super(name, price, url, author);
    this.#year = year;
  }

  get year() {
    return this.#year;
  }

  set year(year) {
    this.#year = year;
  }
  wrap() {
    const paperAmount =
      this.url.length * this.name.length * (this.price / 10) * 2;
    console.log(`Wrap ${this.name} with ${paperAmount} paper`);
  }
}

const newMarbleTrack3 = new BirthdayGift(
  "The Marble Track Reloaded",
  99.99,
  "https://marb.le/marble-track-two",
  "John Doe",
  2022
);
console.log(newMarbleTrack3);
newMarbleTrack3.prepare();
newMarbleTrack3.wrap();
console.log(newMarbleTrack3.year);
newMarbleTrack3.year = 2023;
console.log(newMarbleTrack3.year);
BirthdayGift.prototype.wrap = function () {
  const paperAmount =
    this.url.length * this.name.length * (this.price / 10) * 3;
  console.log(`Wrap ${this.name} with ${paperAmount} paper`);
};

const newMarbleTrack4 = new BirthdayGift(
  "The Marble Track Reloaded",
  99.99,
  "https://marb.le/marble-track-two",
  "John Doe",
  2022
);
console.log(newMarbleTrack4);
newMarbleTrack4.prepare();
newMarbleTrack4.wrap();

JSON.stringify(newMarbleTrack4);

const newMarbleTrack5 = JSON.parse(
  '{"name": "The Marble Track Reloaded", "price": 99.99, "url": "https://marb.le/marble-track-two", "author": "John Doe", "year": 2022}'
);
console.log(newMarbleTrack5);
