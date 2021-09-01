import React from 'react';
import Header from './Components/Header/Header';
import FilaTarjetas from './Components/FilaTarjetas/FilaTarjetas';
import Footer from './Components/Footer/Footer';

function App() {
  return (

    <React.Fragment>

<Header/>

   <button type="button">Cargar más tarjetas</button>
        <section class="card-container"></section>

        
    </React.Fragment>
  );
}

export default App;
