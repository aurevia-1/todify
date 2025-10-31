// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
  update
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCfLpHlvRcqiMAlH122SD_3HZjxep_tJ4A",
  authDomain: "todo-app-with-database-26219.firebaseapp.com",
  projectId: "todo-app-with-database-26219",
  storageBucket: "todo-app-with-database-26219.firebasestorage.app",
  messagingSenderId: "396867116577",
  appId: "1:396867116577:web:2d7b15cf18b0e708fc8d60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase(app);

// yahan par hamana ids get karli sari takaaa sukoon sa kam hoo

const todoInput = document.getElementById("todoInput")
const emptyState = document.getElementById("emptyState")
const logoutBtn = document.getElementById("logoutBtn");
const todoCount = document.getElementById("todoCount")
const todosList = document.getElementById("todosList")
const userGreeting = document.getElementById("userGreeting")


// yahan user ko check karta ha k wo login ha ya nahi 

let currentUser = null
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user
    console.log("User is Login:", user.uid)

    const username = user.displayName || user.email || "Guest";
userGreeting.innerHTML = `Welcome <b>${username}</b>`;
 

    gettodo()
  } else {
    console.log("Not valid User")
    window.location.href = "../signup/index.html"
  }
})


// add to ui ma add karna ha phala add kara 

window.todobtn = () => {
  const todovalue = todoInput.value.trim()
  if (!todovalue) {
    alert("Muna mara phala jakar input to fill karoo")
    return
  }
  let todoref = ref(db, `Todos/${currentUser.uid}`)
  push(todoref, { text: todovalue })

  todoInput.value = ""
}

// ya hana par hamna user ke id or uska change data kara

// let gettodo = () => {
//   // ya function user ka login ka todos ko read karna or ui ma dikhana or updata karna ka lia ha 

//   const todoref = ref(db, `Todos/${currentUser.uid}`)
//   // ya refference path ha database ka lia 

//   // onvalue ya aik realtime listner ha jab bhi add,edit,delete ko change hoga ya function us waqt trigger hoga 

//   // snapshot ya data ka live image dataa ha 

//   onValue(todoref, (snapshot) => {

//     todosList.innerHTML = ""
//     //  ya khali kardoo naya wala ka lia 

//     const data = snapshot.val()
//     // snapshot.val() ya aik object ha firbase sa aya ha ya row data return karta ha 

//     if (!data) {
//       // user ka todos agar empty ha or database ma data nahi to 

//       todosList.classList.remove("hidden")
//       // jab koe user ha hi nahi to is id ka anadar wala msg show karodoo

//       todoCount.innerText = "0 items"
//       // jab koe todo ha nahi to item ko 0 kardoo

//       return;
//       // ya return chala ka jab koe ui aga data ha hi nahi yahin rok do isa
//     }

//     emptyState.classList.add("hidden")
//     // jab data mil jataa ha to pir is id ka msg ko hide karo ra babaa

//     const entries = Object.entries(data)
//     // Object.entries() ya Object ka data ko array ma convert karta ha upar hamna data object ma lia tha usko arry ma convert kia 

//     todoCount.innerText = (`${entries.length} items`)
//     // ya user ko real time ma bata raha ka uska abtak ka kitna todos ha entries.length ka through

//     // chalo pir ab ham array ka har element par aik array function chalata ha foreach() ka loop  
//     entries.forEach(([Key, todo]) => {
//       // ([Key,todo]) ya destructing syntax  ha Array ke 

//       const div = document.createElement("div")
//       // aik div banaya jisma todos ka text or buttons hon

//       div.className = "flex items-center justify-between p-3 bg-slate-50 rounded-md";
//       // ya thori si styling karli tailwind css sa div ke

//       const text = document.createElement("span")
//       //  ya aik inline element banaya 

//       text.textContent = todo.text
//       // iska anadr ka text set kia 

//       div.appendChild(text)
//       // Element ko parent ka andar add kardia 

//       const buttons = document.createElement("div")
//       // Ek div bana rahe hain jisme edit aur delete buttons honge

//       buttons.className = "flex gap-2";
//       // usko thora style kiya gap dia 

//       const editbtn = document.createElement("button")
//       // aik edit ka button banaya 

//       editbtn.textContent = "Edit"
//       // lable dia button par

//       editbtn.className = "text-blue-600"
//       // styling kardi button ke thori

//       editbtn.onclick = () => editTodo(Key, todo.text)
//       //  jab click ho to editTodo function chala or key islia pass ke takaa kis todo data edit karna ha usa pata chalaa 

//       buttons.appendChild(editbtn)
//       // Element ko parent ka andar add kardia 

//       const deletebtn = document.createElement("button")
//       // aik delete ka button banaya 

//       deletebtn.textContent = "Delete"
//       // lable dia button par

//       deletebtn.className = "text-red-500"
//       // styling kardi button ke thori

//       deletebtn.onclick = () => deletebtnTodo(Key)
//       //  jab click ho to deleteTodo function chala or key islia pass ke takaa kis todo data edit karna ha usa pata chalaa 

//       buttons.appendChild(deletebtn)
//       // Element ko parent ka andar add kardia 


//       div.appendChild(buttons)
//       todosList.appendChild(div)
//       // phir final ma todosList ma main div ko dal dia 
//     })

//   })



// }

let gettodo = () => {

  const todoref = ref(db, `Todos/${currentUser.uid}`)

  onValue(todoref, (snapshot) => {
    todosList.innerHTML = "";
    const data = snapshot.val()
    if (!data) {
      todosList.classList.remove("hidden")
      todoCount.innerText = "0 items"
      return
    }
    emptyState.classList.add("hidden")
    const entries = Object.entries(data)
    todoCount.innerText = (`${entries.length} items`)

    entries.forEach(([Key, Todo]) => {
      const div = document.createElement("div")
      div.className = "flex items-center justify-between p-3 bg-slate-50 rounded-md"
      const text = document.createElement("span")
      text.textContent = Todo.text
      div.appendChild(text)

      const buttons = document.createElement("div")
      buttons.className = "flex gap-2"
      // edit button
      const editbtn = document.createElement("button")
      editbtn.textContent = "Edit"
      editbtn.className = "text-blue-500"
      editbtn.onclick = () => edittodo(Key, Todo.text)
      buttons.appendChild(editbtn)
      // edit delete
      const deletebtn = document.createElement("button")
      deletebtn.textContent = "Delete"
      deletebtn.className = "text-red-500"
      deletebtn.onclick = () => deletetodo(Key)
      buttons.appendChild(deletebtn)

      div.append(buttons)
      todosList.appendChild(div)
    })
  })

}

let edittodo = (key, oldtext)=>{
let newtext  = prompt("Enter Your New Text", oldtext)
if(newtext && newtext.trim()){
  const todoref = ref(db,`Todos/${currentUser.uid}/${key}`)
  update(todoref,{text: newtext})
  .then(()=>console.log("Todo updated"))
  .catch((err)=> console.error("updated failed"))

}
}

let deletetodo = (key) =>{

  const todoref = ref(db,`Todos/${currentUser.uid}/${key}`)
  remove(todoref)
  .then(()=>console.log("Todo Deleted"))
  .catch((err)=> console.error("No deleted"))


}


window.logout = ()=>{
  signOut(auth)
  .then(()=>{
    window.location.href = "../signup/index.html"
  })
  .catch(()=>{
    console.log("Not logout")
  })
}