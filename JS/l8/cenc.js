const encryptChar = (char, shift) => {
  // start check
  if (char >= "a" && char <= "z") {
    // For lowercase letters
    const startCode = "a".charCodeAt(0);
    const charCode = char.charCodeAt(0);
    // Calculate the new position with wrapping using modulo
    const newCharCode = startCode + ((charCode - startCode + shift) % 26);
    return String.fromCharCode(newCharCode);
  } else if (char >= "A" && char <= "Z") {
    const startCode = "A".charCodeAt(0);
    const charCode = char.charCodeAt(0);

    const newCharCode = startCode + ((charCode - startCode + shift) % 26);
    return String.fromCharCode(newCharCode);
  } else {
    // Return the original character if it's not a letter
    return char;
  }
};

const encryptPhrase = (phrase, shift) => {
  let encryptedPhrase = "";
  for (let i = 0; i < phrase.length; i++) {
    const char = phrase[i];
    encryptedPhrase += encryptChar(char, shift);
  }
  return encryptedPhrase;
};

// getting shift from cli
const shift = parseInt(process.argv[process.argv.length - 1], 10);

// getting sentence from cli
const phraseArray = process.argv.slice(2, -1);
const phrase = phraseArray.join(" ");

// Check if the shift value is valid
if (isNaN(shift)) {
  console.log("Error: The shift value must be a number.");
} else if (phrase.length === 0) {
  console.log("Error: Please provide a phrase to encrypt.");
} else {
  // Encrypt the phrase and printing result
  const encrypted = encryptPhrase(phrase, shift);
  console.log(encrypted);
}
