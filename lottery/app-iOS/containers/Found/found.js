import React, { Component } from 'react';

import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    ActivityIndicator,
    ScrollView,
    RefreshControl,
    Button,

} from 'react-native';

import Util from '../Common/util'
import LoginView from '../Mine/login'
import Nav from '../Common/nav-bar'
import Web from '../Common/webView'

class found extends Component{
    constructor(props){
        super(props);
        this.state={
            isShow:false,
            isOpen:false,
            configData:[],
            isRefreshing:false,
            topView:[],
            bottomView:[],
        }
    }

    componentDidMount(){
        this._fetchConfigData();
        this._fetchBaseData();
    }

    render(){
        return(
            <View style={styles.container}>
                <Nav title='发现'/>
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


                            <View style = {{flexWrap:'wrap',flexDirection:'row',marginTop:15}}>
                                {this.state.topView}
                            </View>
                            <View style = {{height:10,backgroundColor:'#f1f1f1'}}></View>
                            <View >
                                {this.state.bottomView}
                            </View>
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

    //action
    _fetchConfigData(){
        var self = this;
        Util.get('http://oq4vu9m0k.bkt.clouddn.com/found_config.json',function (data) {
            if(data.code===0){
                self.setState({
                   topView:[]
                })
                self._configTopView(data.data);
            }else {
                alert('服务异常');
            }
        },function (err) {

        });
    }

    _fetchBaseData(){
        var self = this;
        Util.get('http://oq4vu9m0k.bkt.clouddn.com/found_news.json',function (data) {
            if(data.code===0){
                self.setState({
                    isShow:true,
                    isRefreshing:false,
                    bottomView:[],
                })
                self._configBottomView(data.data);
            }else {
                alert('服务异常');
            }
        },function (err) {

        });
    }

    _configTopView(data){
        this.setState({
            configData:data
        })
        if(data.length>0){
            let info = data[0].info;
            var temp = []
            for(var i in info){
                if(!this.state.isOpen && i>6) continue
                let dict = info[i];
                 temp.push(
                     <TouchableOpacity key = {i} onPress = {this._itemClick.bind(this,dict)}>
                         <View style = {{alignItems:'center',width:Util.size.width/4,height:90}}>
                             <Image source = {{uri:dict.entranceLogo}} style ={{width:45,height:45,marginBottom:10}}/>
                             <Text style = {{color:'#666666'}}>{dict.entranceName}</Text>
                             {
                                 i==5?(<View style = {{backgroundColor:'#f63b3c',borderRadius:3,width:30,height:15,position:'absolute',alignItems:'center',justifyContent:'center',right:-5,top:-5}}>
                                     <Text style = {{color:'white',fontSize:10}}>热门</Text>
                                 </View>) : null
                             }
                             {
                                 i==6?(<View style = {{backgroundColor:'#f63b3c',borderRadius:3,width:30,height:15,position:'absolute',alignItems:'center',justifyContent:'center',right:-5,top:-5}}>
                                     <Text style = {{color:'white',fontSize:10}}>推荐</Text>
                                 </View>) : null
                             }
                         </View>
                     </TouchableOpacity>
                 )
            }
            temp.push(
                <TouchableOpacity key = {100+i} onPress = {this._lastClickAction.bind(this)}>
                    <View style = {{alignItems:'center',width:Util.size.width/4,height:90}}>
                        <Image source = {{uri:this.state.isOpen==true? 'more_up':'more_down'}} style ={{width:45,height:45,marginBottom:10}}/>
                        <Text style = {{color:'#666666'}}>更多</Text>
                    </View>
                </TouchableOpacity>
            )
            this.setState({
                topView:temp
            })
        }
    }
    _configBottomView(data){

        var temp = []
        for(var i in data){
            let dict = data[i].info;
            let type = data[i].type;
            if(type===2){
                //中奖cell
                temp.push(
                    this._zhongjiangCell(dict)
                )
            }else if(type===1){
                //新闻cell
                let count = dict.imgUrl.split(',').length;
                if(count===3){
                    temp.push(
                        this._xinwenCellThree(dict)
                    )
                }else if(count===1){
                    temp.push(
                        this._xinwenCellOne(dict)
                    )
                }
            }
        }
        this.setState({
            bottomView:temp
        })
    }

    _zhongjiangCell(dict){
        return(
            <TouchableHighlight key = {dict.id} underlayColor = '#fff' style = {{flex:1}} onPress = {this._zhongjiangCellClick.bind(this,dict)}>
                <View style = {{flex:1}}>
                    <View style = {{flexDirection:'row',height:50,marginTop:10}}>
                        <Image source = {{uri:dict.faceUrl||'user_photos'}} style = {{marginLeft:12,width:40,height:40,borderRadius:20}}/>
                        <View style = {{flex:1}}>
                            <Text style = {{color:'#333333',marginLeft:5,fontSize:14}}>{dict.nickName}</Text>
                            <Text style = {{color:'#999999',marginLeft:5,marginTop:10,fontSize:12}}>{dict.createTime}</Text>
                        </View>
                    </View>
                    <View style = {{marginLeft:12,marginRight:10}}>
                        <Text style = {{fontSize:13,color:'#333333'}}>{dict.title}</Text>
                    </View>
                    <View style = {{backgroundColor:'#ffefe7',borderColor:'#f7e0d0',borderWidth:1,marginLeft:12,marginRight:10,marginTop:8}}>
                        <View style = {{flexDirection:'row',marginTop:5,marginLeft:10,alignItems:'center'}}>
                            <Image source = {{uri:'football',width:25,height:25}}/>
                            <Text style = {{marginLeft:10,color:'#333333'}}>{dict.lotteryName}</Text>
                            <Text style = {{marginLeft:20,color:'#333333',fontSize:13}}>第{dict.issueName}期</Text>
                        </View>
                        <View style={{borderWidth:0.5,borderColor:'#f1d5c2',borderStyle : 'dashed',marginTop:4}}></View>
                        <View style = {{flexDirection:'row',marginTop:10,marginLeft:10}}>
                            <Text style = {{fontSize:12,color:'#333333'}}>方案金额：</Text>
                            <Text style = {{fontSize:12,color:'#da3041'}}>{dict.money}元</Text>
                            <Text style = {{fontSize:12,color:'#333333',marginLeft:30}}>本单盈利率：</Text>
                            <Text style = {{fontSize:12,color:'#da3041'}}>{dict.winRate}%</Text>
                        </View>
                        <View style = {{flexDirection:'row',marginTop:10,marginLeft:10,marginBottom:8,alignItems:'center'}}>
                            <Text style = {{fontSize:12,color:'#333333'}}>税后奖金：</Text>
                            <Text style = {{fontWeight:'bold',fontSize:14,color:'#da3041'}}>{dict.winMoneyNotax}元</Text>
                        </View>
                    </View>
                    <View style = {{flexDirection:'row',marginLeft:12,marginTop:8,marginBottom:8}}>
                        <Text style = {{fontSize:12,color:'#999999'}}>阅读{dict.readCount}</Text>
                        <Text style = {{fontSize:12,color:'#999999',marginLeft:10}}>评论{dict.replyCount}</Text>
                    </View>
                    <View style = {{backgroundColor:'#f1f1f1',height:10}}></View>
                </View>
            </TouchableHighlight>
        )
    }
    _xinwenCellOne(dict){
        return(
            <TouchableHighlight key = {dict.id} underlayColor = '#fff' style = {{flex:1}} onPress = {this._webCellClick.bind(this,dict)}>
                <View style = {{flex:1}}>
                    <View style = {{flexDirection:'row',marginTop:10,marginBottom:10}}>
                        <View style = {{flex:1,marginLeft:10}}>
                            <Text style = {{color:'#333333'}}>{dict.title}</Text>
                            <View style = {{flexDirection:'row',marginTop:10,alignItems:'center'}}>
                                <Text style = {{color:'#666666',fontSize:12}}>{dict.source}</Text>
                                <Text style = {{color:'#999999',fontSize:12,marginLeft:12}}>阅读{dict.readCount}</Text>
                                <Text style = {{color:'#999999',fontSize:12,marginLeft:12}}>{dict.showTime}</Text>
                            </View>
                        </View>
                        <Image source = {{uri:dict.imgUrl}} style = {{marginRight:10,marginLeft:4,width:80}}/>
                </View>
                    <View style = {{backgroundColor:'#f1f1f1',height:8}}></View>
                </View>
            </TouchableHighlight>
        )
    }
    _xinwenCellThree(dict){
        let images = dict.imgUrl.split(',');
        return(
            <TouchableHighlight key = {dict.id} underlayColor = '#fff' style = {{flex:1}} onPress = {this._webCellClick.bind(this,dict)}>
                <View style = {{flex:1}}>
                    <View style = {{margin:10}}>
                        <Text>{dict.title}</Text>
                        <View style = {{marginTop:10,flexDirection:'row',height:60}}>
                            <Image source = {{uri:images[0]}} style = {{flex:1}}/>
                            <Image source = {{uri:images[1]}} style = {{flex:1,marginLeft:10}}/>
                            <Image source = {{uri:images[2]}} style = {{flex:1,marginLeft:10}}/>
                        </View>
                        <View style = {{flexDirection:'row',marginTop:10,alignItems:'center'}}>
                            <Text style = {{color:'#666666',fontSize:12}}>{dict.source}</Text>
                            <Text style = {{color:'#999999',fontSize:12,marginLeft:12}}>阅读{dict.readCount}</Text>
                            <Text style = {{color:'#999999',fontSize:12,marginLeft:12}}>{dict.showTime}</Text>
                        </View>
                    </View>
                    <View style = {{backgroundColor:'#f1f1f1',height:8}}></View>
                </View>
            </TouchableHighlight>
        )
    }

    //刷新事件
    _onRefreh(){
        this.setState({
            isRefreshing:true
        });
        setTimeout(()=>{
            this._fetchConfigData();
            this._fetchBaseData();
        },200);
    }

    //top item 点击
    _itemClick(data){
        this.props.navigator.push({
            component:Web,
            title:data.entranceName,
            barTintColor:'#fff',
            passProps:{
                url:data.param,
                title:data.entranceName,
            }
        })
    }
    //最后一个点击
    _lastClickAction(){
        this.setState({
            isOpen:!this.state.isOpen,
            topView:[]
        })
        this._configTopView(this.state.configData)
    }

    //bottom item 点击
    _zhongjiangCellClick(data){

    }
    _webCellClick(data){
        this.props.navigator.push({
            component:Web,
            title:'资讯详情',
            barTintColor:'#fff',
            passProps:{
                url:"https://h5.jdd.com/communal/news/#/detail?source=app&id="+data.id,
                title:'资讯详情',
            }
        })
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
});

module.exports = found;