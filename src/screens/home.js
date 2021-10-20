import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput } from 'react-native';
import feed from '../components/feed';

class Home extends Component{
    constructor(){
        super()
        this.state={
            email:''
        }
    }

    render(){
        return(
            <View>
         <feed/>
            
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
    }
})

export default Home;