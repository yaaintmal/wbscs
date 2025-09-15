const encryptChar = (char, shift) => {
  // when char is lowercase
  if (char >= "a" && char <= "z") {
    const startCode = "a".charCodeAt(0);
    const charCode = char.charCodeAt(0);
    // it's a wrap!
    const newCharCode = startCode + ((charCode - startCode + shift) % 26);
    return String.fromCharCode(newCharCode);
  }
  // when char is uppercase
  else if (char >= "A" && char <= "Z") {
    const startCode = "A".charCodeAt(0);
    const charCode = char.charCodeAt(0);
    const newCharCode = startCode + ((charCode - startCode + shift) % 26);
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
      // Raufshiften (erster Shift-Wert)
      currentShift = -shifts[0];
    } else if (i % 3 === 1) {
      // Runtershiften (zweiter Shift-Wert, negativ)
      currentShift = shifts[1];
    } else {
      // i % 3 === 2
      // Raufshiften (dritter Shift-Wert)
      currentShift = -shifts[2];
    }

    // Verschlüssele das Zeichen und füge es zur Phrase hinzu
    encryptedPhrase += encryptChar(char, currentShift);
  }
  return encryptedPhrase;
};

// cli
const args = process.argv.slice(2); // cutting nodepath n ish

// Es werden mindestens vier Argumente erwartet: 3 Shifts und die Phrase
if (args.length < 4) {
  console.log(
    "Fehler: Bitte geben Sie 3 Shift-Werte und eine Phrase zum Verschlüsseln an."
  );
  console.log("Beispiel: node mal-cenc.js 3 5 2 'Hallo Welt'");
} else {
  // Extrahieren der drei Shift-Werte
  const shifts = args.slice(0, 3).map((s) => parseInt(s, 10));

  // Überprüfe, ob alle Shifts gültige Zahlen sind
  if (shifts.some(isNaN)) {
    console.log("Fehler: Alle 3 Shift-Werte müssen Zahlen sein.");
  } else {
    // Extrahieren der Phrase
    const phrase = args.slice(3).join(" ");

    // Verschlüsseln und das Ergebnis ausgeben
    const encrypted = encryptPhrase(phrase, shifts);
    console.log("Original: " + phrase);
    console.log("Verschlüsselt: " + encrypted);
  }
}
