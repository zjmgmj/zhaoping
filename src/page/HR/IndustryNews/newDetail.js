import React, {Component, useState, useEffect} from 'react';
import {View, StyleSheet, Image, Text, ScrollView} from 'react-native';
import Header from '../../../components/Header';
import {setStatusBar} from '../../../components/setStatusBar';
import {baseStyle} from '../../../components/baseStyle';
import HTMLView from 'react-native-htmlview';

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class newsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlContent: '',
      detail: null,
    };
  }
  UNSAFE_componentWillMount() {
    this.getDetail();
  }
  getDetail() {
    global.httpGet(
      'news/detail',
      {
        id: this.props.navigation.getParam('id'),
      },
      res => {
        console.log('news/detail', res);
        this.setState({
          detail: res.data,
          // htmlContent: res.data.newsContent,
        });
      },
    );
  }
  render() {
    const {detail} = this.state;
    if (!detail) {
      return false;
    }
    const titleElement = (
      <View style={baseStyle.row}>
        <View style={baseStyle.authorBoxMin}>
          <Image
            source={{uri: detail.userPic}}
            style={baseStyle.authorImgMin}
          />
        </View>
        <Text style={[baseStyle.paddingLeft, {color: '#666666'}]}>
          {detail.userNickname}
        </Text>
      </View>
    );
    return (
      <View style={[baseStyle.bgWhite, {flex: 1}]}>
        <Header
          titleElement={titleElement}
          fullScreen
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <View style={{paddingTop: 10, paddingBottom: 10, flex: 1}}>
          <ScrollView style={{paddingLeft: 10, paddingRight: 10, flex: 1}}>
            <View
              style={{
                borderBottomColor: '#E8E6E6',
                borderBottomWidth: 1,
                borderStyle: 'dotted',
                paddingTop: 5,
                paddingBottom: 10,
                marginBottom: 10,
              }}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                {detail.newsName}
              </Text>
              <Text style={{paddingTop: 5, color: '#666666'}}>
                {global.datetime2Str(new Date(detail.createdAt))}
              </Text>
            </View>
            <HTMLView value={detail.newsContent} />
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default newsDetail;
const sty = StyleSheet.create({
  editBox: {
    width: baseStyle.screenWidth - 20,
    paddingTop: 15,
    minHeight: 200,
  },
});
