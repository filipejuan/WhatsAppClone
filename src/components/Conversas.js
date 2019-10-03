import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { conversasUserFetch } from '../actions/AppActions';

export class Conversas extends Component {

    componentWillMount() {
        this.props.conversasUserFetch()
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ conversas: nextProps.conversas });
    }

    state = {
        conversas: []
    }

    renderConversas = (conversas) => {
        const conversa = conversas.item[1];
        return(
            <TouchableOpacity onPress = {() => this.props.navigation.navigate('Conversa', {contato: conversa}) }>
                <View style = { styles.container }>
                    <Text style = { styles.textName }>{conversa.name}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return(
            <FlatList
                contentContainerStyle = { styles.flatContainer }
                data = {this.state.conversas}
                keyExtractor = {(item) => item[0]}
                renderItem = { this.renderConversas }
            />
        )
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
        borderBottomLeftRadius: 10,
        paddingBottom: 20
    },
    textName: {
        fontSize: 18,
        paddingBottom: 2,
        fontWeight: '500'
    }
});

mapStateToProps = state => {
    var conversas = [];
    if (state.ListChatsReducer != null){
        conversas = Object.entries(state.ListChatsReducer);
    }
    return { conversas }
}

export default connect(mapStateToProps, { conversasUserFetch })(Conversas);
