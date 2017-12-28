import React, { Component } from 'react';

import {
    Platform,
    StyleSheet,
    Text,
    View,
    TabBarIOS,
    Button,

} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {showLogin} from "../../actions/login-action"

class mine extends Component{

    render(){
        return(
            <View style = {{flex:1,backgroundColor:'red'}}>
                <Button
                    onPress = {this._buttonClick.bind(this)}
                    title = 'pop'
                    color = '#666666'/>
            </View>
        )
    }

    _buttonClick(){
        this.props.actions.showLogin()
    }
}

const styles = StyleSheet.create({

});

function mapStateToProps(state) {
    return{
    }
}

function mapDispatchToProps(dispatch) {
    return{
        actions:bindActionCreators({showLogin},dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(mine);