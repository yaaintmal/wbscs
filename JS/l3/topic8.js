let start = 0;

let someInt = 7;
let stringOfsomeInt = String(someInt);

// expression will show "77" as the result will be handled as string due to concatenation > Addition: string wins as + has a dual meaning
console.log(stringOfsomeInt + someInt);

// expression will show "0" as the result will be handled as a number > Subtraction: number wins, as -, / and * are mathematical operators only :)
let result = someInt - stringOfsomeInt;
console.log(result);

result = someInt / stringOfsomeInt;
console.log(result);

result = someInt * stringOfsomeInt;
console.log(result);

result = someInt % stringOfsomeInt; // modulo even, odd
console.log(result);

result = someInt ** stringOfsomeInt; // String is converted to a number, then exponentiation is performed.
console.log(result);

result = someInt += stringOfsomeInt; // Number is converted to a string, then concatenation is performed.
console.log(result);

result = someInt -= stringOfsomeInt; // String is converted to a number, then subtraction is performed.
console.log(result);

result = someInt *= stringOfsomeInt; // String is converted to a number, then multiplication is performed.
console.log(result);

result = someInt /= stringOfsomeInt; // String is converted to a number, then division is performed.
console.log(result);

result = someInt **= stringOfsomeInt; // String is converted to a number, then exponentiation is performed.
console.log(result);

result = someInt %= stringOfsomeInt; // String is converted to a number, then modulus is performed.
console.log(result);
