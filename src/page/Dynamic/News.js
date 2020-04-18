import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {baseStyle} from '../../components/baseStyle';
import {TopviewGetInstance} from 'beeshell';

class Item extends Component {
  constructor(props) {
    super(props);
  }

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
          <TouchableOpacity
            onPress={() => {
              // this._modal.open();
              this.props.openModal();
            }}>
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
  constructor(props) {
    super(props);
    this.state = {
      commentId: '',
    };
  }
  componentDidMount() {
    TopviewGetInstance().add(
      <TouchableOpacity
        onPress={() => {
          this.props.openRelease();
        }}
        style={{position: 'absolute', bottom: 60, right: 20}}>
        <Image
          source={require('../../images/add_icon.png')}
          style={sty.addIcon}
        />
      </TouchableOpacity>,
    );
  }
  openComment() {
    TopviewGetInstance()
      .add(
        <TouchableOpacity
          style={baseStyle.fullScreenMask}
          onPress={() => {
            this.textInput.blur();
          }}>
          <View style={sty.commentInputBox}>
            <TextInput
              ref={input => {
                this.textInput = input;
              }}
              style={sty.commentInputSty}
              placeholder="评论"
              onChange={value => {
                console.log(value);
              }}
              onBlur={() => {
                TopviewGetInstance().remove(this.state.commentId);
              }}
            />
          </View>
        </TouchableOpacity>,
      )
      .then(id => {
        this.setState({
          commentId: id,
        });
        this.textInput.focus();
      });
  }
  render() {
    const list = [1, 2, 3, 4];
    return (
      <ScrollView>
        {list.map(item => {
          return (
            <Item
              key={item}
              openModal={() => {
                this.openComment();
              }}
            />
          );
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

  commentInputBox: {
    position: 'absolute',
    bottom: 0,
    width: baseStyle.screenWidth,
    backgroundColor: '#fff',
    padding: 10,
  },
  commentInputSty: {
    borderColor: '#ccc',
    borderWidth: 0.5,
    borderRadius: 0.5,
    height: 40,
  },
});
