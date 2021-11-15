//Importar Componentes de React
import React, {Component} from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import { auth, db } from "../firebase/config";
import MyCamera from '../components/Camara'


class newPost extends Component{
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

                    <View style={styles.formContainer}>
                        <Text>Nuevo Post</Text>
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
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
    },
    input:{
        height:100,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    button:{
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    textButton:{
        color: '#fff'
    }

})

export default newPost;
