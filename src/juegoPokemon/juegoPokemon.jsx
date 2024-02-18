import React, { useState, useEffect } from 'react';
import './juegoPokemon.css';

function JuegoPokemon() {
    const [pokemon, setPokemon] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [result, setResult] = useState('');
    const [score, setScore] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [showName, setShowName] = useState(false);
    const [isHardMode, setIsHardMode] = useState(false);

    useEffect(() => {
        cargarPokemon();
    }, []);

    function cargarPokemon() {
        const randomNum = Math.floor(Math.random() * 898);
        fetch(`https://pokeapi.co/api/v2/pokemon/${randomNum}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setPokemon(data);
                setIsLoaded(true);
                console.log("El id del pokemon es: " + data.id);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    function manejarCambioInput(event) {
        setInputValue(event.target.value);
    }

    // Compara el valor del input con el nombre del pokemon y muestra un mensaje de "Correcto" o "Incorrecto"

    function manejarEventoSubmit(event) {
        event.preventDefault();
        if (inputValue.toLowerCase() === pokemon.name.toLowerCase()) {
            setResult(<div className='correctResult'>¡Correcto! +1 </div>);
            ocultarMensaje();
            setScore(score + 1);

        } else {
            setResult(<div className='incorrectResult'>¡Incorrecto! Inténtalo de nuevo</div>);
            ocultarMensaje();
        }
        setInputValue('');
        cargarPokemon();
    }

    // Muestra un mensaje de "Cargando..." mientras se carga el juego

    if (!isLoaded) {
        return <div className='loadingScreen'>Cargando...</div>;
    }

    // Muestra el nombre del pokemon durante 2 segundos al hacer click en el botón "Solución"

    function mostrarNombre() {
        setShowName(true);
        setTimeout(() => {
            setShowName(false);
        }, 2000);
    };

    // Ocultar mensaje de "Correcto" o "Incorrecto" después de 1.5 segundos
    function ocultarMensaje() {
        setTimeout(() => {
            setResult(null);
        }, 1500);
    }

    // Modo dificil (cambia el brillo de la imagen del pokemon para hacerlo más dificil de adivinar)
    function cambiarModoDificil(event) {
        event.preventDefault(); // Al estar dentro de un formulario, evita que se recargue la página.
        setIsHardMode(!isHardMode);
    }




    return (
        <>
            <div id="container">
                <div className="pokemon-game" >
                    <h1>¿Cúal es este pókemon?</h1>
                    {showName && <div className='pokemon-name'>Solución: {pokemon.name}</div>}

                    <div className="pokemon-container">
                        <div className="caracteristicas">
                            <h3>Caracteristicas</h3>
                            <ul>
                                <li>Tipo -&gt; {pokemon.types.map(type => type.type.name).join(', ')}</li>
                                <li>Generación -&gt; {Math.ceil(pokemon.id / 151)}</li>
                            </ul>

                        </div>
                        <img
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            className={`pokemon-image ${isHardMode ? 'hard-mode' : ''}}`}
                            src={(isHovered && pokemon.sprites.back_default ? pokemon.sprites.back_default : pokemon.sprites.front_default)}
                            alt={pokemon.name}
                            style={{ filter: isHardMode ? 'brightness(0)' : 'brightness(1)' }}
                        />
                    </div>


                    <form onSubmit={manejarEventoSubmit}>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={manejarCambioInput}
                            placeholder="Nombre del Pokémon"
                            autoFocus
                        />
                        <button type="submit">Adivinar</button>
                        <button type="button" onClick={mostrarNombre}>Solución</button>
                        <button onClick={cambiarModoDificil}>Difícil</button>
                    </form>
                    <p>{result}</p>
                    <p style={{ color: 'white' }}>Puntuación: {score}</p>
                </div>

            </div>

        </>
    );
}

export default JuegoPokemon;
