let users = [];
// Define an asynchronous function to handle the API call.
const fetchData = async () => {
  // Use a try...catch block for robust error handling.
  try {
    // Replace 'https://api.example.com/data' with the URL of the API you want to fetch from.
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    // Check if the response was successful (status code 200-299).
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON data from the response.
    const data = await response.json();
    renderUserCards(data);
    // Log the fetched data to the console.
    console.log("Data fetched successfully:");
    console.log(data);
    users = data;
  } catch (error) {
    // Log any errors that occurred during the fetch operation.
    console.error("Error fetching data:", error);
  }
};

// This script demonstrates a basic asynchronous function to fetch data from an API.
const cardContainer = document.getElementById("card-container");

const renderUserCards = (users) => {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) ?? [];
  for (const user of users) {
    const exists = bookmarks.find((bookmark) => bookmark.id === user.id);

    const html = `
     <article class="boder rounded-xl shadow-indigo-950 shadow-2xl bg-indigo-900 py-5 px-8 space-y-2"
      style="background-color: oklch(from #312c85 l c ${
        Math.abs(user.address.geo.lng) + 30
      });"
     >
        <header>
          <h2>${user.name}</h2>
        </header>
        <div class="flex">
          <div class="h-18 w-18 rounded-full">
            <img class=" h-full w-full mask-radial-[100%_100%] mask-radial-from-50% mask-radial-at-left"
              src="https://avatar.iran.liara.run/public/${user.id}" alt="">
          </div>
          <ul>
            <li>Username: ${user.username}</li>
            <li>City: ${user.address.city}</li>
            <li>Website: <a href="${
              user.website
            } target="_blank" rel="noopener noreferrer">${user.website}</a></li>
          </ul>
        </div>
        <hgroup class="mt-5">
          <h3 class="font-semibold">${user.company.catchPhrase}</h3>
          <p>${user.company.bs}</p>
        </hgroup>
        <div class="text-right">
          <button data-user-id="${
            user.id
          }" class="border rounded py-2 px-4 cursor-pointer">${
      exists ? "Saved" : "Bookmark"
    }</button>
        </div>
      </article>
    `;
    cardContainer.insertAdjacentHTML("beforeend", html);
  }
};

const handleContainerClick = (e) => {
  const { target } = e;

  if (target.tagName === "BUTTON") {
    const userId = target.dataset.userId;
    console.log(userId);

    const userObj = users.find((user) => user.id === userId);

    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) ?? [];
    bookmarks.push(userObj);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  target.textContent = target.textContent === "Bookmark" ? "Saved" : "Bookmark";
};

cardContainer.addEventListener("click", handleContainerClick);
// Call the function to start the fetch process.
fetchData();

const saveUser = (userId) => {
  const userObj = users.find((user) => user.id === userId);
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) ?? [];
  bookmarks.push(userObj);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
};

const removeUser = (userId) => {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) ?? [];
  const updatedBookmarks = bookmarks.filter((user) => user.id !== userId);
  localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
};

const renderBookmarks = () => {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) ?? [];
  const html = bookmarks
    .map(
      (user) => `
      <article class="boder rounded-xl shadow-indigo-950 shadow-2xl bg-indigo-900 py-5 px-8 space-y-2"
      style="background-color: oklch(from #312c85 l c ${
        Math.abs(user.address.geo.lng) + 30
      });"
     >
        <header>
          <h2>${user.name}</h2>
        </header>
        <div class="flex">
          <div class="h-18 w-18 rounded-full">
            <img class=" h-full w-full mask-radial-[100%_100%] mask-radial-from-50% mask-radial-at-left"
              src="https://avatar.iran.liara.run/public/${user.id}" alt="">
          </div>
          <ul>
            <li>Username: ${user.username}</li>
            <li>City: ${user.address.city}</li>
            <li>Website: <a href="${
              user.website
            } target="_blank" rel="noopener noreferrer">${user.website}</a></li>
          </ul>
        </div>
        <hgroup class="mt-5">
          <h3 class="font-semibold">${user.company.catchPhrase}</h3>
          <p>${user.company.bs}</p>
        </hgroup>
        <div class="text-right">
          <button data-user-id="${
            user.id
          }" class="border rounded py-2 px-4 cursor-pointer">remove</button>
        </div>
      </article>
    `
    )
    .join("");
  cardContainer.innerHTML = html;
};

renderBookmarks();
window.onload = () => {
  fetchData();
};
