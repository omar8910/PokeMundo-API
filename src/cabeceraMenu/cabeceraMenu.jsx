import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { redirect } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import app from "../firebaseKey/firebase";
import "./cabeceraMenu.css";



function CabeceraMenu() {
    var [idUsuario, setidUsuario] = useState("");
    const auth = getAuth(app);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user);
                idUsuario = user.displayName || user.email;
                setidUsuario(idUsuario);
            }
        });
    }, []);

    const cerrarSesion = () => {
        signOut(auth).then(() => {
            redirect("/");
            setidUsuario("");
        }).catch((error) => {
            console.log(error);
        });
    }

    if (idUsuario === "") {
        // Se muestra el menú de navegación para usuarios no autenticados.
        return (
            <>
            <div className="cabeceraMenu">
                <Link to="/"><img className="cabeceraLogo"  src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png" alt="logo" /></Link>
                <div className='navCabecera'>
                    <Link to="/"><span>Inicio</span></Link>
                    <Link to="/listaPokemons"><span>Pokemons</span></Link>
                    <Link to="/inicioSesion"><i className="fa-solid fa-user"></i></Link>
                </div>
            </div>
            </>
        )
    } else {
        return(
        // Se muestra el menú de navegación para usuarios autenticados con la opción de cerrar sesión.
        <>
        <div className="cabeceraMenu">
            <Link to="/"><img className="cabeceraLogo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png"  alt="logo" /></Link>
            <div className='navCabecera'>
                <Link to="/"><span>Inicio</span></Link>
                <Link to="/listaPokemons"><span>Pokemons</span></Link>
                <Link to="/juegoPokemon"><span>Juego</span></Link>
                <span id="navLink" onClick={cerrarSesion}><i className="fa-solid fa-right-from-bracket"></i>{idUsuario}</span>
            </div>
        </div>
        </>
        )

    }
}

export default CabeceraMenu;