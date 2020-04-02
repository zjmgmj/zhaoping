import React, {Component} from 'react';
import {NavigationBar} from 'beeshell';
export default class Head extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <NavigationBar
        title={this.props.title}
        onPressBack={() => {
          this.props.onPressBack;
        }}
        onPressForward={() => {
          this.props.onPressForward;
        }}
      />
    );
  }
}
