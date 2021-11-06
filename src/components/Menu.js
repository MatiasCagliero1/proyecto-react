import React, {Component} from 'react';

//Importar Navegación
import { NavigationContainer } from '@react-navigation/native';
import {createDrawerNavigator } from '@react-navigation/drawer'

//Importar Pantallas
import Home from '../screens/home';
import Login from '../screens/login';
import Register from '../screens/register';
import Profile from '../screens/miPerfil';

//Importar Firebase
import { auth } from '../firebase/config';

//Importar Gestos
const Drawer = createDrawerNavigator();

class Menu extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedIn: false,
            error:'',
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged(
            user => {
                if (user){
                    this.setState({
                        loggedin: true,
                        userData: user,
                    })    
                }
            }
        )
    }

    register(email, pass){
        console.log(email,pass);

        auth.createUserWithEmailAndPassword(email, pass)
        .then(()=>{
            console.log('Registrado ok');
        })
        .catch( error => {
            console.log(error);
        })
    }

    login(email, pass){
        auth.signInWithEmailAndPassword(email, pass)
        .then( response => {
            console.log('Login Ok');
            this.setState({
                loggedin: true,
                userData: response
            })
        })
        .catch(error => {
            console.log(error);
            if(error.code = 'auth/invalid-email' ){
                let mensajeError = 'El mail no es valido'
            } if(error.code ='f' ){
                let mensajeError = 'El mail no está registrado'
            } if(error.code = 'auth/wrong-password' ){
                let mensajeError = 'El mail no está registrado'
            }
            this.setState = {
                error: mensajeError,
            }
            console.log(this.state.error);
        })
    }

    logout(){
        auth.signOut()
        .then( 
            this.setState({
                loggedin: false,
            })
        )
        .catch(e => console.log(e))
    }

    render(){
        return(
            <NavigationContainer>
            { this.state.loggedin === false ?
                <Drawer.Navigator>
                    <Drawer.Screen name="Login" component={ ()=> <Login login={(email, pass)=>this.login(email, pass) } />}/>
                    <Drawer.Screen name="Registro" component={ ()=> <Register register={(email, pass)=>this.register(email, pass)} />}/>
                </Drawer.Navigator>:
                <Drawer.Navigator>
                    <Drawer.Screen name="Home" component={ ()=> <Home />}/>
                    <Drawer.Screen name="Nuevo Post" component={ (drawerProps)=> <PostForm drawerProps={drawerProps}/>}/>
                    <Drawer.Screen name="Mi Perfil" component={ ()=> <Profile userData={this.state.userData} logout={()=>this.logout()} />}/>
                </Drawer.Navigator>
            }
            </NavigationContainer>
        )
    }
}

export default Menu;