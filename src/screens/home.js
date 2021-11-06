import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput } from 'react-native';
import { db, auth } from '../firebase/config';


class Home extends Component{
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
                console.log(posteos);

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
            
                <FlatList 
                    data = {this.state.posts}
                    keyExtractor = { post => post.id}
                    renderItem= {({item})=><Text>{item.data.textoPost}</Text>}
                />

            
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

export default Home;