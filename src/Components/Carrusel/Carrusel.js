import React from 'react';
import './Carrusel.css';

function Carrusel() {
    return (
        <div className="uk-position-relative uk-visible-toggle uk-light" tabIndex="-1" uk-slideshow="autoplay: true" autoplay-interval="3000" /* uk-slideshow */>

            <ul className="uk-slideshow-items fotoscarrusel">
            <li><img className="img-carru" src="/img/Franjas/alex_rider.jpg" alt=""/></li>
            <li><img className="img-carru" src="/img/Franjas/PactoFuga.jpg" alt=""/></li>
            <li><img className="img-carru" src="/img/Franjas/supernatural.webp" alt=""/></li>
            <li><img className="img-carru" src="/img/Franjas/spiderMan.webp" alt=""/></li>
            <li><img className="img-carru" src="/img/Franjas/Venom.webp" alt=""/></li>
            <li><img className="img-carru" src="/img/Franjas/invensible.webp" alt=""/></li>
            <li><img className="img-carru" src="/img/Franjas/this_is_us.jpg" alt=""/></li>
            v
            </ul>
      {/*       <a className="uk-position-center-left uk-position-small uk-hidden-hover"  uk-slidenav-previous="true"></a>
            <a className="uk-position-center-right uk-position-small uk-hidden-hover" uk-slidenav-next="true"></a> */}
        </div>

);
}
export default Carrusel;
