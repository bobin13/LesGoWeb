var userId = "";
$(document).ready(function () {
    let datepicker = $('#datepicker').datepicker();

    var temp = window.location.href.split('=');
    userId = temp[1];

    setAllListners();

});

function setAllListners() {
    $('#find').click(function () {
        let date = $('#datepicker').val();
        //only run logic when date is selected
        if (date != "") {
            var d = +new Date(date);
            console.log(d);
        }
        var origin = document.getElementById('originInput').value;
        var destination = document.getElementById('destinationInput').value;
        console.log(origin + " " + destination);

        if (origin != undefined && destination != undefined) {
            getAllRides(origin, destination);

        }

    });

}

function getAllRides(origin, destination) {

    $.ajax({
        url: `http://localhost:5152/api/Ride/find?origin=${origin}&destination=${destination}`,
        type: "GET",
        crossDomain: true, // Enable CORS
        dataType: "json", // Expected data type
        success: function (data) {
            // Callback function executed on successful response
            console.log("Data received jquery:", data);
            displayRidesData(data);


            //setting listitem click to move to another page with 
            $('.list-group-item').click(function () {
                var rideId = $(this).find('#rideId').text();
                if (rideId != "") {
                    window.location.href = `/Ride.html?id=${rideId}`;

                }

            });
        },
        error: function (xhr, status, error) {
            // Callback function executed on error
            console.error("GET request failed:", status, error);
            return null;
        }
    });
}
//function to populate ride list.
function displayRidesData(data, name = "Unknown") {
    var rideList = $("#rideList");
    rideList.empty();
    $.each(data, function (index, ride) {
        var date = new Date(parseInt(ride.rideTimeString));

        var newListItem = $(`<li class="list-group-item" >
        <p><strong>${ride.origin} > ${ride.destination}</strong></p>
        <p><span>Driver: </span><span><strong>${ride.users[0].name}</strong ></span >
        <p><span>ID:</span><span id="rideId" >${ride.id}</span></p>
        <p>Date: ${date.toLocaleDateString()} | Time: ${date.getHours()}:${date.getMinutes()}</p>
        <p>Riders: ${ride.users.length} | Seats Availbale: ${4 - ride.users.length}</p>
        </li > `);
        rideList.append(newListItem);
    });
}
