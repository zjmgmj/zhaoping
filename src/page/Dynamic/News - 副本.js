import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  InteractionManager,
} from 'react-native';
import {baseStyle} from '../../components/baseStyle';
import {TopviewGetInstance, Input} from 'beeshell';

class Item extends Component {
  constructor(props) {
    super(props);
    this.focus = this.focus.bind(this);
    this.state = {
      commentId: '',
    };
  }
  focus() {
    // 直接使用原生 API 使 text 输入框获得焦点
    this.textInput.focus();
  }
  openComment = () => {
    console.log('openComment');
    TopviewGetInstance()
      .add(
        <TouchableOpacity
          onPress={() => {
            TopviewGetInstance.remove(this.state.commentId);
          }}>
          <View style={sty.fullScreenMask}>
            <Input
              ref={input => {
                this.textInput = input;
              }}
              style={{position: 'absolute', flex: 1, bottom: 0}}
              value={''}
              placeholder="请输入地址"
              onChange={value => {
                console.log(value);
              }}
            />
          </View>
        </TouchableOpacity>,
      )
      .then(id => {
        this.focus;
        this.setState({
          commentId: id,
        });
        // InteractionManager.runAfterInteractions(() => {
        //   this.focus;
        //   this.setState({
        //     commentId: id,
        //   });
        // });
      });
  };
  render() {
    return (
      <View style={sty.itemBox}>
        <View style={baseStyle.row}>
          <Image
            source={require('../../images/author.png')}
            style={sty.authorImg}
          />
          <View style={baseStyle.paddingLeft}>
            <Text style={baseStyle.textBlack}>赵文玉</Text>
            <Text style={[baseStyle.textGray, baseStyle.ft12]}>
              今天 12：30
            </Text>
          </View>
        </View>
        <View style={baseStyle.paddingTop}>
          <Text>
            没有计划，就像无头苍蝇一样，到处乱撞还没有结
            果。学习也是一样，之前指定的学习计划，HTML
            +CSS+JS+BOOTSTRAP+VUE+DEDE，要重新捡起来，每天学习点，积累点进步点。
          </Text>
          <View style={[baseStyle.row]}>
            <Image
              style={[sty.itemImg]}
              source={require('../../images/md-duran-1410885-unsplash.png')}
            />
            <Image
              style={[sty.itemImg]}
              source={require('../../images/md-duran-1410885-unsplash.png')}
            />
            <Image
              style={[sty.itemImg]}
              source={require('../../images/md-duran-1410885-unsplash.png')}
            />
          </View>
        </View>
        <View style={sty.optionSty}>
          <View style={[baseStyle.relation, {marginRight: 20}]}>
            <Image
              source={require('../../images/zan_active_icon.png')}
              style={sty.iconImg}
            />
            <View style={sty.iconNum}>
              <Text>23</Text>
            </View>
          </View>
          <TouchableOpacity onPress={this.openComment}>
            <View style={{marginRight: 10}}>
              <Image
                source={require('../../images/pl_icon.png')}
                style={sty.iconImg}
              />
              <View style={sty.iconNum}>
                <Text>78</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default class News extends Component {
  componentDidMount() {
    TopviewGetInstance().add(
      <View style={{position: 'absolute', bottom: 60, right: 20}}>
        <Image
          source={require('../../images/add_icon.png')}
          style={sty.addIcon}
        />
      </View>,
    );
  }
  render() {
    const list = [1, 2, 3, 4];
    return (
      <ScrollView>
        {list.map(item => {
          return <Item key={item} />;
        })}
      </ScrollView>
    );
  }
}

const sty = StyleSheet.create({
  authorImg: {
    width: 40,
    height: 40,
  },
  itemBox: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  itemImg: {
    flex: 1,
    resizeMode: 'contain',
    margin: 5,
  },
  optionSty: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  iconImg: {
    width: 24,
    height: 24,
  },
  iconNum: {
    position: 'absolute',
    right: -10,
    top: -10,
  },
  addIcon: {
    width: 55,
    height: 55,
    resizeMode: 'contain',
  },
  fullScreenMask: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .3)',
    alignItems: 'center',
  },
});
