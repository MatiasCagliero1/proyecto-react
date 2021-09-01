import React from 'react';

function Footer() {
    return (

        <footer>
        
        <div className="divisor"></div>

        <section className="rowalign">
            <p>Milagros Echague</p>
            <p>Matias Cagliero</p>
            <p>Benjamín Echague</p>
        </section>

        <section className="creditos">
            <div>
                <h3>APIS por TMDB</h3>
                <img src="Assets/TMDT.png" alt=""/>
            </div>
            <div>
                <h3>Web de Movie Rank</h3>
                <img src="Assets/Logotipo/Mesa de trabajo 3.svg" alt=""/>
            </div>
        </section>

        <p className="copyrigth">
            © Copyrigth 2020 Movie Rank S.A.
        </p>

    </footer>


);
}
export default Footer;
