// import React, {Component} from 'react';
import ImagePicker from 'react-native-image-picker';

export const selectPhotoTapped = ({options, cb, isSource}) => {
  const defaultOptions = {
    // title: '选择图片',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '选择照片',
    // customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
    cameraType: 'back',
    mediaType: 'photo',
    videoQuality: 'high',
    durationLimit: 10,
    maxWidth: 300,
    maxHeight: 300,
    quality: 0.8,
    angle: 0,
    allowsEditing: false,
    noData: false,
    storageOptions: {
      skipBackup: true,
    },
  };
  Object.assign(defaultOptions, options);
  ImagePicker.showImagePicker(defaultOptions, response => {
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled photo picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      // let source = {uri: response.uri, data: response.data};
      if (isSource) {
        return {uri: response.uri, data: response.data};
      } else {
        response.mediaType = defaultOptions.mediaType;
        global.Loading.showLoading();
        if (defaultOptions.mediaType === 'video') {
          global.uploadVideo(response, res => {
            console.log('uploadVideo----', res);
            global.Loading.dismissLoading();
            cb(res.data);
          });
        } else {
          global.uploadImage(
            'upload/fileupload',
            response,
            res => {
              console.log('res', res);
              global.Loading.dismissLoading();
              cb(res.data);
            },
            err => {
              console.log('err---->', err);
            },
          );
        }
      }
      // You can also display the image using data:
      // let source = { uri: 'data:image/jpeg;base64,' + response.data };
      // return source;
      // this.setState({
      //   avatarSource: source,
      // });
    }
  });
};
