import React, {Component} from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { addContatosButton } from '../actions/AppActions';


import Conversas from './Conversas';
import Contatos from './Contatos';
import addContatos from './addContatos';
import firebase from '@firebase/app';

const MainTabStack = createMaterialTopTabNavigator({
    Conversas,
    Contatos
},
    {  
        initialRouteName: 'Conversas',
        tabBarOptions: {
            activeTintColor: '#FFF',
            inactiveTintColor: '#1d9f9d',
            indicatorStyle: {
                backgroundColor: '#FFF'
            },
            iconStyle: {
                backgroundColor: 'blue'
            },
            style: {
                backgroundColor: '#115E54',
            },
            labelStyle:{
                fontWeight: 'bold',
            }
        },
    }   
);

const addContatosImg = require('../img/addcontato.png');

class Main extends Component {
    static router = MainTabStack.router ;
    static navigationOptions = {
        header: null
    };
    render() {
        return (
            <View style={ styles.container }>
                <View style = { styles.tabBar }>
                    <Text style = { styles.barText }>
                        WhatsApp Clone
                    </Text>
                    <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableHighlight
                            onPress={() =>{ this.props.navigation.navigate('addContatos'); this.props.addContatosButton()}}
                            underlayColor = "#114D44"
                            style = {{padding: 8, borderRadius: 20}} 
                        >
                            <Image source = { addContatosImg }/>
                        </TouchableHighlight>
                        <TouchableOpacity
                            onPress={() => firebase.auth().signOut().then(() => this.props.navigation.navigate('Login')) }
                            underlayColor = "#114D44"
                        >
                            <Text style = { styles.barText }>Sair</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            <MainTabStack navigation={ this.props.navigation } />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    tabBar: {
        height: 50, 
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#115E54',
    },
    barText: {
        color: '#FFF', 
        fontSize: 20, 
        marginHorizontal: 20,
    }
});

export default connect(null, { addContatosButton }) (Main);
