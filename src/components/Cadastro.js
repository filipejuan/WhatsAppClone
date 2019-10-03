import React, { Component } from 'react';
import { View, Text, TextInput, Button, ImageBackground, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { modifyEmail, modifySenha, modifyName, cadastrarUsuario } from '../actions/AuthActions';

class Cadastro extends Component {
    static navigationOptions = {
        title: 'Cadastro',
        headerStyle: {
            backgroundColor: '#115E54'
        },
        headerTintColor: 'white',
        headerRight: <View/>,
        headerTitleStyle: {
            flex:1,
            fontWeight: 'normal',
            textAlign: 'center'
        },
    };

    _cadastrarUsuario() {

        const { name, email, senha } = this.props;
        navigation = this.props.navigation;
    
        this.props.cadastrarUsuario(name, email, senha, navigation);
    }

    renderBtnCadastro() {
        if(this.props.loading_cadastro) {
            return (
                <ActivityIndicator size = 'large'/>
            )
        }
        return (
            <Button title="Cadastrar" color="#115E54" onPress={() => this._cadastrarUsuario()}/>
        )
    }

    render() {
        return (
            <ImageBackground style = {{flex: 1}} source = {require('../img/bg.png')}>
                <View style={{ flex: 1, padding: 10 }}>
                    <View style={{ flex: 4, justifyContent: 'center' }}>
                        <TextInput 
                            value={this.props.name} 
                            placeholder="Nome"
                            placeholderTextColor = '#FFF'
                            style={{ fontSize: 20, height: 45, color: '#FFF' }}
                            underlineColorAndroid = 'grey'
                            onChangeText={name => this.props.modifyName(name) }
                        />
                        <TextInput 
                            value={this.props.email} 
                            placeholder="E-mail"
                            placeholderTextColor = '#FFF'
                            style={{ fontSize: 20, height: 45, color: '#FFF' }}
                            underlineColorAndroid = 'grey'
                            onChangeText={email => this.props.modifyEmail(email) }
                        />
                        <TextInput 
                            value={this.props.senha}
                            placeholder="Senha"
                            placeholderTextColor = '#FFF'
                            style={{ fontSize: 20, height: 45, color: '#FFF' }}
                            underlineColorAndroid = 'grey'
                            onChangeText={senha => this.props.modifySenha(senha) }
                            secureTextEntry
                        />
                        <Text style = {{ color: 'red', fontSize: 14 }}>{ this.props.erroCadastro }</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        {this.renderBtnCadastro()}
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => { 
    return (
        {
            name: state.AuthReducer.name,
            email: state.AuthReducer.email,
            senha: state.AuthReducer.senha,
            erroCadastro: state.AuthReducer.erroCadastro,
            loading_cadastro: state.AuthReducer.loading_cadastro
        }
    );
}

export default connect(mapStateToProps, { modifyEmail, modifySenha, modifyName, cadastrarUsuario })(Cadastro);