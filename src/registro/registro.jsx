import "./registro.css";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebaseKey/firebase.js";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Registro(){
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [mensajeExito, setMensajeExito] = useState("");
    const [mensajeError, setMensajeError] = useState("");
    const navigate = useNavigate();

    function preventSubmit(e){
        e.preventDefault();
    }

   async function emailRegister(){     
        await createUserWithEmailAndPassword(auth, correo, contrasena)
            .then((userCredential) => {
                const user = userCredential.user;
                setMensajeExito("Registro exitoso. Redirigiendo a la página principal en 3 segundos...");
                setTimeout(() => {
                    navigate("/");
                    setMensajeExito("");
                }, 3000);
            })
            .catch(() => {
                setMensajeError("Error al iniciar sesión. Por favor, verifica tu correo y contraseña si son correctos e inténtalo de nuevo.");
                setTimeout(() => {
                    setMensajeError("");
                }, 3000);
            });
    }

    async function googleRegister(){
        await signInWithPopup(auth, new GoogleAuthProvider())
            .then(() => {
                setMensajeExito("Registro exitoso. Redirigiendo en 3 segundos a la página principal...");
                setTimeout(() => {
                    navigate("/");
                    setMensajeExito("");
                }, 3000);
            })
            .catch(() => {
                setMensajeError("Error al iniciar sesión con Google.");
                setTimeout(() => {
                    setMensajeError("");
                }, 3000);
            });
    }

    return (
        <div className="inicioSesion">
            <form onSubmit={preventSubmit}>
                <h1>Registrarse</h1>
                <input type="email" placeholder="Correo" onChange={(e) => setCorreo(e.target.value)}></input>
                <input type="password" placeholder="Contraseña" onChange={(e) => setContrasena(e.target.value)}></input>
                <div className="buttonContainer">
                    <button onClick={emailRegister}>Registrarse</button>
                    <i className="fa-brands fa-google google" onClick={googleRegister}></i> 
                </div>
                <Link to="/inicioSesion">¿Ya tienes cuenta? Inicia sesión</Link>
                {mensajeExito && <span className="mensajeExito">{mensajeExito}</span>}
                {mensajeError && <span className="mensajeError">{mensajeError}</span>}
            </form>
        </div>
    );
}


export default Registro;