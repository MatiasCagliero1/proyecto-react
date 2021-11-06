//Importar Componentes de React
import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput } from 'react-native';

export default class NewPost extends Component{
    constructor(){
        super()
        this.state={
            
        }
    }

    render(){
        return(
            <View>
                <Text style={styles.title}> Crear nuevo posteo</Text>
               
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'capitalize',
        marginTop: 20,
    },
   
})
