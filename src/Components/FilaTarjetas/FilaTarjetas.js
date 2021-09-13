import React, {Component} from 'react';
import Tarjeta from '../Tarjeta/Tarjeta';
import './filaTarjetas.css';

class filaTarjetas extends Component{

    constructor(){
        super()
            this.state = {
                datos:[],
                isLoaded: false,
                page: 1,
            }
    }

    addMore (){
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
        let moviesRestantes = this.state.movies.filter( movie => movie.id !== tarjeta)
        
        this.setState({
            movies: moviesRestantes
        })
    }
    render (){
        return(
            < div className= "container">
                { 
                    this.state.isLoaded === false ?
                    <p>Cargando...</p> :
                    this.state.movies.map( (movie, idx) => <Tarjeta key={movie.title + idx} movieData={movie} eliminar={(id) => this.eliminoTarjeta(id)}/>)
                }
            </div>

        )};
}

export default filaTarjetas;
