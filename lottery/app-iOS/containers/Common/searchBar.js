import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Platform,
    StyleSheet,
    View,
    Text,
    TextInput
} from 'react-native';

class SearchBar extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View>
                <TextInput
                    style = {{height:30,margin:10,backgroundColor:'#f1f1f1',borderRadius:4}}
                    placeholder = '  搜索大神'
                    placeholderTextColor = '#999999'
                    onSubmitEditing = {this.props.finishCallback}
                />
            </View>
        )
    }
}

SearchBar.proTypes = {
    callback: PropTypes.func,
}

SearchBar.defaultProps = {
    callback: null,
}

const styles = StyleSheet.create({

});


module.exports = SearchBar;