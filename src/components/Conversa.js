import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, Image, TouchableHighlight, FlatList, StyleSheet } from 'react-native';
import { modifyMensagem, sendMensagem, conversaUserFetch } from '../actions/AppActions';

class Conversa extends Component {
    static navigationOptions = ({navigation}) => {
        contato = navigation.getParam('contato');
        return {
            title: contato.name,
            headerStyle: {
                backgroundColor: '#115E54'
            },
            headerTintColor: 'white',
            headerTitleStyle: {
                flex:1,
                fontWeight: 'normal'
            },
        };
    }

    componentWillMount() {
        this.props.conversaUserFetch(contato.email)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ conversa: nextProps.conversa });
    }

    state = {
        conversa: []
    }

    _sendMensagem = () => {
        const mensagem = this.props.mensagem;
        const { email, name } = contato;

        this.props.sendMensagem(mensagem, email, name);
    }

    renderConversa = (conversa) => {
        const conversas = conversa.item[1];

        if(conversas.type === 'envio'){
            return (
                <View style = {{ alignItems: 'flex-end', marginTop: 5, marginBottom: 5, marginLeft: 40 }}>
                    <Text style = {{ fontSize: 18, color: 'black', paddingTop: 4, paddingBottom: 10, paddingHorizontal: 10, backgroundColor: '#dbf5b4', elevation: 1, borderRadius: 10 }}>{conversas.mensagem}</Text>
                </View>
            )
        }

        return(
            <View style = {{ alignItems: 'flex-start', marginTop: 5, marginBottom: 5, marginRight: 40 }}>
                    <Text style = {{ fontSize: 18, color: 'black', paddingTop: 4, paddingBottom: 10, paddingHorizontal: 10, backgroundColor: '#f7f7f7', elevation: 1, borderRadius: 10 }}>{conversas.mensagem}</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style = {{ flex: 1, paddingBottom: 10 }}>
                    <FlatList
                        contentContainerStyle = { styles.flatContainer }
                        data = {this.props.conversa}
                        keyExtractor = {(item) => item[0]}
                        renderItem = { this.renderConversa }
                    />
                </View>
                <View style = {{ flexDirection: 'row', height: 40 }}>
                    <TextInput 
                        value = { this.props.mensagem }
                        onChangeText = { text => this.props.modifyMensagem(text) }
                        style = {{ flex: 1, backgroundColor: '#FFF', fontSize: 18 }} 
                    />
                    <TouchableHighlight 
                        style = {{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5 }} 
                        onPress = { () => this._sendMensagem() } 
                        underlayColor = '#FFF'
                    >
                        <Image style = {{ height: 40, width: 40 }}source = {require('../img/send.png')} />
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flatContainer: {
        padding: 10
    },
    container: {
        flex: 1,
        backgroundColor: '#eee4dc',
        padding: 10
    },
});

mapStateToProps = state => {
    var conversa = [];
    if (state.ChatsReducer != null){
        conversa = Object.entries(state.ChatsReducer);
    }
    return({
        mensagem: state.AppReducer.mensagem,
        conversa
    })
}

export default connect(mapStateToProps, { modifyMensagem, sendMensagem, conversaUserFetch })(Conversa);
