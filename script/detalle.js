const queryString = window.location.search
const url = new URLSearchParams(queryString)
const movie = url.get('title')

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
        
        const boton = document.querySelector(".añadir")
        const array = JSON.parse(localStorage.getItem("favoritos")) || []

        console.log(response);

        boton.addEventListener("click", () => {
            if (!array.find( e => e.imdbID == response.imdbID)) {
                array.push(response)
                localStorage.setItem("favoritos", JSON.stringify(array))
                const contador = document.querySelector(".contador>p")
                contador.innerText = JSON.parse(localStorage.getItem("favoritos")).length
                
            } else {
                alert("MMAAAAAAAAAAAAAAAAAAAAAAN ESTO YA LO TENES EL EN EL CARRITO, PRINCESA MI CHICAA BRASILEÑA VOCE YA CONQUISTO MI CORAZON  ")
            }

        })
        const contador = document.querySelector(".contador>p")
                contador.innerText = JSON.parse(localStorage.getItem("favoritos")).length


    })
