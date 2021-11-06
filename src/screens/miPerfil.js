import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput } from 'react-native';

class Profile extends Component{
    constructor(){
        super()
        this.state={
            
        }
    }

    render(){
        return(
            <View>
                <Text style={styles.title}> Mi perfil </Text>
                <TouchableOpacity style={styles.button} onPress={()=>this.props.logout()}>
                    <Text style={styles.textButton}>Cerrar Sesion</Text>    
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textDecoration: 'underline',
        textAlign: 'center',
    },
    imagen:{
        height:250,
    },
    button:{
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
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

export default Profile;