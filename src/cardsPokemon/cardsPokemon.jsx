import "./cardsPokemon.css";
import { useState, useEffect } from 'react';

function CardsPokemon(props) {
    var [datosPokemon, setDatosPokemon] = useState([]);
    var [isLoaded, setIsLoaded] = useState(false);

    function cargarDatos() {
        fetch("https://pokeapi.co/api/v2/pokemon/" + props.pokemonName)
            .then(response => response.json())
            .then(data => {
                setDatosPokemon(datosPokemon = data)
                setIsLoaded(isLoaded = true)
            });
    }

    useEffect(() => cargarDatos(), []);

    console.log(datosPokemon);

    function clasificarPokemon(type) {
        switch (type) {
            case "steel":
                return <p className="tipoPokemon" style={{ backgroundColor: '#60A2B9', color: 'white' }}>{type}</p>
            case "water":
                return <p className="tipoPokemon" style={{ backgroundColor: '#2481EF', color: 'white' }}>{type}</p>
            case "bug":
                return <p className="tipoPokemon" style={{ backgroundColor: '#92A212', color: 'white' }}>{type}</p>
            case "dragon":
                return <p className="tipoPokemon" style={{ backgroundColor: '#4F60E2', color: 'white' }}>{type}</p>
            case "electric":
                return <p className="tipoPokemon" style={{ backgroundColor: '#FAC100', color: 'white' }}>{type}</p>
            case "ghost":
                return <p className="tipoPokemon" style={{ backgroundColor: '#704170', color: 'white' }}>{type}</p>
            case "fire":
                return <p className="tipoPokemon" style={{ backgroundColor: '#E72324', color: 'white' }}>{type}</p>
            case "fairy":
                return <p className="tipoPokemon" style={{ backgroundColor: '#EF70EF', color: 'white' }}>{type}</p>
            case "ice":
                return <p className="tipoPokemon" style={{ backgroundColor: '#60A2B9', color: 'white' }}>{type}</p>
            case "fighting":
                return <p className="tipoPokemon" style={{ backgroundColor: '#FF8100', color: 'white' }}>{type}</p>
            case "normal":
                return <p className="tipoPokemon" style={{ backgroundColor: '#A0A2A0', color: 'white' }}>{type}</p>
            case "grass":
                return <p className="tipoPokemon" style={{ backgroundColor: '#3DA224', color: 'white' }}>{type}</p>
            case "psychic":
                return <p className="tipoPokemon" style={{ backgroundColor: '#EF4179', color: 'white' }}>{type}</p>
            case "rock":
                return <p className="tipoPokemon" style={{ backgroundColor: '#B0AA82', color: 'white' }}>{type}</p>
            case "dark":
                return <p className="tipoPokemon" style={{ backgroundColor: '#4F3F3D', color: 'white' }}>{type}</p>
            case "ground":
                return <p className="tipoPokemon" style={{ backgroundColor: '#92501B', color: 'white' }}>{type}</p>
            case "poison":
                return <p className="tipoPokemon" style={{ backgroundColor: '#8F41CB', color: 'white' }}>{type}</p>
            case "flying":
                return <p className="tipoPokemon" style={{ backgroundColor: '#81B9EF', color: 'white' }}>{type}</p>

            default:
                break;
        }
    }

    if (isLoaded) {
        return (
            <>
                <div className="pokemonCard" >
                    <div className="efectoImagen">
                        <img src={datosPokemon.sprites.front_default} alt="frontalPokemon"></img>
                    </div>
                    <hr />
                    <h3>{props.pokemonName.toUpperCase()}</h3>
                    {/* Si hacemos un console.log de datosPokemon, nos devuelve un objeto JSON, en dicho objeto JSON
                    nos devuelve un array llamado "types" el cual el indice 0 es el tipo de pokemon que es.
                    Por lo tanto, para acceder al tipo de pokemon, debemos hacer lo siguiente:
                    */}
                    {clasificarPokemon(datosPokemon.types[0].type.name)}
                </div>
            </>
        )
    }
}

export default CardsPokemon;