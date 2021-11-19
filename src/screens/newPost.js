//Importar Componentes de React
import React, {Component} from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { auth, db } from "../firebase/config";
import MyCamera from '../components/Camara'

export default class newPost extends Component{
    constructor(props){
        super(props)
        this.state={
            textoPost:'',
            showCamera: true,
            url: '',
            loaded: false
        }
    }

    onSubmit(){
        console.log('Posteando...');
        db.collection('Posts').add({
            owner: auth.currentUser.email,
            createdAt: Date.now(),
            textoPost: this.state.textoPost,
            photo: this.state.url
        })
        .then(()=>{
            console.log('posteado ok.')
            this.setState({
                textoPost: ''
            })
            //Redirect.
            this.props.drawerProps.navigation.navigate('Home');
        })
        .catch( e => console.log(e))
    }

    imageUpload(url){
        this.setState({
            showCamera: false,
            loaded: true, 
            url: url,
        })
    }


    render(){
        //console.log(this.props.login);
        return(
            <React.Fragment>
                {
                    this.state.showCamera ? 
                    <MyCamera imageUpload= {(url) => this.imageUpload(url)}/> 

                    :

                    <View style={styles.container}>
                       
                        <Image style = {styles.preview} source={this.state.url}></Image>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text)=>this.setState({textoPost: text})}
                            placeholder='Escriba aquí...'
                            keyboardType='default'
                            multiline
                            value={this.state.textoPost}    
                        />
                        <TouchableOpacity style={styles.button} onPress={()=>this.onSubmit()}>
                            <Text style={styles.textButton}>Postear</Text>    
                        </TouchableOpacity>
                    </View>
                }
            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    preview: {
        width: 300,
        height: 400,
        marginBottom: 20,
    },

    input: {
        width: 300,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: '#00ADB5',
        marginBottom: 10,
        borderRadius: 5,
        textAlign: 'center',
    },

    button: {
        backgroundColor: '#00ADB5',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        width:'50%',
    }, 
    
    textButton: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
   
})