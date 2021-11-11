//Importar Componentes de React

import React, {Component} from "react";
import {Text, View, TouchableOpacity, StyleSheet, Modal, TextInput, FlatList, Image} from 'react-native';
/* import icons from "https://fonts.googleapis.com/icon?family=Material+Icons";
 */

//Importar Firebase
import { auth, db } from "../firebase/config";
import firebase from "firebase";

export default class Post extends Component{
    constructor(props){
        super(props);
        this.state = {
           likes:0,
           myLike:false,
           showModal:false,
           comment:''
        }
    }
    componentDidMount(){
    if(this.props.postData.data.likes){
            this.setState({
               likes:this.props.postData.data.likes.length,
               myLike: this.props.postData.data.likes.includes(auth.currentUser.email),
           })
      }
    }

    likear(){
        //Agregar mi email a un array
        db.collection('Posts').doc(this.props.postData.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(()=>{
            console.log('likeado...');
            //Cambiar el estado de likes y de mylike.
            this.setState({
                likes:this.props.postData.data.likes.length,
                myLike:true
            })
        })
        .catch(e=>console.log(e));
    
    }
    
    unlike(){
        //Quitar mi email a un array
        db.collection('Posts').doc(this.props.postData.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(()=>{
            console.log('quitando like...');
            //Cambiar el estado de likes y de mylike.
            this.setState({
                likes:this.props.postData.data.likes.length,
                myLike:false
            })
        })
        .catch(e=>console.log(e));
    
    }

    showModal(){
        //mostramos el modal
        this.setState({
            showModal: true,
        })
    }

    // Función que cierra el modal
    closeModal(){
        //mostramos el modal
        this.setState({
            showModal: false,
        })
    }

    publicarComentario(){
        //Armar el comentario.
        let oneComment = {
            author: auth.currentUser.email,
            createdAt: Date.now(),
            commentText: this.state.comment
        }
        //Actualizar comentario en la base. Puntualmente en este documento.
            //Saber cual es el post que queremos actualizar
        db.collection('Posts').doc(this.props.postData.id).update({
            comments: firebase.firestore.FieldValue.arrayUnion(oneComment)
        })
        .then(()=>{
            //Cambiar un estado para limpiar el form 
            console.log('Comentario guardado');
            this.setState({
                comment: ''
            })
        })
        .catch( e => console.log(e))

        
    }

    render(){
        console.log(this.props.postData);
        return(
            <View style={styles.postContainer}>
                <Image style={styles.photo}
                source={{uri:'https://imborrable.com/wp-content/uploads/2021/04/fotos-gratis-de-stock-1.jpg'}}
                resizeMode='Contain'
            />
                <Text>Poner Usuario: {this.props.postData.data.textoPost}</Text>
         {/*     <Text>{this.props.postData.data.owner}</Text> */}
                <Text>Likes: {this.state.likes}</Text> 

               {
                   this.state.myLike ?
                    <TouchableOpacity onPress={()=>this.unlike()}>
                        <Text>Quitar like</Text>
                    </TouchableOpacity>   :
                    <TouchableOpacity onPress={()=>this.likear()}>
                        <Text>{/* {icons.favorite} */}Me gusta</Text>
                    </TouchableOpacity>
               }

               {/* Botón para activar el modal */}
               <TouchableOpacity onPress={()=>this.showModal()}>
                   <Text>Ver comentarios</Text>
               </TouchableOpacity>

               {/* Modal */}
               {
                   this.state.showModal ?    
                    <Modal style={styles.modalContainer}
                            animationType='fade'
                            transparent={false}
                            visible = {this.state.showModal}>
                            {/* Botón para cerrar el modal */}
                        <TouchableOpacity onPress={()=>this.closeModal()}>
                            <Text style={styles.closeButton}>X</Text>
                        </TouchableOpacity>
                        {/* Listar los comentarios ¿Qué componenete usamos? */}
                        {
                            this.props.postData.data.comments ?
                                <FlatList 
                                    data={this.props.postData.data.comments}
                                    keyExtractor={post => post.createdAt.toString()}
                                    renderItem={({item})=> <Text> {item.author}: {item.commentText}</Text>}
                                /> :
                                <Text></Text>
                        }
                        {/* Form para nuevo comentario */}
                        <View>
                            <TextInput keyboardType='defualt'
                                        placeholder='Escribí tu comentario'
                                        onChangeText={(text)=>{this.setState({comment: text})}}
                                        multiline
                                        value={this.state.comment}
                            />

                            <TouchableOpacity onPress={()=>this.publicarComentario()}>
                                <Text>Comentar</Text>
                            </TouchableOpacity>
                        </View>

                    </Modal> :
                    <Text></Text>
               }

            </View>
        )
    }

}

const styles = StyleSheet.create({
    postContainer:{
        paddingVertical:5,
        marginBottom: 15,
        
    },
    photo:{
        width:'100%',
        height:'100%',
    },

    modalContainer:{
     width: '97%',
     borderRadius:4,
     padding:10,
     alignSelf: 'center',
     marginVertical: 10,
    boxShadow:'rgb(204 204 204) 0px 0px 12px 9px',
    backgroundColor:'#fff',
    },

    closeButton:{
        backgroundColor:'#dc3545',
        color:'#fff',
        padding:5,
        borderRadius: 4,
        alignSelf:'flex-end',
        margin:5,
    }
})