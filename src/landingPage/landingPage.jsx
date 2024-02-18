import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import './landingPage.css';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

// Contexto de autenticación
const AuthContext = React.createContext();

function LandingPage() {
  const [mostrarMensaje, setMostrarMensaje] = useState(false); // Estado para controlar la visibilidad del mensaje
  const navigate = useNavigate();
  const auth = getAuth();
  /*
  useAuthSatate es un hook que nos permite saber si el usuario está autenticado o no,
  nos devuelve un array con tres valores, dentro de ese array tengo el objeto _UserImpl,
  el cual dentro tiene auth, y ya con auth puedo saber si el usuario está autenticado o no.

  Pudiendo acceder a sus propiedades como el email, uid, etc.
  */
  const [user] = useAuthState(auth); 
  console.log(useAuthState(auth));

  // Función para mostrar el mensaje
  function mostrarMensajeImportante(){
    if(user){
      navigate('/juegoPokemon');
    }
    if(user==null){
      setMostrarMensaje(true);
      setTimeout(() => {
        setMostrarMensaje(false);
      }, 3000); // Ocultar el mensaje después de 3 segundos
    }
  
  };

  return (
    <AuthContext.Provider value={{ mostrarMensajeImportante }}>
      <div className="landing-page">
        <div className="slider-container">
          <Carousel fade>
            <Carousel.Item>
              <img className="d-block imagenSlider" src="https://i.redd.it/0xwq7vgkg2r21.png" alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block imagenSlider" src="https://www.chromethemer.com/download/hd-wallpapers/pokemon-3840x2160.jpg" alt="Second slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block imagenSlider" src="https://images2.alphacoders.com/112/1125531.jpg" alt="Third slide" />
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="content">
          <h1>! BIENVENIDO AL POKEMUNDO FORASTERO !</h1>
          <p>Aquí investigarás sobre los Pokémon, conocerás su tipo, habilidades y muchas cosas más para volverte un buen entrenador Pokémon.</p>
          <div className="contentButtons">
            <Link to={"/listaPokemons"}><button className="explore-btn">Lista de Pokémon</button></Link>
            <button className="explore-btn" onClick={mostrarMensajeImportante}>Minijuego Pokemón</button>
          {mostrarMensaje && <div className="mensajeImportante">¡Necesitas iniciar sesión para jugar!</div>}

          </div>
        </div>
      </div>
    </AuthContext.Provider>
  );
}

export default LandingPage;
