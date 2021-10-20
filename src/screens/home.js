import React, {Component} from 'react';
import Contador from '../components/Contador';
import {Text,
        TouchableOpacity,
        View,
        StyleSheet,
        Image,
        ActivityIndicator,
        FlatList,
        TextInput } from 'react-native';

const profesores = [
    {
        id: 1,
        nombre: 'Ale'
    },
    {
        id:2,
        nombre: 'Seba'
    },
    {
        id:3,
        nombre: 'Adri'
    }
]

class Home extends Component{
    constructor(){
        super()
        this.state={
            email:''
        }
    }

    render(){
        return(
            <View>
                <Text style={styles.title}> Hola Mundo </Text>
                <ActivityIndicator size='large' color='red'/>
                <Image
                    style={styles.imagen} 
                    source={require('../../assets/avatar/cell.jpg')}
                    resizeMode='contain'
                />

                <FlatList 
                    data = {profesores}
                    keyExtractor = { profesor => profesor.nombre}
                    renderItem= {({item})=><Text>{item.nombre}</Text>}
                />

                <TouchableOpacity onPress={()=> console.log('Me clickearon')}>
                    <Text>clickeame</Text>
                </TouchableOpacity>
                <Contador />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textDecoration: 'underline',
        textAlign: 'center',
    },
    imagen:{
        height:250,
    }
})

export default Home;