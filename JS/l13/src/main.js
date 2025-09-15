import { renderError, renderProducts } from "./ui.js";
import { API_URL } from "./network.js";
import { productGrid } from "./global.js";

const errorMessage = "Failed to load products. Please try again later.";

document.addEventListener("DOMContentLoaded", () => {
  fetch(API_URL) //
    .then((response) => response.json())
    .then((data) => {
      // took the first 9 items from the data
      const products = data.slice(0, 9);
      renderProducts(products, productGrid);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
      // The error object itself is not a string, so we'll use a generic message << defined at top
      renderError(errorMessage, productGrid);
    });
});
