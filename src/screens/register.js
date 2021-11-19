//Importar Componentes de React
import React, {Component} from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Image} from 'react-native';

export default class Register extends Component{
    constructor(props){
        super(props)
        this.state={
            email: this.props.textoMail || '',
            password: this.props.textoPassword || '',
            userName: '',
        }
    }
    
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Crea tu cuenta para ingresar</Text>
                <Image style={styles.Foto} source={require('../../assets/register.png')} />
                <Text  style={styles.mensajeError}>{this.props.mensajeError}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    value={this.state.email}
                    placeholder='Email'
                    keyboardType='email-address'/> 
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({userName: text})}
                    placeholder='user name'
                    keyboardType='default'/>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password: text})}
                    value={this.state.password}
                    placeholder='Contraseña'
                    keyboardType='email-address'
                    secureTextEntry={true}
                />

                {(this.state.email === '' || this.state.password === '' || this.state.userName === '') ?
                    <TouchableOpacity style={styles.buttonDisabled} onPress={()=>this.props.register(this.state.email, this.state.password, this.state.userName)} disabled>
                    <Text style={styles.textButton}>Registrarse</Text>    
                </TouchableOpacity>
                :
                    <TouchableOpacity style={styles.button} onPress={()=>this.props.register(this.state.email, this.state.password, this.state.userName)} >
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
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
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