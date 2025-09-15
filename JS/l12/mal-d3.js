const decryptChar = (char, shift) => {
  // Entschlüsselt einen einzelnen Buchstaben
  if (char >= "a" && char <= "z") {
    const startCode = "a".charCodeAt(0);
    const charCode = char.charCodeAt(0);
    const newCharCode = startCode + ((charCode - startCode - shift + 26) % 26);
    return String.fromCharCode(newCharCode);
  } else if (char >= "A" && char <= "Z") {
    const startCode = "A".charCodeAt(0);
    const charCode = char.charCodeAt(0);
    const newCharCode = startCode + ((charCode - startCode - shift + 26) % 26);
    return String.fromCharCode(newCharCode);
  } else {
    return char;
  }
};

const decryptPhrase = (phrase, shifts) => {
  // Entschlüsselt eine Phrase mit drei Shift-Werten
  let decryptedPhrase = "";
  for (let i = 0; i < phrase.length; i++) {
    const char = phrase[i];
    let currentShift = 0;

    if (i % 3 === 0) {
      currentShift = -shifts[0];
    } else if (i % 3 === 1) {
      currentShift = shifts[1];
    } else {
      currentShift = -shifts[2];
    }
    decryptedPhrase += decryptChar(char, currentShift);
  }
  return decryptedPhrase;
};

// Hauptfunktion zur Brute-Force-Entschlüsselung
const bruteForceDecrypt = (encryptedPhrase) => {
  console.log("Brute-Force-Entschlüsselung gestartet...");
  let found = false;

  // 3 Schleifen für ein Charlie: 26 Shift-Werte (25 necessary), 3 Schlüssel...
  for (let shift1 = 0; shift1 < 26; shift1++) {
    for (let shift2 = 0; shift2 < 26; shift2++) {
      for (let shift3 = 0; shift3 < 26; shift3++) {
        const shifts = [shift1, shift2, shift3];
        const decrypted = decryptPhrase(encryptedPhrase, shifts);
        // alle Varianten in die Konsole posten
        console.log(
          `Shift-Kombination [${shift1}, ${shift2}, ${shift3}]: ${decrypted}`
        );
      }
    }
  }

  console.log("\nEntschlüsselung abgeschlossen.");
};
const encryptedText = process.argv[2];

if (!encryptedText) {
  console.log("Fehler: Bitte geben Sie den verschlüsselten Text an.");
  console.log("Beispiel: node decrypt.js 'Verschlüsselter Text'");
} else {
  bruteForceDecrypt(encryptedText);
}
