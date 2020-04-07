import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  // SafeAreaView,
} from 'react-native';
import {TextInputLayout} from 'rn-textinputlayout';
import Header from '../../components/Header';
import {setStatusBar} from '../../components/setStatusBar';
import {baseStyle} from '../../components/baseStyle';
import {Iconright} from '../../iconfont/Iconright';
// import Datepicker from 'beeshell/dist/components/Datepicker';
import {Scrollpicker, Datepicker, BottomModal} from 'beeshell';

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class ProjectExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
    };
  }
  renderSafeArea() {
    return (
      <View style={{maxHeight: 30}}>
        <View style={{flex: 1}}>
          <View style={{height: 60}} />
        </View>
      </View>
    );
  }
  render() {
    const iconRightFontColor = '#666666';
    const hintColor = '#333';
    return (
      <View style={[baseStyle.bgWhite, {flex: 1}]}>
        <Header
          title="项目经历"
          right="保存"
          fullScreen
          onRightPress={() => {
            console.log('保存');
          }}
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <ScrollView style={baseStyle.content}>
          <View style={sty.inputBox}>
            <TextInputLayout
              hintColor={hintColor}
              focusColor={iconRightFontColor}
              style={sty.inputLayout}>
              <TextInput
                defaultValue="参与的项目名称"
                style={sty.textInput}
                placeholder={'项目名称'}
              />
            </TextInputLayout>
            <Iconright color={iconRightFontColor} style={sty.Iconright} />
          </View>
          <View style={sty.inputBox}>
            <TextInputLayout
              hintColor={hintColor}
              focusColor={iconRightFontColor}
              style={sty.inputLayout}>
              <TextInput
                defaultValue="人力资源经理"
                style={sty.textInput}
                placeholder={'职位名称'}
              />
            </TextInputLayout>
            <Iconright color={iconRightFontColor} style={sty.Iconright} />
          </View>

          <View style={sty.inputBox}>
            <View>
              <Text style={[baseStyle.textGray, baseStyle.ft12]}>项目时间</Text>
              <TouchableOpacity
                onPress={() => {
                  this.dateModal.open();
                }}
                style={[baseStyle.row, baseStyle.paddingTop]}>
                <Text style={baseStyle.ft15}>开始时间</Text>
                <Text
                  style={[
                    baseStyle.ft15,
                    baseStyle.paddingLeft,
                    baseStyle.paddingRight,
                  ]}>
                  -
                </Text>
                <Text style={baseStyle.ft15}>结束时间</Text>
              </TouchableOpacity>
            </View>
            <Iconright color={iconRightFontColor} style={sty.Iconright} />
          </View>
          <View style={sty.inputBox}>
            <TextInputLayout
              hintColor={hintColor}
              focusColor={iconRightFontColor}
              style={sty.inputLayout}>
              <TextInput
                defaultValue="1 我任职于该公司人力资源经理职位，在职期间负
                责制定公司人力资源规划、组织设计、岗位职责设
                计，并根据公司发展不断完善、优化；
                2、建立并不断完善公司人力资源管理系统，解决
                引进人、培养人和留人涉及的相关问题；"
                style={sty.multiTextInput}
                placeholder={'项目描述'}
                multiline
              />
            </TextInputLayout>
            <Iconright color={iconRightFontColor} style={sty.Iconright} />
          </View>
        </ScrollView>
        <BottomModal
          ref={c => {
            this.dateModal = c;
          }}
          title="请选择日期"
          cancelable={true}>
          <View style={{paddingVertical: 15}}>
            <Datepicker
              style={{paddingHorizontal: 50}}
              proportion={[1, 1, 1]}
              startYear={2010}
              numberOfYears={10}
              date={this.state.date}
              onChange={value => {
                console.log(value);
                this.setState({
                  date: value,
                });
              }}
            />
          </View>
          {this.renderSafeArea()}
        </BottomModal>
        <BottomModal
          ref={c => {
            this.basicModal = c;
          }}
          title="请选择"
          cancelable={true}>
          <View style={{paddingVertical: 15}}>
            <Scrollpicker
              style={{paddingHorizontal: 0}}
              list={[['15000元/月', '10000元/月']]}
              onChange={data => {
                console.log(data);
              }}
            />
          </View>
          {this.renderSafeArea()}
        </BottomModal>
      </View>
    );
  }
}

export default ProjectExperience;
const sty = StyleSheet.create({
  authorImg: {
    width: 44,
    height: 44,
  },
  flexContentBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inforItem: {
    // paddingTop: 10,
    paddingBottom: 10,
    // height: 50,
    borderBottomColor: '#E8E7E7',
    borderBottomWidth: 1,
  },
  multiTextInput: {
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#333',
  },
  textInput: {
    fontSize: 16,
    height: 40,
    // paddingTop: 10,
    // paddingBottom: 10,
    color: '#333',
  },
  inputLayout: {
    color: '#000',
    borderBottomColor: '#E8E7E7',
  },
  Iconright: {
    position: 'absolute',
    right: 0,
    bottom: 10,
  },
  inputBox: {
    position: 'relative',
    paddingTop: 10,
  },
});
