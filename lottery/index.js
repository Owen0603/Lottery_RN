import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import {Provider} from 'react-redux';
import Store from './app-iOS/app-store';

class Lottery extends Component{
    render(){
        return(
            <Provider store={Store}>
                <App/>
            </Provider>
        )
    }
}

AppRegistry.registerComponent('lottery', ()=> Lottery);
