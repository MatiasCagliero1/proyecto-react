//  Importamos todos los componentes necesarios
import React from 'react';
import Main from './Components/Main/Main'
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <React.Fragment>
      <Main/>
      <div className="centrarDiv"><button>Ver más peliculas</button></div>
      <Footer/>
    </React.Fragment>
  );}

export default App;
