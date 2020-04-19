import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
  // SafeAreaView,
} from 'react-native';
import {Button} from 'beeshell/dist/components/Button';
import Header from '../../../components/Header';
import {setStatusBar} from '../../../components/setStatusBar';
import {baseStyle} from '../../../components/baseStyle';
import {Iconright} from '../../../iconfont/Iconright';
import Picker from '../../../components/picker';
import {TopviewGetInstance} from 'beeshell';
import {selectPhotoTapped} from '../../../components/SelectPhotoTapped';

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class PersonInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  UNSAFE_componentWillMount() {}

  render() {
    return (
      <View style={[baseStyle.bgWhite, {flex: 1}]}>
        <Header
          title="个人信息"
          fullScreen
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <ScrollView style={baseStyle.content}>
          <ImageBackground
            style={sty.playBox}
            source={require('../../../images/person_info_bg.png')}>
            <View style={{flexDirection: 'column', justifyContent: 'center'}}>
              <Image
                source={require('../../../images/play_icon.png')}
                style={{width: 64, height: 64, resizeMode: 'contain'}}
              />
            </View>
          </ImageBackground>
          <Text style={sty.personText}>
            从事HR工作5年多推荐过600多个成功入职者。在华为平安工作各3年，熟悉招聘流程。
          </Text>

          <Button
            onPress={() => {
              this.savePosition();
            }}
            style={sty.subBtn}
            textStyle={{color: '#fff'}}>
            重新上传视频介绍
          </Button>
        </ScrollView>
      </View>
    );
  }
}

export default PersonInfo;
const sty = StyleSheet.create({
  playBox: {
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 187.5,
  },
  personText: {
    lineHeight: 25,
    marginTop: 10,
    padding: 10,
  },
  subBtn: {
    backgroundColor: '#D9B06F',
    marginTop: 50,
  },
});
