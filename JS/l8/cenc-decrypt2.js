const FgYellow = "\x1b[33m";
const FgBrightYellow = "\x1b[33;1m"; // Hellgelb, wirkt wie Bernstein
const FgOrange = "\x1b[38;5;208m"; //256 Farben
const Reset = "\x1b[0m";

const decryptPhrase = (encryptedPhrase) => {
  // Try all 25 possible shift values (1 to 25)
  console.log(`\n${FgOrange}--- Brute-Force-Entschlüsselung ---${Reset}\n`);
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
    // Check if a possible solution is found and highlight it
    if (decryptedPhrase.includes(" ")) {
      console.log(
        `${FgBrightYellow}Versuch mit Verschiebung ${shift}:${Reset} ${decryptedPhrase}`
      );
    } else {
      console.log(
        `${FgYellow}Versuch mit Verschiebung ${shift}:${Reset} ${decryptedPhrase}`
      );
    }
  }
};

// getting the full string from cli
const inputString = process.argv.slice(2).join(" ");

// Check if the input value is valid
if (inputString.length === 0) {
  console.log(
    `${FgBrightYellow}Error: Please provide a phrase as input.${Reset}`
  );
} else {
  // Decrypt the phrase and print to console
  console.log(`\n${FgBrightYellow}Eingabephrase:${Reset} ${inputString}\n`);
  decryptPhrase(inputString);
}
