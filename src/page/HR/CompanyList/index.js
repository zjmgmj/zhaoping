import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  // SafeAreaView,
} from 'react-native';
import {Button} from 'beeshell/dist/components/Button';
import Header from '../../../components/Header';
import {setStatusBar} from '../../../components/setStatusBar';
import {baseStyle} from '../../../components/baseStyle';
import {Iconright} from '../../../iconfont/Iconright';
import Picker from '../../../components/picker';
import {TopviewGetInstance} from 'beeshell';

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class CompanyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        page: 1,
        size: 10,
        userId: '',
      },
      userId: '',
      companyList: [],
    };
  }
  UNSAFE_componentWillMount() {
    global.localStorage.get({key: 'currentUser'}).then(res => {
      this.setState({
        userId: res.userId,
      });
      this.getCompanyList();
    });
  }
  delCompany(id) {
    console.log('---');
    global.httpGet(
      'company/delete',
      {id: id},
      res => {
        console.log('delCompany', res);
        if (res.code === 1) {
          this.getCompanyList();
        }
      },
      err => {
        console.log(err);
      },
    );
  }
  getCompanyList() {
    console.log('---');
    const params = this.state.params;
    params.userId = this.state.userId;
    global.httpGet(
      'company/list',
      params,
      res => {
        this.setState({
          companyList: res.data.result,
        });
      },
      err => {
        console.log(err);
      },
    );
  }
  selectedCompany(item) {
    if (item.defaultis === 1) {
      return false;
    }
    item.defaultis = 1;
    global.httpPost('company/update', item, res => {
      if (res.code === 1) {
        this.getCompanyList();
      }
    });
  }
  render() {
    const radioNullImg = require('../../../images/no_check_icon.png');
    const radioCheckImg = require('../../../images/radio_check_icon.png');
    const list = this.state.companyList;
    return (
      <View style={[baseStyle.bgWhite, {flex: 1}]}>
        <Header
          title="企业列表"
          fullScreen
          right="添加企业"
          onRightPress={() => {
            this.props.navigation.navigate('AddCompany', {
              callBack: () => {
                console.log('callBack');
                this.getCompanyList();
              },
            });
          }}
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <ScrollView style={baseStyle.content}>
          {list.map(item => {
            return (
              <View
                key={item}
                style={[
                  baseStyle.borderBottom,
                  baseStyle.paddingBottom,
                  baseStyle.paddingTop,
                ]}>
                <Text style={baseStyle.ft15}>{item.name}</Text>
                <View
                  style={[
                    baseStyle.justifyBetween,
                    baseStyle.row,
                    baseStyle.paddingTop,
                  ]}>
                  <TouchableOpacity
                    onPress={() => {
                      this.selectedCompany(item);
                    }}
                    style={baseStyle.row}>
                    <Image
                      style={sty.checkImg}
                      source={item.defaultis ? radioCheckImg : radioNullImg}
                    />
                    <Text style={{marginLeft: 10}}>默认公司</Text>
                  </TouchableOpacity>
                  <View style={baseStyle.row}>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate('AddCompany', {
                          id: item.id,
                          callBack: () => {
                            this.getCompanyList();
                          },
                        });
                        return false;
                      }}>
                      <Text style={baseStyle.textYellow}>编辑</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.delCompany(item.id);
                        return false;
                      }}
                      style={baseStyle.paddingLeft}>
                      <Text style={baseStyle.textYellow}>删除</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

export default CompanyList;
const sty = StyleSheet.create({});
