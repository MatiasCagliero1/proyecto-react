//Importar Componentes de React
import React, {Component} from 'react';
import {Text, View, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
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
        }
    }

    componentDidMount(){
        this.verTodo()    
    }

    filtrarPublicaciones(textoBuscador){
        db.collection('Posts').where('owner','==',textoBuscador).onSnapshot(
            docs => {
                let posteos = [];
                docs.forEach( doc => {
                    posteos.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                console.log(posteos);
                this.setState({
                    posts: posteos,
                    loaded: true,
                })
            }
        )       
     }
     verTodo(){
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

    render(){
        return(
            <React.Fragment>
            {
                this.state.loaded === false ?
                <ActivityIndicator> </ActivityIndicator>:
                <View style={styles.container}>
                    <Buscador filtrarPublicaciones={(texto)=> this.filtrarPublicaciones(texto)} verTodo={()=>this.verTodo()}/>
                    <Text style={styles.title}>Últimos Posteos</Text>
                    <FlatList style={styles.list} data = {this.state.posts} keyExtractor = { post => post.id} renderItem= {({item})=><Post postData={item} />}/>
                </View>
            }
            </React.Fragment>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        textAlign: 'center',
        width: '80%',
        marginLeft: '10%',
        marginRight: '10%',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'capitalize',
        marginTop: 20,
        marginBottom: 10,
    },

    list: {
        width: '100%',
        height: '100%',
    }

})
