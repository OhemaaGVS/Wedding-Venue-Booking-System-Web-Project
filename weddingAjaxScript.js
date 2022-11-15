$(document).ready(function () {



    $('#form').on('submit', function (e) {
        $("#result").empty();
        let startdate = new Date($("#startdate").val());
        let enddate = new Date($("#enddate").val());
        let dates = getDateArray(startdate, enddate);
        let partysize = $("#partysize").val();
        let grade = $("#grade").val();
        e.preventDefault();
        var numberOfAjaxRequests = 0, ajaxResults = [];
        if (dates.length <= 8) {
            for (var singleDate = 0; singleDate < dates.length; singleDate++) {
                let date = dates[singleDate];
                $.ajax({
                    url: 'weddingRequestData.php',
                    type: 'POST',
                    data: { date: date, partysize: partysize, grade: grade },                                                       //$(this).serialize()
                    success: function (response) {
                        ajaxResults.push({ index: date, ajaxData: response });
                        numberOfAjaxRequests += 1;
                        if (numberOfAjaxRequests == dates.length) {
                            let loopIndex = 0;
                            ajaxResults.sort(sortResponseData);
                            while (loopIndex < dates.length) {
                                let data = JSON.parse(ajaxResults[loopIndex].ajaxData);
                                if (data.length == 0) {
                                    $("#result").append("<h1 id='date'>There are no venues available on: " + new Date(ajaxResults[loopIndex].index).toLocaleString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit', weekday: "long" }) + "</h1>");
                                }
                                else {
                                    $("#result").append("<h1 id='date'>These are the venues available on: " + new Date(ajaxResults[loopIndex].index).toLocaleString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit', weekday: "long" }) + "</h1>");
                                    formatVenueData(data, partysize);
                                }
                                loopIndex++;
                            }


                        }

                    }

                });

            }

        }
        if (dates.length > 8) {
            $("#result").append("<h1 id='date'> " + "Please enter a range of dates that cover no more than a one-week period, thank you" + "</h1>");
        }
        if (dates.length == 0) {


            $("#result").append("<h1 id='date'> " + "Please select an end date that is greater than the start date,thank you" + "</h1>");
        }
    })

    function formatVenueData(data, partysize) {
        for (i in data) {


            let numberOfBookings = data[i].number_of_bookings;
            let venueName = data[i].name;
            let weekendPrice = data[i].weekend_price;
            let weekdayPrice = data[i].weekday_price;
            let capacity = data[i].capacity;
            let costPerPerson = data[i].cost;
            let rating = determine_venue_rating(numberOfBookings);

            let date = data[i].date;
            let weekday = determine_day(date);
            let totalVenuePrice = calculateTotalPrice(date, weekdayPrice, weekendPrice, partysize, costPerPerson);
            let venueLicensed = data[i].licensed;
            let imageSource = determineVenueSourceImage(venueName);
            let licensed = determineVenueLicensed(venueLicensed);
            let price_to_show = "";
            if (weekday == true) {
                price_to_show = weekdayPrice + (" (weekday price)");

            }
            else {
                price_to_show = weekendPrice + (" (weekend price)");
            }

            let insertedHtml = "";
            insertedHtml +=
                "<div class='container p-5'>" +
                "<div class='row'>" +
                "<div class='col - lg - 4 col - md - 12 mb - 4'>" +
                "<div class='card h-100 shadow-lg'>" +
                "<div class='card-body'>" +
                "<div class='text-center p-3'>" +
                "<h1>" + venueName + "</h1>" +
                "<image src=" + imageSource + " width=500px height= 500px class='responsive' id='image'>" +
                "<br><br><br><br>" +
                "<h2>" + "♥♥♥♥Details♥♥♥♥: " + "</h2>" +
                "<h4>" + "♥Capacity: " + capacity + "</h4>" +
                "<h4>" + "♥Licensed: " + licensed + "</h4>" +
                "<h4>" + "♥Catering cost per person: £" + costPerPerson + "</h4>" +
                "<h4>" + "♥Price: £" + price_to_show + "</h4>" +
                "<h4>" + "♥Total price: £" + totalVenuePrice + "</h4>" +
                "<h4>" + rating + "</h4>" + "</div></div></div></div></div></div>";
            $("#result").append(insertedHtml);
        }


    }

    function sortResponseData(firstVenue, secondVenue) {
        if (firstVenue.index > (secondVenue.index)) {
            return 1;
        }
        else {
            return -1;
        }

    }

   



    function determine_day(date) {
        let weekday = true;
        let day = new Date(date).toLocaleDateString('en-us', { weekday: "long" });
        if ((day == "Saturday") || (day == "Sunday")) {

            weekday = false;
        }
        return weekday;
    }


    function calculateTotalPrice(date, weekdayPrice, weekendPrice, partysize, costPerPerson) {

        let totalAmount = 0;

        let day = new Date(date).toLocaleDateString('en-us', { weekday: "long" });

        if ((day == "Saturday") || (day == "Sunday")) {
            totalAmount = ((parseInt(partysize) * parseInt(costPerPerson)) + parseInt(weekendPrice));

        }
        else {
            totalAmount = ((parseInt(partysize) * parseInt(costPerPerson)) + parseInt(weekdayPrice));
        }

        return totalAmount;
    }



    function determineVenueLicensed(venueLicensed) {
        if (venueLicensed == 1) {
            return "Yes, it's licensed";

        }
        else {
            return "No, it's not licensed";
        }

    }


 function determineVenueSourceImage(venueName) {
        let imageSource = '';
        if (venueName=="Sea View Tavern")
            {
            imageSource = 'venue5.jpg';
        }
        if (venueName=="Ashby Castle") {
            imageSource = 'venue6.jpg';
        }
        if (venueName=="Hilltop Mansion") {
            imageSource = 'venue8.jpg';
        }
        if (venueName=="Central Plaza") {
            imageSource = 'venue7.jpg';
        }
        if (venueName=="Forest Inn") {
            imageSource = 'venue9.jpg';
        }
        if (venueName=="Southwestern Estate") {
            imageSource = 'venue10.jpg';
        }
        if (venueName=="Fawlty Towers") {
            imageSource = 'venue1.jpg';
        }

        if (venueName=="Haslegrave Hotel") {
            imageSource = 'venue2.jpg';
        }
        if (venueName=="Pacific Towers Hotel") {
            imageSource = 'venue3.jpg';
        }
        if (venueName=="Sky Center Complex") {
            imageSource = 'venue4.jpg';
        }

        return imageSource;
    }


    function getDateArray(startdate, enddate) {
        var array_of_dates = new Array();
        var date = new Date(startdate);
        while (date <= enddate) {
            array_of_dates.push(new Date(date).toLocaleDateString('en-CA'));
            date.setDate(date.getDate() + 1);
        }

        return array_of_dates.sort();
    }



    function determine_venue_rating(numberOfBookings) {

        let rating = "";
        if (parseInt(numberOfBookings) >= 114) {
            rating = "♥Number of times venue has been booked: " + numberOfBookings + "<br>" + "Rating:★★★★★";
        }
        if (parseInt(numberOfBookings) > 114 && parseInt(numberOfBookings) >= 108) {
            rating = "♥Number of times venue has been booked: " + numberOfBookings + "<br>" + "Rating:★★★★";
        }
        if (parseInt(numberOfBookings) < 108) {
            rating = "♥Number of times venue has been booked: " + numberOfBookings + "<br>" + "Rating:★★★";
        }
        return rating;
    }

});
