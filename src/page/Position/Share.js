import React, {Component} from 'react';
import {View, ImageBackground, StyleSheet} from 'react-native';
class Share extends Component {
  render() {
    return (
      <View style={sty.box}>
        <View style={sty.shareBox}>
          <ImageBackground
            style={{width: 297, height: 100}}
            source={require('../../images/md-duran-1410885-unsplash(1).png')}
          />
        </View>
      </View>
    );
  }
}
export default Share;
const sty = StyleSheet.create({
  box: {
    background: 'rgba(0,0,0,0.5)',
  },
  shareBox: {
    width: 297,
    paddingBottom: 15,
  },
});
