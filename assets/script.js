var myKey = "&APPID=6db8a71f3737a50245cbb91d2a90d2e1";
var currentCity
var queryUrl = "api.openweathermap.org/data/2.5/weather?q=";
var fiveWeather = `api.openweathermap.org/data/2.5/forecast?q=`;
var uvIndex = `http://api.openweathermap.org/data/2.5/uvi?appid=${uvIndex}&lat={lat}&lon={lon}`;

// api.openweathermap.org/data/2.5/forecast?q=London&APPID=6db8a71f3737a50245cbb91d2a90d2e1

function getForcast(city) {
    $.ajax({
        url: queryUrl + city + myKey,
        method: "GET"
    })
    .then( function (response) {
        console.log(response);
    })
}



// $.ajax{(
//     url: 
// )}