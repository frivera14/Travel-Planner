var mainEl = document.getElementById("main")
var items = JSON.parse(localStorage.getItem("trip"));
var deleteBtn = document.querySelector("button")
var section = document.querySelector("article")

items.forEach(element => {
    var article = document.createElement("article")
    var text = document.createElement("p")
    var subtext = document.createElement("p")

    text.innerText = new Date(element.Start).toLocaleDateString() + " - " + new Date(element.End).toLocaleDateString() + " " + element.Location
    subtext.innerText = element.ToDo
    article.className = "box has-background-primary"
    subtext.className = "subtitle"
    text.className = "title"

    mainEl.appendChild(article)
    article.appendChild(text)
    article.appendChild(subtext)
    

    
});

