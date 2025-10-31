  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-analytics.js";
  import {getAuth,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js"



  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCfLpHlvRcqiMAlH122SD_3HZjxep_tJ4A",
    authDomain: "todo-app-with-database-26219.firebaseapp.com",
    projectId: "todo-app-with-database-26219",
    storageBucket: "todo-app-with-database-26219.firebasestorage.app",
    messagingSenderId: "396867116577",
    appId: "1:396867116577:web:2d7b15cf18b0e708fc8d60",
    measurementId: "G-G4KRJXEFX0"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth()

  let loginEmail = document.getElementById("loginEmail")
  let loginPassword = document.getElementById("loginPassword")
  
  
//   window.loginUp = () =>{
//       let obj = {
//           email:loginEmail.value.trim(),
//           password: loginPassword.value.trim()
//       }
//       if(!obj.email || !obj.password){
//           alert("Please Enter your Valid login access")
//           return
//       }
      
//       signInWithEmailAndPassword(auth,obj.email,obj.password)
//       .then((res)=>{
//           console.log(res)
//           window.location.href="../Todos/index.html"
//       })
//       .catch((err)=>{
//           console.error(err)
//       })
// }

window.loginUp = () =>{
    let obj = {
        email:loginEmail.value.trim(),
        password:loginPassword.value.trim()
    }
    console.log(obj)

if(!obj.email || !obj.password){
    alert("Please Enter Your Text")
    return;
}

signInWithEmailAndPassword(auth,obj.email,obj.password)
.then((res)=>{
    console.log(res)
    window.location.href = "../Todos/index.html"
})
.catch((err)=>{
    console.error(err)
})

}