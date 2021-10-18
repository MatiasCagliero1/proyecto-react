//  Importamos todos los recursos necesarios
import React, {Component} from 'react';
import './tarjeta.css';

class Tarjeta extends Component{

    constructor(props){
        super(props)

        this.state = {
            text: 'Ver más',
            viewMore: false,
            style: "aditionalInfoNone",
            styleDescripcion: "description",
        } 
    }


    verMas(){

        if(this.state.viewMore){
            //console.log(this.state.viewMore)
            //Pasar a false
            this.setState({
                viewMore: false,
                text: 'Ver más',
                style: "aditionalInfoNone",
                styleDescripcion: "description",
            })
        } else{
            //Pasarlo a true
           //console.log(this.state.viewMore)
            this.setState({
                viewMore:true,
                text: 'Ver menos',
                style: "aditionalInfo",
                styleDescripcion: "descriptionMore",
            })
    }
    }

    render(){

     return (
        <article className="tarjeta">
            <img className="movieImg" src= {`https://image.tmdb.org/t/p/w500${this.props.movieData.backdrop_path}`} alt=""/>
          
            <main className="detalle">
                <section className="navigation">
                    <div className= "fasContainer tarjetaBotones">
                        <i className="fas fa-chevron-left"></i>
                        <i className="fas fa-chevron-right"></i>
                    </div>
                    <i className="far fa-window-close tarjetaBotones" onClick={ ()=>this.props.eliminar(this.props.movieData.id)}></i>
                </section>
                <h3>{this.props.movieData.title}</h3>
                <p className={this.state.styleDescripcion}>{this.props.movieData.overview}</p>
                <section className={this.state.style}>
                    <p>Estreno: {this.props.movieData.release_date}</p>

                    <p className="APT">{this.props.movieData.adult === true ? 'Película para adultos' : 'Apto para todo publico'}</p>
                </section>
                <div className="center">
                    <button className='verMas' onClick={() => this.verMas()}>{this.state.text}</button>
                </div>
          </main>
        </article>
    );
}
}
export default Tarjeta;