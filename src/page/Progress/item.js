import React, {Component} from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import {baseStyle} from '../../components/baseStyle';
import RNFetchBlob from 'rn-fetch-blob';
import {TouchableOpacity} from 'react-native-gesture-handler';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusObj: {
        0: '已投递',
        2: '已面试',
        3: '未面试',
        4: '拒绝面试',
        6: '已雇佣',
      },
    };
  }
  updatePositionRecord(item, resumeTemp) {
    const params = {
      // positionId: item.positionId,
      id: item.positionRecordId,
      userId: item.userId,
      status: item.status,
      resumeTemp: resumeTemp,
    };
    global.httpPost(
      'positionrecord/update',
      params,
      res => {
        console.log(res);
        Alert.alert('', '上传模板成功');
      },
      err => {
        console.log(err);
      },
    );
  }
  downFile(item) {
    console.log('downFile--------', item);
    // let dirs = RNFetchBlob.fs.dirs;
    RNFetchBlob.fetch('GET', item.resumeTemp)
      .then(res => {
        console.log('----下载完成文件保存路径为\n' + JSON.stringify(res));
        Alert.alert('下载成功');
      })
      .catch(err => console.log('err', err));
  }
  render() {
    const item = this.props.item.item;
    console.log('职位进展item', item);
    const statusObj = this.state.statusObj;
    return (
      <View style={baseStyle.content}>
        <View
          style={[
            baseStyle.row,
            baseStyle.justifyBetween,
            baseStyle.paddingBottom,
          ]}>
          <Text>{item.positionName}</Text>
          <Text style={[baseStyle.textGray, baseStyle.ft12]}>
            {global.date2Str(new Date(item.entryDate))}
          </Text>
        </View>
        <View style={[baseStyle.row, baseStyle.justifyBetween]}>
          <Text style={baseStyle.textRed}>{item.salaryName}</Text>
          <Text style={[baseStyle.textYellow]}>
            {statusObj[item.positionRecordstatus]}
          </Text>
        </View>

        <View
          style={[
            baseStyle.row,
            baseStyle.justifyBetween,
            baseStyle.paddingTop,
          ]}>
          <Text style={{color: '#333333'}}>{item.companyName}</Text>
        </View>
        {item.positionRecordstatus === 1 ? (
          item.resumeTemp ? (
            <View style={[baseStyle.row, {justifyContent: 'flex-end'}]}>
              <TouchableOpacity
                onPress={() => {
                  this.downFile(item);
                }}
                style={sty.btn}>
                <Text style={baseStyle.textYellow}>下载简历模板</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  global.uploadFile(res => {
                    console.log('res', res);
                    this.updatePositionRecord(item, res.data);
                  });
                }}
                style={sty.btn}>
                <Text style={baseStyle.textYellow}>上传新简历</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={[baseStyle.row, {justifyContent: 'flex-end'}]}>
              <View style={sty.btn}>
                <Text style={baseStyle.textYellow}>已邀面试</Text>
              </View>
            </View>
          )
        ) : item.positionRecordstatus === 2 ||
          item.positionRecordstatus === 5 ||
          item.positionRecordstatus === 6 ||
          item.positionRecordstatus === 7 ||
          item.positionRecordstatus === 8 ? (
          <View style={[baseStyle.row, {justifyContent: 'flex-end'}]}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Feedback', {
                  intfeedback: item.intfeedback,
                  positionRecordId: item.positionRecordId,
                  userId: item.userId,
                  callBack: res => {
                    this.props.refresh();
                  },
                });
              }}
              style={sty.btn}>
              <Text style={baseStyle.textYellow}>面试反馈</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }
}

export default Item;

const sty = StyleSheet.create({
  btn: {
    borderColor: '#D9B06F',
    borderWidth: 0.5,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 7,
    paddingRight: 7,
    marginLeft: 10,
  },
});
