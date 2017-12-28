
import React,{ Component } from 'react'

import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    NavigatorIOS

} from 'react-native';

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Tab from './app-iOS/containers/tab'
import LoginView from './app-iOS/containers/Mine/login-nav'
import {showLogin} from "./app-iOS/actions/login-action"


class App extends Component{
    constructor(props){
        super(props)
        this.state = {
            selectedTab:'home'
        }
    }

    componentDidMount() {

    }

    render(){
        return(
            <View style = {{flex:1}}>
                <NavigatorIOS
                    titleTextColor = '#666666'
                    style = {{ flex:1}}
                    navigationBarHidden = {true}
                    initialRoute = {{
                        component:Tab,
                        title:'首页'
                    }}
                />
                <LoginView/>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {}
}
function mapDispatchToProps(dispatch) {
    return {
        actions:bindActionCreators({}, dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);