//  Importamos todos los recursos necesarios
import React, {Component} from 'react';
import Buscador from '../Buscador/Buscador';
import './tarjeta.css';

class Tarjeta extends Component{

    constructor(props){
        super(props)

        this.state = {
            text: 'Ver más',
            viewMore: false,
            style: 'display: none;',
        } 
    }

    
    filtrarPeliculas(textoBuscador){
        let PeliculasFiltradas = this.state.peliculas.filter(pelicula=> pelicula.name.toLowerCase().includes(textoBuscador.toLowerCase()))
        
        this.setState({
            peliculas: PeliculasFiltradas
        })
    }

    verMas(){
        if(this.state.viewMore){
            //Pasar a false
            this.setState({
                text: 'Ver más',
                viewMore: false,
                style: 'display: none;',
            })
        } else{
            //Pasarlo a true
            this.setState({
                text: 'Ver menos',
                viewMore:true,
                style: 'display: flex;',
            })
    }

/*     Preguntar
        El estilo no se cambia
        Uk-slider */


    //    aditionalInfo.style.display = 'flex';
       // description.style.webkit-line-clamp = none;

    }


    render(){

     return (
        <div className="tarjeta">
            <img className="movieImg" src= {`https://image.tmdb.org/t/p/w500${this.props.movieData.backdrop_path}`} alt=""/>
          
            <main className="detalle">
                <section className="navigation">
                 <div className= "fasContainer">
                    <i className="fas fa-chevron-left"></i>
                    <i className="fas fa-chevron-right"></i>
                 </div>
                    <i className="far fa-window-close" onClick={ ()=>this.props.eliminar(this.props.movieData.id)}></i>
                </section>
                <h3>{this.props.movieData.title}</h3>

                <p className="description">{this.props.movieData.overview}</p>

                <section className="aditionalInfo" style={this.props.style}>

                    <p>Estreno: {this.props.movieData.release_date}</p>

                    <p className="APT">{this.props.movieData.adult == true ? 'Película para adultos' : 'Apto para todo publico'}</p>
                </section>
                
                <button className='verMas' onClick={() => this.verMas(this.props.movieData.id) }>{this.state.text}</button>
          </main>
    
        </div>
    );
}
}
export default Tarjeta;