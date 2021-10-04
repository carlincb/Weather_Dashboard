var APIKey = "9bd5c8436dd36e9efcab1ac13d881673";

var recentSearches = JSON.parse(localStorage.getItem("recents")) || [];

var currentCity;
var currentWeather = document.getElementById("currentWeather");
var fiveDayForecast = document.getElementById("fiveDayForecast");

var searchText = document.getElementById("searchText");
var searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", function(event){
    event.preventDefault();
    
    recentSearches.unshift(searchText.value);
    localStorage.setItem("recents", JSON.stringify(recentSearches));
// section html for recent searches, for every item in recent searches append p tag with item from recent searches.
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
    var icon = document.createElement("img");
    var temp = document.createElement("p");
    var wind = document.createElement("p");
    var humidity = document.createElement("p");
    var uvi = document.createElement("p");

    icon.setAttribute("src", `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`);

    cityNameHeader.innerText = `${currentCity} ${convertDT(weatherData.current.dt)}`;
    cityNameHeader.append(icon);
    currentWeather.append(cityNameHeader);

    temp.innerText = `Current Temperature: ${weatherData.current.temp} F°`;
    currentWeather.append(temp);

    wind.innerText = `Wind: ${weatherData.current.wind_speed} MPH`;
    currentWeather.append(wind);

    humidity.innerText = `Humidity: ${weatherData.current.humidity} %`;
    currentWeather.append(humidity);

    uvi.innerText = `UV Index: ${weatherData.current.uvi}`;
    currentWeather.append(uvi);
};

function renderForecastWeather(weatherData){
    var forecastCardDiv = document.createElement("div");
    var tempForecast = document.createElement("p");
    var windForecast = document.createElement("p");
    var humidityForecast = document.createElement("p");
    var futureDate = document.createElement("p");
    var icon = document.createElement("img");

    icon.setAttribute("src", `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`);

    futureDate.innerText = `${convertDT(weatherData.dt)}`;
    forecastCardDiv.append(futureDate);
    forecastCardDiv.append(icon);

    tempForecast.innerText = `Temperature: ${weatherData.temp.day} F°`;
    forecastCardDiv.append(tempForecast);

    windForecast.innerText = `Wind: ${weatherData.wind_speed} MPH`;
    forecastCardDiv.append(windForecast);

    humidityForecast.innerText = `Humidity: ${weatherData.humidity} %`;
    forecastCardDiv.append(humidityForecast);

    forecastCardDiv.classList = "bg-success m-2 p-2 rounded";
    fiveDayForecast.append(forecastCardDiv);
};
// if uvi>3 classList+="red bg-danger" blue bg-primary green bg-success yellow bg-info else
function convertDT (timestamp){
    // Months array
  var months_arr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Convert timestamp to milliseconds
  var date = new Date(timestamp * 1000);

  // Year
  var year = date.getFullYear();

  // Month
  var month = months_arr[date.getMonth()];

  // Day
  var day = date.getDate();

  // Display date time in MM-dd-yyyy h:m:s format
  var convdataTime = month + "-" + day + "-" + year;
  // +' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  return convdataTime;

};