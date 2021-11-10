//Importar Componentes de React
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Camera} from 'expo-camera';

//Importar Firebase
import {db, storage} from '../firebase/config';
class MyCamera extends Component {
    constructor(props){
        super(props)
        this.state = {
            permisos: false,
            foto: '',
        }
        //Para hacer referencia a esta camara y poder usar los metodos internos
        this.camera 
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then( () => {
            this.setState({
                permisos: true
            })
        })
        .catch(e => console.log(e))

       // console.log(Camera);
       // console.log(this.camera);
    }

    takePicture(){
        //Metodo para sacar la foto
        this.camera.takePictureAsync()
        .then( photo => {
            this.setState({
                foto: photo.uri //Ruta internta temporal hacia la carpeta temporal

            })
        }) 
        .catch(e => console.log(e))

    }

    clear(){
        //setear el estado photo a ''
        this.setState({
            foto: ''
        })
    }

    savePhoto(){
        fetch(this.state.foto)
        .then( res => res.blob())
        .then( image => {
            //Guardo imagen en el storage
            //Darle un nombre a la imagen
            storage.ref(`photo/ ${Date.now().jpg}`)
            ref.put(image)
                .then( () => {
                    ref.getDownloadURL()
                        .then( url => {
                            //Paso por props la URL unica al formulario de NuevoPosteo
                            this.props.imageUpload(url)

                            //Actualizo el estado para que se renderice de nuevo la camara
                            this.setState({
                                foto: '',
                            })
                        })
                        .catch(e => console.log(e))
                })
                .catch(e => console.log(e))
            //Subir un archivo al storage


        })
        .catch(e => console.log(e))
    }

    render(){
        return(
            <React.Fragment>
                {
                    this.state.permission ?
                        this.state.foto ? 
                            <React.Fragment>
                                <Image style = {styles.preview} source={{uri: this.state.foto}}> </Image>
                                <View style = {styles.actionArea}> 
                                    <TouchableOpacity onPress= {()=> this.savePhoto}> 
                                        <Text>Aceptar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress = {()=> this.clear()}> 
                                        <Text>Rechazar</Text>
                                    </TouchableOpacity>
                                </View>
                            </React.Fragment> :
                            <React.Fragment>
                                <MyCamera style={StyleSheet.camaraBody} type={Camera.Constants.Type.back} ref={ (reference) => this.camera = reference }/> 
                                <TouchableOpacity style= {StyleSheet.button} onPress = {() => this.takePicture()}> 
                                     <Text> Saca Foto </Text> 
                                </TouchableOpacity>
                             </React.Fragment>  : 
                    <Text> No hay permiso para dar la camara </Text>
                }
            </React.Fragment>
        )
    }

}

const styles = StyleSheet.create({
        
    camaraBody:{
        flex: 7
    },

    button: {
        flex: 1
    },
    preview:{
        flex:7
    },
    actionArea:{
        flex: 2
    }
})

export default MyCamera;