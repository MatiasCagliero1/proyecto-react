import React, {Component} from 'react';
import './tarjeta.css'

class Tarjeta extends Component{
    constructor(props){
        super(props)
        this.state = {} 
    }

    render(){
    console.log(this.props)
     return (
        <div className="tarjeta">
            <section className="navigation">
                <div className= "fasContainer">
                    <i className="fas fa-chevron-left"></i>
                    <i className="fas fa-chevron-right"></i>
                </div>
                <i className="far fa-window-close"></i>
            </section>
            <main>
                <img src= 'https://image.tmdb.org/t/p/w500`${this.props.movieData.backdrop_path}`' alt=""/>
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
