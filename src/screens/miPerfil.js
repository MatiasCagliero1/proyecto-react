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
        db.collection('Users')
            .where('email','==', auth.currentUser.email)
            .orderBy('createdAt', 'desc')
            .onSnapshot(
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
                    loaded: true,
                })
            }
        )
    }

    render(){
        return(
            <View>
                <Text style={styles.title}> Mi perfil </Text>
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
    }
})
