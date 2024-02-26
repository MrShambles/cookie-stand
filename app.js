let seattle = {
  name: "Seattle",
  phone: "123-456-7890",
  location: "2901 3rd Ave #300, Seattle, WA 98121",
  hours: "6am, 7am, 8am, 9am, 10am, 11am, 12pm, 1pm, 2pm, 3pm, 4pm, 5pm, 6pm, 7pm",
  minCustomers: 23,
  maxCustomers: 65,
  avgSale: 6.3,
  cookiesPurchasedPerHour: [], 
};

let tokyo = {
  name: "Tokyo",
  phone: "222-222-2222",
  location: "1 Chrome-1-2 Oshiage, Sumida City, Tokyo 131-8634",
  hours: "6am, 7am, 8am, 9am, 10am, 11am, 12pm, 1pm, 2pm, 3pm, 4pm, 5pm, 6pm, 7pm",
  minCustomers: 3,
  maxCustomers: 24,
  avgSale: 1.2,
  cookiesPurchasedPerHour: [], 
};

let dubai = {
  name: "Dubai",
  phone: "333-333-3333",
  location: "1 Sheikh Mohammed bin Rashid Blvd - Dubai",
  hours: "6am, 7am, 8am, 9am, 10am, 11am, 12pm, 1pm, 2pm, 3pm, 4pm, 5pm, 6pm, 7pm",
  minCustomers: 11,
  maxCustomers: 38,
  avgSale: 3.7,
  cookiesPurchasedPerHour: [],
};

let paris = {
  name: "Paris",
  phone: "444-444-4444",
  location: "Champ de Marrs, 5 Avenue Anatole France, 75007 Paris",
  hours: "6am, 7am, 8am, 9am, 10am, 11am, 12pm, 1pm, 2pm, 3pm, 4pm, 5pm, 6pm, 7pm",
  minCustomers: 20,
  maxCustomers: 38,
  avgSale: 2.3,
  cookiesPurchasedPerHour: [], 
};

let lima = {
  name: "Lima",
  phone: "555-555-5555",
  location: "Ca. Gral. Borgoño cuadra 8, Miraflores 15074", 
  hours: "6am, 7am, 8am, 9am, 10am, 11am, 12pm, 1pm, 2pm, 3pm, 4pm, 5pm, 6pm, 7pm",
  minCustomers: 2,
  maxCustomers: 16,
  avgSale: 4.6,
  cookiesPurchasedPerHour: [], 
};




// Define the total cookies sold per city object
let totalCookiesPerCity = {};

// Function to simulate cookies purchased for a location
function simulateCookiesPurchased(location) {
  let hours = location.hours.split(', '); 
  let minCustomers = location.minCustomers;
  let maxCustomers = location.maxCustomers;
  let avgSale = location.avgSale;

  let totalCookiesSold = 0; // Initialize total cookies sold for this city

  hours.forEach(hour => {
    let customers = getRandomNumberBetween(minCustomers, maxCustomers);
    let cookiesSold = Math.round(customers * avgSale);
    location.cookiesPurchasedPerHour.push(cookiesSold);
    totalCookiesSold += cookiesSold; // Update total cookies sold for this city
  });

  // Store the total cookies sold for this city
  totalCookiesPerCity[location.name] = totalCookiesSold;
}

// Function to get a random number between a given range
function getRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Function to display cookies purchased per hour for a location
function displayCookiesPerHour(location) {
  let container = document.createElement('div');
  let title = document.createElement('h2');
  title.textContent = `${location.name}`;
  title.classList.add('city-name');
  container.appendChild(title);

  let list = document.createElement('ul');
  let totalCookies = 0; // Variable to store the total cookies sold

  location.cookiesPurchasedPerHour.forEach((cookies, index) => {
    let listItem = document.createElement('li');
    listItem.textContent = `${location.hours.split(', ')[index]}: ${cookies} cookies`;
    list.appendChild(listItem);
    totalCookies += cookies; // Update total cookies sold
  });


  // Display total cookies sold per city
  let totalCookiesPerCityItem = document.createElement('li');
  totalCookiesPerCityItem.textContent = `Total: ${totalCookiesPerCity[location.name]}`;
  list.appendChild(totalCookiesPerCityItem);

  container.appendChild(list);
  document.body.appendChild(container);
}

function displayCityInfo(location) {
  let container = document.createElement('div');
  let title = document.createElement('h2');
  title.textContent = `${location.name}`;
  title.classList.add('city-name');
  container.appendChild(title);

  let list = document.createElement('ul');
  let hoursItem = document.createElement('li');
  let contactInfoItem = document.createElement('li');
  let locationItem = document.createElement('li');

  let firstHour = location.hours.split(', ')[0];
  let lastHour = location.hours.split(', ')[location.hours.split(', ').length - 1];
  hoursItem.textContent = `Hours Open: ${firstHour}-${lastHour}`;
  contactInfoItem.textContent = `Contact info: ${location.phone}`;
  locationItem.textContent = `Location: ${location.location}`;

  list.appendChild(hoursItem);
  list.appendChild(contactInfoItem);
  list.appendChild(locationItem);

  container.appendChild(list);
  document.body.appendChild(container);
}


simulateCookiesPurchased(seattle);
simulateCookiesPurchased(tokyo);
simulateCookiesPurchased(dubai);
simulateCookiesPurchased(paris);
simulateCookiesPurchased(lima);


