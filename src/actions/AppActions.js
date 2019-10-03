import firebase from '@firebase/app';
import b64 from 'base-64';

import { MODIFY_ADD_CONTATOS, ADD_CONTATO_ERROR, ADD_CONTATO_SUCCESS, LIST_CONTACTS_USER, MODIFYMENSAGEM, LIST_CONVERSA_USER, SEND_MESSAGE_SUCCESS, LIST_CONVERSAS_USER } from './types';

export const modifyContatoEmail = email => {
    return {
        type: MODIFY_ADD_CONTATOS,
        payload: email
    }
}

export const add_contatos = email=> {
    return dispatch => {

        let emailB64 = b64.encode(email);

        firebase.database().ref(`/contatos/${emailB64}`)
            .once('value')
            .then(snapshot => {
                if(snapshot.val()) {
                    const { currentUser } = firebase.auth();
                    let emailUsuarioB64 = b64.encode(currentUser.email);
                    let name = snapshot.val().name;

                    firebase.database().ref(`/usuario_contatos/${emailUsuarioB64}`)
                        .push({ email, name })
                        .then(() => addContatoSuccess(dispatch) )
                        .catche(error => addContatoError( error.messege, dispatch ) )
                } else {
                    dispatch({
                        type: ADD_CONTATO_ERROR,
                        payload: 'E-mail informado não corresponde a um usuário válido!'
                    })
                }
            })
    }
}

const addContatoError = ( error, dispatch ) => (
    dispatch({
        type: ADD_CONTATO_ERROR,
        payload: error
    })
)


const addContatoSuccess = dispatch => (
    dispatch({
        type: ADD_CONTATO_SUCCESS,
        payload: true
    })
)

export const addContatosButton = () => {
    return {
        type: ADD_CONTATO_SUCCESS,
        payload: false
    }
}

export const contatosUserFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        let emailUsuarioB64 = b64.encode( currentUser.email );

        firebase.database().ref(`/usuario_contatos/${emailUsuarioB64}`)
            .on('value', snapshot=> {
                dispatch ({type: LIST_CONTACTS_USER, payload: snapshot.val() })
            })
    }
}

export const modifyMensagem = text => {
    return({
        type: MODIFYMENSAGEM,
        payload: text

    })
}
export const sendMensagem = (mensagem, email, name) => {
    const { currentUser } = firebase.auth();
    const usuarioEmail = currentUser.email;

    return dispatch => {
        const usuarioEmailB64 = b64.encode(usuarioEmail);
        const contatoEmailB64 = b64.encode(email);

        firebase.database().ref(`/mensagens/${usuarioEmailB64}/${contatoEmailB64}`)
            .push({ mensagem, type: 'envio' })
            .then(() => { //armazenar a mensagem para ambos os usuários
                firebase.database().ref(`mensagens/${contatoEmailB64}/${usuarioEmailB64}`)
                    .push({ mensagem, type: 'recebido' })
                    .then(() => dispatch ({ type: SEND_MESSAGE_SUCCESS }))
            })
            .then(() => { //armazenar o cabeçalho de conversa do usuário autenticado
                firebase.database().ref(`/usuario_conversas/${usuarioEmailB64}/${contatoEmailB64}`)
                    .set({ name, email })
            })
            .then(() => { //armazenar o cabeçalho de conversa do contato
                firebase.database().ref(`/contatos/${usuarioEmailB64}`)
                    .once('value')
                    .then(snapshot => {
                        firebase.database().ref(`/usuario_conversas/${contatoEmailB64}/${usuarioEmailB64}`)
                            .set({ name: snapshot.val().name, usuarioEmail })
                    })
            })
    }
}

export const conversaUserFetch = contatoEmail => {
    const { currentUser } = firebase.auth();

    const usuarioEmailB64 = b64.encode(currentUser.email);
    const contatoEmailB64 = b64.encode(contatoEmail);

    return dispatch => {
        firebase.database().ref(`/mensagens/${usuarioEmailB64}/${contatoEmailB64}`)
            .on('value', snapshot => {
                dispatch({ type: LIST_CONVERSA_USER, payload: snapshot.val() })
            })
    }
}

export const conversasUserFetch = () => {
    const { currentUser } = firebase.auth();
    
    return dispatch => {
        let usuarioEmailB64 = b64.encode(currentUser.email);

        firebase.database().ref(`/usuario_conversas/${usuarioEmailB64}`)
            .on('value', snapshot =>{
                dispatch({ type: LIST_CONVERSAS_USER, payload: snapshot.val() })
            })
    }
}