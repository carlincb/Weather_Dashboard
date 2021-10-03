var APIKey = "9bd5c8436dd36e9efcab1ac13d881673";

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
        renderCurrentWeather(data);
        var forecastURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${APIKey}&units=imperial`;
        fetch(forecastURL)
        .then((response)=>response.json())
        .then(function(data){
            console.log(data);
            for(i=0; i<=5; i++){
                renderForecastWeather(data.daily[i]);
            }
            renderForecastWeather(data);
        })
    })
});

function renderCurrentWeather(weatherData){
    var cityNameHeader = document.createElement("h1");
    var temp = document.createElement("p");
    var wind = document.createElement("p");
    var humidity = document.createElement("p");

    cityNameHeader.innerText = `${weatherData.name}`;
    currentWeather.append(cityNameHeader);

    temp.innerText = `${weatherData.main.temp}`;
    currentWeather.append(temp);

    wind.innerText = `${weatherData.wind.speed}`;
    currentWeather.append(wind);

    humidity.innerText = `${weatherData.main.humidity}`;
    currentWeather.append(humidity);
};

function renderForecastWeather(weatherData){
    var tempForecastA = document.createElement("p");
    var windForecastA = document.createElement("p");
    var humidityForecastA = document.createElement("p");

    tempForecastA.innerText = `${weatherData.daily[0].temp.day}`;
    currentWeather.append(tempForecastA);

    windForecastA.innerText = `${weatherData.daily[0].wind_speed}`;
    currentWeather.append(windForecastA);

    humidityForecastA.innerText = `${weatherData.daily[0].humidity}`;
    currentWeather.append(humidityForecastA);
// -------------------------------------------------------------------
    var tempForecastB = document.createElement("p");
    var windForecastB = document.createElement("p");
    var humidityForecastB = document.createElement("p");

    tempForecastB.innerText = `${weatherData.daily[1].temp.day}`;
    currentWeather.append(tempForecastB);

    windForecastB.innerText = `${weatherData.daily[1].wind_speed}`;
    currentWeather.append(windForecastB);

    humidityForecastB.innerText = `${weatherData.daily[1].humidity}`;
    currentWeather.append(humidityForecastB);
// -------------------------------------------------------------------
    var tempForecastC = document.createElement("p");
    var windForecastC = document.createElement("p");
    var humidityForecastC = document.createElement("p");

    tempForecastC.innerText = `${weatherData.daily[2].temp.day}`;
    currentWeather.append(tempForecastC);

    windForecastC.innerText = `${weatherData.daily[2].wind_speed}`;
    currentWeather.append(windForecastC);

    humidityForecastC.innerText = `${weatherData.daily[2].humidity}`;
    currentWeather.append(humidityForecastC);
// -------------------------------------------------------------------
    var tempForecastD = document.createElement("p");
    var windForecastD = document.createElement("p");
    var humidityForecastD = document.createElement("p");

    tempForecastD.innerText = `${weatherData.daily[3].temp.day}`;
    currentWeather.append(tempForecastD);

    windForecastD.innerText = `${weatherData.daily[3].wind_speed}`;
    currentWeather.append(windForecastD);

    humidityForecastD.innerText = `${weatherData.daily[3].humidity}`;
    currentWeather.append(humidityForecastD);
// -------------------------------------------------------------------
    var tempForecastE = document.createElement("p");
    var windForecastE = document.createElement("p");
    var humidityForecastE = document.createElement("p");

    tempForecastE.innerText = `${weatherData.daily[4].temp.day}`;
    currentWeather.append(tempForecastE);

    windForecastE.innerText = `${weatherData.daily[4].wind_speed}`;
    currentWeather.append(windForecastE);

    humidityForecastE.innerText = `${weatherData.daily[4].humidity}`;
    currentWeather.append(humidityForecastE);
};