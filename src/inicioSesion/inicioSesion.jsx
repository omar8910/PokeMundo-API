import "./inicioSesion.css";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebaseKey/firebase.js";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function InicioSesion() {
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [mensajeExito, setMensajeExito] = useState("");
    const [mensajeError, setMensajeError] = useState("");
    const navigate = useNavigate();

    function preventSubmit(e){
        e.preventDefault();
    }

    async function emailLogin(){     
        await signInWithEmailAndPassword(auth, correo, contrasena)
            .then((userCredential) => {
                const user = userCredential.user;
                setMensajeExito("Inicio de sesión exitoso. Redirigiendo a la página principal en 3 segundos...");
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

    async function googleLogin(){
        await signInWithPopup(auth, new GoogleAuthProvider())
            .then(() => {
                setMensajeExito("Inicio de sesión exitoso. Redirigiendo en 3 segundos a la página principal...");
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
                <h1>Iniciar Sesión</h1>
                <input type="email" placeholder="Correo" onChange={(e) => setCorreo(e.target.value)}></input>
                <input type="password" placeholder="Contraseña" onChange={(e) => setContrasena(e.target.value)}></input>
                <div className="buttonContainer">
                    <button onClick={emailLogin}>Iniciar Sesión</button>
                    <i className="fa-brands fa-google google" onClick={googleLogin}></i> 
                </div>
                <Link to="/registro">¿No tienes cuenta? Registrate</Link>
                {mensajeExito && <span className="mensajeExito">{mensajeExito}</span>}
                {mensajeError && <span className="mensajeError">{mensajeError}</span>}
            </form>
        </div>
    );
}

export default InicioSesion;
