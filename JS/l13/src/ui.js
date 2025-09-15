function renderProducts(products, productGrid) {
  products.forEach((product) => {
    const tile = document.createElement("div");
    tile.className =
      "bg-zinc-300 rounded-lg shadow-md overflow-hidden text-center transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg";
    tile.innerHTML = `
                    <img src="${product.image}" alt="${
      product.title
    }" class="w-full h-48 object-contain p-5">
                    <div class="p-4 border-t border-gray-200">
                        <h3 class="text-lg font-normal truncate">${
                          product.title
                        }</h3>
                        <p class="text-xl font-semibold text-amber-600 mt-2">$${product.price.toFixed(
                          2
                        )}</p>
                    </div>
                `;
    productGrid.appendChild(tile);
  });
}

function renderError(error, productGrid) {
  const errorMessage = document.createElement("p");
  errorMessage.className = "text-red-500 text-center";
  errorMessage.textContent = error;
  productGrid.appendChild(errorMessage);
}

export { renderProducts, renderError };
