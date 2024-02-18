import { useState, useEffect } from 'react';
import {useLocation } from "react-router-dom";
import './detallesPokemon.css';



function DetallesPokemon() {
    const location = useLocation();  // Hook para obtener la ubicación actual de la URL, ya que con useParams he tenido problemas.
    const pokemonName  = location.pathname.split("/")[2]; // Esto lo que hace es dividir la URL en un array y tomar el segundo elemento, que es el nombre del pokemon (ejemplo: /detallesPokemon/bulbasaur => ["", "detallesPokemon", "bulbasaur"] => "bulbasaur").
    // Estado para almacenar los detalles del Pokémon
    var [pokemonDetails, setPokemonDetails] = useState([]);
    // Estado para almacenar si se están cargando los detalles
    const [isLoading, setIsLoading] = useState(true);

            // Función para cargar los detalles del Pokémon
            async function fetchPokemonDetails() {
                try {

                    // Realizar la solicitud a la API para obtener los detalles del Pokémon
                    const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName);
                    const data = await response.json();
                    // Almacenar los detalles del Pokémon en el estado
                    setPokemonDetails(pokemonDetails = data);
                    // Establecer isLoading a false una vez que se han cargado los detalles
                    setIsLoading(false);
                } catch (error) {
                    console.error('Error al cargar los detalles del Pokémon:', error);
                }
            };

    // Efecto para cargar los detalles del Pokémon
    useEffect(() => {
        // Llamar a la función para cargar los detalles del Pokémon
    fetchPokemonDetails();
    }, []); // El efecto se ejecutará solo una vez al montar el componente

    // Función para formatear la cadena de texto con mayúscula en la primera letra
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    // JSX para renderizar los detalles del Pokémon
    return (
        <div className="detailsContainer">
            {isLoading ? (
                <p>Cargando detalles del Pokémon...</p>
            ) : (
                pokemonDetails && (
                    <>
                        <h2>{capitalizeFirstLetter(pokemonDetails.name)}</h2>
                        <div className="pokemonImageContainer">
                            <img src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} />
                        </div>
                        <div className="pokemonInfo">
                            <div className="pokemonPersonalInfo">
                                <div className="h3Fondo">
                                    <h3>Detalles del Pokémon</h3>
                                </div>
                                <p><strong>Pokemon ID:</strong> <span>{pokemonDetails.id}</span></p>
                                <p><strong>Altura:</strong> <span>{pokemonDetails.height / 10} m</span></p>
                                <p><strong>Peso:</strong> <span>{pokemonDetails.weight / 10} kg</span></p>
                                <p><strong>Tipo(s):</strong> <span>{pokemonDetails.types.map(type => capitalizeFirstLetter(type.type.name)).join(', ')}</span></p>
                                <p><strong>Habilidades:</strong> <span>{pokemonDetails.abilities.map(ability => capitalizeFirstLetter(ability.ability.name)).join(', ')}</span></p>
                                <p><strong>Base de experiencia:</strong> <span>{pokemonDetails.base_experience}</span></p>
                            </div>
                            <div className="pokemonPersonalStats">
                                <div className='h3Fondo'>
                                    <h3>Estadísticas del Pokémon</h3>
                                </div>
                                    {pokemonDetails.stats.map(stat => (
                                        <p key={stat.stat.name}>
                                            <strong>{capitalizeFirstLetter(stat.stat.name)}:</strong><span className='statsSpan'>{stat.base_stat}</span> 
                                        </p>
                                    ))}
                                
                            </div>

                        </div>
                        <button className='btnVolver' onClick={() => window.history.back()}>Volver</button>
                    </>
                )
            )}
        </div>
    );
}

export default DetallesPokemon;
