// Get your shorts on - this is an array workout!
// done!
//
// ## Array Cardio

// Some initial data we can work with:
// Take some time to analyze the data structure
//
// I did actually...
// Do each objects have the exact same data?
//
// ofc they did not- ha!
//
const inventors = [
  {
    first: "Albert",
    last: "Einstein",
    year: 1879,
    passed: 1955,
    categories: ["man", "physicist"],
  },
  {
    first: "Isaac",
    last: "Newton",
    year: 1643,
    passed: 1727,
    categories: ["man", "mathematician"],
  },
  { first: "Galileo", last: "Galilei", year: 1564, passed: 1642 },

  {
    first: "Marie",
    last: "Curie",
    year: 1867,
    passed: 1934,
    categories: ["woman", "physicist"],
  },
  { first: "Johannes", last: "Kepler", year: 1571, passed: 1630 },
  { first: "Nicolaus", last: "Copernicus", year: 1473, passed: 1543 },
  { first: "Max", last: "Planck", year: 1858, passed: 1947 },
  {
    first: "Katherine",
    last: "Blodgett",
    year: 1898,
    passed: 1979,
    categories: ["woman", "physicist"],
  },
  { first: "Ada", last: "Lovelace", year: 1815, passed: 1852 },
  { first: "Sarah E.", last: "Goode", year: 1855, passed: 1905 },
  {
    first: "Lise",
    last: "Meitner",
    year: 1878,
    passed: 1968,
    categories: ["woman", "physicist"],
  },
  {
    first: "Hanna",
    last: "Hammarström",
    year: 1829,
    passed: 1909,
    categories: ["woman", "inventor"],
  },
];

// Array.prototype.filter()
// 1. Filter the list of inventors to retrieve only those born between 1500 and 1600
// Expected output: an array containing two inventors: Galileo Galilei and Johannes Kepler
const filteredInventors = inventors.filter(
  (inventor) => inventor.year >= 1500 && inventor.year <= 1600
);
console.log(filteredInventors);

// Array.prototype.filter()
// 2. Filter the list of inventors to retrieve only the ones that have the "mathematician" category
// Expected output: an array containing only one inventor: Isaac Newton
const filteredInventors2 = inventors.filter(
  (inventor) =>
    inventor.categories && inventor.categories.includes("mathematician")
);
console.log(filteredInventors2);

// Array.prototype.filter()
// 3. Filter the list of inventors to retrieve only the ones with the category === 'physicist' AND 'man'
// Expected output: an array containing only one inventor: Albert Einstein
const filteredInventors3 = inventors.filter(
  (inventor) =>
    inventor.categories &&
    inventor.categories.includes("physicist") &&
    inventor.categories.includes("man")
);
console.log(filteredInventors3);

// Array.prototype.map()
// 4. Give us an array filled with the inventors first and last names
// Expected output:
// ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Marie Curie", "Johannes Kepler", "Nicolaus Copernicus", "Max Planck", "Katherine Blodgett", "Ada Lovelace", "Sarah E. Goode", …]

const inventorNames = inventors.map(
  (inventor) => inventor.first + " " + inventor.last
);
console.log(inventorNames);

// Array.prototype.map()
// 5. Give us an array filled only with the inventors emails
// the emails should be lowercase firstName + date of birth @ inventor.com
// Expected output:
// eg: ["albert1879@inventor.com", "isaac1643@inventor.com", "galileo1564@inventor.com", "marie1867@inventor.com", "johannes1571@inventor.com", "nicolaus1473@inventor.com", "max1858@inventor.com", "katherine1898@inventor.com", "ada1815@inventor.com", "sarah e.1855@inventor.com", …]

const inventorEmails = inventors.map(
  (inventor) => inventor.first.toLowerCase() + inventor.year + "@inventor.com"
);
console.log(inventorEmails);

// Array.prototype.sort()
// 6. Sort the inventors by birthdate, youngest to oldest (eg: the one whose birth year is closer to us on top)
// Expected output: an array of inventors going from "Katherine Blodgett" -> to "Nicolaus Copernicus"

const sortedInventors = inventors.sort((a, b) => a.year - b.year);
console.log(sortedInventors);

// ~~~ OPTIONAL ~~~
// Array.prototype.reduce()
// 7. How many years did all the inventors live all together?

const totalYears = inventors.reduce((allTogether, inventor) => {
  return allTogether + inventor.passed - inventor.year;
}, 0);
console.log(totalYears);

// ~~~~~~~~~~~~~~~~~~

// Array.prototype.sort()
// 8. Sort the inventors by years lived (both ascending and descending)

const sortedInventorsByYearsLived = inventors.sort((a, b) => {
  return b.passed - b.year - (a.passed - a.year);
});
console.log(sortedInventorsByYearsLived);

const sortedInventorsByYearsLivedDesc = inventors.sort((a, b) => {
  return a.passed - a.year - (b.passed - b.year);
});
console.log(sortedInventorsByYearsLivedDesc);

// https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
// oh la la... Paris je t'aime :3 j'ai vu pas mal de boulevards... :7

const boulevardsInParis = [
  "Boulevard Auguste-Blanqui",
  "Boulevard Barbès",
  "Boulevard Beaumarchais",
  "Boulevard de l'Amiral-Bruix",
  "Boulevard Mortier",
  "Boulevard Poniatowski",
  "Boulevard Soult",
  "Boulevard des Capucines",
  "Boulevard de la Chapelle",
  "Boulevard de Clichy",
  "Boulevard du Crime",
  "Boulevard du Général-d'Armée-Jean-Simon",
  "Boulevard Haussmann",
  "Boulevard de l'Hôpital",
  "Boulevard des Italiens",
  "Boulevard Lefebvre",
  "Boulevard de la Madeleine",
  "Boulevard de Magenta",
  "Boulevard Malesherbes",
  "Boulevard Marguerite-de-Rochechouart",
  "Boulevard Montmartre",
  "Boulevard du Montparnasse",
  "Boulevard Raspail",
  "Boulevard Richard-Lenoir",
  "Boulevard Saint-Germain",
  "Boulevard Saint-Michel",
  "Boulevard de Sébastopol",
  "Boulevard de Strasbourg",
  "Boulevard du Temple",
  "Boulevard Voltaire",
  "Boulevard de la Zone",
];

// Array.prototype.filter()
// 9. Create a list of Boulevards in Paris that contain 'de' anywhere in the name
// Expected output: 'Boulevard de l'Amiral-Bruix'...'Boulevard de la Zone'

const boulevardsInParisWithDe = boulevardsInParis.filter((boulevard) =>
  boulevard.includes("de")
);
console.log("Boulevards with include");
console.log(boulevardsInParisWithDe);

// again without include
const boulevardsInParisWithDe2 = boulevardsInParis.filter((boulevard) => {
  return boulevard.indexOf("de") !== -1;
});
console.log("Boulevards with filter");
console.log(boulevardsInParisWithDe2);
//
//
const people = [
  "Bernhard, Sandra",
  "Bethea, Erin",
  "Becker, Carl",
  "Bentsen, Lloyd",
  "Beckett, Samuel",
  "Blake, William",
  "Berger, Ric",
  "Beddoes, Mick",
  "Beethoven, Ludwig",
  "Belloc, Hilaire",
  "Begin, Menachem",
  "Bellow, Saul",
  "Benchley, Robert",
  "Blair, Robert",
  "Benenson, Peter",
  "Benjamin, Walter",
  "Berlin, Irving",
  "Benn, Tony",
  "Benson, Leana",
  "Bent, Silas",
  "Berle, Milton",
  "Berry, Halle",
  "Biko, Steve",
  "Beck, Glenn",
  "Bergman, Ingmar",
  "Black, Elk",
  "Berio, Luciano",
  "Berne, Eric",
  "Berra, Yogi",
  "Berry, Wendell",
  "Bevan, Aneurin",
  "Ben-Gurion, David",
  "Bevel, Ken",
  "Biden, Joseph",
  "Bennington, Chester",
  "Bierce, Ambrose",
  "Billings, Josh",
  "Birrell, Augustine",
  "Blair, Tony",
  "Beecher, Henry",
  "Biondo, Frank",
];

// Array.prototype.sort()
// 10. Sort the people alphabetically by last name

const sortedPeople = people.sort((a, b) => {
  const [aLast, aFirst] = a.split(", ");
  const [bLast, bFirst] = b.split(", ");
  return aLast > bLast ? 1 : -1;
});

// shouldn't I console info or log that?
// console.log(sortedPeople);
//
//
const data = [
  "car",
  "car",
  "truck",
  "truck",
  "bike",
  "walk",
  "car",
  "van",
  "bike",
  "walk",
  "car",
  "van",
  "car",
  "truck",
  "skateboard",
];

// Array.prototype.reduce()
// 11. Create an object from the data array, counting how often each word occurs.
console.log("this ain't easy");
const dataCount = data.reduce((acc, word) => {
  if (acc[word]) {
    acc[word]++;
  } else {
    acc[word] = 1;
  }
  return acc;
}, {});
console.log(dataCount);

// again with another logic
console.log("wild logic right here!");
const dataCount2 = data.reduce((acc, word) => {
  acc[word] = (acc[word] || 0) + 1;
  return acc;
}, {});
console.log(dataCount2);

//
const family = [
  { name: "Lily", year: 2009 },
  { name: "Leah", year: 2011 },
  { name: "Liv", year: 2020 },
  { name: "Lydia", year: 2015 },
];

// Array.prototype.some()
// 12. Is at least one person 18 years old?
const checkAgeAgain = family.some((person) => {
  return person.year <= 2007;
});
if (checkAgeAgain) {
  console.log("at least one person is 18 years old");
} else {
  console.log("no one is 18 years old");
}

// Array.prototype.every
// 13. Do all names of the family members start with the letter L?
const checkNameAgain = family.every((person) => {
  return person.name[0] === "L";
});
if (checkNameAgain) {
  console.log("all names start with L");
}
