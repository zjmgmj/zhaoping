import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  // SafeAreaView,
} from 'react-native';
import Header from '../../../components/Header';
import {setStatusBar} from '../../../components/setStatusBar';
import {baseStyle} from '../../../components/baseStyle';
import Iconsearch from '../../../iconfont/Iconsearch';
import {Icondown} from '../../../iconfont/Icondown';

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class AddressBook extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  UNSAFE_componentWillMount() {}
  render() {
    return (
      <View style={[baseStyle.bgWhite, {flex: 1}]}>
        <Header
          title=""
          fullScreen
          isBorder={false}
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <View style={baseStyle.content}>
          <View style={[baseStyle.row, sty.searchBox]}>
            <Iconsearch />
            <TextInput
              placeholder="搜索"
              style={[baseStyle.paddingLeft, {flex: 1}]}
            />
          </View>
        </View>
        <ScrollView style={baseStyle.content}>
          <View>
            <View
              style={[
                baseStyle.row,
                baseStyle.justifyBetween,
                baseStyle.borderBottom,
              ]}>
              <View
                style={[baseStyle.row, baseStyle.justifyBetween, {flex: 1}]}>
                <View style={baseStyle.row}>
                  <Image
                    source={require('../../../images/group_icon.png')}
                    style={sty.category}
                  />
                  <Text style={baseStyle.ft16}>全部群组</Text>
                </View>
                <Icondown />
              </View>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('InfoChat');
                }}
                style={[baseStyle.borderBottom, sty.item]}>
                <Image
                  source={require('../../../images/author.png')}
                  style={sty.author}
                />
                <Text style={[baseStyle.ft16, {marginLeft: 15}]}>HR交流群</Text>
              </TouchableOpacity>
              <View style={[baseStyle.borderBottom, sty.item]}>
                <Image
                  source={require('../../../images/author.png')}
                  style={sty.author}
                />
                <Text style={[baseStyle.ft16, {marginLeft: 15}]}>HR交流群</Text>
              </View>
            </View>
          </View>
          <View style={{borderTopColor: '#FBFBFB', borderTopWidth: 5}}>
            <View
              style={[
                baseStyle.row,
                baseStyle.justifyBetween,
                baseStyle.borderBottom,
              ]}>
              <View style={baseStyle.row}>
                <Image
                  source={require('../../../images/contacts_icon.png')}
                  style={sty.category}
                />
                <Text style={baseStyle.ft16}>通讯录</Text>
              </View>
            </View>
            <View>
              <View style={[baseStyle.borderBottom, sty.item]}>
                <Image
                  source={require('../../../images/author.png')}
                  style={sty.author}
                />
                <Text style={[baseStyle.ft16, {marginLeft: 15}]}>李三德</Text>
              </View>
              <View style={[baseStyle.borderBottom, sty.item]}>
                <Image
                  source={require('../../../images/author.png')}
                  style={sty.author}
                />
                <Text style={[baseStyle.ft16, {marginLeft: 15}]}>李三德</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default AddressBook;
const sty = StyleSheet.create({
  category: {
    width: 63,
    height: 63,
    resizeMode: 'contain',
  },
  searchBox: {
    backgroundColor: '#FBF8F2',
    borderRadius: 50,
    paddingLeft: 10,
    paddingRight: 10,
  },
  author: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  item: {
    padding: 10,
    paddingLeft: 13,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
