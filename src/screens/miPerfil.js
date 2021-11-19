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
                <React.Fragment>
                    < View style={styles.bloque}>
                    <Text style={styles.title}> {auth.currentUser.displayName} </Text>
                    <Text style={styles.subtitle}> {auth.currentUser.email} </Text>
                    <Text style={styles.ultimaConexion}> Ultima conexion: {auth.currentUser.metadata.lastSignInTime} </Text>
                    </View>
                    <Text style={styles.numeroDP}> Usted cuenta con {this.state.posts.length} posteos publicados </Text>
                    <View >
                    <FlatList data = {this.state.posts} keyExtractor = { post => post.id} renderItem= {({item})=><Post postData={item} />}/>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={()=>this.props.logout()}>
                        <Text style={styles.textButton}>Cerrar Sesion</Text>    
                    </TouchableOpacity>
                    
                </React.Fragment>
            }
            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
    bloque:{
        width:'30%',
        borderWidth:1,
        borderColor: '#000',
        borderStyle: 'solid',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'capitalize',
        paddingTop:20,
    },
    subtitle:{
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
    },
    ultimaConexion:{
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        marginBottom:20,

    },
    numeroDP:{
        marginTop: 20,
        marginBottom: 5,

    },
    
    

    button:{
        textAlign: 'center',
        backgroundColor:'#28a745',
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius:4, 
        marginTop:8,
        marginBottom: 10,
        width:800,
        justifyContent:'center',
    },
    textButton:{
        color: '#fff'
    },
    messi:{
        marginBottom: 100000,

    }
})
