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
} from '../actions/types';

const INITIAL_STATE = {
    name: '',
    email: '',
    senha: '',
    erroCadastro: '',
    erroLogin: '',
    loading_login: false,
    loading_cadastro: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case MODIFY_EMAIL:
            return { ...state, email: action.payload }
        case MODIFY_SENHA:
            return { ...state, senha: action.payload }
        case MODIFY_NAME:
            return { ...state, name: action.payload }
        case CADASTRO_FAILED:
            return { ...state, erroCadastro: action.payload, loading_cadastro: false }
        case CADASTRO_SUCCES:
            return { ...state, nome: '', senha: '', loading_cadastro: false }
        case LOGIN_FAILED:
            return { ...state, erroLogin: action.payload, loading_login: false }
        case LOGIN_SUCCES:
            return { ...state, ...INITIAL_STATE }
        case LOADING_LOGIN:
            return { ...state, loading_login: true }
        case LOADING_CADASTRO:
        return { ...state, loading_cadastro: true }
        default:
            return state;
    }
}