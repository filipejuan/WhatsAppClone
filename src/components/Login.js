import React, { Component } from 'react';
import { View, Text, TextInput, Button, TouchableHighlight, ImageBackground, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { modifyEmail, modifySenha, authUser } from '../actions/AuthActions';

class Login extends Component {
    static navigationOptions = {
        header: null,
    };


    _authUser(){
        const { email, senha, navigation } = this.props;

        this.props.authUser({ email, senha, navigation });
    }

    renderBtnAccess() {
        if (this.props.loading_login) {
            return (
                <ActivityIndicator size = 'large'/>
            )
        }
        return (
            <Button title="Acessar" color='#115E54' onPress={() => this._authUser()} />
        )
    }

    render() {
        return (
            <ImageBackground style = {{flex: 1}} source = {require('../img/bg.png')}>
                <View style={{ flex: 1, padding: 10 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 25, color: '#FFF' }}>WhatsApp Clone</Text>
                    </View>
                    <View style={{ flex: 2}}>
                        <TextInput 
                            value={this.props.email}
                            style={{ fontSize: 20, height: 45, color: '#FFF' }}
                            placeholder='E-mail'
                            placeholderTextColor = '#FFF'
                            underlineColorAndroid = 'grey'
                            autoCapitalize = 'none'
                            onChangeText={email => this.props.modifyEmail(email) }
                        />
                        <TextInput 
                            value={this.props.senha}
                            style={{ fontSize: 20, height: 45, color: '#FFF' }}
                            placeholder='Senha'
                            placeholderTextColor = '#FFF'
                            underlineColorAndroid = 'grey'
                            onChangeText={senha => this.props.modifySenha(senha) } 
                            secureTextEntry
                            autoCapitalize = 'none'
                        />
                        <Text style = {{color: 'red', fontSize: 16}}>{this.props.erroLogin}</Text>
                        <TouchableHighlight onPress={() =>{this.props.navigation.navigate('Cadastro')} }>
                            <Text style={{ fontSize: 20, color: '#FFF' }}>Ainda não tem cadastro? Cadastre-se</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={{ flex: 2}}>
                        {this.renderBtnAccess()}
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => (
    {
        email: state.AuthReducer.email,
        senha: state.AuthReducer.senha,
        erroLogin: state.AuthReducer.erroLogin,
        loading_login: state.AuthReducer.loading_login
    }
);

export default connect(mapStateToProps, { modifyEmail, modifySenha, authUser })(Login);