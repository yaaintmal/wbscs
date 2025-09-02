const vowelCheck = (char) => {
  const vowels = "aeiouAEIOU";
  return vowels.includes(char);
};

function plTranslate(word) {
  // Return the word as is if it's not a valid alphabetic word.
  if (!word || !/^[a-zA-Z]+$/.test(word)) {
    return word;
  }

  const isFirstLetterCapitalized =
    word[0] === word[0].toUpperCase() && word[0] !== word[0].toLowerCase();
  const lowerCaseWord = word.toLowerCase();

  // Rule 1: Starts with a vowel
  if (vowelCheck(lowerCaseWord[0])) {
    return `${word}way`;
  }

  // Rule 2: Starts with two consonants
  if (!vowelCheck(lowerCaseWord[0]) && !vowelCheck(lowerCaseWord[1])) {
    const firstTwoConsonants = word.slice(0, 2);
    const restOfWord = word.slice(2);
    let newWord = `${restOfWord}${firstTwoConsonants.toLowerCase()}ay`;

    if (isFirstLetterCapitalized) {
      newWord = newWord.charAt(0).toUpperCase() + newWord.slice(1);
    }
    return newWord;
  }

  // Rule 3: Starts with a single consonant
  const firstConsonant = word[0];
  const restOfWord = word.slice(1);
  let newWord = `${restOfWord}${firstConsonant.toLowerCase()}ay`;

  if (isFirstLetterCapitalized) {
    newWord = newWord.charAt(0).toUpperCase() + newWord.slice(1);
  }
  return newWord;
}

// Get the full phrase from the command-line arguments.
// We use .slice(2) to remove the first two arguments (the Node.js path and the script path).
const phrase = process.argv.slice(2).join(" ");

// Split the phrase into individual words.
const words = phrase.split(" ");

// Translate each word to Pig Latin using the map function and join the translated words back together.
const pigLatinWords = words.map(plTranslate);
const translatedPhrase = pigLatinWords.join(" ");

console.log(translatedPhrase);
