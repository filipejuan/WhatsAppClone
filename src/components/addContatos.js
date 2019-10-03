import React, { Component } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { modifyContatoEmail, add_contatos } from '../actions/AppActions';

class addContatos extends Component {
    static navigationOptions = {
        title: 'Adicionar Contatos',
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
    }

    renderAddContatos () {
        if (!this.props.succes_add_messege) {
            return(
                <View style={{ flex: 1 }}>
                    <View style = {{flex: 1, justifyContent: 'center'}}>
                        <TextInput
                            placeholder = 'E-mail'
                            style = {{ fontSize: 20, height: 45 }}
                            underlineColorAndroid = '#115E54'
                            onChangeText= { email => this.props.modifyContatoEmail(email) }
                            value = { this.props.adicionar_contato_email }
                        />
                    </View>
                    <View style = {{flex: 1}}>
                        <Button title = 'Adicionar' color = '#115E54' onPress = {() => this.props.add_contatos(this.props.adicionar_contato_email) }/>
                        <Text style = {{color: 'red', fontSize: 18, marginTop: 20}}>
                        { this.props.error_add_messege }
                        </Text>
                    </View>
                </View>
            );
        } else {
            return(
                <View>
                    <Text style = {{ fontSize: 20}}>Cadastro Realizado com sucesso!</Text>
                </View>
            );
        }
    }
    render() {
        return(
            <View style={styles.container}>
                { this.renderAddContatos() }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        padding: 10
    },
});

const mapStateToProps = state => (
    {
        adicionar_contato_email: state.AppReducer.adicionar_contato_email,
        error_add_messege: state.AppReducer.error_add_messege,
        succes_add_messege: state.AppReducer.succes_add_messege
    }
)

export default connect(mapStateToProps, { modifyContatoEmail, add_contatos }) (addContatos);
