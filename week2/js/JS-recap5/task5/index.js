const table = document.querySelector("table");
const dialog = document.querySelector("dialog");

const URL_BASE = "https://media2.edu.metropolia.fi/restaurant";

// Fetch restaurant list from API
async function fetchRestaurants() {
  try {
    const response = await fetch(`${URL_BASE}/api/v1/restaurants`);
    if (!response.ok) throw new Error("Failed to load restaurants");

    const restaurants = await response.json();
    return restaurants;
  } catch (error) {
    console.error(error);
    alert("Error fetching restaurants");
    return [];
  }
}

// Render restaurant list in sorted order
function renderRestaurants(restaurants) {
  restaurants.sort((restaurantA, restaurantB) => restaurantA.name.localeCompare(restaurantB.name));

  for (const restaurant of restaurants) {
    const row = document.createElement("tr");
    const nameColumn = document.createElement("td");
    const addressColumn = document.createElement("td");

    nameColumn.textContent = restaurant.name;
    addressColumn.textContent = restaurant.address;

    row.append(nameColumn, addressColumn);

    // Click event to highlight row and show modal
    row.addEventListener("click", function() {
      // Remove highlight from all rows
      for (const row of table.querySelectorAll("tr")) {
        row.classList.remove("highlight");
      }

      row.classList.add("highlight");
      fetchAndShowMenu(restaurant);
    });

    table.appendChild(row);
  }
}

// Fetch menu for selected restaurant
async function fetchMenu(restaurant) {
  try {
    const response = await fetch(
      `${URL_BASE}/api/v1/restaurants/daily/${restaurant._id}/en`
    );

    if (!response.ok) throw new Error("Failed to load menu");

    const data = await response.json();

    return data.courses || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Show modal with details + menu
async function fetchAndShowMenu(restaurant) {
  const menu = await fetchMenu(restaurant);

  let html = `
    <h2>${restaurant.name}</h2>
    <p><strong>Address:</strong> ${restaurant.address}</p>
    <p><strong>Postal code:</strong> ${restaurant.postalCode}</p>
    <p><strong>City:</strong> ${restaurant.city}</p>
    <p><strong>Phone:</strong> ${restaurant.phone}</p>
    <p><strong>Company:</strong> ${restaurant.company}</p>
    <h3>Menu for today:</h3>
  `;

  if (menu && menu.courses && menu.courses.length > 0) {
    html += "<ul>";

    for (const item of menu.courses) {
      html += `<li>${item.name} — ${item.price}</li>`;
    }
    html += "</ul>";
  } else {
    html += "<p>No menu available today.</p>";
  }

  html += `<button id="close-btn">Close</button>`;

  dialog.innerHTML = html;

  const closeBtn = dialog.querySelector("#close-btn");
  closeBtn.addEventListener("click", function() {
    dialog.close();
  });

  dialog.showModal();
}

async function init() {
  const restaurants = await fetchRestaurants();
  console.log(restaurants);
  renderRestaurants(restaurants);
}
init();