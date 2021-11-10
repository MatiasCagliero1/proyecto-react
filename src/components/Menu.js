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

    errorDeSesion(error, email, pass){
        console.log(error.code);
        let mensajeError = 'El mail no está registrado'
        if(error.code = 'auth/invalid-email' ){
            mensajeError = 'El formato del mail no es valido'
        } if(error.code = 'auth/wrong-password' ){
            mensajeError = 'La contraseña es incorrecta'
        } if(error.message ='The email address is badly formatted.' ){
        mensajeError = 'El formato del mail no es valido'
        }
        this.setState({
            estadoError: mensajeError,
            mailPrevio: email,
            passwordPrevia: pass,
        })
    }

    login(email, pass){
        // Metodo para iniciar sesión
        auth.signInWithEmailAndPassword(email, pass)
        .then(response => {
            console.log(response);
            this.setState({
                loggedIn: true,
                userData: response,
            })
        })
        
        .catch(error=>this.errorDeSesion(error,email,pass))
    }

    register(email, pass){
        console.log(email,pass);

        // Metodo para regitrar un nuevo usuario 
        auth.createUserWithEmailAndPassword(email, pass)
        .then(()=>{ console.log('Registrado Correctamente');})

        .catch(error=>this.errorDeSesion(error,email,pass))
    }

    logout(){
        auth.signOut()
        .then(this.setState({loggedIn: false}))
        .catch(e => console.log(e))
    }

    render(){
        return(
            <NavigationContainer>
            { this.state.loggedIn === false ?
                <Drawer.Navigator>
                    <Drawer.Screen name="Iniciar Sesión" component={ ()=> <Login login={(email,pass)=>this.login(email, pass)} mensajeError={this.state.estadoError} textoMail={this.state.mailPrevio} textoPassword={this.state.passwordPrevia} />}/>
                    <Drawer.Screen name="Registro" component={ ()=> <Register register={(email, pass)=>this.register(email, pass)} mensajeError = {this.state.error} />}/>
                </Drawer.Navigator>
                :
                <Drawer.Navigator>
                    <Drawer.Screen name="Home" component={() => <Home/>}/>
                    <Drawer.Screen name="Nuevo Post" component={ (drawerProps)=> <NewPost drawerProps={drawerProps}/>}/>
                    <Drawer.Screen name="Mi Perfil" component={()=> <Profile userData={this.state.userData} logout={()=>this.logout()} />}/>
                </Drawer.Navigator>
            }
            </NavigationContainer>
        )
    }
}
