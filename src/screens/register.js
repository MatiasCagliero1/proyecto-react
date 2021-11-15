//Importar Componentes de React
import React, {Component} from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';

export default class Register extends Component{
    constructor(props){
        super(props)
        this.state={
            email: this.props.textoMail || '',
            password: this.props.textoPassword || '',
        }
    }
    
    render(){
        return(
            <View style={styles.formContainer}>
                <Text>Registrarse</Text>
                <Text  style={styles.mensajeError}>{this.props.mensajeError}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    value={this.state.email}
                    placeholder='Email'
                    keyboardType='email-address'/> 

                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password: text})}
                    value={this.state.password}
                    placeholder='Contraseña'
                    keyboardType='email-address'
                    secureTextEntry={true}
                />

                {(this.state.email === '' || this.state.password === '') ?
                    <TouchableOpacity style={styles.buttonDisabled} onPress={()=>this.props.register(this.state.email, this.state.password)} disabled>
                    <Text style={styles.textButton}>Registrarse</Text>    
                </TouchableOpacity>
                :
                    <TouchableOpacity style={styles.button} onPress={()=>this.props.register(this.state.email, this.state.password)} >
                    <Text style={styles.textButton}>Registrarse</Text>    
                </TouchableOpacity>
                }

                <TouchableOpacity onPress={ ()=> this.props.drawerProps.navigation.navigate('Iniciar Sesión')}>
                    <Text>¿Ya tenés cuanta? Inicia Sesión</Text>    
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
        paddingVertical:18,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
        marginBottom: 5,
    },
    buttonDisabled:{
        textAlign: 'center',
        backgroundColor:'grey',
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius:4, 
        marginTop:8,
        marginBottom: 10,
    },
    button:{
        textAlign: 'center',
        backgroundColor:'#28a745',
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius:4, 
        marginTop:8,
        marginBottom: 10,
    },

    textButton:{
        color: '#fff'
    },
    mensajeError:{
        marginTop:3,
        color:'red',
    }

})