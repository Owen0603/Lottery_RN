import React, { Component } from 'react';

import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    SegmentedControlIOS,
    TouchableOpacity,
    AlertIOS

} from 'react-native';

import Util from '../Common/util'
import NormalView from './normal_god'
import CertifyView from './certify_god'
import Web from '../Common/webView'
import {GOD_DESC} from "../Common/webUrl";

var selectIndex = 0;

class god extends Component{

    constructor(props){
        super(props);
        this.state = {
            selectedIndex:0
        }

        //setState undefine 可以先绑定
        this._onChange = this._onChange.bind(this);
    }


    render(){
        return(
            <View style = {{flex:1}}>
                <View style = {{height:64,backgroundColor:'#da3041'}}>
                    <View style = {{flexDirection:'row',marginTop:25,alignItems:'center',justifyContent:'space-between'}}>
                        <TouchableOpacity onPress = {this._descAction.bind(this)}>
                            <Text style = {styles.leftItem}>说明</Text>
                        </TouchableOpacity>

                        <SegmentedControlIOS
                            values = {['普通大神','认证大神']}
                            tintColor = 'white'
                            selectedIndex = {this.state.selectedIndex}
                            onChange={this._onChange}
                            style = {styles.segment}
                        />

                        <TouchableOpacity onPress = {this._myLeita.bind(this)} >
                            <Text style = {styles.rightItem}>我的擂台</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {this._displayView()}
            </View>
        )
    }

    _descAction() {
        this.props.navigator.push({
            component:Web,
            title:'认证大神',
            barTintColor:'#fff',
            passProps:{
                url:GOD_DESC,
                title:'认证大神',
            }
        })
    }

    _myLeita(){
        AlertIOS.alert('test')
    }


    _onChange(event){
        this.setState({
            selectedIndex:event.nativeEvent.selectedSegmentIndex,
        });
    }

    _displayView(){
        if(this.state.selectedIndex===0){
            return(
                <NormalView/>
            )
        }else {
            return(
                <CertifyView/>
            )
        }
    }

}

const styles = StyleSheet.create({
    segment:{
        backgroundColor:'#da3041',
        width:160,
        marginLeft:20
    },
    leftItem:{
        marginLeft:8,
        color:'white',
    },
    rightItem:{
        marginRight:8,
        color:'white',
    }
});

module.exports = god;