import React from 'react';
import './Header.css';


function Header() {
    return (
<header>
    <div className="header" uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">

        <nav className="navbar uk-width-1-1" uk-navbar="dropbar: true;">

            <img className="imgnav" id="Movie"  src="/img/logo.svg" alt=""/>

            <ul>
            <p className='order'>Ordenar ASC/ DESC</p>

            <div className="fasContainer">
            <i className="fas fa-th"></i>
            <i className="fas fa-align-justify"></i>
            </div>

            <form action="search.html" method="get" className="icon">
                <input className="link" type="text" placeholder="Buscar" type="text" name="search" autofocus/>
            </form>
            </ul>


           
        

        </nav>
    </div>
    </header>
);
}
export default Header;
