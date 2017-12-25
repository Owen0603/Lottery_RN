import React, { Component } from 'react';

import {
    Platform,
    StyleSheet,
    Text,
    View,
    TabBarIOS,

} from 'react-native';

class found extends Component{

    render(){
        return(
            <View>
                <Text style = {{fontSize:60}}>
                    found
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

});

module.exports = found;