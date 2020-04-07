import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {baseStyle} from './baseStyle';

export default class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderTab(name, page, isTabActive, onPressHandler) {
    return (
      <TouchableOpacity onPress={() => onPressHandler(page)}>
        <View style={[isTabActive ? styles.tabNameActive : '', styles.tabName]}>
          <Text style={baseStyle.textBlack}>{name}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.tabBarBox}>
        <View style={{flexDirection: 'row', width: 150}}>
          {this.props.tabs.map((name, page) => {
            const isTabActive = this.props.activeTab === page;
            const renderTab = this.props.renderTab || this.renderTab;
            return (
              <View key={page}>
                {renderTab(name, page, isTabActive, this.props.goToPage)}
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  tabBarBox: {
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#D8DEED',
    borderBottomWidth: 0.5,
  },
  tabName: {
    paddingTop: 20,
    paddingBottom: 10,
    marginRight: 30,
  },
  tabNameActive: {
    fontWeight: 'bold',
    borderBottomColor: '#D9B06F',
    borderBottomWidth: 2.5,
  },
});
