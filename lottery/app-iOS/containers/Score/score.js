import React, { Component } from 'react';

import {
    Platform,
    StyleSheet,
    Text,
    View,
    TabBarIOS,

} from 'react-native';

class score extends Component{

    render(){
        return(
            <View>
                <Text style = {{fontSize:60}}>
                    score
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

});

module.exports = score;