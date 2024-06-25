import { API } from "./api.js"

const formLogIn = document.getElementById("logInForm")
const formRegister = document.getElementById("Register")

const error = document.getElementById("error")
const errorRegister = document.getElementById("errorRegister")

const registerLink = document.getElementById("registerLink")

const divLogin = document.getElementById("divLogin")
const divRegister = document.getElementById("divRegister")

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
        error.textContent = "Error al encontrar al usuario"
    }
}

const register = async () => {
    const nombre = document.getElementById("nombreRegister").value;
    const apellido = document.getElementById("apellidoRegister").value;
    const username = document.getElementById("userRegister").value;
    const pass = document.getElementById("passRegister").value;

    try {
        const res = await fetch(`${API}/user/register`, {
            method: 'POST',
            body: JSON.stringify({ nombre, apellido, username, pass }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await res.json()

        if (data.status) {
            console.log("Usuario registrado:", data)
            sessionStorage.setItem('user', JSON.stringify(data))
            window.location.href = "./pages/home/home.html"
        } else {
            errorRegister.textContent = "Error al registrar usuario"
        }
        
    } catch (error) {
        console.error("Error al registrar usuario:", error)
        errorRegister.textContent = "Error al conectar con el servidor"
    }
}


const showRegisterForm = () => {
    divLogin.style.display = 'none'
    divRegister.style.display = 'block'
}

formLogIn.addEventListener('submit', (e) => {
    e.preventDefault()
    logIn()
})

registerLink.addEventListener('click', (e) => {
    e.preventDefault()
    showRegisterForm()
})

formRegister.addEventListener('submit', (e) => {
    e.preventDefault()
    register()
})
