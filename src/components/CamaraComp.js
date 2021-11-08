//Importar Componentes de React
import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import Camera from 'expo-camera';

//Importar Firebase
import { db, storag } from '../firebase/config';

export default class MyCamera extends Component{
    constructor(props){
        super(props);
        this.state = {
        permission: false,
        photo:'',
        }
        this.camera

    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then( () => { this.setState({permission:true})})
        .catch(error => console.log(error))
    }

    // Metodo Para sacar la Foto
    takePicture(){

    }


render(){
    return(
<React.Fragment>
{this.state.permission ? 

<React.Fragment>
<View style={styles.container}>  
<Camera style={styles.cameraBody}
type={Camera.Constants.Type.back}
ref={reference => this.camera = reference}/>

<TouchableOpacity onPress={()=>this.takePicture()} style={styles.button}> 
<Text>Sacar Foto</Text>
</TouchableOpacity>
</View> 
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
container:{
    backgroundColor: 'red',
    flex:1
}

})