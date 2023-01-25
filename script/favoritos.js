const lasPeli = JSON.parse(localStorage.getItem("favoritos")) || []

lasPeli.forEach(peli =>{
    const divPeli = document.createElement("div")
    divPeli.innerHTML =`<img width="100px" height="200px" src="${peli.Poster}" alt="">
    <p>${peli.Title}</p>
    <p>${peli.Year}</p>
    <p>${peli.Plot}</p>
    <button class ="btn-delete">borrar</button>`
    const divPai = document.querySelector(".container")
    divPai.append(divPeli)
})
const contador = document.querySelector(".contador>p")
contador.innerText = JSON.parse(localStorage.getItem("favoritos")).length

document.querySelectorAll('.btn-delete').forEach((botonDelete)=> {
    botonDelete.addEventListener('click', (event) => {
        botonDelete.parentNode.remove();
        lasPeli.splice(lasPeli.findIndex(e=>e.Title === event.target.parentNode.children[2].innerText),1)
        localStorage.setItem('favoritos',JSON.stringify(lasPeli))
        contador.innerText = JSON.parse(localStorage.getItem("favoritos")).length
        
    }) 
})
