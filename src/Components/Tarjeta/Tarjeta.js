import React, {Component} from 'react';
import './tarjeta.css';
import Buscador from '../Buscador/Buscador';
class Tarjeta extends Component{

    constructor(props){
        super(props)
        this.state = {} 
    }
    filtrarPeliculas(textoBuscador){
        let PeliculasFiltradas = this.state.peliculas.filter(pelicula=> pelicula.name.toLowerCase().includes(textoBuscador.toLowerCase()))
        
        this.setState({
            peliculas: PeliculasFiltradas
        })
    }

    render(){
  //  console.log(this.props)
     return (
        <div className="tarjeta">
            <img src= {`https://image.tmdb.org/t/p/w342${this.props.movieData.backdrop_path}`} alt=""/>
            <main>
                <section className="navigation">
                 <div className= "fasContainer">
                    <i className="fas fa-chevron-left"></i>
                    <i className="fas fa-chevron-right"></i>
                 </div>
                    <i className="far fa-window-close" onClick={ ()=>this.props.eliminar(this.props.movieData.id)}></i>
                </section>
                <h3>{this.props.movieData.title}</h3>
                <p className="description">{this.props.movieData.overview}</p>
                <section className="aditional-info">
                    <p></p>
                </section>
                <a href="">Ver más</a>
            </main>
        </div>
    );
}
}
export default Tarjeta;
