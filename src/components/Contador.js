import React, {Component} from "react";
import {Text, View, TouchableOpacity} from 'react-native';

class Contador extends Component{
    constructor(){
        super();
        this.state = {
            clicks: 0,
        }
    }

    contar(){
        this.setState({
            clicks: this.state.clicks + 1
        })
    }

    render(){
        return(
            <View>
                <Text>Cantidad de clicks: {this.state.clicks}</Text>
                <TouchableOpacity onPress={()=>this.contar()}>
                    <Text>clickeame</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

export default Contador