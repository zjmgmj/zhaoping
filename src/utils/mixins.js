import React from 'react';
import {Text, Platform} from 'react-native';
import {httpGet, httpGetPromise, uploadFilePost} from './httpUtil';
import Modal, {ModalContent} from 'react-native-modals';
import RNFileSelector from 'react-native-file-selector';
export const gettypelist = (code, success, failure = () => {}) => {
  httpGet(
    'dictionary/gettypelist',
    {code: code},
    res => {
      console.log(res);
      success(res);
    },
    err => {
      console.log(err);
      failure(err);
    },
  );
};

function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
}

export const dateMonth = date => {
  if (date) {
    let n = date;
    if (typeof date === 'number') {
      n = new Date(date);
    }
    const years = n.getFullYear();
    const month = n.getMonth() + 1;
    return [years, month].map(formatNumber).join('/');
  } else {
    return '';
  }
};
export const date2Month = date => {
  if (date) {
    let n = date;
    if (typeof date === 'number') {
      n = new Date(date);
    }
    const years = n.getFullYear();
    const month = n.getMonth() + 1;
    return [years, month].map(formatNumber).join('.');
  } else {
    return '';
  }
};
export const date2Str = date => {
  if (date) {
    let n = date;
    if (typeof date === 'number') {
      n = new Date(date);
    }
    const years = n.getFullYear();
    const month = n.getMonth() + 1;
    const day = n.getDate();
    return [years, month, day].map(formatNumber).join('/');
  } else {
    return '';
  }
};
export const datetime2Str = date => {
  if (date) {
    const years = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const mins = date.getMinutes();
    const secds = date.getSeconds();
    const dateStr = [years, month, day].map(formatNumber).join('/');
    return dateStr + ' ' + [hours, mins, secds].map(formatNumber).join(':');
  } else {
    return '';
  }
};
export const date2Time = date => {
  if (date) {
    let n = date;
    if (typeof date === 'number') {
      n = new Date(date);
    }
    const years = n.getFullYear();
    const month = n.getMonth() + 1;
    const day = n.getDate();
    const hours = n.getHours();
    const mins = n.getMinutes();
    const secs = n.getSeconds();
    return (
      [years, month, day].map(formatNumber).join('-') +
      ' ' +
      [hours, mins, secs].map(formatNumber).join(':')
    );
  } else {
    return '';
  }
};

export const modal = (modalShow, modalContent, callBack) => {
  let visible = modalShow;
  console.log('modalShow', modalShow);
  return (
    <Modal
      visible={visible}
      onTouchOutside={() => {
        callBack(false);
        visible = false;
      }}>
      <ModalContent>
        <Text>{modalContent}</Text>
      </ModalContent>
    </Modal>
  );
};

export const getAge = birthDate => {
  const nowDate = new Date().getTime();
  const date = nowDate - birthDate;
  return parseInt(date / 1000 / 60 / 60 / 24 / 365);
};

export const uploadFile = callBack => {
  // this.props.close();
  let filterFile;
  if (Platform.OS === 'ios') {
    //文件夹内容筛选IOS和安卓是相反的，要注意
    filterFile = [
      'log',
      'LOG',
      'HTML',
      'html',
      'js',
      'JS',
      'bat',
      'BAT',
      'class',
      'CLASS',
      'java',
      'JAVA',
      'PRO',
      'pro',
      'sql',
      'SQL',
    ];
  } else if (Platform.OS === 'android') {
    filterFile =
      '.+(.pdf|.PDF|.doc|.DOC|.DOCX|.docx|.xls|.xlsx|.XLS|.XLSX|.ppt|.PPT|.PPTX|.pptx|.txt|.TXT|.rar|.RAR|.zip|.ZIP)$';
  }
  //文档目录
  RNFileSelector.Show({
    title: '选择文件',
    closeMenu: true,
    filter: filterFile,
    onDone: path => {
      // android上通过'react-native-file-selector获取的path是不包含file://'协议的，
      // android上需要拼接协议为'file://'+ path，
      // 而IOS则不需要,type可以是文件的MIME类型或者'multipart/form-data'
      let Path = Platform.OS === 'ios' ? path : `file://${path}`;
      let fileParams = {mime: '', path: Path};
      let fileArr = path.split('.');
      console.log('fileArr: ', fileArr);
      if (fileArr.length > 1) {
        let arr = path.split('/'); //截取获取文件名为数组
        fileParams.mime = `.${fileArr[fileArr.length - 1]}`;
        uploadFilePost({
          file: {
            uri: Path,
            fileType: fileParams.mime,
            fileName: arr[arr.length - 1],
          },
          success: res => {
            // return res;
            callBack(res);
          },
        });
      } else {
        // Toast.info('文件类型错误，请重新选择！', 2000);
      }
    },
    onCancel: () => {
      console.log('cancelled');
    },
  });
};

export const getSexStr = code => {
  const sexList = [{label: '男', value: 1}, {label: '女', value: 2}];
  const valItem = sexList.find(item => {
    return item.value === code;
  });
  return valItem ? valItem.label : '';
};

export const Loading = {
  showLoading(timeOut = 10000) {
    global.mLoadingComponentRef && global.mLoadingComponentRef.showLoading();
    this.timerLoading = setTimeout(() => {
      this.dismissLoading();
    }, timeOut);
  },
  dismissLoading() {
    global.mLoadingComponentRef && global.mLoadingComponentRef.dismissLoading();
    this.timerLoading && clearTimeout(this.timerLoading);
  },
};
