const decryptPhrase = (encryptedPhrase) => {
  // Try all 25 possible shift values (1 to 25)
  for (let shift = 1; shift <= 25; shift++) {
    let decryptedPhrase = "";
    for (let i = 0; i < encryptedPhrase.length; i++) {
      const char = encryptedPhrase[i];

      // Decrypt a single character
      if (char >= "a" && char <= "z") {
        const startCode = "a".charCodeAt(0);
        const charCode = char.charCodeAt(0);
        // Calculate the new position by subtracting the shift
        const newCharCode =
          startCode + ((charCode - startCode - shift + 26) % 26);
        decryptedPhrase += String.fromCharCode(newCharCode);
      } else if (char >= "A" && char <= "Z") {
        const startCode = "A".charCodeAt(0);
        const charCode = char.charCodeAt(0);
        const newCharCode =
          startCode + ((charCode - startCode - shift + 26) % 26);
        decryptedPhrase += String.fromCharCode(newCharCode);
      } else {
        decryptedPhrase += char;
      }
    }
    console.log(`Versuch mit Verschiebung ${shift}: ${decryptedPhrase}`);
  }
};

// getting the full string from cli
const inputString = process.argv.slice(2).join(" ");

// Check if the input value is valid
if (inputString.length === 0) {
  console.log("Error: Please provide a phrase as input.");
} else {
  // Print the input string to the console
  console.log(inputString);
}

// Decrypt the phrase
decryptPhrase(inputString);

// Print the decrypted phrase to the console
console.log("Entschlüsseltes Original: " + inputString);
