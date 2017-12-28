import React, {Component} from 'react'
import {
    ScrollView,
    StyleSheet,
    View,
    Button,
    Image,
    Modal,
    NavigatorIOS
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {closeLogin} from "../../actions/login-action"

import Login from './login'

class LoginPage extends Component{
    render(){
        return(
            <Modal
                animationType = 'slide'
                transparent = {true}
                visible = {this.props.loginPageVisible}
                onShow = {()=>{}}
                onRequestClose = {()=>{}}
             >
                <NavigatorIOS
                  style = {{flex:1}}
                  navigationBarHidden = {true}
                  initialRoute = {{
                      component:Login,
                      title:'登录'
                  }}
                />
            </Modal>
        )
    }
}

function mapStateToProps(state) {
    return {
        loginPageVisible: state.loginState.loginPageVisible,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions:bindActionCreators({closeLogin},dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);