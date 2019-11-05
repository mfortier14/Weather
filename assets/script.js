var myKey = "&APPID=6db8a71f3737a50245cbb91d2a90d2e1";
var searchCities = [];
var queryUrl = "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=";
var fiveWeather = `api.openweathermap.org/data/2.5/forecast?q=`;

// ===========================================================================================================
showSearchCities();
$(document).on("click", "a", searchCitiesForecast);
$(document).on("click", "button", buttonForecast);

// ===========================================================================================================

function showSearchCities() {
    if (localStorage.getItem("cities")){
        searchCities = [ ...localStorage.getItem("cities").split(";")];
        for (let i = 0; i < searchCities.length; i++) {
            var $a = `<a href="#" class="list-group-item list-group-item-action">${searchCities[i]}</a>`
            $(".list-group").prepend($a); 
        };
    };
};

function searchCitiesForecast() {
    getForecast($(this).text());
};

function buttonForecast() {
    var city = $("#inputPassword2").val();
    $("#inputPassword2").val("");
    searchCities.push(city);
    $(".list-group").empty();
    localStorage.setItem("cities", searchCities.join(";"));
    showSearchCities();
    getForecast(city);
};

// ===========================================================================================================

function getForecast(city) {

    $.ajax({
        url: queryUrl + city + myKey,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);
            
            const { city, list } = response;
            let $div = `<div class="ml-4">
                <h1 class="display-3 text-center">${city.name}, ${city.country}</h1>
                <hr>
                <h2>${moment(list[0].dt_txt).format('llll')}</h2>
                <h2>Temperature: ${parseInt((list[0].main.temp - 273.15) * 9 / 5 + 32)} °F</h2>
                <h2>Humidity: ${list[0].main.humidity}</h2>
                <h2>Description: ${list[0].weather[0].description}</h2>
                <img class="mainIcon" src="http://openweathermap.org/img/w/${list[0].weather[0].icon}.png">
            </div>`
            $(".jumbotron").html($div);

            $(".card-deck").empty();
            for (let i = 3; i < list.length; i = i + 8) {
                const { dt_txt, main, weather } = list[i];
                const $card = `<div class="card text-white">
                    <div class="card-body p-0">
                        <p class="card-text day">${moment(dt_txt).format('dddd')}</p>
                        <p class="card-text">Temp: ${parseInt((main.temp - 273.15) * 9 / 5 + 32)} °F</p>
                        <p class="card-text">Hum:${main.humidity}</p>
                        <p class="card-text">${weather[0].description}</p>
                        <img class="m-auto" src="http://openweathermap.org/img/w/${weather[0].icon}.png">
                    </div>
                </div>`

                $(".card-deck").append($card);
            }
        })
};