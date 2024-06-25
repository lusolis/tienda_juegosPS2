import { API } from "./api.js"
console.log(API)
const formLogIn = document.getElementById("logInForm")
const error = document.getElementById("error")

formLogIn.addEventListener('submit', (e)=>{
    e.preventDefault()
    logIn()
})

const logIn = async()=>{
    const userName = document.getElementById("user").value
    const pass = document.getElementById("pass").value

    const res = await fetch(`${API}/user/login`,{
        method: 'POST',
        body: JSON.stringify({userName,pass}),
        headers:{
            'Content-Type': 'application/json'
        }
    })

    const data = await res.json()

    if(data.status){
        console.log(data)
        sessionStorage.setItem('user', JSON.stringify(data))
        window.location.href = "./pages/home/home.html"
    }else{
        error.textContent = "Error al encontrar al usuario 🫠"
    }
}