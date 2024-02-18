import React from 'react'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider, Outlet
  } from "react-router-dom";
import LandingPage from './landingPage/landingPage.jsx';
import CabeceraMenu from './cabeceraMenu/cabeceraMenu.jsx';
import Footer from './footer/footer.jsx';
import FlechaScroll from './flechaScroll/flechaScroll.jsx';
import JuegoPokemon from './juegoPokemon/juegoPokemon.jsx';
import Pokemon404 from './error404/pokemon404.jsx';
import ListaPokemons from './listaPokemons/listaPokemons.jsx';
import DetallesPokemon from './detallesPokemon/detallesPokemon.jsx';
import Registro from './registro/registro.jsx';
import InicioSesion from './inicioSesion/inicioSesion.jsx';
import PrivateRoute from './privateRoute/privateRoute.jsx';

function App(){
    const router = createBrowserRouter([
        {
            element:(
                <>
                    <CabeceraMenu />
                    <Outlet />
                    <FlechaScroll />
                    <Footer />
                </>
            ),

            children:[
                {
                    path: '/',
                    element: <LandingPage />
                },
                {
                    path: '/juegoPokemon',
                    element: <PrivateRoute ProtectedComponent={JuegoPokemon}></PrivateRoute>
                },
                {
                    path: '/listaPokemons',
                    element: <ListaPokemons />
                },
                {
                    path: '/detallesPokemon/:name',
                    element: <DetallesPokemon />
                },
                {
                    path: '/registro',
                    element: <Registro />
                },
                {
                    path: '/inicioSesion',
                    element: <InicioSesion />
                },
                {
                    path: '*',
                    element: <Pokemon404 />
                },
            ]
        },

    ]);

    return (
        <>
            <RouterProvider router={router} />
        </>

    )      

}


export default App;