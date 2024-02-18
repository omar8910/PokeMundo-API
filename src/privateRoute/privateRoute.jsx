import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseKey/firebase';
import '../juegoPokemon/juegoPokemon.css';

const privateRoute = ({ ProtectedComponent}) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      setIsAuth(!!user);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div className='loadingScreen'>Cargando...</div>;

  }

  return isAuth ? <ProtectedComponent /> : <Navigate to="/" />;
};

export default privateRoute;