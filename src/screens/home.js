//Importar Componentes de React
import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput } from 'react-native';
import { db, auth } from '../firebase/config';
import Post from '../components/Posteo'

//Importar Firebase
import { db, auth } from '../firebase/config';


export default class Home extends Component{
    constructor(){
        super()
        this.state={
           posts:[],
        }
    }

    componentDidMount(){
        //Traer datos de la db
        db.collection('Posts').orderBy('createdAt', 'desc').onSnapshot(
            docs => {
                let posteos = [];
                docs.forEach( doc => {
                    posteos.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                
                this.setState({
                    posts: posteos,
                })
            }
        )
    }

    render(){
        return(
            <View>
                <Text style={styles.title}> Hola Mundo </Text>
                <FlatList data = {this.state.posts} keyExtractor = { post => post.id} renderItem= {({item})=><Post postData={item} />}/>
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
    }
})
