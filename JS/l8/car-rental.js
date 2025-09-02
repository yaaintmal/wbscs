// After a hard quarter in the office you decide to get some rest on a vacation.
// So you will book a flight for you and your girlfriend and try to leave all the mess behind you.

// You will need a rental car in order for you to get around in your vacation.
// The manager of the car rental makes you some good offers.

// Every day you rent the car costs $40.
// If you rent the car for 7 or more days, you get $50 off your total.
//
// Alternatively, if you rent the car for 3 or more days, you get $20 off your total.

// Write a code that gives out the total amount for different days(d).

let start = 0;

const dailyRent = 40;
const totalDays = 3;
let total = 0;

const rentalCarCost = (totalDays) => {
  if (totalDays >= 7) {
    total = totalDays * dailyRent - 50;
    console.log("total: ", total);
  } else if (totalDays >= 3) {
    total = totalDays * dailyRent - 20;
  } else {
    total = totalDays * 40;
  }
  return total;
};
console.log(rentalCarCost(3));
console.log(rentalCarCost(4));
console.log(rentalCarCost(5));
console.log(rentalCarCost(6));
