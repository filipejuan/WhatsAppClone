import firebase from '@firebase/app';
import b64 from 'base-64';
import { 
    MODIFY_EMAIL, 
    MODIFY_SENHA, 
    MODIFY_NAME, 
    CADASTRO_FAILED, 
    CADASTRO_SUCCES, 
    LOGIN_FAILED, 
    LOGIN_SUCCES,
    LOADING_LOGIN,
    LOADING_CADASTRO
} from './types';

export const modifyEmail = (email) => {
    return {
        type: MODIFY_EMAIL,
        payload: email
    }
}

export const modifySenha = (senha) => {
    return {
        type: MODIFY_SENHA,
        payload: senha
    }
}

export const modifyName = (name) => {
    return {
        type: MODIFY_NAME,
        payload: name
    }
}

export const cadastrarUsuario = (name, email, senha, navigation) => {
    return dispatch => {

        dispatch({ type: LOADING_CADASTRO });

        firebase.auth().createUserWithEmailAndPassword(email, senha)
            .then(user => {
                let emailB64 = b64.encode(email);

                firebase.database().ref('contatos/' + emailB64).set({ name })
                    .then(value => success(dispatch, navigation))         
            })
            .catch(error => failed(error, dispatch));
    }
} 
const success = (dispatch, navigation) => {
        dispatch ({ type: CADASTRO_SUCCES });
        navigation.navigate('Welcome');
}
const failed = (error, dispatch) => {
        dispatch ({ type: CADASTRO_FAILED, payload: error.message });
}

export const authUser = ({ email, senha, navigation }) => {
    return dispatch => {

        dispatch({ type: LOADING_LOGIN });

        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then(value => userSuccess(dispatch, navigation))
            .catch(error => userFailed(error, dispatch)); 
        } 
}

const userSuccess = (dispatch, navigation) => {
    dispatch ({ type: LOGIN_SUCCES });
    navigation.navigate('Main');
}

const userFailed = (error, dispatch) => {
    dispatch( 
        { type: LOGIN_FAILED, payload: error.message });
}

