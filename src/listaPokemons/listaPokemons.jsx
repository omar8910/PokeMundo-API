import './listaPokemons.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CardsPokemon from '../cardsPokemon/cardsPokemon';

function Pokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [nextPageURL, setNextPageURL] = useState('https://pokeapi.co/api/v2/pokemon/?limit=4&offset=4');

  useEffect(() => {
    cargarTodos();
  }, []);

  async function cargarTodos() {
    try {
      const response = await fetch(nextPageURL);
      const data = await response.json();
      setPokemons([...pokemons,...data.results]);
      setNextPageURL(data.next);
    } catch (error) {
      console.error('Error al cargar los Pokémon:', error);
    }
  }


  const cargarMas = () => {
    cargarTodos();
  };


  const renderPokemonCards = () => {
    return pokemons.map(pokemon => (
      <Link to={`/detallesPokemon/${pokemon.name}`} key={pokemon.name}>
        <CardsPokemon pokemonName={pokemon.name} />
      </Link>
    ));
  };

  return (
    <>
      <main className='mainLista'>
        <div className='pokemonContainer' >
          {renderPokemonCards()}
        </div>
        <button onClick={cargarMas} className="moreBtn">Cargar más</button>
      </main>
    </>

  );
}

export default Pokemons;
