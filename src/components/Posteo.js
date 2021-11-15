//Importar Componentes de React
import React, {Component} from "react";
import {Text, View, TouchableOpacity, StyleSheet, Modal, TextInput, FlatList, Image} from 'react-native';
/* import icons from "https://fonts.googleapis.com/icon?family=Material+Icons";*/

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
           comment:'',
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

    showAndCloseModal(){
        // Abrir y Cerrar el modal
        if(this.state.showModal == true){
            this.setState({
                showModal: false,
            })
        }else{
            this.setState({
                showModal: true,
            })
        }
    
    }

    publicarComentario(){
        //  Armar el comentario.
        let oneComment = {
            author: auth.currentUser.email,
            createdAt: Date.now(),
            commentText: this.state.comment
        }

        //  Actualizar comentario en la base. Puntualmente en este documento.
        //  Saber cual es el post que queremos actualizar
        db.collection('Posts').doc(this.props.postData.id).update({
            comments: firebase.firestore.FieldValue.arrayUnion(oneComment)
        })
        .then(()=>{
            //  Cambiar un estado para limpiar el form 
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
             {/* LLAMAR A LA FOTO EN EL POSTEO */}

                <Image style={styles.photo}
                source={{uri:'https://imborrable.com/wp-content/uploads/2021/04/fotos-gratis-de-stock-1.jpg'}}
                resizeMode='cover'/>
                
                <View style={styles.rowLikes}>
                {/*     <Text>{this.props.postData.data.owner}</Text> */}
                        <Text>Likes: {this.state.likes}</Text> 

                    {this.state.myLike ?
                            <TouchableOpacity onPress={()=>this.unlike()}>
                                <Text>{/* {icons.favorite} */}Quitar like</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={()=>this.likear()}>
                                <Text>{/* {icons.favorite} */}Me gusta</Text>
                            </TouchableOpacity>
                    }

                </View>

            <View style={styles.row}>
                <Text style={styles.black}>{this.props.postData.data.owner}: </Text>
                <Text style={styles.capitalize}>{this.props.postData.data.textoPost}</Text>
            </View>


               {/* Botón para activar el modal */}
               <TouchableOpacity onPress={()=>this.showAndCloseModal()}>
                   <Text>Ver comentarios</Text>
               </TouchableOpacity>

               {/* Modal */
                   this.state.showModal ?    
                    <Modal style={styles.modalContainer}
                            animationType='fade'
                            transparent={false}
                            visible = {this.state.showModal}>

                        {/* Botón para cerrar el modal */}
                        <View style={styles.closeButtonContainer}>
                            <Text style={styles.closeButton} onPress={()=>this.showAndCloseModal()}>X</Text>
                        </View>

                        <View style={styles.dataComments}>

                        {/* Listar los comentarios ¿Qué componenete usamos? */
                            this.props.postData.data.comments ?
                                <FlatList 
                                    data={this.props.postData.data.comments}
                                    keyExtractor={post => post.createdAt.toString()}
                                    renderItem={({item})=>
                                    (item.commentText !== '')?
                                    <View style={styles.row}>
                                        <Text style={styles.black}>{item.author}: </Text>
                                        <Text style={styles.capitalize}>{item.commentText}</Text>
                                    </View>
                                    :  <Text></Text>
                                }/> :
                                <Text></Text>
                        }

                        {/* Form para nuevo comentario */}
                        <View>
                            <TextInput keyboardType='defualt'
                                        placeholder='Escribí tu comentario'
                                        onChangeText={(text)=>{this.setState({comment: text})}}
                                        style={styles.comments}
                                        value={this.state.comment}
                                        maxLength='55'
                            />


                         { (this.state.comment =='')?
                          <TouchableOpacity style={styles.disabled } onPress={()=>this.publicarComentario()} disabled>
                                <Text style={styles.commentarText}>Comentar</Text>
                            </TouchableOpacity>
                                :
                            <TouchableOpacity style={styles.commentar} onPress={()=>this.publicarComentario()} >
                                <Text style={styles.commentarText}>Comentar</Text>
                            </TouchableOpacity>}

                        </View>
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
        display: 'flex',
        flexDirection: 'column',
        margin: '10em',
        marginVertical: 0
    },
    photo:{
        width:'100%',
        height: 400,
        marginBottom:5
    },

    rowLikes:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
     },

    row:{
       display: 'flex',
       flexDirection: 'row',
       marginBottom: 5
    },

    black:{
        fontWeight: '600'
    },

    capitalize:{
        textTransform: 'capitalize'
    },

    modalContainer:{
    display: 'flex',
    flexDirection: "row-reverse",
    justifyContent: "space-between",
     width: '97%',
     borderRadius:4,
     padding:10,
     alignSelf: 'center',
     marginVertical: 10,
    boxShadow:'rgb(204 204 204) 0px 5px 12px 5px',
    backgroundColor:'#fff',
    },

    closeButtonContainer:{
        display: 'flex',
       flexDirection: 'row',
       justifyContent: 'flex-end',
        height: '2.5em'
    },
    closeButton:{
        backgroundColor:'#dc3545',
        color:'#fff',
        padding:10,
        paddingVertical:7,
        borderRadius: 4,
        margin:5,
    },
    comments:{
        outline: 'none',
        marginVertical: 10,
        width:'100%',
        height:'50%',
 },
 dataComments:{
    width:'70%',
},
    commentar:{
        textAlign: 'center',
        backgroundColor:'#28a745',
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius:4, 
        marginTop:8,
        marginBottom: 10,
 }, disabled:{
    backgroundColor:'grey',
    textAlign: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius:4, 
    marginTop:8,
    marginBottom: 10,
}
 
 ,commentarText :{
    color:'white',
}
})