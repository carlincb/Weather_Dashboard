var APIKey = "9bd5c8436dd36e9efcab1ac13d881673";

var currentCity;
var currentWeather = document.getElementById("currentWeather");

var searchText = document.getElementById("searchText");
var searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", function(event){
    event.preventDefault();

    var currentURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchText.value}&appid=${APIKey}&units=imperial`;


    fetch(currentURL)
    .then((response)=>response.json())
    .then(function(data){
        console.log(data);
        currentCity = data.name
        var forecastURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${APIKey}&units=imperial`;
        fetch(forecastURL)
        .then((response)=>response.json())
        .then(function(data){
            console.log(data);
            renderCurrentWeather(data);
            for(let i=0; i< data.daily.length; i++){
                renderForecastWeather(data.daily[i]);
            }
        })
    })
});

function renderCurrentWeather(weatherData){
    var cityNameHeader = document.createElement("h1");
    var temp = document.createElement("p");
    var wind = document.createElement("p");
    var humidity = document.createElement("p");
    var uvi = document.createElement("p");

    cityNameHeader.innerText = `${currentCity}`;
    currentWeather.append(cityNameHeader);

    temp.innerText = `${weatherData.current.temp}`;
    currentWeather.append(temp);

    wind.innerText = `${weatherData.current.wind_speed}`;
    currentWeather.append(wind);

    humidity.innerText = `${weatherData.current.humidity}`;
    currentWeather.append(humidity);

    uvi.innerText = `${weatherData.current.uvi}`;
};

function renderForecastWeather(weatherData){
    var tempForecast = document.createElement("p");
    var windForecast = document.createElement("p");
    var humidityForecast = document.createElement("p");

    tempForecast.innerText = `${weatherData.temp.day}`;
    currentWeather.append(tempForecast);

    windForecast.innerText = `${weatherData.wind_speed}`;
    currentWeather.append(windForecast);

    humidityForecast.innerText = `${weatherData.humidity}`;
    currentWeather.append(humidityForecast);
};