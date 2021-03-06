//  Importamos todos los recursos necesarios
import React, {Component} from 'react';
import Header from '../Header/Header';
import Carrusel from '../Carrusel/Carrusel';
import Tarjeta from '../Tarjeta/Tarjeta'
import './main.css';

class Main extends Component{

    constructor(props){
        super(props)
        this.state = {
            orientacion: false,
            datos:[],
            isLoaded: false,
            page: 1,
            movies:[],
            moviesIniciales:[]
        } 

    }

    componentDidMount(){
        //  Cargar peliculas iniciales y precargar segunda tarda de peliculas
        let url = `https://api.themoviedb.org/3/movie/top_rated?api_key=eace25522629bc36a32ddae28430fdf2&language=en-US&page=${this.state.page}`;
 
        fetch(url)
        .then(response => response.json())
        .then(data => {
      
            this.setState({
                movies: data.results,
                moviesIniciales: data.results,
                isLoaded: true,
                page: data.page + 1,
            })

        })
        
        .catch(error => console.log(error))
    }

    addMore (){
        //  Agregar más peliculas a la vista
        
        let url = `https://api.themoviedb.org/3/movie/top_rated?api_key=eace25522629bc36a32ddae28430fdf2&language=en-US&page=${this.state.page}`;
    
        fetch(url)
        .then(response => response.json())
        .then(data => {

            this.setState ({
                page: data.page + 1,
                movies:  this.state.movies.concat(data.results),
            })

        })
    
        .catch(e => console.log(e))
        
    }


    eliminoTarjeta(tarjeta){
        let confirmar = window.confirm("Desea eliminar la tarjeta?")
       
        if (confirmar === true){
            let moviesRestantes = this.state.movies.filter( movie => movie.id !== tarjeta)
        
            this.setState({
                movies: moviesRestantes
            })
        } 
       
    }

    vertical(){
        this.setState({
            orientacion: false
        })
    }
    horizontal(){
        this.setState({
            orientacion: true
        })
    }
    
    filtrarPeliculas(textoBuscador){
       // console.log(textoBuscador);
       // console.log('=======================');
        let PeliculasFiltradas = this.state.moviesIniciales.filter(pelicula => pelicula.title.toLowerCase().includes(textoBuscador.toLowerCase()))
        
        this.setState({
            movies: PeliculasFiltradas
        })
    }
    
    render(){
        return(
        <React.Fragment>
         
            <Header filtrarPeliculas={(peliculasFiltradas)=> this.filtrarPeliculas(peliculasFiltradas)} orientacion={()=> this.vertical()} Orientacion={()=> this.horizontal()}/>
        
            <Carrusel/>
          
            <section className={this.state.orientacion === false ? `container` : `container2`}>
                { 
                    this.state.isLoaded === false ?
                    <img src="/img/loader.gif" alt="loader" />:
                    this.state.movies.map( (movie, idx) => <Tarjeta key={movie.title + idx} movieData={movie} eliminar={(id) => this.eliminoTarjeta(id)}/>)
                }
                { 
                    this.state.isLoaded === false ?
                    ' ':
                    <article className="centrarDiv"><button onClick= {() => this.addMore ()}>Ver más peliculas</button></article>
                }
            </section>
            
        </React.Fragment>
        )
    }
    
}

export default Main;