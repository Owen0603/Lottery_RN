import React,{Component,PropTypes} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput
} from 'react-native'

class ValidatorInput extends Component{
    constructor(props){
        super(props);
        let {manager,validate,name,nullable} = this.props;
        var text = manager.getValueForKey(this.props.name,this.props.formname);
        manager.initResultForKey(validate,name,props.text,nullable,this.props.formname);

        this.state ={
            text:props.text || ''
        }
    }

    _afterLength = 0

    render(){
        let ranges = [
            '\ud83c[\udf00-\udfff]',
            '\ud83d[\udc00-\ude4f]',
            '\ud83d[\ude80-\udeff]'
        ]

        let {manager,validate,name,nullable}=this.props

        return(
            <View style = {styles.container}>
                {this._title()}
                <TextInput
                  clearButtomModel = 'while-editing'
                  spellCheck = {false}
                  autoCorect = {false}
                  value = {this.state.text}
                  style = {[this.props.inputStyle,styles.input]}
                  placeholder = {this.props.placeholder || '请输入'+this.props.title}
                  {...this.props}
                    onChangeText ={(text) => {

                        if (this.props.phoneNum) {
                            if (this.props.maxLength && text.length > this.props.maxLength + 2) {

                            } else {
                                const emoj = text.replace(new RegExp(ranges.join('|'), 'g'), '');
                                if (this._afterLength < emoj.length && (emoj.length == 3 || emoj.length == 8)) {
                                    let t = emoj + " "
                                    this._afterLength = t.length
                                    this.setState({
                                        text: t
                                    })
                                } else {
                                    this._afterLength = emoj.length
                                    this.setState({
                                        text: emoj
                                    })
                                }
                                let txt = emoj.replace(/\s+/g, "")
                                manager.updateResultForKey(validate, name, txt, nullable, this.props.formname)
                                this.setState({
                                    text:text
                                })
                            }

                        } else {
                            if (this.props.maxLength && text.length > this.props.maxLength) {

                            } else {
                                const emoj = text.replace(new RegExp(ranges.join('|'), 'g'), '');

                                this.setState({
                                    text: emoj
                                })
                                manager.updateResultForKey(validate, name, text, nullable, this.props.formname)
                                this.setState({
                                    text:text
                                })
                            }

                        }}
                    }
                />
                {this.props.rightComponent}
            </View>
        )
    }

    _title(){
        if(this.props.title){
            if(this.props.notNull){
                return(
                    <View style = {[styles.title,{paddingLeft:0}]}>
                        <Text style = {[styles.titleTextColor,{color:'red',width:6}]}>
                            *
                        </Text>
                        <Text style = {styles.titleText}>
                            {this.props.title}
                        </Text>
                    </View>
                )
            }
        }else {
            return null
        }
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#da3041'
    },
})

module.exports =  ValidatorInput;