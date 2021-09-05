import React, {Component} from 'react';
import './tarjeta.css'

class Tarjeta extends Component{
    constructor(props){
        super(props)
        this.state = {
            datos:''
        }
    }
    componentDidMount(){
        fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=<<api_key>>&language=en-US&page=1')
        .then(data => this.setState(
            {datos: data.data}
        ))
        .catch(error => console.log(error))
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
