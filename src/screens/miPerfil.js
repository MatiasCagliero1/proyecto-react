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
                    {this.state.posts.length > 0 ?
                    <View style={styles.fondo}>
                    < View style={styles.bloque}>
                        <Text style={styles.title}> {auth.currentUser.displayName} </Text>
                        <Text style={styles.subtitle}> {auth.currentUser.email} </Text>
                        <Text style={styles.ultimaConexion}> Ultima conexion: {auth.currentUser.metadata.lastSignInTime} </Text>
                        <Text style={styles.numeroDP}> Usted cuenta con {this.state.posts.length} posteos publicados </Text>
                    </View>
                    <Text style={styles.TP}> Tus Publicaciones </Text>
                    <View >
                        <FlatList data = {this.state.posts} keyExtractor = { post => post.id} renderItem= {({item})=><Post postData={item} />}/>
                    </View>
                </View> : 
                <View style={styles.container}>
                    <Text style={styles.title}> Hola {auth.currentUser.displayName} </Text>
                    <Text style={styles.subtitle}>Todavia no tienes ningún posteo, Crea uno!</Text>
                    <Image source={require('../../assets/AddPost.png')} style={styles.photo} />
                    <View style={styles.buttonContainer}>       
                        <TouchableOpacity style={styles.buttonPost} onPress={() => this.props.drawerProps.navigation.navigate('Nuevo Post')}>
                            <Text style={styles.textButton}>Crear Posteo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonPost} onPress={() => this.props.drawerProps.navigation.navigate('Home')}>
                            <Text style={styles.textButton}>Ver Posts</Text>
                        </TouchableOpacity>
                    </View>
                </View> }
                    
                </React.Fragment>
            }
                <TouchableOpacity style={styles.button} onPress={()=>this.props.logout()}>
                    <Text style={styles.textButton}>Cerrar Sesion</Text>    
                </TouchableOpacity>
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
        marginLeft:'35%',
        marginTop:30,
        marginBottom: 30,
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

    },
    numeroDP:{
        fontSize: 12,
        marginTop:10,
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center',

    },
    
    photo: {
        width:'30%',
        height:200,
        marginTop:15,
        marginLeft: '35%',
        marginRight: '35%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginTop: 10,
    },

    buttonPost: {
        backgroundColor: '#7FC8A9',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        width: '30%',
        textAlign: 'center',
    },

    button:{
        textAlign: 'center',
        backgroundColor:'#1687A7',
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius:4, 
        marginTop:8,
        marginBottom: 10,
        width:'30%',
        marginLeft:'35%'
    },

    textButton:{
        color: '#fff'
    },
    TP:{
        textAlign:'center',
        fontSize:20,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        marginBottom:30,
    },
    fondo:{
        backgroundColor:"#ffffff",
    },
    container:{
        backgroundColor:"#ffffff",
        width: '80%',
        marginLeft: '10%',
        marginRight: '10%',
        marginTop: 20,
    }
})
