import React, {Component} from "react";
import '../screens/home'
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
class Buscador extends Component {
        constructor(){
            super();
            this.state = {
                search:''  
            }
        }

    render(){
        return(
            <React.Fragment>
            <TextInput
                style= {styles.input}
                onChangeText= {(text)=>this.setState({search : text})}
                placeholder='Buscar...'
                keyboardType= 'default'
            /> 
            <TouchableOpacity onPress={()=>this.props.filtrarPublicaciones(this.state.search)}>
                <Text> Buscar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.props.verTodo()}>
                <Text> Menu</Text>
            </TouchableOpacity>
            </React.Fragment>
        );
    }
}
export default Buscador;
const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'capitalize',
        marginTop: 20,
        marginBottom: 10,
    }
})