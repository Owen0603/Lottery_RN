import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Text,
    Button
} from 'react-native';

import Util from '../Common/util'

class CertifyGod extends Component{

    constructor(props){
        super(props);
        this.state={
            isShow:false,
            isRefreshing:false,
            showView:[]
        }
    }

    componentDidMount(){
        // this._fetchData();
    }

    render(){
        return(
            <View style = {{backgroundColor:'blue',flex:1}}>
                <Text style = {{flex:1,backgroundColor:'blue'}}>
                    CertifyGod
                </Text>
            </View>
        )
    }



    _fetchData(){
        var self = this;
        Util.get('http://oq4vu9m0k.bkt.clouddn.com/normalGod.json',function (data) {
            if(data.code===0){
                self.setState({

                })
            }
        },function (err) {

        });
    }

}

module.exports = CertifyGod;