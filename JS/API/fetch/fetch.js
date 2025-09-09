const apiURL = "https://xkcd-api-ridvanaltun.vercel.app/api/comics/random";

const getComicButton = document.getElementById("get-comic");
getComicButton.addEventListener("click", () => {
  getComicButton.disabled = true;
  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      const comic = data;
      const comicContainer = document.getElementById("comic-container");
      const comicImage = document.createElement("img");
      const comicTitle = document.createElement("figcaption");
      comicImage.src = comic.img;
      comicImage.alt = comic.alt;
      comicTitle.textContent = `${comic.title} (${comic.date})`;
      //   comicContainer.innerHTML = "";
      comicContainer.replaceChildren();
      comicContainer.appendChild(comicImage);
      comicContainer.appendChild(comicTitle);
    });
  getComicButton.disabled = false;
});

// // adding a function so a new comic gets reloaded when the button is clicked
// function reloadComic() {
//   fetch(apiURL)
//     .then((response) => response.json())
//     .then((data) => {
//       const comic = data;
//       const comicContainer = document.getElementById("comic-container");
//       const comicImage = document.createElement("img");
//       const comicTitle = document.createElement("figcaption");
//       comicImage.src = comic.img;
//       comicImage.alt = comic.alt;
//       comicTitle.textContent = `${comic.title} (${comic.date})`;
//       comicContainer.innerHTML = "";
//       comicContainer.appendChild(comicImage);
//       comicContainer.appendChild(comicTitle);
//     });
// }
// addEventListener("click", reloadComic);
