//Importar Componentes de React
import React, {Component} from 'react';

//Importar Navegación
import { NavigationContainer } from '@react-navigation/native';
import {createDrawerNavigator } from '@react-navigation/drawer'

//Importar Pantallas
import Home from '../screens/home';
import Login from '../screens/login';
import Register from '../screens/register';
import Profile from '../screens/miPerfil';
import NewPost from '../screens/newPost';

//Importar Firebase
import { auth } from '../firebase/config';

//Importar Gestos
const Drawer = createDrawerNavigator();

export default class Menu extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedIn: false,
            userData:'',
        }
    }

    componentDidMount(){
        // Metodo para recordar usuario
        auth.onAuthStateChanged(
            user => {
                if (user){
                    this.setState({
                        loggedIn: true,
                        userData: user,
                    })    
                }
            }
        )
    }

    errorDeSesion(error, email, pass, userName){
        let mensajeError = ''
        switch (error.code) {
            case "auth/invalid-email":
                mensajeError = 'El formato del mail no es valido'
                break;
            case 'auth/wrong-password':
                mensajeError = 'La contraseña es incorrecta'
                break;
            default:
             mensajeError = 'Los datos ingresados no son correctos'
                break;
        }
        this.setState({
            estadoError: mensajeError,
            mailPrevio: email,
            userPrevio: userName ,
            passwordPrevia: pass,
        })
    }

    login(email, pass){
        // Metodo para iniciar sesión
        auth.signInWithEmailAndPassword(email, pass)
        .then(response => {
            this.setState({
                loggedIn: true,
                userData: response,
            })
        })
        .catch(error=>this.errorDeSesion(error,email,pass))
    }

    register(email, pass, userName){
        // Metodo para regitrar un nuevo usuario 
        auth.createUserWithEmailAndPassword(email, pass)
        .then((response )=>{
            response.user.updateProfile({
                displayName: userName,
            })
        })
        .catch(error=>this.errorDeSesion(error,email,pass,userName))
    }

    logout(){
        auth.signOut()
        .then(this.setState({loggedIn: false}))
        .catch(e=>console.log(e))
    }

    render(){
        return(
            <NavigationContainer>
            { this.state.loggedIn === false ?
                <Drawer.Navigator>
                    <Drawer.Screen name="Iniciar Sesión" component={ (drawerProps)=> <Login drawerProps={drawerProps} login={(email,pass)=>this.login(email, pass)} mensajeError={this.state.estadoError} textoMail={this.state.mailPrevio} textoPassword={this.state.passwordPrevia}/>}/>
                    <Drawer.Screen name="Registro" component={ (drawerProps)=> <Register drawerProps={drawerProps} register={(email, pass, userName)=>this.register(email, pass, userName)} mensajeError={this.state.estadoError} textoMail={this.state.mailPrevio} textoUser={this.state.userPrevio} textoPassword={this.state.passwordPrevia}/>}/>
                </Drawer.Navigator>
                :
                <Drawer.Navigator>
                    <Drawer.Screen name="Home" component={() => <Home/>}/>
                    <Drawer.Screen name="Nuevo Post" component={ (drawerProps)=> <NewPost drawerProps={drawerProps}/>}/>
                    <Drawer.Screen name="Mi Perfil" component={(drawerProps)=> <Profile userData={this.state.userData} drawerProps={drawerProps} logout={()=>this.logout()} />}/>
                </Drawer.Navigator>
            }
            </NavigationContainer>
        )
    }
}
