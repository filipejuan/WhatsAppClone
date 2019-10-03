import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { contatosUserFetch } from '../actions/AppActions';

class Contatos extends Component {

    componentWillMount() {
        this.props.contatosUserFetch();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ contatos: nextProps.contatos });
    }

    state = {
        contatos: []
    }

    renderContatos = (contatos) => {
        const contato = contatos.item[1];
        return(
            <TouchableOpacity onPress = {() => this.props.navigation.navigate('Conversa', {contato: contato}) }>
                <View style = { styles.container } >
                    <Text style = { styles.textName }>{contato.name}</Text>
                    <Text style = { styles.textEmail }>{contato.email}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
                <FlatList
                    contentContainerStyle = { styles.flatContainer }
                    data = {this.state.contatos}
                    keyExtractor = {(item) => item[0]}
                    renderItem = { this.renderContatos }
                />
        );
    }
}

const styles = StyleSheet.create({
    flatContainer: {
        padding: 10
    },
    container: {
        flex:1,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#CCC',
        borderBottomLeftRadius: 10
    },
    textName: {
        fontSize: 18,
        paddingBottom: 2,
        fontWeight: '500'
    },
    textEmail: {
        fontSize: 14,
        color: 'gray'
    }
});

mapStateToProps = state => {
    var contatos = [];
    if (state.ListReducer != null){
        contatos = Object.entries(state.ListReducer);
    }
    return { contatos }
}

export default connect(mapStateToProps, { contatosUserFetch }) (Contatos);
