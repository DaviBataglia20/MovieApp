const queryString = window.location.search
const url = new URLSearchParams(queryString)
const movie = url.get('title')
console.log(movie)
const peli = fetch(`http://www.omdbapi.com/?i=${movie}&apikey=b06e56b7`)
peli.then(data => data.json())
    .then(response => {
        const film = document.createElement("div");
        film.classList.add("mainContain")
        film.innerHTML = `<div class= "imagen"><img src="${response.Poster}" alt=""></div>
<div class = "titulo"><p>${response.Title}</p></div>
<div class = "descripcion"><p>${response.Plot}</p></div>
<div class = "otrasCosas"><p>${response.Released}</p></div>
<button class = "añadir">añadir a favoritos</button>`
document.body.append(film)
    })
