//Importar Componentes de React
import React, {Component} from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Image} from 'react-native';

//Importar Pantallas
import Register from '../screens/register';
export default class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            email: this.props.textoMail || '',
            password: this.props.textoPassword || '',
            loaded: false,
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Iniciar Sesión</Text>
                <Image source={require('../../assets/login.png')} style={styles.Foto}/>
                <Text  style={styles.mensajeError}>{this.props.mensajeError}</Text>

                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>{this.setState({email: text})}}
                    value={this.state.email}
                    placeholder='Email'
                    keyboardType='email-address'
                />

                <TextInput 
                    id='contraseña'
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='Password'
                    keyboardType='email-address'
                    value={this.state.password}
                    secureTextEntry={true}
                />

                {(this.state.email === '' || this.state.password === '') ?
                    <TouchableOpacity style={styles.buttonDisabled} onPress={()=>this.props.login(this.state.email, this.state.password)} disabled>
                    <Text style={styles.textButton}>Ingresar</Text>    
                </TouchableOpacity>
                :
                    <TouchableOpacity style={styles.button} onPress={()=>this.props.login(this.state.email, this.state.password)} >
                    <Text style={styles.textButton}>Ingresar</Text>    
                </TouchableOpacity>
                }
               

                <TouchableOpacity onPress={ ()=> this.props.drawerProps.navigation.navigate('Registro')}>
                    <Text>¿No tenés cuenta? Registrate</Text>    
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
        color: '#303841',
        fontWeight: 'bold',
    },
    Foto: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    input: {
        width: 300,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: '#00ADB5',
        marginBottom: 10,
        borderRadius: 5,
    },
    buttonDisabled: {
        backgroundColor: '#00ADB5',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        opacity: 0.5,
    },
    button: {
        backgroundColor: '#00ADB5',
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },

    textButton:{
        color: '#fff'
    },
    mensajeError:{
        marginTop:3,
        color:'red',
    }

})