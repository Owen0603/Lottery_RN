import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    Image,

} from 'react-native';

import Util from './util';


class NavBar extends Component{
    state = {}
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        let leftPressed = this.props.leftPressed;
        let rightPressed = this.props.rightPressed;

        return(
            <View style = {[styles.nav,this.props.style]}>
                <View style = {styles.titleContainer}>
                    {this._titleComponent()}
                </View>

                <View style = {styles.container}>
                    <TouchableOpacity onPress = {leftPressed}>
                        <View style = {{height:44,width:60,justifyContent:'center',alignItems:'flex-start'}}>
                            {this._leftComponent()}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress = {rightPressed}>
                        <View style = {{height:44,width:60,justifyContent:'center',alignItems:'flex-start'}}>
                            {this._rightComponent()}
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    _leftComponent(){
        if(this.props.leftComponentHidden) return null;

        if(this.props.leftComponent == null){
           let content = this.props.content;
           if(content!=null && content.Left!= null){
               let leftItem = content.Left;
               if(leftItem.imageUrl){
                   return(
                       <TouchableOpacity
                       activeOpacity = {0.5}
                       onPress = {()=>{leftItem.onPress()}}
                       style = {{width:80}}
                       >
                           <View>
                               <Image source = {leftItem.imageUrl} style = {{height:20,width:20}}/>
                           </View>
                       </TouchableOpacity>
                   )
               }else  if(leftItem.text){
                   return(
                       <TouchableOpacity
                           activeOpacity = {0.5}
                           onPress = {()=>{leftItem.onPress()}}
                           style = {{width:80}}
                       >
                           <Text numberOfLines={1} style = {[styles.navItems,{fontSize:leftItem.fontsize}]}>
                               {leftItem.text}
                           </Text>
                       </TouchableOpacity>
                   )
               }else {
                   return (
                       <TouchableOpacity
                           activeOpacity = {0.5}
                           onPress = {()=>{
                               if(content.Left!=null){
                                   content.Left.onPress()
                               }
                           }}
                           style = {{width:80}}
                       >
                           <Image source = {{uri:'navbar_back'}} style = {{width:20,height:20}}/>
                       </TouchableOpacity>
                   )
               }
           }
        }else {
            return(
                <View>
                    {this.props.leftComponent()}
                </View>
            )
        }
    }

    _rightComponent(){
        if(this.props.rightComponent == null){
            let content = this.props.content;
            if(content!=null && content.Right != null){
                let rightItem = content.Right;
                if(rightItem.imageUrl){
                    return(
                        <TouchableOpacity
                        activeOpacity = {0.5}
                        onPress = {()=>{rightItem.onPress()}}
                        style = {{width:80,alignItems:'flex-end'}}
                        >
                            <View>
                                <Image source ={rightItem.imageUrl} style ={{height:20,width:20}}/>
                            </View>
                        </TouchableOpacity>
                    )
                }else {
                    return(
                        <TouchableOpacity
                            activeOpacity = {0.5}
                            onPress = {()=>{rightItem.onPress()}}
                            style = {{width:80,alignItems:'flex-end'}}
                        >
                            <Text numberOfLines ={1} style = {[styles.navItems,{fontSize:rightItem.fontsize}]}>
                                {rightItem.text}
                            </Text>
                        </TouchableOpacity>
                    )
                }
            }
            return(
                <View>

                </View>
            )

        } else {
            return(
                <View>
                    {this.props.rightComponent()}
                </View>
            )
        }
    }
    _titleComponent(){
        if(this.props.titleComponent == null){
            let content = this.props.content;
            let title = this.props.title;
            let fontSize = 24;
            if(content!=null && content.Center != null){
                title = content.Center.text || this.props.title;
                fontSize = content.Center.fontSize || 24
            }

            return(
                <View style = {{alignItems:'center',justifyContent:'center'}}>
                    <Text style = {{textAlign:'center',fontSize:fontSize,alignItems:'center',color:this.props.titleColor}}>
                        {title}
                    </Text>
                </View>
            )
        }else {
            return this.props.titleComponent()
        }
    }
}

NavBar.proTypes = {
    leftComponent: PropTypes.func,
    titleComponent:PropTypes.func,
    rightComponent:PropTypes.func,
    title:PropTypes.string,
    titleColor:PropTypes.string,

    leftPressed:PropTypes.func,
    rightPressed:PropTypes.func,

    leftComponentHidden:PropTypes.bool,
    content:PropTypes.object

}
NavBar.defaultProps={
    leftComponent:null,
    titleComponent:null,
    rightComponent:null,
    title:'',

    leftPressed:null,
    rightPressed:null,

    leftComponentHidden:false,
    titleColor:'#fff',
    content:null,
}

var styles = StyleSheet.create({
    nav:{
        height:64,
        paddingTop:20,
        backgroundColor:'#da3041'
    },
    container:{
        paddingLeft:10,
        paddingRight:10,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    titleContainer:{
        position:'absolute',
        justifyContent:'center',
        width:Util.size.width,
        marginTop:20,
        height:44
    },
    navItems:{
        color:'white',
        fontSize:15,
        lineHeight:44,
        width:80
    }
})

module.exports = NavBar;