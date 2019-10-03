import { MODIFY_ADD_CONTATOS, ADD_CONTATO_ERROR, ADD_CONTATO_SUCCESS, MODIFYMENSAGEM, SEND_MESSAGE_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
    adicionar_contato_email: '',
    error_add_messege: '',
    succes_add_messege: false,
    mensagem: ''
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case MODIFY_ADD_CONTATOS:
            return { ...state, adicionar_contato_email: action.payload }
        case ADD_CONTATO_ERROR:
            return { ...state, error_add_messege: action.payload }
        case ADD_CONTATO_SUCCESS:
            return { ...state, succes_add_messege: action.payload, adicionar_contato_email: '' }
        case MODIFYMENSAGEM:
            return { ...state, mensagem: action.payload }
        case SEND_MESSAGE_SUCCESS:
            return { ...state, mensagem: '' }
        default:
            return state;
    }
}