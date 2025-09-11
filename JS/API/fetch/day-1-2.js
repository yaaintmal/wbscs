const pokeContainerEl = document.getElementById("pokemon-container");

const renderPokeCard = (data) => {
  const API_URL = "https://pokeapi.co/api/v2/pokemon/";

  const html = `
 <div
          class="bg-teal-900 text-stone-100 flex flex-col items-center rounded-xl shadow"
        >
          <img
            src="${data.sprites.other.dream_world.front_default}"
            alt=""
          />
          <h2 class="font-semibold">Bulbasaurus</h2>
          <div class="flex gap-2 items-center justify-between w-full px-3">
            <label for="hp">HP</label>
            <meter value="45" max="100" id="hp">HP</meter>
          </div>
          <div class="flex gap-2 items-center justify-between w-full px-3">
            <label for="attack">Attack</label>
            <meter
              class="[&::-webkit-meter-optimum-value]:bg-red-500"
              value="45"
              max="100"
              id="attack"
            >
              Attack
            </meter>
          </div>
          <div class="flex gap-2 items-center justify-between w-full px-3 pb-3">
            <label for="defense">Defense</label>
            <meter
              class="[&::-webkit-meter-optimum-value]:bg-blue-500"
              value="45"
              max="100"
              id="defense"
            >
              Defense
            </meter>
          </div>
        </div>
`;

  pokeContainerEl.insertAdjacentHTML("beforeend", html);
};

// for (let i = 1; i <= 10; i++) {
//   fetch(`${API_URL}${i}`)
//     .then((res) => {
//       if (!res.ok) throw new Error("Fetching pokemon failed");
//       returnres.json();
//     })
//     .then((pokemon) => {
//       renderPokeCard(pokemon);
//       .catch((error) => {
//         console.log(error);
//       });
//     );
// }

const fetchPokemon = async (pokemonId) => {
  try {
    const res = await fetch(`${API_URL}${pokemonId}`);
    const data = await res.json();
    renderPokeCard(data);
  } catch (error) {
    console.log(error);
  }
};

for (let i = 1; i <= 10; i++) {
  fetchPokemon(i);
}

// const fetchPokemon = async (pokemonId) => {
//   try {
//     const res = await fetch(`${API_URL}${pokemonId}`);
//     const data = await res.json();
//     renderPokeCard(data);
//   } catch (error) {
//     console.log(error);
//   }
// };
