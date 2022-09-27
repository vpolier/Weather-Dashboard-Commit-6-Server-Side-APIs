$(document).ready(function () {
    //Search button future.
    $("#search-button").on("click", function () {
        //Get value in input search-value.
        var searchTerm = $("#search-value").val();
        //Empty input field.
        $("#search-value").val("");
        weatherFunction(searchTerm);
        weatherFunction(searchTerm);
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
        })
    }        