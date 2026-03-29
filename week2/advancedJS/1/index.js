import { baseUrl } from "./variables.js";
import { fetchData } from "./utils.js";
import { restaurantRow, restaurantModal } from "./components.js";

const table = document.querySelector("table");
const dialog = document.querySelector("dialog");

// Fetch restaurant list from API
const fetchRestaurants = async () => {
  const data = await fetchData(`${baseUrl}/api/v1/restaurants`);
  return data ?? [];
};
// Render restaurant list in sorted order
const renderRestaurants = (restaurants) => {
  restaurants.sort((a, b) => a.name.localeCompare(b.name));

  restaurants.forEach((restaurant) => {
    const row = restaurantRow(restaurant);

    row.addEventListener("click", () => {
      document
        .querySelectorAll("tr")
        .forEach((tr) => tr.classList.remove("highlight"));

      row.classList.add("highlight");
      fetchAndShowMenu(restaurant);
    });

    table.appendChild(row);
  });
};

// Fetch menu for selected restaurant
const fetchMenu = async (restaurant) => {
  const data = await fetchData(
    `${baseUrl}/api/v1/restaurants/daily/${restaurant._id}/en`
  );

  return data ?? {};
};

// Show modal with details + menu
const fetchAndShowMenu = async (restaurant) => {
  const menu = await fetchMenu(restaurant);

  dialog.innerHTML = restaurantModal(restaurant, menu);

  dialog.querySelector("#close-btn").addEventListener("click", () => {
    dialog.close();
  });

  dialog.showModal();
};

const init = async () => {
  const restaurants = await fetchRestaurants();
  renderRestaurants(restaurants);
};

init();