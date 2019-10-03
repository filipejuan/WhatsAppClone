import React, { Component } from 'react';
import './src/config/StatusBarConfig';
import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import Routes from './src/Routes';
import reducers from './src/reducers'

class App extends Component {
    componentDidMount() {
        var config = {
            apiKey: "AIzaSyDn5OUgJk4C3l3ZRWTaVnoM17bAULKdfwA",
            authDomain: "whats-clone-fab37.firebaseapp.com",
            databaseURL: "https://whats-clone-fab37.firebaseio.com",
            projectId: "whats-clone-fab37",
            storageBucket: "whats-clone-fab37.appspot.com",
            messagingSenderId: "1090771336457"
        };
        firebase.initializeApp(config);
    }

    render() {
        return (
            <Provider store = { createStore(reducers, {}, applyMiddleware(ReduxThunk)) }>
                <Routes/>
            </Provider>
        );
    }
}

export default App;