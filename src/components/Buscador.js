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
                style= {styles.buscador}
                onChangeText= {(text)=>this.setState({search : text})}
                placeholder='Buscar...'
                keyboardType= 'default'
            /> 
            <TouchableOpacity style= {styles.button} onPress={()=>this.props.filtrarPublicaciones(this.state.search)}>        
                <Text style= {styles.letra}> Buscar</Text>
            </TouchableOpacity>
            <TouchableOpacity style= {styles.button} onPress={()=>this.props.verTodo()}>
                <Text style= {styles.letra}> Menu</Text>
            </TouchableOpacity>
            </React.Fragment>
        );
    }
}
export default Buscador;
const styles = StyleSheet.create({
   
    buscador:{
        paddingHorizontal:10,
        marginTop: 20,
        height:30,
        width:'80%',
        borderWidth:1,
        borderRadius:6,
        borderColor: '#ccc',
        borderStyle: 'solid',
        flexDirection: "column",
        backgroundColor:'#ffffff',
        textAlign:'center',
        fontSize:20,
        marginLeft: '10%',
        marginBottom:5,
    },
    
    button:{
        height:20,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        backgroundColor: '#EEEEEE',
        flexDirection: "column",
        width:'7%',
        height: 20,
        textAlign:'center',
        marginLeft: '10%',
        marginRight: 5,
    },
    
    letra:{
        fontSize: 15,
    }
        
    
})