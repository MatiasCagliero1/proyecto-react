//Importar Componentes de React
import React, {Component} from 'react';
import {Text, View, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import Post from '../components/Posteo'

//Importar Firebase
import { db, auth } from '../firebase/config';

export default class Home extends Component{
    constructor(){
        super()
        this.state={
           posts:[],
           loaded: false
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

    render(){
        return(
            <React.Fragment>
            { 
                this.state.loaded === false ?
                <ActivityIndicator> </ActivityIndicator>:
                <View>
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
