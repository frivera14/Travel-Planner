var mainEl = document.getElementById("main")
var items = JSON.parse(localStorage.getItem("trip"));

items.forEach(element => {
    var article = document.createElement("article")
    var text = document.createElement("p")
    var subtext = document.createElement("p")
    var delBtn = document.createElement("button")

    text.innerText = new Date(element.Start).toLocaleDateString() + " - " + new Date(element.End).toLocaleDateString() + " " + element.Location
    subtext.innerText = element.ToDo
    article.className = "box has-background-primary"
    subtext.className = "subtitle"
    text.className = "title"
    delBtn.className = "button has-background-danger delete is-medium"

    mainEl.appendChild(article)
    article.appendChild(text)
    article.appendChild(subtext)
    article.appendChild(delBtn)


    
});

