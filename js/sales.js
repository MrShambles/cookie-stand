// Constructor function for the salmon cookie stand
function SalmonCookieStand(name, phone, location, hours, minCustomers, maxCustomers, avgSale) {
  this.name = name;
  this.phone = phone;
  this.location = location;
  this.hours = hours;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgSale = avgSale;
  this.cookiesPurchasedPerHour = [];
}

// Method to simulate cookies purchased for a location
SalmonCookieStand.prototype.simulateCookiesPurchased = function() {
  let hours = this.hours.split(', ');
  let minCustomers = this.minCustomers;
  let maxCustomers = this.maxCustomers;
  let avgSale = this.avgSale;

  let totalCookiesSold = []; // Initialize an array to store total cookies sold for each hour

  hours.forEach(hour => {
    let customers = getRandomNumberBetween(minCustomers, maxCustomers);
    let cookiesSold = Math.round(customers * avgSale);
    totalCookiesSold.push(cookiesSold); // Store cookies sold for each hour
  });

  this.cookiesPurchasedPerHour = totalCookiesSold; // Update the cookiesPurchasedPerHour array

  // Store the total cookies sold for this city
  totalCookiesPerCity[this.name] = totalCookiesSold;
};

// Method to render store's row in the table
SalmonCookieStand.prototype.render = function(tableBody) {
  let row = document.createElement('tr');
  let totalCookies = 0;

  let tdName = document.createElement('td');
  tdName.textContent = this.name;
  row.appendChild(tdName);

  this.cookiesPurchasedPerHour.forEach(cookies => {
    let td = document.createElement('td');
    td.textContent = cookies;
    row.appendChild(td);
    totalCookies += cookies; // Update total cookies sold
  });

  // Display total cookies sold per store
  let tdTotal = document.createElement('td');
  tdTotal.textContent = totalCookies;
  row.appendChild(tdTotal);

  tableBody.appendChild(row);
};

// Function to create and append header row to the table
function createHeaderRow(tableHeader) {
  let headerRow = document.createElement('tr');
  let headerHours = document.createElement('th');
  headerHours.textContent = 'Locations';
  headerRow.appendChild(headerHours);

  let hours = '6am, 7am, 8am, 9am, 10am, 11am, 12pm, 1pm, 2pm, 3pm, 4pm, 5pm, 6pm, 7pm'.split(', ');
  hours.forEach(hour => {
    let th = document.createElement('th');
    th.textContent = hour;
    headerRow.appendChild(th);
  });

  let thTotal = document.createElement('th');
  thTotal.textContent = 'Location Totals';
  thTotal.classList.add('grey-column'); // Add class to identify last column header cell
  headerRow.appendChild(thTotal);

  tableHeader.appendChild(headerRow);
}

// Function to create and append footer row to the table
function createFooterRow(tableFooter) {
  let footerRow = document.createElement('tr');
  let footerTotal = document.createElement('td');
  footerTotal.textContent = 'Hourly Totals for All Locations';
  footerRow.appendChild(footerTotal);

  // Initialize an array to store the hourly totals for all stores
  let hourlyTotals = calculateTotalCookies();

  // Add the hourly totals to the footer row
  hourlyTotals.forEach(total => {
    let td = document.createElement('td');
    td.textContent = total;
    footerRow.appendChild(td);
  });

  // Calculate and add the grand total
  let grandTotal = hourlyTotals.reduce((acc, curr) => acc + curr, 0);
  let tdGrandTotal = document.createElement('td');
  tdGrandTotal.textContent = grandTotal;
  tdGrandTotal.classList.add('location-totals', 'grey-column'); // Add classes here
  footerRow.appendChild(tdGrandTotal);

  tableFooter.appendChild(footerRow);

  // Add class to the last column cells
  let lastColumnCells = footerRow.querySelectorAll('td:last-child');
  lastColumnCells.forEach(cell => {
    cell.classList.add('grey-column'); // Add class to identify last column cells
  });
}

// Function to update the footer row content
function updateFooterContent() {
  let footerRow = tableFooter.querySelector('tr');
  footerTotal.textContent = "Hourly Total for All Locations";
  let hourlyTotals = calculateTotalCookies();

  // Update the hourly totals in the footer row
  footerRow.querySelectorAll('td:not(:last-child)').forEach((td, index) => {
    td.textContent = hourlyTotals[index];
  });

  // Calculate and update the grand total
  let grandTotal = hourlyTotals.reduce((acc, curr) => acc + curr, 0);
  footerRow.querySelector('td:last-child').textContent = grandTotal;
}

// Event listener for form submission
document.getElementById('new-store-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission behavior

  // Retrieve form data
  let formData = new FormData(event.target);

  let storeName = formData.get('store-name');
  let minCustomers = parseInt(formData.get('min-customers'));
  let maxCustomers = parseInt(formData.get('max-customers'));
  let avgSale = parseFloat(formData.get('avg-sale'));

  // Create a new instance of SalmonCookieStand
  let newStore = new SalmonCookieStand(storeName, null, null, "6am, 7am, 8am, 9am, 10am, 11am, 12pm, 1pm, 2pm, 3pm, 4pm, 5pm, 6pm, 7pm", minCustomers, maxCustomers, avgSale); // Set phone, location, and hours as null

  // Simulate cookies purchased for the new store and store the data
  newStore.simulateCookiesPurchased();

  // Render the new store row in the table body
  newStore.render(tableBody);

  // Update the footer content
  updateFooterContent();
});

// Function to get a random number between a given range
function getRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Function to calculate the total cookies sold for all hours across all stores
function calculateTotalCookies() {
  let hourlyTotals = new Array(14).fill(0);

  // Iterate through each store
  for (let city in totalCookiesPerCity) {
    let storeData = totalCookiesPerCity[city];
    // Iterate through each hour's data for the store
    for (let i = 0; i < storeData.length; i++) {
      // Add the hourly total to the corresponding index in the array
      hourlyTotals[i] += storeData[i];
    }
  }

  return hourlyTotals;
}

// Define the total cookies sold per city object
let totalCookiesPerCity = {};

// Initialize salmon cookie stands
let seattle = new SalmonCookieStand("Seattle", "123-456-7890", "2901 3rd Ave #300, Seattle, WA 98121", "6am, 7am, 8am, 9am, 10am, 11am, 12pm, 1pm, 2pm, 3pm, 4pm, 5pm, 6pm, 7pm", 23, 65, 6.3);
let tokyo = new SalmonCookieStand("Tokyo", "222-222-2222", "1 Chrome-1-2 Oshiage, Sumida City, Tokyo 131-8634", "6am, 7am, 8am, 9am, 10am, 11am, 12pm, 1pm, 2pm, 3pm, 4pm, 5pm, 6pm, 7pm", 3, 24, 1.2);
let dubai = new SalmonCookieStand("Dubai", "333-333-3333", "1 Sheikh Mohammed bin Rashid Blvd - Dubai", "6am, 7am, 8am, 9am, 10am, 11am, 12pm, 1pm, 2pm, 3pm, 4pm, 5pm, 6pm, 7pm", 11, 38, 3.7);
let paris = new SalmonCookieStand("Paris", "444-444-4444", "Champ de Marrs, 5 Avenue Anatole France, 75007 Paris", "6am, 7am, 8am, 9am, 10am, 11am, 12pm, 1pm, 2pm, 3pm, 4pm, 5pm, 6pm, 7pm", 20, 38, 2.3);
let lima = new SalmonCookieStand("Lima", "555-555-5555", "Ca. Gral. Borgoño cuadra 8, Miraflores 15074", "6am, 7am, 8am, 9am, 10am, 11am, 12pm, 1pm, 2pm, 3pm, 4pm, 5pm, 6pm, 7pm", 2, 16, 4.6);

// Simulate cookies purchased for each location and store the data
seattle.simulateCookiesPurchased();
tokyo.simulateCookiesPurchased();
dubai.simulateCookiesPurchased();
paris.simulateCookiesPurchased();
lima.simulateCookiesPurchased();

// Display the table
let table = document.createElement('table');
let tableHeader = document.createElement('thead');
let tableBody = document.createElement('tbody');
let tableFooter = document.createElement('tfoot');

// Create header row
createHeaderRow(tableHeader);

// Render store rows in the table body
seattle.render(tableBody);
tokyo.render(tableBody);
dubai.render(tableBody);
paris.render(tableBody);
lima.render(tableBody);

// Create footer row
createFooterRow(tableFooter);

// Append header, body, and footer to the table
table.appendChild(tableHeader);
table.appendChild(tableBody);
table.appendChild(tableFooter);

// Append the table to the document body
document.body.appendChild(table);
