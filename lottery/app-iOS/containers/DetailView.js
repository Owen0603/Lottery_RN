import React, { Component } from 'react';

import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    TouchableHighlight,
    NavigatorIOS,
    Button

} from 'react-native';

class home extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style = {{flex:1,backgroundColor:'red'}}>
                <Button
                onPress = {this._lotteryClick.bind(this)}
                title = 'pop'
                color = '#666666'/>
            </View>
        )
    }
    //彩种事件
    _lotteryClick(){
        this.props.navigator.pop();
    }
}

module.exports = home;