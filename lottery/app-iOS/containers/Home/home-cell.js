import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image
} from  'react-native';

import Util from '../Common/util'


class Home_Cell extends Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            <View style = {styles.container}>
                <View style = {styles.left}>
                    <Text numberOfLines = {2}>
                        {this.props.data.title}
                    </Text>
                    <View style = {{flexDirection:'row',justifyContent:'space-between',marginTop:8}}>
                        <Text style = {{fontSize:13,color:'#666666'}}>
                            {this.props.data.source}
                        </Text>
                        <Text style = {{fontSize:11,color:'#999999'}}>
                            {this.props.data.createTime}
                        </Text>
                        <Text style = {{fontSize:11,color:'#999999'}}>
                            阅读{this.props.data.readCount}
                        </Text>
                    </View>
                </View>
                <Image style = {styles.img} source ={{uri:this.props.data.imgUrl}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        height:70
    },
    left:{
        marginTop:5,
        marginLeft:10,
        width:Util.size.width-100,
    },
    img:{
        marginLeft:5,
        marginTop:5,
        marginBottom:5,
        width:80,
    }
});

module.exports = Home_Cell;