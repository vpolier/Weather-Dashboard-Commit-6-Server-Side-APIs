$ (document.ready(function () { 
    
}))
   //Search button future.
    $("#search-button").on("click", function () {
        //Get value in input search-value.
        var searchTerm = $("#search-value").val();
        //Empty input field.
        $("#search-value").val("");
        weatherFunction(searchTerm);
        weatherFunction(searchTerm)
});

//Search button enter key future.
$("#search-button").keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode ===13) {
    weatherFunction(searchTerm);
    weatherFunction(searchTerm);        
    }
});

// Pull previous searches from local storage.
var history = JSON.parse (localStorage.getItem("history")) || [];

//Sets history arrey search to correct length
if (history.length > 0) {
    weatherFunction(history[history.length -1]);
}
//Makes a row for each element in history array (searchTearms)
for (var i = 0; i < history.length; i++) {
    createRow(history[i]);
}

//Puts the searched cities underneath the previous searched city
function createRow(text) {
    var listItem = $("<li>").addClass("list-group-item").text(text);
    $(".history").append(listItem);
}

//Listener for list item on click function
$(".history").on("click", "li", function () {
    weatherFunction($(this).text ());
    weatherFunction($(this).text ());
});

function weatherFunction(searchTerm) {

    $.ajax({
      type: "GET",
      url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&appid=9f112416334ce37769e5c8683b218a0d",

        }).then (function (data) {
            //If index of search value does not exit
            if (history.indexOf(searchTerm) === -1) {
                //Push searchValue to history array 
                history.push(searchTerm);
                //Places item pushed into local storage
                localStorage.setItem("history", JSON.stringify(history));
                createRow(searchTerm);
            }

            // Clears out old content
            $("#today").empty();

            var title = $("<h3>").addClass("card-title").text(data.name+"("+new Date().toLocaleDateString() +")");
            var img = $("img").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");

            var card = $("<div>").addClass("card");
            var cardBodyn = $("<div>").addClass("card-body");
            var wind = $("<p>").addClass("cardtext").text("Wind Speed: " + data.wind.speed + "MPH");
            var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
            var temp = $("<p>").addClass("card-text").text("Temperature" + data.main.temp + "K"); 
            console.log(data)
            var lon = data.coord.lon;
            var lat = data.coord.lat;

            $.ajax({
                type: "GET",
                url: "https://api.openweathermap.org/data/2.5/uvi?appid=9f112416334ce37769e5c8683b218a0d&lat=" + lat + "&lon=" + lon,

        }).then(function (response) {
            console.log(response);

            var uvColor;
            var uvResponse = response.value;
            var uvIndex = $("<p>").addClass("card-text").text("UV Index: ");
            var btn = $("<span>").addClass("btn btn-sm").text(uvResponse);

            if (uvResponse < 3) {
                btn.addClass("btn-succes");
            } else if (uvResponse <7) {
                btn.addClass("btn-warning");
            } else {
                btn.addClass("btn-danger");
            }

            cardBodyn.append(uvIndex);
            $("#today .card-body").append(uvIndex.append(btn));
        });

        //Merge and add to page.
        title.append(img);
        cardBody.append(title, temp, humid, wind);
        card.apppend(cardBody);
 
                var titleFive = $("<h3>").addClass("card-title").text(new Date (data.list[i].dt_txt).toLocaleDateString());
                var imgFive = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
                var colFive = $("<div>").addClass("col-md-2.5");
                var cardFive = $("<div>").addClass("card bg-primary text-white");
                var cardBodyFive = $("<div>").addClass("card-body p-2")
                var humidFive = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + "%");
                var tempFive = $("<p>").addClass("card-text").text("Temperature: " + data.list[i].main.temperature + "°F"),

                //Merge toguether and out on page 
                colFive.append(cardFive.append(cardBodyFive.append(titleFive, imgFive, humidFive)));
                //append card to colum, boby to card, and other lements to body
                $("#forecast . row").append(colFive);
            } 
        }
    });
}
});