import React from 'react';

function Carrusel() {
    return (
        <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1" uk-slideshow="autoplay: true" autoplay-interval="3000" uk-slideshow>
        <ul class="uk-slideshow-items fotoscarrusel"></ul>
        <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slideshow-item="previous"></a>
        <a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slideshow-item="next"></a>
    </div>

);
}
export default Carrusel;
