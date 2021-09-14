import React, {Component} from 'react';
import Header from '../Header/Header';
import Carrusel from '../Carrusel/Carrusel';
import FilaTarjetas from '../FilaTarjetas/FilaTarjetas';

class Main extends Component{

    constructor(props){
        super(props)
        this.state = {
            orientacion: true,
        } 
    }

    vertical(){
        this.setState({
            orientacion: false
        })
    }


    render(){
        return(
        <React.Fragment>
            <Header orientacion={() => this.vertical()}/>
            <Carrusel/>
            <FilaTarjetas/>
        </React.Fragment>
        )
    }
}

export default Main;