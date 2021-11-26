//Importar Componentes de React
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ImageBackground, ActivityIndicator} from 'react-native';
import {Camera} from 'expo-camera';

//Importar Firebase
import {db, storage} from '../firebase/config';
class MyCamera extends Component {
    constructor(props){
        super(props)
        this.state = {
            permisos: false,
            foto: '',
            activity: false
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

       console.log(Camera);
       console.log(this.camera);
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

        this.setState({
            activity: true,
        })

        fetch(this.state.foto) //Obtengo la imagen de su ubicacion temporal
        .then( res => res.blob()) //Cambio el formato a uno nativo de JS
        .then( image => {

            let ref = storage.ref(`photo/${Date.now()}.jpg`)  //Le doy un nombre a la imagen

            //Guardo imagen en el storage
            ref.put(image)
                .then( () => {
                    ref.getDownloadURL() //Entrega la url publica de acceso a la imagen
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
        })
        .catch(e => console.log(e))
    }

    render(){
        return(
                <React.Fragment>
                { this.state.activity ? 
                    <ActivityIndicator> </ActivityIndicator> : ''}
                {
                    this.state.permisos ?
                        this.state.foto ? 
                            <React.Fragment>
                                <ImageBackground style = {styles.imagen} source={{uri: this.state.foto}}> </ImageBackground>
                                <View style = {styles.actionArea}> 
                                    <TouchableOpacity style = {styles.button} onPress= {(url)=> this.savePhoto(url)}> 
                                        <Text style={styles.textButton}>Publicar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style = {styles.buttonNone} onPress = {()=> this.clear()}> 
                                        <Text style={styles.textButton}>Intentar denuevo</Text>
                                    </TouchableOpacity>
                                </View>
                            </React.Fragment> :
                            <React.Fragment >
                                <Camera style={styles.preview} type={Camera.Constants.Type.back} ref ={ (reference) => this.camera = reference }/> 
                                <TouchableOpacity style= {styles.button} onPress = {() => this.takePicture()}> 
                                     <Text style={styles.textButton}> Capturar imagen </Text> 
                                </TouchableOpacity>
                            </React.Fragment>  : 
                    <Text> No hay permiso para dar la camara </Text>
                }
                </React.Fragment>
        )
    }

}
export default MyCamera;
const styles = StyleSheet.create({
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '50%',
        marginHorizontal: 'auto',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        alignSelf: 'center',
        margin: 20
    },
    button: {
        backgroundColor: '#00ADB5',
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
    buttonNone: {
        backgroundColor: 'red',
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
    textButton: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    imagen: {
        width: '96%',
        marginHorizontal: 'auto',
        flex: 1,
    },
    actionArea: {
        width: '100%',
    },
})

