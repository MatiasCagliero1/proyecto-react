//Importar Componentes de React
import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput } from 'react-native';
import Post from '../components/Posteo'
import Buscador from '../components/Buscador'

//Importar Firebase
import { db, auth } from '../firebase/config';

export default class Home extends Component{
    constructor(){
        super()
        this.state={
            posts:[],
            loaded: false,
            usuarios:'',
            usuariosFiltrados:'',
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
                    loaded: true,
                })
            }
        )
    }

    filtrarUsuarios(textoBuscador){
        // console.log(textoBuscador);
        // console.log('=======================');
         let UsuariosFiltrados = this.state.posts.filter(post => post.owner==textoBuscador)
         
         this.setState({
             posts : UsuariosFiltrados
         })
     }

    render(){
        return(
            <React.Fragment>
            { 
                this.state.loaded === false ?
                <ActivityIndicator> </ActivityIndicator>:
                <View>
                    <Buscador filtrarUsuarios={(usuariosFiltrados)=> this.props.filtrarUsuarios(usuariosFiltrados)}/>
                    <Text style={styles.title}>Últimos Posteos</Text>
                    <FlatList data = {this.state.posts} keyExtractor = { post => post.id} renderItem= {({item})=><Post postData={item} />}/>
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
        marginBottom: 10,
    }
})
