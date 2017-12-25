import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    PixelRatio
} from  'react-native';

module.exports = {
    size:{
        height:Dimensions.get('window').height,
        width:Dimensions.get('window').width
    },

    tabBarHeight:49,

    pixel:1/PixelRatio.get(),

    get:function (url, successCallback, failCallback) {
        fetch(url)
            .then((repsonse)=>repsonse.text())
            .then((responseText)=>{
            successCallback(JSON.parse(responseText));
            })
            .catch(function (err) {
                failCallback(err);
            });
    }
};