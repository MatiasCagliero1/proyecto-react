//Importar Componentes de React
import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import camera from 'expo-camera';

//Importar Firebase
import { db, storag } from '../firebase/config';

export default class Camera extends Component{
    constructor(props){
        super(props);
        this.state = {
            permission: false,
            photo:'',
        }
        this.camera
    }

    componentDidMount(){
        camera.requestCameraPermissionsAsync()
        .then( () => { this.setState({permission:true})})
        .catch(error => console.log(error))
    }

    // Metodo Para sacar la Foto
    takePicture(){
     this.Camera.takePictureAsync()
        .then( photo => {
         this.setState({
         photo: photo.uri,
    })
})
.catch(error => console.log(error))
    }

    savePhoto(){
fetch( this.state.photo)
.then (res=>res.blob())
.then(image=>{})
    }


    clear(){

    }

render(){
    return(
<React.Fragment>
{
    this.state.permission ? 
        this.state.photo ?
            <React.Fragment>
                <Image style={styles.imagePreview}
                source={{uri: this.state.photo}}
                />
                <View style={styles.Actions}>
                <TouchableOpacity onPress={(()=>this.savePhoto)}>
                    <Text>Aceptar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={(()=>this.clear)}>
                    <Text>Eliminar</Text>
                </TouchableOpacity>
                </View>
            </React.Fragment>
    :

    <React.Fragment>
    <MyCamera style={styles.cameraBody}
    type={Camera.Constants.Type.back}
    ref={reference => this.camera = reference}/>

    <TouchableOpacity onPress={()=>this.takePicture()} style={styles.button}> 
    <Text>Sacar Foto</Text>
    </TouchableOpacity>
    </React.Fragment>  :
    
    <Text>No hay permiso para usar la camara</Text>
}

</React.Fragment>



    )
}


}

const styles = StyleSheet.create({
cameraBody:{
    flex:7
},

button:{
    flex:1
},

Actions:{
    flex:1
},

imagePreview:{
    flex:7
}
})