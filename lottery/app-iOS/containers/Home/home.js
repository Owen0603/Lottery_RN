import React, { Component } from 'react';

import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    TouchableHighlight,
    NavigatorIOS,
    RefreshControl

} from 'react-native';

import Util from '../Common/util';
import Swiper from 'react-native-swiper';
import Web from '../Common/webView';
import Cell from './home-cell'

class home extends Component{

    constructor(props){
        super(props);
        this.state={
            isShow:false,
            isRefreshing:false,
            showView:[]
        }
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
                            {this.state.showView}
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

    componentDidMount(){
        this._fetchData();
    }

    _fetchData(){
       var self = this;
       Util.get('http://oq4vu9m0k.bkt.clouddn.com/home.json',function (data) {
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
           alert(err);
       });
    }

    _configList(lists){
        var self = this;
        for(var i in lists){
            let value = lists[i].moduleId;
            let info = lists[i].info;
            var temp = self.state.showView;

            if(value===8){
                //轮播图
                var images = [];
                for(var j in info){
                    images.push(<TouchableHighlight key = {j} onPress = {this._actionToWebClick.bind(this,info[j])}>
                        <Image source = {{uri:info[j].imageUrl}} style={styles.bannerImg}/>
                    </TouchableHighlight>);
                }
                var view = <Swiper
                key = {0}
                style = {styles.swiper}
                height = {130}
                autoplay = {true}
                horizontal = {true}
                paginationStyle = {{bottom:10}}
                showsButtons = {false}
                >{images}</Swiper>;

                temp.push(view);
                //底部空白
                temp.push(<View key = {100+value} style= {styles.bottom}></View>);

            }else if(value===7){
                //小广播
                if(info.broadcast.length>0){
                    var view = <View key={value} style = {styles.bell}>
                        <Image source = {{uri:'jdd_home_bell'}} style = {{width:20,height:21,marginLeft:5}}/>
                        <Text style = {{marginLeft:10}}>{info.broadcast[0].content}</Text>
                    </View>;
                    temp.push(view)
                }else {
                    var view = <View key={value} style = {styles.bell}>
                        <Image source = {{uri:'jdd_home_bell'}} style = {{width:20,height:21,marginLeft:5}}/>
                        <Text style = {{marginLeft:10}}>用户：{info.winList[0].userName}投注{info.winList[0].lotteryName}，中奖{info.winList[0].money}元</Text>
                    </View>;
                    temp.push(view);
                }
                //底部空白
                temp.push(<View key = {100+value} style= {styles.bottom}></View>);
            }else if(value===5){
                //彩种
                if(info.length>7){
                    let subLottery1 = info.slice(0,4);
                    let subLottery2 = info.slice(4,8);
                    var view1s = [];
                    var view2s = [];
                    for(var i in subLottery1){
                        view1s.push(<TouchableOpacity key={i} style = {styles.lotteryButton} onPress = {this._lotteryClick.bind(this,i)}>
                            <Image source= {{uri:subLottery1[i].imageUrl}} style = {styles.img}/>
                            <Text style = {styles.text}>{subLottery1[i].lotteryName}</Text>
                        </TouchableOpacity>)
                    }
                    for(var i in subLottery2){
                        view2s.push(<TouchableOpacity key = {4+i} style = {styles.lotteryButton} onPress = {this._lotteryClick.bind(this,4+i)}>
                            <Image source= {{uri:subLottery2[i].imageUrl}} style = {styles.img}/>
                            <Text style = {styles.text}>{subLottery2[i].lotteryName}</Text>
                        </TouchableOpacity>)
                    }
                    temp.push(<View key={value} style = {{marginBottom:5}}>
                        <View style = {{flexDirection:'row',flex:1}}>
                            {view1s}
                        </View>
                        <View style = {{flexDirection:'row',flex:1}}>
                            {view2s}
                        </View>
                    </View>);
                    //底部空白
                    temp.push(<View key = {100+value}style= {styles.bottom}></View>);
                }

            }else if(value===2){
                //强广告位
                let view = <TouchableOpacity key = {value} style = {{height:50,flex:1}} onPress = {this._actionToWebClick.bind(this,info)}>
                    <Image source = {{uri:info.imageUrl}} style = {{flex:1}}/>
                </TouchableOpacity>;
                temp.push(view);
                //底部空白
                temp.push(<View key = {100+value} style= {styles.bottom}></View>);

            }else if(value===4){
                //热门赛事

            }else if(value===6){
                //运营位
                let view = <View key = {value}>
                    <Text style = {{height:30,textAlign:'center',paddingTop:7,fontSize:16}}>精彩活动</Text>
                    <View style = {{height:100,flex:1, flexDirection:'row',marginBottom:5}}>
                        <TouchableOpacity style = {{flex:1}} onPress = {this._actionToWebClick.bind(this,info[0])}>
                            <Image source = {{uri:info[0].imageUrl}} style = {{flex:1}}/>
                        </TouchableOpacity>
                        <View style = {{flex:1}}>
                            <TouchableOpacity style = {{flex:1}} onPress = {this._actionToWebClick.bind(this,info[1])}>
                                <Image source = {{uri:info[1].imageUrl}} style = {{flex:1}}/>
                            </TouchableOpacity>
                            <TouchableOpacity style = {{flex:1}} onPress = {this._actionToWebClick.bind(this,info[2])}>
                                <Image source = {{uri:info[2].imageUrl}} style = {{flex:1}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>;
                temp.push(view);
                //底部空白
                temp.push(<View key = {100+value} style= {styles.bottom}></View>);
            }else if(value===10){

                console.log(info);
                //资讯
                let view = [];
                view.push(
                    //最新资讯
                    <View key = {0} style = {{flexDirection:'row',height:40,paddingTop:10}}>
                        <Text style = {{fontWeight:'bold',fontSize:20,flex:1,textAlign:'right'}}>
                            最新资讯
                        </Text>
                        <Text style = {{fontWeight:'bold',fontSize:18,color:'#24d08b',flex:1,alignItems:'center',paddingLeft:5}}>
                            NEWS
                        </Text>
                    </View>
                )
                for(var index in info){
                    view.push(<TouchableOpacity key = {100+index} onPress = {this._newsClick.bind(this,info[index])}>
                        <Cell data = {info[index]}/>
                    </TouchableOpacity>)
                }
                temp.push(view);
                //底部空白
                temp.push(<View key = {100+value} style= {styles.bottom}></View>);
            }
            self.setState({
                showView:temp,
            })
        }
        temp.pop();
    }

    //web 事件
    _actionToWebClick(data){
        this.props.navigator.push({
            component:Web,
            title:data.title,
            barTintColor:'#fff',
            passProps:{
                url:data.actionParam,
                title:data.title,
            }
        })
    }
    //最新资讯
    _newsClick(data){
        this.props.navigator.push({
            component:Web,
            title:data.title,
            barTintColor:'#fff',
            passProps:{
                url:data.actionParam,
                title:'资讯详情',
            }
        })
    }
    // 小喇嘛事件
    _labaClick(){

    }
    //彩种事件
    _lotteryClick(index){
        alert(index);
    }


    //刷新事件
    _onRefreh(){
        this.setState({
            isRefreshing:true
        });
        setTimeout(()=>{
            this._fetchData()
        },500);
    }


}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginBottom:49
    },
    swiper:{

    },
    bannerImg:{
        width:Util.size.width,
        height:130,
    },
    bottom:{
        margin:0,
        width:Util.size.width,
        height:10,
        backgroundColor:'#f7f7f7'
    },
    bell:{
        width:Util.size.width,
        height:40,
        flexDirection:'row',
        alignItems:'center',
    },
    lotteryButton:{
        flex:1,
        alignItems:'center',
        marginTop:10,
    },
    img:{
        width:50,
        height:50,
    },
    text:{
        marginTop:5,
    },
    subLottery:{
        flex:1,
        height:50,
    }
});

module.exports = home;