import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {setStatusBar} from '../../../components/setStatusBar';
import Header from '../../../components/Header';
import {baseStyle} from '../../../components/baseStyle';
import Iconright from '../../../iconfont/Iconright';

class ItemComp extends Component {
  render() {
    return (
      <View>
        <View
          style={[
            baseStyle.flex,
            baseStyle.justifyBetween,
            {paddingBottom: 5, paddingTop: 10, alignItems: 'flex-end'},
          ]}>
          <View style={baseStyle.row}>
            <Image
              style={sty.author}
              source={require('../../../images/author.png')}
            />
            <View style={baseStyle.paddingLeft}>
              <Text style={{marginBottom: 5}}>李梅亭</Text>
              <Text>市场经理 | 互联网价值观</Text>
            </View>
          </View>
          <Iconright color="#D3CECE" />
        </View>
        <View
          style={[baseStyle.row, {justifyContent: 'flex-end', marginTop: 10}]}>
          <TouchableOpacity style={sty.buttonSty}>
            <Text style={baseStyle.textYellow}>拒绝面试</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={sty.buttonSty}>
            <Text style={baseStyle.textYellow}>邀请面试</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class ResumeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }
  UNSAFE_componentWillMount() {
    global.localStorage.get({key: 'currentUser'}).then(res => {
      this.setState({
        currentUser: res,
      });
      this.getPositiontypeList();
    });
  }
  getPositiontypeList() {
    global.httpGet(
      'resume/getResumeSubmittedList',
      {
        page: 1,
        size: 10,
        positionId: this.props.navigation.getParam('id'),
      },
      res => {
        this.setState({
          list: res.data.result,
        });
      },
    );
  }
  render() {
    // const list = this.state.list;
    const list = [1, 2, 3, 4];
    return (
      <View style={[{flex: 1, backgroundColor: '#fff'}]}>
        <Header
          title="招聘简历"
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
          fullScreen
        />
        <ScrollView style={baseStyle.content}>
          {list.map(item => {
            return (
              <View style={baseStyle.borderBottom} key={item}>
                <ItemComp navigation={this.props.navigation} />
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

export default ResumeList;

const sty = StyleSheet.create({
  author: {
    width: 47,
    height: 47,
  },
  buttonSty: {
    borderColor: '#D9B06F',
    borderWidth: 0.5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 10,
    marginBottom: 10,
  },
});
