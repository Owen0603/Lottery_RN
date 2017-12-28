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
import ValidatorInput from '../Common/validator-input'
import ValidatorManager from '../Common/validator-manager'

import {closeLogin} from "../../actions/login-action"
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

var formName = 'loginform'

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            isDisabled:false,
            secureTextEntry:true,
        }
        ValidatorManager.clearCache(formName)
    }
    render() {
        return (
            <View style={{backgroundColor: '#ffffff', flex: 1}}>
                <Nav
                    title='登录'
                    leftComponent= {this._leftComponent}
                    rightComponent={this._rightComponent}
                    leftPressed={() => {
                        this.props.actions.closeLogin()
                    }}
                    rightPressed={() => {
                        this.props.navigator.push({
                            name: '注册',
                            component: Register
                        })
                    }}
                />
                <View style={{flex: 1, padding: 20}}>
                    <ValidatorInput
                        name='username'
                        placeholder='请输入手机号'
                        formname={formName}
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

                        <View style = {{width:1,height:10,backgroundColor:'#000000'}}></View>

                        <TouchableOpacity
                            onPress = {()=>{

                            }}>
                            <View style = {{padding:10}}>
                                <Text style ={{fontSize:12,color:'blue'}}>
                                    动态密码登录
                                </Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        )
    }

    _eye(){
        <TouchableOpacity onPress = {() =>{
            this.setState({
                secureTextEntry:!this.state.secureTextEntry,
            })
        }}>

        </TouchableOpacity>
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
function mapStateToProps(state) {
    return{
    }
}

function mapDispatchToProps(dispatch) {
    return{
        actions:bindActionCreators({closeLogin},dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);