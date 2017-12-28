/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TabBarIOS,
    Button

} from 'react-native';

import Home from './Home/home';
import Score from './Score/score';
import God from './God/god';
import Found from './Found/found';
import Mine from './Mine/mine';

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {changeTab} from "../actions/changeTab-action"

import Detail from './DetailView'

class Tab extends Component {

    constructor(props){
        super(props);
        this.props.actions.changeTab("found")
    }

    _renderTabarItems(selectedTab,icon,selectedIcon,Comp,tabName){
        return (
            <TabBarIOS.Item
                renderAsOriginal = {true}
                title = {selectedTab}
                icon = {{uri:icon,scale:1.8}}
                selectedIcon = {{uri:selectedIcon,scale:1.8}}
                selected = {this.props.tab === tabName}
                onPress ={()=> {
                    this.props.actions.changeTab(tabName)
                }}
            >
                <Comp navigator = {this.props.navigator}/>
            </TabBarIOS.Item>
        )

    }

    render() {
        return (
            <TabBarIOS
                tintColor = '#da3041'
                style = {{flex:1}}>
                {this._renderTabarItems('首页','jdd_buy_home','jdd_buy_home_press',Home,'home')}
                {this._renderTabarItems('比分','jdd_buy_score','jdd_buy_score_press',Score,'score')}
                {this._renderTabarItems('大神','jdd_buy_god','jdd_buy_god_press',God,'god')}
                {this._renderTabarItems('发现','jdd_buy_found','jdd_buy_found_press',Found,'found')}
                {this._renderTabarItems('我的','jdd_buy_mine','jdd_buy_mine_press',Mine,'mine')}
            </TabBarIOS>
        );
    }
}

function mapStateToProps(state) {
    return {
        tab:state.changeTabState.tab,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions:bindActionCreators({changeTab},dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Tab);