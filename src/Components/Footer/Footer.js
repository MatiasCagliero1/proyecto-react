import React from 'react';
import './Footer.css';

function Footer() {
    return (

        <footer>
        <section className="rowalign">
            <p>Milagros Echague</p>
            <p>Matias Cagliero</p>
            <p>Benjamín Echague</p>
        </section>

        <div className="divisor"></div>

        <section className="creditos">
            <div>
                <h3>APIS por TMDB</h3>
                <img src="/img/TMDT.png" alt=""/>
            </div>
            <div>
                <h3>Web de Movie Rank</h3>
                <img src="/img/logo.svg" alt=""/>
            </div>
        </section>

        <p className="copyrigth">
            © Copyrigth 2020 Movie Rank S.A.
        </p>

    </footer>


);
}
export default Footer;
