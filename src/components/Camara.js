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

        fetch(this.state.foto)
        .then( res => res.blob())
        .then( image => {
            //Guardo imagen en el storage
            //Darle un nombre a la imagen
            let ref = storage.ref(`photo/${Date.now()}.jpg`)
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
            <View style={styles.container} >
                <React.Fragment>
                { this.state.activity ? 
                    <ActivityIndicator> </ActivityIndicator> : ''}
                {
                    this.state.permisos ?
                        this.state.foto ? 
                            <React.Fragment>
                                <ImageBackground style = {styles.preview} source={{uri: this.state.foto}}> </ImageBackground>
                                <View style = {styles.actionArea}> 
                                    <TouchableOpacity style = {styles.button} onPress= {(url)=> this.savePhoto(url)}> 
                                        <Text>Publicar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style = {styles.but} onPress = {()=> this.clear()}> 
                                        <Text>Intentar denuevo</Text>
                                    </TouchableOpacity>
                                </View>
                            </React.Fragment> :
                            <React.Fragment >
                                <Camera style={styles.camaraBody} type={Camera.Constants.Type.back} ref ={ (reference) => this.camera = reference }/> 
                                <TouchableOpacity style= {styles.button} onPress = {() => this.takePicture()}> 
                                     <Text> Capturar imagen </Text> 
                                </TouchableOpacity>
                            </React.Fragment>  : 
                    <Text> No hay permiso para dar la camara </Text>
                }
                </React.Fragment>
            </View>
        )
    }

}
export default MyCamera;
const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        backgroundColor: '#000',
    },
    camaraBody:{
        width:'80%',
        marginTop:50,
        marginBottom:25,
    },

    button:{
        textAlign: 'center',
        backgroundColor:'#700B97',
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius:6, 
        marginTop:8,
        marginBottom: 30,
        width:'50%'
    },
    but:{
        textAlign: 'center',
        backgroundColor:'#BC8CF2',
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius:6, 
        marginTop:8,
        marginBottom: 30,
        width:'50%'
    },

    preview:{
        flex:7
    
    },
    actionArea:{
        flex: 2
    },
    aor:{
        
        height:20,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        backgroundColor: '#D3D3D3',
        flexDirection: "column",
    }
})

