import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  // SafeAreaView,
} from 'react-native';
import Header from '../../../components/Header';
import {setStatusBar} from '../../../components/setStatusBar';
import {baseStyle} from '../../../components/baseStyle';

class BenefitItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const item = this.props.item;
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.selected();
        }}
        style={[sty.benefitItem, item.active ? sty.benefitActive : null]}>
        <Text
          style={[
            baseStyle.textWhite,
            item.active ? baseStyle.textWhite : baseStyle.textBlack,
          ]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  }
}

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class SkillTags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
    };
  }
  UNSAFE_componentWillMount() {
    global.gettypelist(
      'labels',
      res => {
        console.log('labels', res);
        const selected = [];
        res.data.map(item => {
          const obj = {
            id: item.id,
            label: item.code,
            active: false,
          };
          selected.push(obj);
        });
        this.setState({
          selected: selected,
        });
      },
      err => {
        console.log(err);
      },
    );
  }
  componentDidMount() {
    const {navigation} = this.props;
    const positionBenefits = navigation.getParam('positionBenefits');
    if (positionBenefits) {
      const selected = this.state.selected;
      selected.map(item => {
        if (positionBenefits.indexOf(item.label) !== -1) {
          item.active = true;
        }
      });
      this.setState({
        selected: selected,
      });
    }
  }
  save() {
    console.log('确定');
    const selected = this.state.selected;
    const labels = [];
    selected.filter(item => {
      if (item.active) {
        labels.push(item.label);
      }
    });
    const params = {
      labels: labels.toString(),
    };
    this.props.navigation.state.params.callBack(params);
    this.props.navigation.goBack();
  }
  render() {
    return (
      <View style={[baseStyle.bgWhite, {flex: 1}]}>
        <Header
          title="技能标签"
          fullScreen
          right="确定"
          onRightPress={() => {
            this.save();
          }}
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <ScrollView style={baseStyle.paddingTop}>
          <View style={[baseStyle.row, {flexWrap: 'wrap'}]}>
            {this.state.selected.map((item, idx) => {
              return (
                <BenefitItem
                  selected={() => {
                    const selected = this.state.selected;
                    selected[idx].active = !selected[idx].active;
                    this.setState({
                      selected: selected,
                    });
                  }}
                  key={item.label}
                  item={item}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default SkillTags;
const sty = StyleSheet.create({
  benefitItem: {
    backgroundColor: '#fff',
    borderColor: '#999999',
    borderWidth: 0.5,
    width: (baseStyle.screenWidth - 80) / 3,
    marginLeft: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 10,
    paddingTop: 10,
  },
  benefitActive: {
    backgroundColor: '#D9B06F',
    borderColor: '#D9B06F',
  },
});
