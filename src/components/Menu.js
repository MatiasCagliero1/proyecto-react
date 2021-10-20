import React, {Component} from 'react';
//Importar Navegación
import { NavigationContainer } from '@react-navigation/native';
import {createDrawerNavigator } from '@react-navigation/drawer'
//Importar Pantallas
import Home from '../screens/home';
import Login from '../screens/login';
import Register from '../screens/register';
//Importar Firebase
import { auth } from '../firebase/config';
//Importar Gestos
const Drawer = createDrawerNavigator();

class Menu extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
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
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }

    render(){
        return(
            <NavigationContainer>
                <Drawer.Navigator>
                    <Drawer.Screen name="Home" component={ ()=> <Home />}/>
                    <Drawer.Screen name="Login" component={ ()=> <Login login={(email, pass)=>this.login(email, pass) } />}/>
                    <Drawer.Screen name="Registro" component={ ()=> <Register register={(email, pass)=>this.register(email, pass)} />}/>
                </Drawer.Navigator>
            </NavigationContainer>
        )
    }
}

export default Menu;