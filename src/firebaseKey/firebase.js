// Importamos las funciones que necesitamos de la librería de Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Configuracion de Firebase.
const firebaseConfig = {
  apiKey: "AIzaSyBXEqtLNG7XNqJejyJtgfY9kWw61JhSdRs",
  authDomain: "pokemonapi-20e0a.firebaseapp.com",
  projectId: "pokemonapi-20e0a",
  storageBucket: "pokemonapi-20e0a.appspot.com",
  messagingSenderId: "473111578562",
  appId: "1:473111578562:web:311d1e9b0551da80a6f85b",
  measurementId: "G-BV3K5TPLZ9"
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);
// Inicializamos el servicio de autenticación.
const auth = getAuth(app);
// Inicializamos el servicio de base de datos.
const db = getFirestore(app);
// Inicializamos el servicio de analiticas.
const analytics = getAnalytics(app);

// Exportamos los servicios que vamos a utilizar
export { auth, db};
export default app;