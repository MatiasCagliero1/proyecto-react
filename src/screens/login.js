import React, {Component} from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';

class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:'',
            error:'',
        }
    }


    render(){
       
        return(
            <View style={styles.formContainer}>
                <Text style={styles.title}>Iniciar Sesión</Text>

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

                <TouchableOpacity style={styles.button} onPress={()=>this.props.login(this.state.email, this.state.password)}>
                    <Text style={styles.textButton}>Ingresar</Text>    
                </TouchableOpacity>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer:{
       /*  display:'flex',
        justifyContent: 'center',
        alignContent:'center',
        width:'100',
        height:'100', */
        paddingHorizontal:300,
        marginTop: 20,
    },

    title:{
        textAlign: 'center',
        fontSize: 28,
        marginBottom:10
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
        marginBottom:10
    },
    button:{
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 10,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    textButton:{
        color: '#fff'
    }

})

export default Login;