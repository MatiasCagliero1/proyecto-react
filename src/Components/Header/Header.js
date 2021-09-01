import React from 'react';
import './Header.css';

function Header() {
    return (
<header>
    <div className="header" uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">

        <nav className="navbar uk-width-1-1" uk-navbar="dropbar: true;">

            <img className="imgnav" id="Movie"  src="/img/logo.svg" alt=""/>

            <ul className="links">
                <li className="link-active"><a href="index.html" className="link">Inicio</a></li>
                <li><a href="categories.html" className="link">Categorias</a></li>
            </ul>


            <form action="search.html" method="get" className="icon">
                <input className="link" type="text" placeholder="Buscar" type="text" name="search" autofocus/>
            </form>

        

        </nav>
    </div>
    </header>
);
}
export default Header;
