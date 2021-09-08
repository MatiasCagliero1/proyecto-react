import React, { Component } from 'react';
import '../Header/Header.css';

class Buscador extends Component {
    constructor(){
        super();
        this.state = {
            valor:''
        }
    }

    evitarDefault(evento){
        evento.preventDefault()
    }
    controlarCambios(event){
        this.setState({
            valor: event.target.value
        })
    }

    render(){
        return(
            <form action="" className="icon" onSubmit= {(eventoSubmit)=> this.evitarDefault (eventoSubmit)}>
                <input type="text" onChange={(parametro)=> this.controlarCambios(parametro)} value={this.state.valor} placeholder="Buscar..."/>
            </form>
        );
    }
}
export default Buscador;