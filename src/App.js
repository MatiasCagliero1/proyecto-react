import React from 'react';
import Header from './Components/Header/Header';
import Carrusel from './Components/Carrusel/Carrusel';
//import Tarjeta from './Components/Tarjeta/Tarjeta'
import FilaTarjetas from './Components/FilaTarjetas/FilaTarjetas';
import Footer from './Components/Footer/Footer';

function App() {
  return (

<React.Fragment>
    {/* Pre Cargar Página */}
    {/* var loadpage = document.querySelector(".loadpage");
     loadpage.innerHTML += `<span class="spin" uk-spinner="ratio: 10"></span><h2 class"loadh2">Cargando Pagina</h2>`
    var allbody = document.querySelector(".totalbody");
    allbody.style.display="none"; */}
    <div className="loadpage"></div>

    <Header/>
    <Carrusel/>
    <FilaTarjetas/>
    <div className="centrarDiv"><button>Ver más peliculas</button></div>
 
    <Footer/>
</React.Fragment>
  );}

export default App;
