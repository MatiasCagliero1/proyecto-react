//Importar Componentes de React
import React, {Component} from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';

export default class Register extends Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            userName:'',
            password:'',
        }
    }
    
    render(){
        return(
            <View style={styles.formContainer}>
                <Text>Registrarse</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder='Email'
                    keyboardType='email-address'/> 

                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='Contraseña'
                    keyboardType='email-address'
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.button} onPress={()=>this.props.register(this.state.email, this.state.password)}>
                    <Text style={styles.textButton}>Registrarse</Text>    
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
    }

})