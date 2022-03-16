// variables for cityname, startdate, endDate
var textBox = document.getElementById("city")
var startDate = document.getElementById("startDate")
var endDate = document.getElementById("endDate")
var searchBtn = document.getElementById("search")
var forecast = document.getElementById("forecast")
var itinerary = document.getElementById("itinerary")
var saveTask = document.getElementById("taskSave")
var taskBox = document.getElementById("taskBox")
var trip = JSON.parse(localStorage.getItem("trips") || '[]')    
var from
var until
var cityname
const apiKey = "5ae2e3f221c38a28845f05b6f374276aa88f9ebc2368455be6478802";
const pageLength = 5; // number of objects per page
let lon; // place longitude
let lat; // place latitude
let count; // total objects count

var getWeatherData = function (event) {

    event.preventDefault();

    cityname = textBox.value.trim();
    from = startDate.value
    until = endDate.value

    if (cityname) {
        console.log(cityname, from, until);
        retrieveAPI(cityname, from, until);

    } else {
        alert("Enter a valid city")
    }

    apiGet("geoname","name="+cityname).then(function(data){
        let message = "Please enter a valid city.";
        if(data.status == "OK"){
            document.getElementById("hide").id="nothide";
            document.getElementById("hideTitle").id="nothideTitle";
            const regionNamesInEnglish = new Intl.DisplayNames(['en'], {type:'region'});
            message = "";
            lon = data.lon;
            lat = data.lat;
            document.getElementById("info").innerHTML=`${message}`;
            loadList();
        }
        else {
        document.getElementById("info").innerHTML=`${message}`; }
    });

}

var retrieveAPI = function (cityname, from, until) {

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

var showForecast = function (data) {
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

        title.textContent = new Date(data.days[index].datetimeEpoch * 1000).toLocaleDateString()
        img.src = `../Travel-Planner/pictures/${data.days[index].icon}.png`

        text.textContent = "Temp: " + data.days[index].temp + " °F"
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

var showTask = function () {
    var article = document.createElement("article")
    var text = document.createElement("p")
    var typedText = taskBox.value.trim()



    article.className = "box has-background-primary"
    text.innerHTML = typedText
    text.className = "subtitle"
    itinerary.appendChild(article)
    article.appendChild(text)

 
}

saveTask.addEventListener("click", function(event) {
    event.preventDefault();

    var tripinfo = {
        Start: startDate.value.trim(),
        End: endDate.value.trim(),
        ToDo: taskBox.value.trim(),
        Location: textBox.value.trim()
    };

    trip.push(tripinfo)

    localStorage.setItem("trip", JSON.stringify(trip))
    tripinfo
    showTask();
})

searchBtn.addEventListener("click", getWeatherData)


//Calls API methods by fetch function 
function apiGet(method, query) {
    return new Promise(function(resolve, reject) {
      var otmAPI = "https://api.opentripmap.com/0.1/en/places/" +method+"?apikey="+apiKey;
      if (query !== undefined) {
        otmAPI += "&" + query;
      }
      fetch(otmAPI)
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(function(err) {
          console.log("Fetch Error :-S", err);
        });
    });
  }
  
  //Button for New York generates information
  document.getElementById("NY").addEventListener('click',function(){
      document.getElementById("hide").id="nothide";
      document.getElementById("hideTitle").id="nothideTitle";
      let name = 'New york';
      apiGet("geoname","name="+name).then(function(data){
              lon = data.lon;
              lat = data.lat;
              loadList();
          })
      });
  
  //Button for Los Angeles generates information
  document.getElementById("LA").addEventListener('click',function(){
      document.getElementById("hide").id="nothide";
      document.getElementById("hideTitle").id="nothideTitle";
       let name = 'Los Angeles';
      apiGet("geoname","name="+name).then(function(data){
               lon = data.lon;
               lat = data.lat;
              loadList();
          })
      });
  
  //Button for Paris generates information
  document.getElementById("PAR").addEventListener('click',function(){
      document.getElementById("hide").id="nothide";
      document.getElementById("hideTitle").id="nothideTitle";
      let name = 'Paris';
      apiGet("geoname","name="+name).then(function(data){
              lon = data.lon;
              lat = data.lat;
              loadList();
          })
      });
  
  //Button for London generates information
  document.getElementById("LDN").addEventListener('click',function(){
      document.getElementById("hide").id="nothide";
      document.getElementById("hideTitle").id="nothideTitle";
      let name = 'London';
      apiGet("geoname","name="+name).then(function(data){
              lon = data.lon;
              lat = data.lat;
              loadList();
          })
      });
  
  //Button for Amsterdam generates information
  document.getElementById("AMS").addEventListener('click',function(){
      document.getElementById("hide").id="nothide";
      document.getElementById("hideTitle").id="nothideTitle";
      let name = 'Amsterdam';
       apiGet("geoname","name="+name).then(function(data){
              lon = data.lon;
              lat = data.lat;
              loadList();
          })
      });
  
  //Generates information for popular spots based on search bar input
      
  
  const titles = document.querySelectorAll("#HotSpot");
  const images = document.querySelectorAll(".img")
  const desc = document.querySelectorAll(".desc")
  
  //Gets a list of all popular spots from API call
  function loadList() {
      apiGet(
        "radius",
        `radius=3000&limit=${pageLength}&offset=0&lon=${lon}&lat=${lat}&rate=2&format=json`
      ).then(function(data) {
          for(i=0; i<titles.length; ++i) {  
          if ( data[i] == null) {
              titles[i].innerHTML = 'Hot Spot';
              images[i].src = "https://bulma.io/images/placeholders/640x480.png";
              desc[i].innerHTML = 'No spot found';
          }
          else {
          titles[i].innerHTML = data[i].name;
          loadImage(data[i].xid, i);
          loadDesc(data[i].xid, i);
          }
     
      }});
    }
  
  //Loads images of popular spots from API call
  function loadImage(xid, i){
      apiGet(
      `xid/${xid}`
      )
      .then(function(data) {
      if (typeof data.preview.source !== 'undefined') {
          images[i].src = data.preview.source;
      }
      else {
          images[i].src = "https://bulma.io/images/placeholders/640x480.png";
      }
      })
      .catch(function(err) {
          images[i].src = "https://bulma.io/images/placeholders/640x480.png"
        });
  }
  
  //Loads description of popular spots from API call
  function loadDesc(xid, i){
      apiGet(
      `xid/${xid}`
      )
      .then(function(data) {
          desc[i].innerHTML = data.wikipedia_extracts.text;
      })
      .catch(function(err) {
          desc[i].innerHTML = "No description found."
        });
  }
