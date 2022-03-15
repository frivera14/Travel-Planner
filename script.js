// variables for cityname, startdate, endDate
var textBox = document.getElementById("city")
var startDate = document.getElementById("startDate")
var endDate = document.getElementById("endDate")
var searchBtn = document.getElementById("search")
var forecast = document.getElementById("forecast")

var getWeatherData = function(event) {

    event.preventDefault();

    var cityname = textBox.value.trim();
    var from = startDate.value
    var until = endDate.value

    if (cityname) {
        console.log(cityname, from, until);
        retrieveAPI(cityname, from, until);

    } else {
        alert("Enter a valid city")
    }    
    
}

var retrieveAPI = function(cityname, from, until) {

    var apiURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityname}/${from}/${until}?key=VLELTD5BYNLQJ2U6ZZ6BR6XNP`

    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                return response.json()
            } else {
                alert("Error: " + response.statusText)
                throw "Error"
            }

        })
        .then(function (data) {
            console.log(data)
            showForecast(data)
        })
        .catch(function (error) {
            alert("Unable to connect to climate")
        })
}

var showForecast = function(data) {
    var weatherTxt = document.getElementById("weatherTxt")

    weatherTxt.className = ""
    forecast.innerHTML = ""

    for (let index = 0; index < data.days.length; index++) {
        var div = document.createElement("div")
        var article = document.createElement("article")
        var title = document.createElement("p")
        var text = document.createElement("p")
        var textTwo = document.createElement("p")
        var textThree = document.createElement("p")
        var textFour = document.createElement("p")
        var textFive = document.createElement("p")
        var img = document.createElement("img")   
        

        div.className = "tile is-parent"
        article.className = "tile is-child box"
        title.className = "title"
        text.className = "subtitle"
        textTwo.className = "subtitle"
        textThree.className = "subtitle"
        textFour.className = "subtitle"
        textFive.className = "subtitle"

        title.textContent = new Date(data.days[index].datetimeEpoch*1000).toLocaleDateString()
        img.src = `../Travel-Planner/pictures/${data.days[index].icon}.png`
        
        text.textContent = data.days[index].temp + " °F"
        textTwo.textContent = "Feels like: " + data.days[index].feelslike + " °F"
        textThree.textContent = "Wind: " + data.days[index].windspeed + " mph"
        textFour.textContent = "UV Index: " + data.days[index].uvindex + "%"
        textFive.textContent = "Humidity: " + data.days[index].humidity + "%"

        
        forecast.appendChild(div)
        div.appendChild(article)
        article.appendChild(title)
        article.appendChild(img)
        article.appendChild(text)
        article.appendChild(textTwo)
        article.appendChild(textThree)
        article.appendChild(textFour)
        article.appendChild(textFive)


    };


}

searchBtn.addEventListener("click", getWeatherData)
    
// variable for search button 
// capture API data
// Pass that into display function