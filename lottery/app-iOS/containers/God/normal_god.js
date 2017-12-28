import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    RefreshControl,
    ActivityIndicator,
    TouchableOpacity,
    TouchableHighlight,
    TextInput,
    Button,
    AlertIOS,
} from 'react-native';

import Util from '../Common/util'
import Search from '../Common/searchBar'

class NormalGod extends Component{

    constructor(props){
        super(props);
        this.state={
            isShow:false,
            isRefreshing:false,
            hotView:[],
            recommondView:[]
        }
    }

    componentDidMount(){
        this._fetchData();
    }


    render(){
        return(
            <View style={styles.container}>
                {
                    this.state.isShow?
                        (<ScrollView
                            style = {{flex:1}}
                            refreshControl = {
                                <RefreshControl
                                    refreshing = {this.state.isRefreshing}
                                    //此处用匿名函数结束循环引用
                                    onRefresh = {()=>{
                                        this._onRefreh()}
                                    }
                                    tintColor = '#ff0000'
                                    title = 'Loading'
                                    titleColor = '#00ff00'
                                    colors = {['#ff0000','#00ff00','#0000ff']}
                                    progressBackgroundColor = '#ffff00'
                                />
                            }
                        >
                            <Search
                             style = {{height:50}}
                             callback = {()=>{
                                 this._searchSubmitAction()
                             }}/>

                            <View style = {{flexDirection:'row',marginTop:10}}>
                                {this._renderTitleView('实力榜','god_Top1')}
                                {this._renderTitleView('连红榜','god_Top2')}
                                {this._renderTitleView('奖励榜','god_Top3')}
                                {this._renderTitleView('晋升榜','god_Top4')}
                            </View>

                            <View style = {{height:4,backgroundColor:'#fcfcfc',marginTop:15}}></View>

                            {this.state.hotView}

                            <View style = {{height:4,backgroundColor:'#fcfcfc',marginTop:15}}></View>

                            {this.state.recommondView}

                            <View style = {{height:49}}></View>
                        </ScrollView>)
                        :
                        (<ActivityIndicator
                            animating = {true}
                            style = {[{height:80,marginTop:30}]}
                            size = 'large'
                        />)
                }
            </View>
        )
    }

    //视图
    _renderTitleView(name,imageName){
        return(
            <TouchableOpacity style = {{flex:1}} onPress = {this._titleButtonClick.bind(this,name)}>
                <View style = {{alignItems:'center'}}>
                    <Image source = {{uri:imageName}} style ={{width:50,height:50,marginBottom:10}}/>
                    <Text style = {{color:'#666666'}}>{name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    _renderRecommondCell(data){
        var temp = []
        for (var i in data){
            let dict = data[i];
            temp.push(
                <View key = {i} style = {{flex:1,flexDirection:'row'}}>
                    <Text style = {{flex:1,textAlign:'left',color:'#666666',fontSize:12,marginLeft:8}}>{dict.mno}</Text>
                    <Text style = {{flex:1,textAlign:'center',color:'#666666',fontSize:12}}>{dict.hteam}VS{dict.vteam}</Text>
                    <Text style = {{flex:1,textAlign:'right',color:'#666666',fontSize:12,marginRight:8}}>{dict.content}</Text>
                </View>
            )
        }
        return temp
    }

    //action
    _fetchData(){
        var self = this;
        Util.get('http://oq4vu9m0k.bkt.clouddn.com/normalGod.json',function (data) {
            if(data.code===0){
                self.setState({
                    showView:[],
                    isShow:true,
                    isRefreshing:false
                })
                self._configList(data.data);
            }else {
                alert('服务异常');
            }
        },function (err) {

        });
    }

    _configList(data){
        //暴热
        var view = [];
        view.push(<View key = {100} style = {{marginLeft:10,height:30,flexDirection:'row',alignItems:'center'}}>
            <View style = {{backgroundColor:'red',width:4,height:20,marginRight:8}}></View>
            <Text style = {{fontSize:15}}>暴热大神</Text>
        </View>);

        let hot = data.arenahot.RtlJson;
        var tempView = []
        for( var i in hot){
            let dict = hot[i];
            tempView.push(
                <TouchableOpacity style = {{flex:1}} key = {i}>
                    <View style = {{flex:1,alignItems:'center',marginTop:10}}>
                        <Image source = {{uri:dict.UserFace}} style ={{width:46,height:46,marginBottom:10,borderRadius:23}}/>
                        <Text style = {{color:'#666666',fontSize:11}}>{dict.UserName}</Text>
                    </View>
                </TouchableOpacity>
            )
        }

        view.push(
            <View key = {101} style = {{height:80,flexDirection:'row'}}>
                {tempView}
            </View>
        )


        //大神推荐
        var view2 = [];
        view2.push(<View key = {200} style = {{marginLeft:10,height:30,flexDirection:'row',alignItems:'center'}}>
            <View style = {{backgroundColor:'red',width:4,height:20,marginRight:8}}></View>
            <Text style = {{fontSize:15}}>大神推荐</Text>
        </View>);

        let recommond = data.recommscheme.RtlJson;
        var tempView2 = []
        for( var i in recommond){
            let dict = recommond[i];
            tempView2.push(
                <TouchableHighlight style = {{flex:1}} key = {i}>
                    <View style = {{flex:1}}>
                        <View style = {{flexDirection:'row',height:50,marginTop:10}}>
                            <Image source = {{uri:dict.UserFace||'user_photos'}} style = {{marginLeft:15,width:40,height:40,borderRadius:20}}/>
                            <View style = {{flex:1,flexDirection:'row'}}>
                                <View style = {{marginLeft:10}}>
                                    <View style = {{flexDirection:'row'}}>
                                        <Text>{dict.UserName}</Text>
                                        <Text style = {{color:'white',backgroundColor:'#da3041',borderRadius:3,marginLeft:5,fontSize:12}}>V{dict.Userlevel}</Text>
                                    </View>
                                    <View style = {{flexDirection:'row',marginTop:5}}>
                                        <Text style = {{fontSize:12,color:'#999999'}}>近期战绩：</Text>
                                        <Text style = {{fontSize:12,color:'red'}}>{dict.Level}</Text>
                                    </View>
                                </View>
                                <View style = {{alignSelf:'stretch',width:60,position: 'absolute',right:10}}>
                                    <Text style = {{fontSize:12,color:'#999999',textAlign:'right'}}>跟投金额</Text>
                                    <Text style = {{color:'red',marginTop:5,textAlign:'right'}}>{dict.FollowMoney}元</Text>
                                </View>
                            </View>
                        </View>
                        <View style = {{backgroundColor:'#f7f7f7',marginLeft:10,marginRight:10}}>
                            <View style = {{flexDirection:'row',marginLeft:10,marginTop:8}}>
                                <Text style = {{fontSize:11,color:'#999999'}}>过关方式:{dict.Pass}</Text>
                                <Text style = {{fontSize:11,color:'#999999'}}>自购金额{dict.Money}</Text>
                            </View>
                            <View style = {{marginLeft:10,marginRight:10,marginTop:10,height:0.5,backgroundColor:'#dedede'}}></View>
                            <View style = {{flex:1,marginTop:10,marginBottom:10}}>
                                {this._renderRecommondCell(dict.Detail)}
                            </View>
                        </View>
                        <View style = {{flexDirection:'row',marginTop:15,marginLeft:10,marginBottom:20}}>
                            <Text style = {{color:'#666666',fontSize:12}}>截止{dict.BuyEndTime}</Text>
                            <Text> 投 10 倍</Text>
                            <TouchableOpacity style = {{position:'absolute',right:10}}>
                                <View style = {{alignItems:'center', justifyContent: 'center',width:70,height:25,backgroundColor:'#da3041',borderRadius:4}}>
                                    <Text style = {{color:'white'}}>立即跟单</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style = {{backgroundColor:'#dddddd',height:0.5,marginLeft:10,marginRight:10}}></View>
                    </View>
                </TouchableHighlight>
            )
        }

        view2.push(
            <View key = {201} >
                {tempView2}
            </View>
        )

        this.setState({
            hotView:view,
            recommondView:view2
        })
    }



    _onRefresh(){
        this.setState({
            isRefreshing:true
        });
        setTimeout(()=>{
            this._fetchData();
        },200)
    }

    _titleButtonClick(data){
        switch(data){
            case '实力榜':

                return
            case '连红榜':

            case '奖励榜':

            case '晋升榜':

            default:
        }
        alert(data)
    }

    _searchSubmitAction(){
        AlertIOS.alert('search');
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})

module.exports = NormalGod;