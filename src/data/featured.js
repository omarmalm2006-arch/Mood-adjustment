import { products, categories } from "./product.js";

const productsContainer = document.querySelector("#featured-products");
const searchInput = document.querySelector("#drink-search");
const categoryFilter = document.querySelector("#category-filter");
const sortFilter = document.querySelector("#sort-filter");
const priceFilter = document.querySelector("#price-filter");
const priceValue = document.querySelector("#price-value");
const emptyMessage = document.querySelector("#empty-message");
const menuCards = document.querySelectorAll("#menu .liquid-card");

// -------------------------------------------------------------
// Cart State & Dynamic Header Badge
// -------------------------------------------------------------
const cart = [];
const cartButton =
  document.querySelector("#cart-btn") ||
  document.querySelector('button[aria-label="Shopping cart"]');
const cartCountBadge =
  document.querySelector("#cart-count") ||
  cartButton?.querySelector("span");

function updateCartBadge() {
  if (!cartCountBadge) return;
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountBadge.textContent = totalQuantity;
  cartCountBadge.classList.toggle("hidden", totalQuantity === 0);
  cartCountBadge.classList.toggle("flex", totalQuantity > 0);
}

function addToCart(product, quantity) {
  const existingItem = cart.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    });
  }
  updateCartBadge();

  // Pulse animation on header cart button
  if (cartButton) {
    cartButton.classList.add("scale-125");
    setTimeout(() => cartButton.classList.remove("scale-125"), 300);
  }
}

// -------------------------------------------------------------
// Favorites State & Dynamic Header Badge
// -------------------------------------------------------------
const favoriteIds = new Set();
const favButton =
  document.querySelector("#fav-btn") ||
  document.querySelector('button[aria-label="Favorites"]');
const favCountBadge =
  document.querySelector("#fav-count") ||
  favButton?.querySelector("span");

function updateFavBadge() {
  if (!favCountBadge) return;
  const totalFavs = favoriteIds.size;
  favCountBadge.textContent = totalFavs;
  favCountBadge.classList.toggle("hidden", totalFavs === 0);
  favCountBadge.classList.toggle("flex", totalFavs > 0);
}

function toggleFavorite(productId) {
  const wasFavorited = favoriteIds.has(productId);
  if (wasFavorited) {
    favoriteIds.delete(productId);
  } else {
    favoriteIds.add(productId);
    // Pulse animation on header favorites button when an item is added
    if (favButton) {
      favButton.classList.add("scale-125");
      setTimeout(() => favButton.classList.remove("scale-125"), 300);
    }
  }
  updateFavBadge();
  return !wasFavorited;
}

// Initialize badges
updateCartBadge();
updateFavBadge();

// Helper to flash card container with light highlight upon add
function flashCardHighlight(card, colorClass = "bg-[#fef3c7]") {
  card.classList.remove("bg-[#fffaf4]");
  card.classList.add(colorClass);
  setTimeout(() => {
    card.classList.remove(colorClass);
    card.classList.add("bg-[#fffaf4]");
  }, 600);
}

// -------------------------------------------------------------
// Category Cards Sync & Interaction
// -------------------------------------------------------------
const cardCategoryMap = {
  "hot coffee": "hot-coffee",
  "iced coffee": "iced-coffee",
  frappe: "frappes",
  frappes: "frappes",
  tea: "tea",
  juice: "fresh-juice",
  "fresh juice": "fresh-juice",
  smoothie: "smoothies",
  smoothies: "smoothies",
};

menuCards.forEach((card) => {
  card.classList.remove("hover:bg-[#7f3a1f]");

  if (!card.dataset.category) {
    const titleText = card.querySelector("h3")?.textContent.trim().toLowerCase() || "";
    if (cardCategoryMap[titleText]) {
      card.dataset.category = cardCategoryMap[titleText];
    }
  }

  card.addEventListener("click", () => {
    const cardCategory = card.dataset.category;
    if (!cardCategory || !categoryFilter) return;

    if (categoryFilter.value === cardCategory) {
      categoryFilter.value = "all";
    } else {
      categoryFilter.value = cardCategory;
    }

    updateProducts();
  });
});

function syncActiveCategoryCards(selectedCategory) {
  menuCards.forEach((card) => {
    const isMatch =
      selectedCategory !== "all" &&
      card.dataset.category?.toLowerCase() === selectedCategory;
    card.classList.toggle("active", Boolean(isMatch));
  });
}

// Populate category <select> options
categories.forEach((category) => {
  const option = document.createElement("option");

  option.value = category.id;
  option.textContent = category.name;

  categoryFilter.appendChild(option);
});

// -------------------------------------------------------------
// Render Products
// -------------------------------------------------------------
function renderProducts(productsList) {
  productsContainer.innerHTML = "";

  emptyMessage.classList.toggle("hidden", productsList.length !== 0);

  productsList.forEach((product) => {
    const card = document.createElement("article");
    const isProductFav = favoriteIds.has(product.id);

    card.className =
      "min-w-0 overflow-hidden rounded-xl border border-[#e8d9c9] bg-[#fffaf4] shadow-sm transition-all duration-300 hover:shadow-lg";

    card.innerHTML = `
      <div class="relative aspect-[4/3] overflow-hidden sm:aspect-auto sm:h-44">
        <img
          src="${product.image}"
          alt="${product.name}"
          class="size-full object-cover transition-transform duration-500 hover:scale-105"
        >

        <button
          type="button"
          aria-label="${isProductFav ? "Remove from" : "Add to"} favorites"
          class="favorite-btn cursor-pointer absolute right-3 top-3 rounded-full bg-[#fffaf4] p-2 transition-transform duration-300 hover:scale-110"
        >
          <img
            src="${isProductFav ? "src/assets/icon/heart-filled.svg" : "src/assets/icon/heart.svg"}"
            alt=""
            class="size-5"
          >
        </button>
      </div>

      <div class="min-w-0 p-3">
        <h3 class="truncate text-sm font-bold text-[#1c110d]">
          ${product.name}
        </h3>

        <p class="mt-1 line-clamp-2 min-h-8 text-xs text-stone-600">
          ${product.description}
        </p>

        <div class="mt-3 flex flex-wrap items-center justify-between gap-2">
          <div class="flex items-center gap-1.5 text-xs">
            <img
              src="src/assets/icon/star.svg"
              alt=""
              class="size-4 shrink-0"
            >

            <span class="font-semibold">${product.rating}</span>
          </div>

          <span class="text-sm font-bold text-[#1c110d]">
            ${product.price} EGP
          </span>
        </div>

        <div class="mt-4 flex flex-wrap items-center gap-2">
          <div class="flex h-9 shrink-0 items-center rounded-lg border border-[#e4d7c9]">
            <button
              type="button"
              class="quantity-minus h-full cursor-pointer px-3 text-stone-600"
              aria-label="Decrease quantity"
            >
              −
            </button>

            <span class="quantity-value px-1 text-xs">1</span>

            <button
              type="button"
              class="quantity-plus h-full cursor-pointer px-3 text-stone-600"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <button
            type="button"
            class="add-to-cart cursor-pointer flex h-9 min-w-0 flex-1 items-center justify-center gap-2 rounded-lg bg-[#542a1d] px-2 text-xs text-white transition-colors duration-300 hover:bg-[#7f3a1f]"
          >
            <img
              src="src/assets/icon/shopping-cart.svg"
              alt=""
              class="size-4 shrink-0 brightness-0 invert"
            >

            <span class="add-to-cart-text truncate">Add to Cart</span>
          </button>
        </div>
      </div>
    `;

    const quantityValue = card.querySelector(".quantity-value");

    let quantity = 1;

    card.querySelector(".quantity-minus").addEventListener("click", () => {
      if (quantity > 1) {
        quantity--;
        quantityValue.textContent = quantity;
      }
    });

    card.querySelector(".quantity-plus").addEventListener("click", () => {
      quantity++;
      quantityValue.textContent = quantity;
    });

    // Favorite Button Handler
    const favoriteButton = card.querySelector(".favorite-btn");
    const favoriteIcon = favoriteButton.querySelector("img");

    favoriteButton.addEventListener("click", () => {
      const nowFav = toggleFavorite(product.id);

      favoriteIcon.src = nowFav
        ? "src/assets/icon/heart-filled.svg"
        : "src/assets/icon/heart.svg";

      favoriteButton.setAttribute(
        "aria-label",
        `${nowFav ? "Remove" : "Add"} ${product.name} ${nowFav ? "from" : "to"} favorites`
      );

      // Flash card with a soft light tint to highlight addition to favorites
      if (nowFav) {
        flashCardHighlight(card, "bg-[#fef3c7]");
      }
    });

    // Add to Cart Button Handler
    const addToCartBtn = card.querySelector(".add-to-cart");
    const addToCartText = card.querySelector(".add-to-cart-text");

    addToCartBtn.addEventListener("click", () => {
      addToCart(product, quantity);

      // Flash card container with soft light highlight upon addition
      flashCardHighlight(card, "bg-[#fef9c3]");

      if (addToCartText) {
        addToCartText.textContent = `Added (${quantity})`;
        setTimeout(() => {
          addToCartText.textContent = "Add to Cart";
        }, 900);
      }

      quantity = 1;
      quantityValue.textContent = quantity;
    });

    productsContainer.appendChild(card);
  });
}

// -------------------------------------------------------------
// Filter & Sort Products
// -------------------------------------------------------------
function updateProducts() {
  const searchText = searchInput ? searchInput.value.trim().toLowerCase() : "";
  const selectedCategory = categoryFilter ? categoryFilter.value.toLowerCase() : "all";
  const maxPrice = priceFilter && priceFilter.value ? Number(priceFilter.value) : Infinity;
  const sortBy = sortFilter ? sortFilter.value : "rating";

  syncActiveCategoryCards(selectedCategory);

  let filteredProducts = products.filter((product) => {
    const matchesSearch =
      !searchText || product.name.toLowerCase().includes(searchText);

    const productCategory = String(
      product.category ?? product.categoryId ?? ""
    ).toLowerCase();
    const matchesCategory =
      !selectedCategory ||
      selectedCategory === "all" ||
      productCategory === selectedCategory;

    const matchesPrice = Number(product.price) <= maxPrice;
    const isAvailable = product.isAvailable !== false;

    return isAvailable && matchesSearch && matchesCategory && matchesPrice;
  });

  if (sortBy === "price-low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "name") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  renderProducts(filteredProducts);
}

// Events
searchInput?.addEventListener("input", updateProducts);
categoryFilter?.addEventListener("change", updateProducts);
sortFilter?.addEventListener("change", updateProducts);

priceFilter?.addEventListener("input", () => {
  if (priceValue) {
    priceValue.textContent = priceFilter.value;
  }
  updateProducts();
});

// Initial render
updateProducts();
