/* ANIMACION DE ENTRADA */
gsap.fromTo(
    '.loading-page',
    {opacity:1},
    {
    opacity:0,
    duration:3,
    delay:1,
    }
);
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC1ecdAQOeA3gGW2iW8yOEDAn651tafcJE",
    authDomain: "movieapp-a63b1.firebaseapp.com",
    projectId: "movieapp-a63b1",
    storageBucket: "movieapp-a63b1.appspot.com",
    messagingSenderId: "874313922721",
    appId: "1:874313922721:web:a80857db115407838cd8e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
/* ANIMACION DEL PLACEHOLDER */
let i = 0;
let placeholder = "";
const txt = "Escriba una pelicula que te guste";
const speed = 100;
function type() {
    placeholder += txt.charAt(i);
    document.getElementById("peliculaBusqueda").setAttribute("placeholder", placeholder);
    i++
    setTimeout(type, speed)
}
type();
/* ANIMACION DEL PLACEHOLDER */
setInterval(function () {document.querySelector(".loading-page").style.position = "relative"}, 3600);
const LaFuncion = (e) => {
    e.preventDefault();
    document.querySelector('#container').innerHTML = ``
    const valorBusqueda = document.querySelector("#peliculaBusqueda").value
    if (valorBusqueda === "") {
        alert("alfredo joder ya he leido la documentacion")
    } else {
        const laPeli = fetch(`http://www.omdbapi.com/?s=${valorBusqueda}&plot=full&apikey=b06e56b7`)
        laPeli.then(data => data.json())
            .then(response => {
                response.Search.forEach(peli => {
                    const peliInfo = document.createElement("div")
                    peliInfo.classList.add("cajaPelicula");
                    peliInfo.innerHTML = `
                    <div class="coverPeli"><img src="${peli.Poster}" alt=""class = " imagen">
                    </div>
                    <div class = "nombrePeli"><p>${peli.Title}</p>
                    <div class ="descripcionPeli"><p>año de lanzamiento:${peli.Year}</p>
                    <a href="../MovieApp/pages/movies.html?title=${peli.imdbID}"><button>Leer Sinopsis</button></a></div>
                   </div>`
                    document.querySelector('#container').append(peliInfo)
                });
                const botones = document.querySelectorAll(".añadir")
                const array = []
                botones.forEach(boton => {
                    boton.addEventListener("click", () => {
                        const info = boton.parentElement.nextElementSibling.childNodes[0].innerText
                        console.log(info)
                        console.log(response.Search.find((peli) => peli.Title === info))
                        array.push(response.Search.find((peli) => peli.Title === info))


                    })
                })

            })
    }
}
/* mi api key b06e56b7 */
/* const urls = fetch("http://www.omdbapi.com/?t=batman&plot=full&apikey=b06e56b7")
urls.then(data => data.json())
    .then(response => console.log(response)) */
/* RECOGER EL VALUE DEL INPUT */
const elForm = document.querySelector("form")
const elIcono = document.querySelector("#iconoBuscar")
elIcono.addEventListener("click", LaFuncion)
console.log(elForm)
elForm.addEventListener("submit", LaFuncion)

const contador = document.querySelector(".iconoFavo>a>p")
const docRef = doc(db, "favoritos", "user1");
const array = await getDoc(docRef).then(res => res.data().array)  || [];


//const array = docSnap.data().array || []

contador.innerText = array.length

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





