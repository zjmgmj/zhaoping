import React, {Component} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import Header from '../../components/Header';
import {setStatusBar} from '../../components/setStatusBar';
import {baseStyle} from '../../components/baseStyle';
import {Icontick} from '../../iconfont/Icontick';

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class ChooseBg extends Component {
  render() {
    return (
      <View>
        <Header
          title="选择背景"
          right="确定"
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
          onRightPress={() => {
            console.log('确定');
          }}
          fullScreen
          isBorder={false}
        />
        <View style={baseStyle.content}>
          <View style={sty.bgBox}>
            <View style={sty.imgBox}>
              <Image
                style={sty.imgSty}
                source={require('../../images/erweim.png')}
              />
              <View style={sty.chooseSty}>
                <Icontick color="#fff" size={60} />
              </View>
            </View>
            <View style={sty.imgBox}>
              <Image
                style={sty.imgSty}
                source={require('../../images/erweim.png')}
              />
            </View>
            <View style={sty.imgBox}>
              <Image
                style={sty.imgSty}
                source={require('../../images/erweim.png')}
              />
            </View>
            <View style={sty.imgBox}>
              <Image
                style={sty.imgSty}
                source={require('../../images/erweim.png')}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default ChooseBg;

const imgSize = (baseStyle.screenWidth - 90) / 3;
const sty = StyleSheet.create({
  imgBox: {
    width: imgSize,
    height: imgSize,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
  },
  imgSty: {
    width: imgSize,
    height: imgSize,
    resizeMode: 'contain',
  },
  bgBox: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  chooseSty: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    zIndex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
  },
});
