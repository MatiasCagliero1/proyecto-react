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
           iconoLike: 'LIKE',
        }
    }

    componentDidMount(){
    if(this.props.postData.data.likes){
            this.setState({
               likes:this.props.postData.data.likes.length,
               myLike: this.props.postData.data.likes.includes(auth.currentUser.email),
           })
      }
      
      if (this.state.myLike == false) {
        this.setState({
            iconoLike:'LIKE'
        })
      }else{
        this.setState({
            iconoLike:'QUITAR LIKE'
        })
      }
    }

    like(){
        if(this.state.myLike == false)
            {
            //Agregar mi email a un array
            db.collection('Posts').doc(this.props.postData.id).update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
            .then(()=>{
                console.log('likeado...');

                //Cambiar el estado de likes y de mylike.
                this.setState({
                    likes:this.props.postData.data.likes.length,
                    myLike:true,
                    iconoLike: 'QUITAR LIKE'
                })
        })
        .catch(e=>console.log(e));

       }else{
                    //Quitar mi email a un array
                    db.collection('Posts').doc(this.props.postData.id).update({
                        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
                    })
                    .then(()=>{
                        console.log('quitando like...');
                        //Cambiar el estado de likes y de mylike.
                        this.setState({
                            likes:this.props.postData.data.likes.length,
                            myLike:false,
                            iconoLike: 'LIKE'
                        })
            })
            .catch(e=>console.log(e));
    }
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

        //  Datos del comentario.
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
                comment: '',
            })
        })
        .catch(e => console.log(e))
        
        }
    
    eliminoPosteo(){
        let thisDoc = db.collection('Posts').doc(this.props.postData.id)
        
        let confirm = confirm('Estas seguro que quiere eliminar')

        if(confirm == true){
        thisDoc.delete()
        .then( response => console.log(response))
        .catch(e => console.log(e))} 

    }
       

    render(){
        console.log(this.props.postData);
        console.log(auth.currentUser)

        return(
            <React.Fragment style={styles.postContainer}>
                { auth.currentUser.email === this.props.postData.data.owner ?
                <TouchableOpacity style={styles.closeButtonContainer} onPress={()=>this.eliminoPosteo()}>
                   <Text style={styles.closeButton} > X </Text>
                </TouchableOpacity> : ''
                }

                <Image style={styles.photo}
                source={this.props.postData.data.photo}
                resizeMode='cover'/>

                <View style={styles.rowLikes}>
                    <View style={styles.row}>
                        <Text style={styles.black}>Likes: </Text>
                        <Text style={styles.capitalize}>{this.state.likes}</Text>
                    </View>
                    <TouchableOpacity onPress={()=>this.like()}>
                        <Text>{/* {icons.favorite} */}{this.state.iconoLike}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.row}>
                    <Text style={styles.black}>{this.props.postData.data.owner}: </Text>
                    <Text >{this.props.postData.data.textoPost}</Text>
                </View>

                {/* ABRIR Y CERRAR MODAL */}
               <TouchableOpacity onPress={()=>this.showAndCloseModal()}>
                   <Text>Ver comentarios</Text>
               </TouchableOpacity>

               {/* MODAL DE COMENTARIOS */}
               {  this.state.showModal ?    
                    <Modal style={styles.modalContainer}
                            animationType='fade'
                            transparent={false}
                            visible = {this.state.showModal}>

                       
                    <View style={styles.closeButtonContainer}>
                        <Text style={styles.closeButton} onPress={()=>this.showAndCloseModal()}>X</Text>
                    </View>

                    <View style={styles.dataComments}>

                    {(this.props.postData.data.comments != undefined)?

                        <FlatList 
                            data={this.props.postData.data.comments}
                            keyExtractor={post => post.createdAt.toString()}
                            renderItem={({item})=>

                            <View style={styles.row}>
                                <Text style={styles.black}>{item.author}: </Text>
                                <Text style={styles.capitalize}>{item.commentText}</Text>
                            </View>}/>

                        :<Text>¡Todavia no ha comnentado nadie!</Text>}
                      
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
                    </Modal> :<Text></Text>
               }
               
            </React.Fragment>
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
    }, 

    disabled:{
        backgroundColor:'grey',
        textAlign: 'center',
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius:4, 
        marginTop:8,
        marginBottom: 10,
    },
    
    commentarText: {
        color:'white',
    }
})