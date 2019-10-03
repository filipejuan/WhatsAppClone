import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';

import Login from './components/Login';
import Cadastro from './components/Cadastro';
import Welcome from './components/Welcome';
import Main from './components/Main';
import addContatos from './components/addContatos';
import Conversa from './components/Conversa';

const AuthStack = createStackNavigator({
    Login,
    Cadastro,
    Welcome
},
    { initialRouteName: 'Login' }
);

const MainStack = createStackNavigator({
    Main,
    addContatos,
    Conversa
},
    { initialRouteName: 'Main'}
);

const Navigator = createSwitchNavigator({
    AuthStack,
    MainStack
},  
    { initialRouteName: 'AuthStack' }
);

const Routes = createAppContainer(Navigator);

export default Routes;