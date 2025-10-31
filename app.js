  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-analytics.js";
  import {getAuth,createUserWithEmailAndPassword,updateProfile} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js"



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
  
  let username = document.getElementById("username")
  let  emailvalue = document.getElementById("email")
  let  passwordvalue = document.getElementById("password")

  window.signup = () =>{
    let obj = {
        username:username.value.trim(),
        email : emailvalue.value.trim(),
        password : passwordvalue.value.trim()
    }
    console.log(obj)

    if(!obj.username ||  !obj.email || !obj.password){
        alert("Please fill out th input")
        return
    }

    createUserWithEmailAndPassword(auth,obj.email,obj.password)
        .then((cridentional)=>{
               const user = cridentional.user

               return updateProfile(user,{displayName: obj.username})
        })
       
        .then((res)=>{
           console.log(res)
           window.location.href = "../login/index.html"
        })
        .catch((err)=>{
            console.error(err)
        })
    }
  

