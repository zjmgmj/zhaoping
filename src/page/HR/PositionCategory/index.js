import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  // SafeAreaView,
} from 'react-native';
// import {Button} from './node_modules/beeshell/dist/components/Button';
import Header from '../../../components/Header';
import {setStatusBar} from '../../../components/setStatusBar';
import {baseStyle} from '../../../components/baseStyle';
import {Iconright} from '../../../iconfont/Iconright';
import {Icontick} from '../../../iconfont/Icontick';

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class PositionCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }
  componentDidMount() {
    this.getPositionType(0);
  }
  getPositionType(pid, idx = 0) {
    let list = this.state.list;
    if (pid) {
      list[idx].active = !list[idx].active;
      if (!list[idx].active) {
        this.setState({
          list: list,
          selectd: null,
        });
        return false;
      }
    }
    global.httpGet('positiontype/list', {pid: pid}, res => {
      console.log(res);
      if (pid) {
        debugger;
        list[idx].child = res.data;
      } else {
        res.data.map(item => {
          item.child = [];
        });
        list = res.data;
      }
      this.setState({
        list: list,
      });
    });
  }
  selected(pIdx, cIdx) {
    const list = this.state.list;
    list.map(item => {
      item.child.map(cItem => {
        cItem.selectd = false;
      });
    });
    list[pIdx].child[cIdx].selectd = true;
    this.setState({
      list: list,
      selectd: list[pIdx].child[cIdx],
    });
  }
  save() {
    if (!this.state.selectd) {
      return false;
    }
    this.props.navigation.state.params.callBack(this.state.selectd);
    this.props.navigation.goBack();
  }
  render() {
    const iconRightFontColor = '#D6D0D0';
    return (
      <TouchableOpacity style={[baseStyle.bgWhite, {flex: 1}]}>
        <Header
          title="职位类别"
          fullScreen
          right="确定"
          onRightPress={() => {
            console.log('确定');
            this.save();
          }}
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <ScrollView style={baseStyle.content}>
          {this.state.list.map((item, idx) => {
            return (
              <TouchableOpacity
                activeOpacity={0.5}
                key={item.id}
                onPress={() => {
                  this.getPositionType(item.id, idx);
                }}>
                <View style={[baseStyle.borderBottom, sty.inputBox]}>
                  <Text>{item.name}</Text>
                  <Iconright color={iconRightFontColor} style={sty.Iconright} />
                </View>
                {item.child.length > 0 && item.active ? (
                  <View
                    style={{
                      backgroundColor: '#FBFBFB',
                      paddingTop: 10,
                      paddingBottom: 10,
                    }}>
                    {item.child.map((childItem, childIdx) => {
                      return (
                        <TouchableOpacity
                          key={childItem.id}
                          style={sty.childItem}
                          onPress={() => {
                            this.selected(idx, childIdx);
                          }}>
                          <Text
                            style={
                              childItem.selectd
                                ? baseStyle.textYellow
                                : {color: '#666666'}
                            }>
                            {childItem.name}
                          </Text>
                          {childItem.selectd ? (
                            <Icontick color="#D9B06F" />
                          ) : null}
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                ) : null}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </TouchableOpacity>
    );
  }
}

export default PositionCategory;
const sty = StyleSheet.create({
  subBtn: {
    height: 40,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 50,
    marginBottom: 40,
    borderRadius: 3,
  },
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
  textInput: {
    fontSize: 16,
    height: 40,
    color: '#333',
  },
  inputLayout: {
    color: '#000',
    borderBottomColor: '#E8E7E7',
  },
  Iconright: {
    // position: 'absolute',
    // right: 0,
    // bottom: 10,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingBottom: 15,
  },
  textInputSty: {
    textAlign: 'right',
    width: 300,
    padding: 0,
  },
  childItem: {
    color: '#D9B06F',
    paddingBottom: 12,
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
