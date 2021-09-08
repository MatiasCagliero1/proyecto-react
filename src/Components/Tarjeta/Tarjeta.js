import React, {Component} from 'react';
import './tarjeta.css';

class Tarjeta extends Component{

    constructor(props){
        super(props)
        this.state = {} 
    }

    verMas(){
        let description = document.querySelector('.description')
       // description.style.webkit-line-clamp = none;
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
                    <p>Estreno: {this.props.movieData.release_date}</p>
                    <p>{this.props.movieData.release_date = false ? 'Película para adultos' : 'Apto para todo publico'}</p>
                </section>
                
                <button className='verMas' onClick={() => this.verMas() }>Ver más</button>
           
            </main>
        </div>
    );
}
}
export default Tarjeta;
