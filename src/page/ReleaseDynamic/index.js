import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  PixelRatio,
  Text,
  TextInput,
} from 'react-native';
import Header from '../../components/Header';
import {setStatusBar} from '../../components/setStatusBar';
import ImagePicker from 'react-native-image-picker';
import {baseStyle} from '../../components/baseStyle';
@setStatusBar({
  // barStyle: 'light-content',
  translucent: true,
  backgroundColor: 'transparent',
})
class ReleaseDynamic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgSource: [],
      videoSource: null,
    };
  }

  //选择图片
  selectPhotoTapped() {
    const options = {
      title: '选择图片',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '从图库上传',
      // customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
      cameraType: 'back',
      mediaType: 'photo',
      videoQuality: 'high',
      durationLimit: 10,
      maxWidth: 1600,
      maxHeight: 1200,
      quality: 0.8,
      angle: 0,
      allowsEditing: false,
      noData: false,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = {uri: response.uri, data: response.data};
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        const imgSourceList = this.state.imgSource;
        imgSourceList.push(source);
        this.setState({
          imgSource: imgSourceList,
        });
      }
    });
  }

  render() {
    return (
      <View style={baseStyle.bgWhite}>
        <Header
          title="发布动态"
          right="发布"
          rightStyle={baseStyle.textYellow}
          fullScreen
          onPressBack={() => {
            // this.props.navigation.state.params.callBackData();
            this.props.navigation.goBack();
          }}
        />
        <View style={sty.textInputBoxSty}>
          <Image
            source={require('../../images/author.png')}
            style={sty.authorImg}
          />
          <View style={sty.textInputSty}>
            <TextInput
              style={baseStyle.paddingLeft}
              placeholder="请输入内容"
              multiline
            />
          </View>
        </View>
        <View style={[baseStyle.row, {paddingBottom: 20}]}>
          {this.state.imgSource.map(item => {
            <View style={baseStyle.paddingLeft}>
              <Image style={[sty.itemImg]} source={{uri: item.data}} />;
            </View>;
          })}
          <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
            <View style={baseStyle.paddingLeft}>
              <Image
                style={[sty.itemImg]}
                source={require('../../images/photo_add.png')}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ReleaseDynamic;
const sty = StyleSheet.create({
  authorImg: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  textInputBoxSty: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 10,
  },
  textInputSty: {
    width: baseStyle.screenWidth - 50,
    minHeight: 300,
  },
  itemImg: {
    width: 101.5,
    height: 75.5,
    // width: pixelRatio(101.5),
    // height: pixelRatio(75.5),
  },
});
