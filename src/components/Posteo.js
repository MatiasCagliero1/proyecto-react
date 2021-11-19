//Importar Componentes de React
import React, {Component} from "react";
import {Text, View, TouchableOpacity, StyleSheet, Modal, TextInput, FlatList, Image} from 'react-native';
/* import icons from "https://fonts.googleapis.com/icon?family=Material+Icons";*/

//Importar Firebase
import { auth, db } from "../firebase/config";
import firebase from "firebase";

//Importo alertas
import AwesomeAlert from 'react-native-awesome-alerts';

export default class Post extends Component{
    constructor(props){
        super(props);
        this.state = {
           likes:0,
           myLike:false,
           showModal:false,
           comment:'',
           iconoLike: "https://img.icons8.com/material-outlined/24/000000/hearts.png",
           showAlert: false
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
            iconoLike:"https://img.icons8.com/material-outlined/24/000000/hearts.png"
        })
      }else{
        this.setState({
            iconoLike:"https://img.icons8.com/fluency/48/000000/like.png"
        })
      }
    }

    like(){
        if(this.state.myLike == false){
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
                    iconoLike: "https://img.icons8.com/fluency/48/000000/like.png"
                })
        })
        .catch(e=>console.log(e));
       }else{ //Quitar mi email a un array
            db.collection('Posts').doc(this.props.postData.id).update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
            .then(()=>{
                console.log('quitando like...');
                //Cambiar el estado de likes y de mylike.
                this.setState({
                    likes:this.props.postData.data.likes.length,
                    myLike:false,
                    iconoLike: "https://img.icons8.com/material-outlined/24/000000/hearts.png"
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
        
        thisDoc.delete()
        .then( response => console.log(response))
        .catch(e => console.log(e))

    }

    //Alertas
    showAlert = () => {
        this.setState({
          showAlert: true
        });
    };
    
    hideAlert = () => {
        this.setState({
          showAlert: false
        });
    };
       

    render(){
        const {showAlert} = this.state;
        return(
            
            <View style={styles.container}>
            { auth.currentUser.email === this.props.postData.data.owner ?
                <TouchableOpacity style={styles.closeButtonContainer} onPress={()=>this.showAlert()}>
                <Text style={styles.alertButton}>X</Text>
                </TouchableOpacity> : ''
            }
                <View style={styles.alertContainer}>
        
                    <AwesomeAlert style={styles.alert} show={showAlert} showProgress={false} title="Esta seguro desea eliminar su posteo?" closeOnTouchOutside={true}  closeOnHardwareBackPress={false}
                        showCancelButton={true} showConfirmButton={true} cancelText="No, cancelar" confirmText="Si, elimina" confirmButtonColor="#DD6B55"
                        onCancelPressed={() => { this.hideAlert();}}
                        onConfirmPressed={() => {this.eliminoPosteo();}}/>
                   
                </View>

            <Image style={styles.photo} source={this.props.postData.data.photo} resizeMode='cover'/>
            
            <View style={styles.rowLikes}>
                <TouchableOpacity onPress={()=>this.like()}>
                <Image style={styles.Icons} source={this.state.iconoLike}></Image>
                </TouchableOpacity>
                <View style={styles.row}>
                    <Text style={styles.black}>Likes: </Text>
                    <Text style={styles.capitalize}>{this.state.likes}</Text>
                </View>
                
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

            <Modal style={styles.modalContainer} animationType='fade'transparent={false} visible = {this.state.showModal}>
            <View style={styles.closeButtonContainer}>
                <Text style={styles.closeButton} onPress={()=>this.showAndCloseModal()}>X</Text>
            </View>

            <View style={styles.dataComments}>
            {(this.props.postData.data.comments != undefined)?

            <FlatList data={this.props.postData.data.comments} keyExtractor={post => post.createdAt.toString()} renderItem={({item})=>
                <View style={styles.row}>
                    <Text style={styles.black}>{item.author}: </Text>
                    <Text style={styles.capitalize}>{item.commentText}</Text>
                </View>}/>

            :<Text>¡Todavia no ha comnentado nadie!</Text>}
                      
            {/* Form para nuevo comentario */}
            <View>
                <TextInput keyboardType='defualt' placeholder='Escribí tu comentario'onChangeText={(text)=>{this.setState({comment: text})}}
                style={styles.comments} value={this.state.comment} maxLength='55'/>

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
            </Modal>
            :<Text></Text>
            }
            </View>
        )
    }

}

const styles = StyleSheet.create({
   
    container:{
        flex: 1,
        display: "flex", 
        backgroundColor:'#D3E0EA',
        width: '65%',
        padding:10,
        borderRadius: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        justifyContent: 'center',
        marginBottom:10,
        borderRadius:6,
        marginLeft: '17%',
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    alertContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        zIndex: 999,
    },
    alertButton: {
        margin: 5,
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 5,
        backgroundColor: "#AEDEF4",
    },

    photo:{
        width:'100%',
        height: 400,
        marginBottom:5,
        position: 'relative',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },

    
    Icons:{
        width: "20px",
        height:"20px",
        marginTop: 5,
        marginBottom: 2,

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
        backgroundColor:'#1687A7',
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