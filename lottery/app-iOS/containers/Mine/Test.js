import React, {Component} from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Button,
    Image,
    Text,
    TouchableOpacity
} from 'react-native'

import Nav from '../Common/nav-bar'
import Register from './register'
import ValidatorInpt from '../Common/validator-input'
import ValidatorManager from '../Common/validator-manager'

var formName = 'loginform'

class Login extends Component {

    render() {
        return (
            <View style={{backgroundColor: '#ffffff', flex: 1}}>
                <Nav
                    title={'登录'}
                    leftComponent={this._leftComponent()}
                    rightComponent={this._rightComponent()}
                    leftPressed={() => {

                    }}
                    rightPressed={() => {
                        this.props.navigator.push({
                            name: '注册',
                            component: Register
                        })
                    }}
                />
                <View style={{flex: 1, padding: 20}}>
                    <ValidatorInpt
                        name='username'
                        placeholder='请输入手机号'
                        formname={formname}
                        manager={ValidatorManager}
                        maxLenght={13}
                        phoneNum={true}
                        validate={[
                            {
                                validator: 'isLength',
                                arguments: [11, 11],
                                message: '请输入正确的手机号'
                            },
                            {
                                validator: 'matches',
                                arguments: '^1[3|4|5|7|8][0-9]{9}$',
                                message: '请输入正确的手机号'
                            }
                        ]}
                    />
                    <ValidatorInput
                        secureTextEntry={this.state.secureTextEntry}
                        name={'password'}
                        formname={formName}
                        placeholder={'请输入密码'}
                        manager={ValidatorManager}
                        rightComponent={this._eye.bind(this)}
                    />

                    {this._submitButton()}

                    <View style = {{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <TouchableOpacity
                            style = {{fontSize:12}}
                            onPress = {()=>{
                                this.props.navigator.push({
                                    name:'忘记密码',

                                })
                            }}
                        >
                            <View
                                style = {{padding:10}}
                            >
                                <Text style = {{fontSize:12,color:'#da3041'}}>
                                    忘记密码
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <View
                            style = {{width:1,height:10,backgroundColor:'#000000'}}
                        >
                        </View>

                        <TouchableOpacity
                            style = {{fontSize:12}}
                            onPress = {()=>{
                                this.props.navigator.push({
                                    name:'快捷登录’
                                })
                            }}
                        >
                            <View
                                style = {{padding:10}}
                            >
                                <Text
                                    style ={{fontSize:12,color:'blue'}}
                                >
                                    动态密码登录
                                </Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        )
    }

    _leftComponent() {
        return (
            <Text style={{color: '#333333'}}>关闭</Text>
        )
    }

    _rightComponent() {
        return (
            <Text style={{color: '#da3041'}}>注册</Text>
        )
    }

    _submitButton(){
        return (
            <TouchableOpacity style = {[styles.submitButton,{opacity:this.state.isDisabled?0.5:1}]}
                              onPress = {()=> this._submit()}
            >
                <Text style = {{textAlign:'center',fontSize:18,color:'#ffffff'}}>
                    登录
                </Text>
            </TouchableOpacity>
        )
    }

    _submit(){
        let result = ValidatorManager.getResult(formName);
        if(!result.isValid){

        }
    }

}

const styles = StyleSheet.create({
    submitButton:{
        backgroundColor:'#ffffff',
        borderRadius:5,
        marginTop:20,
        height:45,
        padding:5,
        alignItems:'center',
        justifyContent:'center'
    }
})
module.exports = Login;