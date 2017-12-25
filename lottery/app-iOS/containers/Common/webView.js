import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    WebView
} from  'react-native';

import Nav from './nav-bar'


class web extends Component{

    constructor(props){
        super(props);
        this.state = {
            url:props.url,
            title:props.title
        }
    }

    render(){
        return(
            <View style = {styles.container}>
                {this._renderNavBar()}
                <WebView
                    source = {{uri:this.state.url}}
                    scalesPageToFit = {true}
                    style = {styles.webView}
                    contentInset= {{ top:-20}}
                />
            </View>
        )
    }

    _renderNavBar(){
       const content = {
           Left:{
               onPress:()=>{
                   this.props.navigator.pop();
               }
           },
           Center:{
               text:this.state.title,
               fontSize:16,
           }
       }
       return (
           <Nav content = {content}/>
       )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'red'
    },
    webView:{
        flex:1,
    }
});

module.exports = web;