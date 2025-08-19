let start = 0;

try {
  let result = someFunctionThatMightFall();
  console.log(result);
} catch (err) {
  console.log(
    `Damn, that went wrong, returned error was: ${err}, actually this is a ${err.name} with the error-message: ${err.message}.
    Full Error-Stack is ${err.stack} which was caused by ${err.cause}`
  );
}
