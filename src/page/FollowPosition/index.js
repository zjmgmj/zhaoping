import React, {Component} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {setStatusBar} from '../../components/setStatusBar';
import Header from '../../components/Header';
import {baseStyle} from '../../components/baseStyle';
import PositionItem from '../../components/PositionItem';

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class FollowPosition extends Component {
  render() {
    const list = [1, 2, 3, 4, 5, 6];
    return (
      <View style={[{flex: 1, backgroundColor: '#FBFBFB'}]}>
        <Header
          title="关注职位"
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
          fullScreen
        />
        <ScrollView>
          {list.map(item => {
            return (
              <View
                style={{marginBottom: 10, backgroundColor: '#fff'}}
                key={item}>
                <PositionItem />
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

export default FollowPosition;
