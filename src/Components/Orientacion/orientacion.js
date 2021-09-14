import React, {Component} from 'react';
import './orientacion.css'

class Orientacion extends Component{
    constructor(props){
        super(props)
        this.state = {
            
        } 
    }

    render (){
        return(
            <div className="fasContainer">
                <i className="fas fa-th"></i>
                <i className="fas fa-align-justify"></i>
            </div>
        )
    }
}

export default Orientacion;

