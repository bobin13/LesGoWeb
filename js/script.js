$(document).ready(function () {
  var users = GetAllUser();
});

function GetAllUser() {
  $.ajax({
      url: "http://localhost:5152/api/Ride/1b34c131-ee30-4643-8a4e-6d961b4d8288",
      type: "GET",
      crossDomain: true, // Enable CORS
      dataType: "json", // Expected data type
      success: function (data) {
          // Callback function executed on successful response
          console.log("Data received jquery:", data);
          displayRidesData(data);
      },
      error: function (xhr, status, error) {
          // Callback function executed on error
          console.error("GET request failed:", status, error);
          return null;
      }
  });
}
//function to populate ride list.
function displayRidesData(data) {
  $.each(data, function (index, ride) {
      var date = new Date(parseInt(ride.rideTimeString)).toLocaleDateString();
      var newListItem = $(<li class="list-group-item" >Date:${date} | Riders: ${ride.users.length}</li>);
      $("#rideList").append(newListItem);
  });
}

function displayListData(data) {
  $.each(data, function (index, item) {

      var newListItem = $(<li class="list-group-item" >${item.name}</li>);
      $("#rideList").append(newListItem);
  });
}