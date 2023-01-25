/* mi api key b06e56b7 */
/* const urls = fetch("http://www.omdbapi.com/?t=batman&plot=full&apikey=b06e56b7")
urls.then(data => data.json())
    .then(response => console.log(response)) */
/* RECOGER EL VALUE DEL INPUT */
const buscador = document.querySelector("form")
console.log(buscador)
buscador.addEventListener("submit", (e) => {
    e.preventDefault();
    document.querySelector('#container').innerHTML = ``
    const valorBusqueda = document.querySelector("#peliculaBusqueda").value
    if (valorBusqueda === "") {
        alert("escribes algo coño")
    } else {
        console.log(valorBusqueda)
    }
    const laPeli = fetch(`http://www.omdbapi.com/?s=${valorBusqueda}&plot=full&apikey=b06e56b7`)
    laPeli.then(data => data.json())
        .then(response => { 
            response.Search.forEach(peli => {
               const peliInfo = document.createElement("div")
               peliInfo.classList.add("cajaPelicula");
               peliInfo.innerHTML =`<div class="coverPeli"><img src="${peli.Poster}" alt=""class = " imagen">
               </div>
               <div class ="descripcionPeli"><p>año de lanzamiento : ${peli.Year}</p><p>es una ${peli.Type}</p><a href="../MovieApp/pages/movies.html?title=${peli.imdbID}"><button>Ver Mas</button></a></div>
               <div class = "nombrePeli"><p>${peli.Title}</p>
               </div>`
               document.querySelector('#container').append(peliInfo)
            });
            const botones = document.querySelectorAll(".añadir")
            const array = []
            botones.forEach(boton =>{
                boton.addEventListener("click",()=>{
                    const info = boton.parentElement.nextElementSibling.childNodes[0].innerText
                    console.log(info)
                    console.log(response.Search.find((peli)=> peli.Title === info ))
                    array.push(response.Search.find((peli)=> peli.Title === info ))
                    
                    
                })
            })
           
        })

})
const contador = document.querySelector(".contador>p")
        contador.innerText = JSON.parse(localStorage.getItem("favoritos")).length

/* CODIGO DE ANTES */
/* console.log(array)
                    localStorage.setItem("favoritos",JSON.stringify(array))
                    let losFav = JSON.parse(localStorage.getItem("favoritos",(array)))
                    console.log(losFav)
                    let uniqueArray = losFav.reduce((acc, current) => {
                        const x = acc.find(item => item.Title === current.Title);
                        if (!x) {
                          return acc.concat([current]);
                        } else {
                          return acc;
                        }
                      }, []);
                    localStorage.setItem("arrayNoDuplicado",JSON.stringify(uniqueArray))
<button class = "añadir">añadir a favoritos</button>
const añade = JSON.parse(localStorage.getItem("arrayNoDuplicado",(uniqueArray)))
const contador = document.querySelector(".contador>p")
    contador.innerHTML =`${añade.length}` */





