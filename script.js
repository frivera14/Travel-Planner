const apiKey = "5ae2e3f221c38a28845f05b6f374276aa88f9ebc2368455be6478802";
const pageLength = 5; // number of objects per page
let lon; // place longitude
let lat; // place latitude
let count; // total objects count

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
document.getElementById("search").addEventListener('click',function(){
    let name = document.getElementById("city").value;
    apiGet("geoname","name="+name).then(function(data){
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
    event.preventDefault();
});

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