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

export default class feed extends Component {
    constructor(props){
        super(props);
        this.state = {
            user:''
        }
    }

    render(){
        return(
         <View>
            <Image style={styles.feed} source={{uri:'https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2021/06/rick-morty-2381623.jpg'}} resizeMode='contain'/>
            <text>Publ Feed</text>
         </View>
        )
    }
}