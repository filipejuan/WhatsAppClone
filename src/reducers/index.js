import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import AppReducer from './AppReducer';
import ListReducer from './ListReducer';
import ChatsReducer from './ChatsReducer';
import ListChatsReducer from './ListChatsReducer';

export default combineReducers({
    AuthReducer,
    AppReducer,
    ListReducer,
    ChatsReducer,
    ListChatsReducer,
});