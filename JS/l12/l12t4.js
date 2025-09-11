let start = 0;
let counter = Math.floor(Math.random() * 999) + 1;

const showPokemon = (pokemon) => {
  console.log(pokemon);
};

const fetchPokemon = async () => {
  try {
    console.log("try to fetch a pokemon...");
    const url = `https://pokeapi.co/api/v2/pokemon/${counter}`;
    const res = await fetch(url);
    const data = await res.json();

    const pokemon = {
      name: data.name,
      id: data.id,
    };
    showPokemon(pokemon);
  } catch (error) {
    console.log(error);
  }
  counter++;
};

const fiveRequests = () => {
  fetchPokemon();
};

const intervalID = setInterval(fiveRequests, 1000);

setTimeout(() => {
  clearInterval(intervalID);
}, 5000);
