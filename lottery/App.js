
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
            <NavigatorIOS
                titleTextColor = '#666666'
                style = {{ flex:1}}
                navigationBarHidden = {true}
                initialRoute = {{
                    component:Tab,
                    title:'首页'
                }}
            />
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