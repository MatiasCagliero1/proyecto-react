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

    render (){
        return(
            <React.Fragment>
                <div className= "container">
                    { 
                        this.state.isLoaded === false ?
                        <p>Cargando...</p> :
    //                      Pre Cargar Página 
    // var loadpage = document.querySelector(".loadpage");
    //  loadpage.innerHTML += `<span class="spin" uk-spinner="ratio: 10"></span><h2 class"loadh2">Cargando Pagina</h2>`
    // var allbody = document.querySelector(".totalbody");
    // allbody.style.display="none";
    // <div className="loadpage"></div> 

                        this.state.movies.map( (movie, idx) => <Tarjeta key={movie.title + idx} movieData={movie}/>)
                    }
                </div>

                <div className="centrarDiv"><button onClick= {() => this.addMore ()}>Ver más peliculas</button></div>

            </React.Fragment>
        )};
}

export default filaTarjetas;
