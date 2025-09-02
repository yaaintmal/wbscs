function printerError(s) {
  let totalErrors = 0;
  const totalLetters = s.length;

  for (let i = 0; i < totalLetters; i++) {
    let toCheck = s[i];
    if (toCheck.charCodeAt(0) > 109) {
      totalErrors++;
    }
  }
  return `${totalErrors}/${totalLetters}`;
}
