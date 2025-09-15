let dev = 0;

const encryptChar = (char, shift) => {
  // when char is lowercase
  if (char >= "a" && char <= "z") {
    const startCode = "a".charCodeAt(0);
    const charCode = char.charCodeAt(0);
    // wrapped that wrap ^(o.O)^
    const newCharCode =
      startCode + ((((charCode - startCode + shift) % 26) + 26) % 26);
    return String.fromCharCode(newCharCode);
  }
  // when char is uppercase
  else if (char >= "A" && char <= "Z") {
    const startCode = "A".charCodeAt(0);
    const charCode = char.charCodeAt(0);
    const newCharCode =
      startCode + ((((charCode - startCode + shift) % 26) + 26) % 26);
    return String.fromCharCode(newCharCode);
  }
  // original char back
  else {
    return char;
  }
};

const encryptPhrase = (phrase, shifts) => {
  // getting 3 shift ints as values?
  if (!Array.isArray(shifts) || shifts.length !== 3) {
    return "Error: Three shift values are required.";
  }

  let encryptedPhrase = "";
  for (let i = 0; i < phrase.length; i++) {
    const char = phrase[i];
    let currentShift = 0;

    // Bestimme den aktuellen Shift-Wert basierend auf dem Index des Zeichens
    if (i % 3 === 0) {
      // shifting up
      currentShift = shifts[0];
    } else if (i % 3 === 1) {
      // and down
      currentShift = -shifts[1];
    } else {
      // i % 3 === 2
      // and up again!
      currentShift = shifts[2];
    }

    // Verschlüssele das Zeichen und füge es zur Phrase hinzu
    encryptedPhrase += encryptChar(char, currentShift);
  }
  return encryptedPhrase;
};

// cli
if (dev === 1) {
  console.log("argv: ", process.argv);
} else {
  //
}
const args = process.argv.slice(2); // cutting nodepath n ish
if (dev === 1) {
  console.log("all args after slice: ", args);
} else {
  //
}

// getting 3 shift ints as values?
if (args.length < 4) {
  console.log(
    "Fehler: Bitte geben Sie 3 Shift-Werte und eine Phrase zum Verschlüsseln an."
  );
  console.log("Beispiel: node mal-cenc.js 3 5 2 'Hallo Welt'");
} else {
  // extraction of the three shift values right here, map me!
  const shifts = args.slice(0, 3).map((s) => parseInt(s, 10));

  // Überprüfe, ob alle Shifts gültige Zahlen sind
  if (shifts.some(isNaN)) {
    console.log("Fehler: Alle 3 Shift-Werte müssen Zahlen sein.");
  } else {
    // extraction of the phrase
    const phrase = args.slice(3).join(" ");

    // encoding, output
    const encrypted = encryptPhrase(phrase, shifts);
    if (dev === 1) {
      console.log("Original: " + phrase);
      console.log("Verschlüsselt: " + encrypted);
    } else {
      //
    }
    // final output
    console.log(encrypted);
  }
}
