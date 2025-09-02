function strCount(obj) {
  let count = 0;
  // Get all values from the object or iterate through the array
  const values = Array.isArray(obj) ? obj : Object.values(obj);

  // Iterate over each value
  for (const value of values) {
    if (typeof value === "string") {
      count++;
    } else if (typeof value === "object" && value !== null) {
      // Recursively call the function for nested objects and arrays
      count += strCount(value);
    }
  }
  return count;
}

function strCountTwo(obj) {
  let count = 0;
  for (key in obj) {
    if (typeof obj[key] == "string") count++;
    if (typeof obj[key] == "object") count += strCountTwo(obj[key]);
  }
  return count;
}
