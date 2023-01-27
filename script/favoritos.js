  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
  import { getFirestore, getDoc, doc, setDoc  } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
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


  const docRef = doc(db, "favoritos", "user1");
  const array = await getDoc(docRef).then(res => res.data().array)  || [];





  array.forEach(peli =>{
    const divPeli = document.createElement("div")
    divPeli.innerHTML =`<img width="100px" height="200px" src="${peli.Poster}" alt="">
    <p>${peli.Title}</p>
    <p>${peli.Year}</p>
    <p>${peli.Plot}</p>
    <button class ="btn-delete">borrar</button>`
    const divPai = document.querySelector(".container")
    divPai.append(divPeli)
})
const contador = document.querySelector(".iconoFavo>a>p")
contador.innerText = array.length

document.querySelectorAll('.btn-delete').forEach((botonDelete)=> {
    botonDelete.addEventListener('click', async (event) => {
        botonDelete.parentNode.remove();
        array.splice(array.findIndex(e=>e.Title === event.target.parentNode.children[2].innerText),1)
        await setDoc(doc(db, "favoritos", "user1"), {array});
        //localStorage.setItem('favoritos',JSON.stringify(lasPeli))
        contador.innerText = array.length
        
    }) 
})
