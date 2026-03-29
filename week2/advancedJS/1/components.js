export const restaurantRow = (restaurant) => {
  const { name, address } = restaurant;

  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${name}</td>
    <td>${address}</td>
  `;

  return tr;
};

export const restaurantModal = (restaurant, menu) => {
  const {
    name,
    address,
    postalCode,
    city,
    phone,
    company
  } = restaurant;

  const { courses } = menu ?? {};

  let menuHtml = "";

  if (courses?.length > 0) {
    menuHtml = "<ul>";
    courses.forEach(({ name, price }) => {
      menuHtml += `<li>${name} — ${price ?? "?"}</li>`;
    });
    menuHtml += "</ul>";
  } else {
    menuHtml = "<p>No menu available today.</p>";
  }

  return `
    <h2>${name}</h2>
    <p><strong>Address:</strong> ${address}</p>
    <p><strong>Postal code:</strong> ${postalCode}</p>
    <p><strong>City:</strong> ${city}</p>
    <p><strong>Phone:</strong> ${phone ?? "N/A"}</p>
    <p><strong>Company:</strong> ${company}</p>
    <h3>Menu for today:</h3>
    ${menuHtml}
    <button id="close-btn">Close</button>
  `;
};