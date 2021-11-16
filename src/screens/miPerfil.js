//Importar Componentes de React
import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList} from 'react-native';
import { db, auth } from '../firebase/config';
import Post from '../components/Posteo'

export default class Profile extends Component{
    constructor(){
        super()
        this.state={
            posts:[],
            loaded: false
        }
    }

    componentDidMount(){
        //Traer datos de la db
        db.collection('Posts')
        .where('owner','==', auth.currentUser.email).onSnapshot( 
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
            <React.Fragment>
            { 
                this.state.loaded === false ?
                <ActivityIndicator> </ActivityIndicator>:
                <View>
                    <Text style={styles.title}> {auth.currentUser.displayName} </Text>
                    <Text style={styles.subtitle}> {auth.currentUser.email} </Text>
                    <Text style={styles.subtitle}> Ultimo Inicio de Sesion: {auth.currentUser.metadata.lastSignInTime} </Text>
                    <Text style={styles.subtitle}> Cantidad de posteos: {this.state.posts.length} </Text>
                    <FlatList data = {this.state.posts} keyExtractor = { post => post.id} renderItem= {({item})=><Post postData={item} />}/>
                    <TouchableOpacity style={styles.button} onPress={()=>this.props.logout()}>
                        <Text style={styles.textButton}>Cerrar Sesion</Text>    
                    </TouchableOpacity>
                </View>
            }
            </React.Fragment>
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
