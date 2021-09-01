import React from 'react';

function Header() {
    return (

    <div className="header" uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">

        <nav className="navbar uk-width-1-1" uk-navbar="dropbar: true;">

            <img className="imgnav" id="Movie"  src="Assets/logo.svg" alt=""/>

            <ul className="links">
                <li className="link-active"><a href="index.html" className="link">Inicio</a></li>
                <li><a href="categories.html" className="link">Categorias</a></li>
                <li><a href="https://www.instagram.com" className="link">InsTAGRAM</a></li>
            </ul>


            <form action="search.html" method="get" className="icon">
                <input className="link" type="text" placeholder="Buscar" type="text" name="search" autofocus/>
            </form>

            <ul className="links favorito-link">
                <li><a className="favorito-link" href="favoritos.html">favoritos
                        <img className="icon-fav" src="Assets/Icons/favorito.svg" alt=""/>
                    </a>
                </li>
            </ul>

        </nav>
    </div>
);
}
export default Header;
