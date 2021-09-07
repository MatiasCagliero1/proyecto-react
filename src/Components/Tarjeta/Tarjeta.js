import React, {Component} from 'react';
import './tarjeta.css'

class Tarjeta extends Component{
    constructor(props){
        super(props)
        this.state = {} 
    }
    
    render(){
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
                <img src="./img/image-default.png" alt=""/>
                <h3></h3>
                <p className="description"></p>
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
