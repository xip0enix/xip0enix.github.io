// Define the API endpoint and the search term
const api = 'https://mint-api.onrender.com/api/veranstaltungen';
const ort = 'Online';

// Function to fetch and display the events
function getMINT(){
  // Zeige den Ladebildschirm an
  const loadingScreen = document.getElementById('loading-screen');
  // Show the loading screen
  loadingScreen.style.display = 'block';

  fetch(api)
    .then(response => response.json())
    .then(data => {
      // Hide the loading screen
      loadingScreen.style.display = 'none';

      // Get the events table body element
      const eventsTableBody = document.getElementById('events-table-body');

      // Loop through each event in the data
      for (let i = 0; i < data.length; i++) {
        // If the event accommodation includes the search term, create a new table row and add the event data to it
        if (data[i].eventAccommodation.includes(ort)) {
          const eventRow = document.createElement('tr');
          const eventName = document.createElement('td');
          eventName.textContent = data[i].title;
          const eventDateRange = document.createElement('td');
          eventDateRange.textContent = data[i].eventRange;
          const eventMonth = document.createElement('td');
          eventMonth.textContent = data[i].eventMonth;
          eventRow.appendChild(eventName);
          eventRow.appendChild(eventDateRange);
          eventRow.appendChild(eventMonth);
          eventsTableBody.appendChild(eventRow);
        }
      }
    });
}

// Call the function to display the events
getMINT();
