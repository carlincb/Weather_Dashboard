var APIKey = "9bd5c8436dd36e9efcab1ac13d881673";

var recentSearches = JSON.parse(localStorage.getItem("recents")) || [];
var recentCities = document.getElementById("recentCities");

var currentCity;

var currentWeather = document.getElementById("currentWeather");
var fiveDayForecast = document.getElementById("fiveDayForecast");

var searchText = document.getElementById("searchText");
var searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", function(event){
    event.preventDefault();
    recentCities.innerHTML = "";

    if(!recentSearches.includes(searchText.value)){
        recentSearches.unshift(searchText.value);
        localStorage.setItem("recents", JSON.stringify(recentSearches));
    };
    
    recentSearches.forEach(function(element) {
        var citiesList = document.createElement("button")
        citiesList.innerText = `${element}`;
        citiesList.classList = "btn col-md-12 btn-secondary p-2 m-1";
        recentCities.append(citiesList);
    });

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
            fiveDayForecast.innerHTML = "";
            for(let i=0; i<5; i++){
                renderForecastWeather(data.daily[i]);
            }
        })
    })
    searchText.value = "";
});

function renderCurrentWeather(weatherData){
    currentWeather.innerHTML = "";
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

    if (weatherData.current.uvi < 3){
        uvi.classList += "bg-success col-2 m-2 p-2 rounded";
    } else if( weatherData.current.uvi >= 3 && weatherData.current.uvi < 6){
        uvi.classList += "bg-info col-2 m-2 p-2 rounded";
    } else {
        uvi.classList += "bg-danger col-2 m-2 p-2 rounded";
    }
};

function renderForecastWeather(weatherData){
    var forecastCardDiv = document.createElement("div");
    var tempForecast = document.createElement("p");
    var windForecast = document.createElement("p");
    var humidityForecast = document.createElement("p");
    var futureDate = document.createElement("h2");
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

    forecastCardDiv.classList = "bg-dark text-light m-2 p-2 rounded w-auto";
    fiveDayForecast.append(forecastCardDiv);
};

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