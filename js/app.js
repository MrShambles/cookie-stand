// Constructor function for the salmon cookie stand
function SalmonCookieStand(name, phone, location, hours, minCustomers, maxCustomers, avgSale) {
  this.name = name;
  this.phone = phone;
  this.location = location;
  this.hours = hours;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgSale = avgSale;
}

// Define the total cookies sold per city object
let totalCookiesPerCity = {};

// Initialize salmon cookie stands
let seattle = new SalmonCookieStand("Seattle", "123-456-7890", "2901 3rd Ave #300, Seattle, WA 98121", "6am-7pm", 23, 65, 6.3);
let tokyo = new SalmonCookieStand("Tokyo", "222-222-2222", "1 Chrome-1-2 Oshiage, Sumida City, Tokyo 131-8634", "6am-7pm", 3, 24, 1.2);
let dubai = new SalmonCookieStand("Dubai", "333-333-3333", "1 Sheikh Mohammed bin Rashid Blvd - Dubai", "6am-7pm", 11, 38, 3.7);
let paris = new SalmonCookieStand("Paris", "444-444-4444", "Champ de Marrs, 5 Avenue Anatole France, 75007 Paris", "6am-7pm", 20, 38, 2.3);
let lima = new SalmonCookieStand("Lima", "555-555-5555", "Ca. Gral. Borgoño cuadra 8, Miraflores 15074", "6am-7pm", 2, 16, 4.6);

// Display the city information on the webpage
function displayCityInfo() {
  // Get the container element where the city info will be displayed
  let cityInfoContainer = document.getElementById('city-info');

  // Create elements for each city and append them to the container
  [seattle, tokyo, dubai, paris, lima].forEach((city, index) => {
    let cityDiv = document.createElement('div');
    cityDiv.classList.add('city-info');
    if (index > 0) {
      cityDiv.classList.add('no-border-top'); // Add class to remove border top
    }

    let nameElement = document.createElement('p');
    nameElement.textContent = `${city.name}`;
    nameElement.classList.add('city-name'); // Add class for city name

    let hoursElement = document.createElement('p');
    hoursElement.textContent = `Hours Open: ${city.hours}`;

    let phoneElement = document.createElement('p');
    phoneElement.textContent = `Contact Info: ${city.phone}`;

    let addressElement = document.createElement('p');
    addressElement.textContent = `Location: ${city.location}`;

    cityDiv.appendChild(nameElement);
    cityDiv.appendChild(hoursElement);
    cityDiv.appendChild(phoneElement);
    cityDiv.appendChild(addressElement);

    cityInfoContainer.appendChild(cityDiv);
  });
}

// Call the function to display city information
displayCityInfo();
