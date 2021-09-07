import React, {Component} from 'react';
import Tarjeta from '../Tarjeta/Tarjeta'
import './filaTarjetas.css'

class filaTarjetas extends Component{

    constructor(){
        super()
            this.state = {
                datos:[],
                isLoaded: false,
            }
    }
    componentDidMount(){
        let url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=eace25522629bc36a32ddae28430fdf2&language=en-US&page=1';
 
        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.setState({
                datos: data.data,
                isLoaded: true,
            })
        })
        .catch(error => console.log(error))
    }
    render (){
        return(
            < div className= "container">
                <Tarjeta/>
            </div>
        )};
}

export default filaTarjetas;
