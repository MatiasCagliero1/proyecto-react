//  Importamos todos los recursos necesarios
import React, { Component } from 'react';
import './Header.css';
import Buscador from '../Buscador/Buscador';
import Orientacion from '../Orientacion/orientacion';


class Header extends Component {
    render(){ return (
        <header>
            <div className="header" uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">

                <nav className="navbar uk-width-1-1" uk-navbar="dropbar: true">

                    <img className="imgnav" id="Movie"  src="/img/logo.svg" alt=""/>

                    <ul>
                    <p className='order'>Ordenar ASC/ DESC</p>
                    <Orientacion/>
                    <Buscador/>
                    </ul>
                </nav>
            </div>
        </header>
    );
    }
}
export default Header;
