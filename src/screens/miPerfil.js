//Importar Componentes de React
import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput } from 'react-native';
import { db, auth } from '../firebase/config';

export default class Profile extends Component{
    constructor(){
        super()
        this.state={
            posts:[]
        }
    }

    componentDidMount(){
        //Traer datos de la db
        db.collection('Posts')
            .where('owner','==', auth.currentUser.email)
            .onSnapshot( docs => {
                this.setState({
                    posts: docs,
                    loaded: true,
                })
            }
        )
    }

    render(){
        return(
            <View>
                <Text style={styles.title}> {auth.currentUser.displayName} </Text>
                <Text style={styles.subtitle}> {auth.currentUser.email} </Text>
                <Text style={styles.subtitle}> {auth.currentUser.metadata.lastSignInTime} </Text>
                <FlatList data = {this.state.posts} keyExtractor = { post => post.id} renderItem= {({item})=><Post postData={item} />}/>
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
        textAlign: 'center',
        textTransform: 'capitalize',
        marginTop: 20,
    },
    subtitle:{
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
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
        marginTop: 50,
    },
    textButton:{
        color: '#fff'
    }
})
