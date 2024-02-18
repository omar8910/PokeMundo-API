import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css'; // Asegúrate de tener un archivo CSS para estilos personalizados

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/">Inicio</Link>
        <Link to="/listaPokemons">Pokemons</Link>
      </div>
      <div className="footer-social">
        <a href="https://twitter.com/Pokemon" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
        <a href="https://www.facebook.com/Pokemon" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
        <a href="https://www.instagram.com/pokemon/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
      </div>
      <div className="footer-info">
        <p>&copy; 2024 PokeMundo. Hecho por: Omar Q.A</p>
      </div>
    </footer>
  );
}

export default Footer;
