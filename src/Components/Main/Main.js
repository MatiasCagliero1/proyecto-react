import React, {Component} from 'react';
import Header from '../Header/Header';
import Carrusel from '../Carrusel/Carrusel';
import Tarjeta from '../Tarjeta/Tarjeta'
import '../FilaTarjetas/filaTarjetas.css';

class Main extends Component{

    constructor(){
        super()

        this.state = {
            orientacion: true,
            datos:[],
            isLoaded: false,
            page: 1,
            movies:[]
        } 
    }

    addMore (){
        console.log('nbki')
        let page = this.state.page;
        let url = `https://api.themoviedb.org/3/movie/top_rated?api_key=eace25522629bc36a32ddae28430fdf2&language=en-US&page=${this.state.page}`;
    
        fetch(url)
    
        .then(response => response.json())
    
        .then(data => {
         //   console.log(data.results)
            this.setState ({
                page: data.page + 1,
                movies:  this.state.movies.concat(data.results),
            }) 
        })
    
        .catch(e => console.log(e))
        
    }
    
    componentDidMount(){
        let page = this.state.page;
        let url = `https://api.themoviedb.org/3/movie/top_rated?api_key=eace25522629bc36a32ddae28430fdf2&language=en-US&page=${this.state.page}`;
 
        fetch(url)
        .then(response => response.json())
        .then(data => {
         console.log(data)
      
            this.setState({
                movies: data.results,
                isLoaded: true,
                page: data.page + 1,
            })
        })
        
        .catch(error => console.log(error))
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
    
    filtrarPeliculas(textoBuscador){
        console.log(textoBuscador);
        console.log('=======================');
        let PeliculasFiltradas = this.state.movies.filter(pelicula=> pelicula.title.toLowerCase().includes(textoBuscador.toLowerCase()))
        
        this.setState({
            movies: PeliculasFiltradas
        })
    }

    render(){
        return(
        <React.Fragment>
            <Header filtrarPeliculas={(peliculasFiltradas)=> this.filtrarPeliculas(peliculasFiltradas)}/>
            <Carrusel/>
            < div className= "container">
                { 
                    this.state.isLoaded === false ?
                    <p>Cargando...</p> :
                    this.state.movies.map( (movie, idx) => <Tarjeta key={movie.title + idx} movieData={movie} eliminar={(id) => this.eliminoTarjeta(id)}/>)
                }
                                <div className="centrarDiv"><button onClick= {() => this.addMore ()}>Ver más peliculas</button></div>

            </div>
        </React.Fragment>
        )
    }

    
}

export default Main;