$(document).ready(function () {
  doit();
});

function doit() {
  fetch("http://localhost:5152/api/User")
      .then(response => {
          // Check if the request was successful (status code 200-299)
          if (!response.ok) {
              throw new Error(HTTP error! Status: ${response.status});
          }

          // Parse the response as JSON
          return response.json();
      })
      .then(data => {
          // Handle the data from the response
          console.log('Data received js:', data);
      })
      .catch(error => {
          // Handle any errors that occurred during the fetch
          console.error('Fetch error:', error);
      });
}
function dojquery() {
  $.ajax({
      url: "http://localhost:5152/api/User",
      type: "GET",
      crossDomain: true, // Enable CORS
      dataType: "json", // Expected data type
      success: function (data) {
          // Callback function executed on successful response
          console.log("Data received jquery:", data);

          // Manipulate the data or update the DOM as needed
          $("#result").text(data.someProperty);
      },
      error: function (xhr, status, error) {
          // Callback function executed on error
          console.error("GET request failed:", status, error);
      }
  });
}