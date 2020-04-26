import React from 'react';
import { Text } from 'react-native';
import { httpGet } from './httpUtil';
import Modal, { ModalContent } from 'react-native-modals';
export const gettypelist = (code, success, failure) => {
  httpGet(
    'dictionary/gettypelist',
    { code: code },
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

function formatNumber (n) {
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
