import React, { Component } from 'react';

import {
    Platform,
    StyleSheet,
    Text,
    View,
    TabBarIOS,

} from 'react-native';

class mine extends Component{

    render(){
        return(
            <View>
                <Text style = {{fontSize:60}}>
                    mine
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

});

module.exports = mine;