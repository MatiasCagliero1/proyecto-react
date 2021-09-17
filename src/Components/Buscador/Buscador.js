//  Importamos todos los recursos necesarios
import React, { Component } from 'react';
import '../Header/Header.css';

class Buscador extends Component {
    constructor(){ 
        super();
          //  Definimos los estados (memorias)
        this.state = {
            filterBy:''
        }
    }

    evitarDefault(evento){
        evento.preventDefault()
    }
    
    controlarCambios(event){
        this.setState({
            filterBy: event.target.value
        },()=> this.props.filtrarPeliculas(this.state.filterBy))
    }

    render(){
        return(
            <form action="" className="icon" onSubmit= {(eventoSubmit)=> this.evitarDefault (eventoSubmit)}>
                <input type="text" onChange={(parametro)=> this.controlarCambios(parametro)} value={this.state.filterBy} placeholder="Buscar..."/>
            </form>
        );
    }
}
export default Buscador;