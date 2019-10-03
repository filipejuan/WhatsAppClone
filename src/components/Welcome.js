import React from 'react';
import { View, ImageBackground, Text, Button, Image, StyleSheet } from 'react-native';

Welcome = props => (
    <ImageBackground style = {{ flex: 1 }} source = {require('../img/bg.png')}>
        <View style={styles.container}>
            <View style = {{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                <Text style = {{ fontSize: 20, color: 'white' }}>Seja Bem-Vindo</Text>
                <Image source = {require('../img/logo.png')}/>
            </View>
            <View style = {{ flex: 1 }}>
                <Button title = 'Fazer Login' onPress = { () =>{ props.navigation.navigate('Login')} }/>
            </View>
        </View>
    </ImageBackground>
);

Welcome.navigationOptions = ({navigation}) => ({
    header: null
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
    },
});

export default Welcome;
