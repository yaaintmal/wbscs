let start = 0;

let temperatur = 26; // 15°C = 59° Fahrenheit
let tempInFahrenheit = temperatur * 1.8 + 32;

let tempForSwitch = "";

if (temperatur < 15) {
  console.log("its fkn cold outside, u should wear a coat");
} else if (temperatur >= 15 && temperatur <= 25) {
  console.log("well, you should at least wear a sweater");
} else {
  console.log("Whoop whoop, Summer is here! Have fun with ya t-shirt");
}

switch (tempForSwitch) {
  case 15:
    console.log("its fkn cold outside, u should wear a coat");
    break;
  case 16:
    console.log("well, you should at least wear a sweater");
    break;
  case 26:
    console.log("Whoop whoop, Summer is here! Have fun with ya t-shirt");
    break;
  default:
    console.log("I dunno what to wear man... duh!      ̄_(ツ)_/ ̄");
}
