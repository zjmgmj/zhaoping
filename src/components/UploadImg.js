import React, {Component} from 'react';
import {Imagepicker} from 'beeshell';

export default class UploadImg extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const configs = {
      title: '上传图片',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '从图库上传',
      maxWidth: 1600,
      maxHeight: 1200,
      isAllowCrop: true,
      isAllowRotate: true,
      aspectX: 4,
      aspectY: 3,
      quality: 1,
      customButtons: {
        delImage: {
          title: '删除',
          position: 'top',
          brandColor: 'brandWarning',
        },
      },
      responseFileType: 'base64',
      callback(res) {
        console.log(res);
      },
      onCustomButtonPress(btn) {
        console.log(btn);
      },
    };
    return (
      <Imagepicker
        ref={c => {
          this._imagepicker = c;
        }}
        {...configs}
      />
    );
  }
}
