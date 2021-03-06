//  Importamos todos los recursos necesarios
import React, { Component } from 'react';
import './Header.css';
import Buscador from '../Buscador/Buscador';

class Header extends Component {
    render(){ 
        return (
            <header>
                <section className="header" uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">
                    <nav className="navbar uk-width-1-1" uk-navbar="dropbar: true">
                        <img className="imgnav" id="Movie"  src="/img/logo.svg" alt=""/>
                        <ul>
                            <p className='order'>Ordenar ASC/ DESC</p>
                            <div className="fasContainer">
                                <i className="fas fa-th" onClick={() => this.props.orientacion()}></i>
                                <i className="fas fa-align-justify" onClick={() => this.props.Orientacion()}></i>
                            </div>
                            <Buscador filtrarPeliculas={(peliculasFiltradas)=> this.props.filtrarPeliculas(peliculasFiltradas)}/>
                        </ul>
                    </nav>
                </section>
            </header>
    );
    }
}

export default Header;
