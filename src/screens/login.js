//Importar Componentes de React
import React, {Component} from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';

//Importar Pantallas
import Register from '../screens/register';
export default class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            email: this.props.textoMail,
            password: this.props.textoPassword,
            loaded: false,
        }
    }

    render(){
        return(
            <View style={styles.formContainer}>
                <Text>Iniciar Sesión</Text>
                <Text  style={styles.mensajeError}>{this.props.mensajeError}</Text>

                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>{this.setState({email: text})}}
                    value={this.state.email}
                    placeholder='Email'
                    keyboardType='email-address'/>

                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='Password'
                    keyboardType='email-address'
                    value={this.state.password}
                    secureTextEntry={true}
                />

                <TouchableOpacity style={styles.button} onPress={()=>this.props.login(this.state.email, this.state.password)}>
                    <Text style={styles.textButton}>Ingresar</Text>    
                </TouchableOpacity>

                <TouchableOpacity onPress={ ()=> <Register/>}>
                    <Text>¿No tenés cuenta? Registrate</Text>    
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
    },
    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
        marginBottom: 5,
    },
    button:{
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745',
        marginTop:8,
    },
    textButton:{
        color: '#fff'
    },
    mensajeError:{
        marginTop:3,
        color:'red',
    }

})