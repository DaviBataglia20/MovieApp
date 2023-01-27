// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
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



const queryString = window.location.search
const url = new URLSearchParams(queryString)
const movie = url.get('title')

const peli = fetch(`http://www.omdbapi.com/?i=${movie}&apikey=b06e56b7`)
peli.then(data => data.json())
    .then(async response => {
        const film = document.createElement("div");
        film.classList.add("mainContain")
        film.innerHTML = `<div class= "imagen"><img src="${response.Poster}" alt=""></div>
                            <div class = "titulo"><p>${response.Title}</p></div>
                            <div class = "descripcion"><p>${response.Plot}</p></div>
                            <div class = "otrasCosas"><p>Fecha de lanzamieto: ${response.Released}</p></div>
                            <button class = "añadir">añadir a favoritos</button>`
        document.querySelector(".aquiVaLaPeli").append(film)

        const boton = document.querySelector(".añadir")
        const docRef = doc(db, "favoritos", "user1");
        const docSnap = await getDoc(docRef).then(res => res );
        const array = docSnap.data().array || []

        console.log(response);
        if (!array.find(e => e.imdbID == response.imdbID)) {
        } else {
            boton.innerHTML="ya esta añadida"
        }

        boton.addEventListener("click", async () => {
            if (!array.find(e => e.imdbID == response.imdbID)) {
                array.push(response)

                await setDoc(doc(db, "favoritos", "user1"), { array });

                //  localStorage.setItem("favoritos", JSON.stringify(array))
                const contador = document.querySelector(".iconoFavo>a>p")
                contador.innerText = array.length
                location.reload()

            } else {
                boton.innerHTML="ya esta añadida"
            }

        })
        const contador = document.querySelector(".iconoFavo>a>p")
        contador.innerText = array.length


    })
