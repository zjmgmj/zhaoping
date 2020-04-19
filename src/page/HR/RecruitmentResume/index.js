import React, {Component} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {setStatusBar} from '../../../components/setStatusBar';
import Header from '../../../components/Header';
import Item from './item';
import {baseStyle} from '../../../components/baseStyle';

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class RecruitmentResume extends Component {
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
    const currentUser = this.state.currentUser;
    global.httpGet(
      'position/list',
      {
        page: 1,
        size: 10,
        userId: currentUser.userId,
      },
      res => {
        this.setState({
          list: res.data.result,
        });
      },
    );
  }
  render() {
    const list = this.state.list;
    return (
      <View style={[{flex: 1, backgroundColor: '#FBFBFB'}]}>
        <Header
          title="招聘管理"
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
          fullScreen
          isBorder={false}
        />
        <ScrollView>
          {list.map(item => {
            return (
              <View
                key={item.id}
                style={{marginBottom: 10, backgroundColor: '#fff'}}>
                <Item item={item} navigation={this.props.navigation} />
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

export default RecruitmentResume;
