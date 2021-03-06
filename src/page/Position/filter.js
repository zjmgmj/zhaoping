import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Header from '../../components/Header';
import {setStatusBar} from '../../components/setStatusBar';
import {Button} from 'beeshell/dist/components/Button';
import {baseStyle} from '../../components/baseStyle';

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      educationList: [],
      salaryList: [],
      experienceList: [],
      companySizeList: [],
      financingStageList: [],
      educationId: '',
      salaryId: '',
      experienceId: '',
      companySize: '',
      financingStage: '',
      list: null,
      listObj: null,
      type: {
        experience: {
          label: '经验要求',
          prop: 'experienceId',
        },
        education: {
          label: '学历要求',
          prop: 'educationId',
        },
        salary: {
          label: '薪资待遇',
          prop: 'salaryId',
        },
        companySize: {label: '公司规模'},
        financingStage: {label: '融资阶段'},
      },
    };
  }
  UNSAFE_componentWillMount() {
    const filter = this.props.navigation.getParam('filter');
    const filterState = this.state;
    Object.assign(filterState, filter);
    this.getTypeList();
  }
  getTypeList() {
    const type = this.state.type;
    global.httpGet('dictionary/gettypealllist', {}, res => {
      const typeList = res.data;
      console.log('gettypealllist', typeList);
      const obj = {};
      const list = [];
      typeList.map(item => {
        if (!obj[item.dvalueen]) {
          obj[item.dvalueen] = {
            label: type[item.dvalueen].label,
            prop: type[item.dvalueen].prop || item.dvalueen,
            list: [],
          };
        }
        obj[item.dvalueen].list.push(item);
      });
      list.push(obj.experience);
      list.push(obj.education);
      list.push(obj.salary);
      list.push(obj.companySize);
      list.push(obj.financingStage);
      this.setState({list: list});
    });
  }
  getFilterList(key) {
    global.localStorage.get({key: key}).then(res => {
      const obj = {};
      obj[key] = JSON.parse(res);
      // this.setState(obj);
      const list = this.state.list;
      list.push(obj);
      this.setState({list: list});
    });
  }
  getDictionary(key, label, prop) {
    global.gettypelist(
      key,
      res => {
        console.log('getDictionary', res);
        const obj = {
          label: label,
          prop: prop || key,
          list: res.data,
        };
        const list = this.state.list;
        list.push(obj);
        // obj[`${key}List`] = res.data;
        this.setState({list: list});
      },
      err => {
        console.log(err);
      },
    );
  }
  render() {
    const {list} = this.state;
    if (!list) {
      return false;
    }
    return (
      <View style={{backgroundColor: '#fff', flex: 1}}>
        <Header
          title="职位筛选"
          fullScreen
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <ScrollView>
          {list.map(item => {
            return (
              <View key={item.label} style={baseStyle.content}>
                <Text style={[baseStyle.ft16, baseStyle.paddingLeft]}>
                  {item.label}
                </Text>
                <View style={[sty.flexRow]}>
                  {item.list.map(listItem => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          const obj = {};
                          if (this.state[`${item.prop}`] == listItem.id) {
                            obj[`${item.prop}`] = null;
                          } else {
                            obj[`${item.prop}`] = listItem.id;
                          }
                          this.setState(obj);
                        }}
                        key={listItem.id}>
                        <View
                          style={[
                            sty.filterItem,
                            {
                              backgroundColor:
                                this.state[`${item.prop}`] === listItem.id
                                  ? '#D9B06F'
                                  : '#fff',
                            },
                          ]}>
                          <Text
                            style={[
                              sty.itemText,
                              {
                                color:
                                  this.state[`${item.prop}`] === listItem.id
                                    ? '#fff'
                                    : '#666',
                              },
                            ]}>
                            {listItem.dvalue}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            );
          })}
          <View
            style={[
              baseStyle.row,
              baseStyle.content,
              baseStyle.justifyBetween,
              {
                borderTopColor: '#E2E1E1',
                borderTopWidth: 0.5,
                width: baseStyle.screenWidth - 20,
              },
            ]}>
            <Button
              onPress={() => {
                console.log('清除');
                this.setState({
                  educationId: '',
                  salaryId: '',
                  experienceId: '',
                  companySize: '',
                  financingStage: '',
                });
              }}
              style={[sty.subBtn, {backgroundColor: '#F3F1F1'}]}
              textStyle={{color: '#666666'}}>
              清除
            </Button>
            <Button
              onPress={() => {
                console.log('确定');
                const {
                  educationId,
                  salaryId,
                  experienceId,
                  companySize,
                  financingStage,
                } = this.state;
                const obj = {
                  educationId,
                  salaryId,
                  experienceId,
                  companySize,
                  financingStage,
                };
                this.props.navigation.state.params.callBack(obj);
                this.props.navigation.goBack();
              }}
              style={[sty.subBtn, {backgroundColor: '#D9B06F', flex: 1}]}
              textStyle={{color: '#fff'}}>
              确定
            </Button>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Filter;

const sty = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignContent: 'center',
    flexWrap: 'wrap',
  },
  filterItem: {
    width: (baseStyle.screenWidth - 90) / 3,
    height: 30,
    borderColor: '#999999',
    borderRadius: 5,
    borderWidth: 0.5,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 15,
    marginRight: 10,
    marginLeft: 10,
  },
  itemText: {
    textAlign: 'center',
  },
  itemActive: {
    backgroundColor: '#D9B06F',
    color: '#fff',
  },
  subBtn: {
    height: 40,
    marginLeft: 10,
    borderRadius: 3,
  },
});
