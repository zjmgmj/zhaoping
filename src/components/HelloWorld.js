import React, { Component } from 'react';
import { AppRegistry, Text } from 'react-native';

class HelloWorld extends Component {
  render() {
    return (
      <Text>Hello World!</Text>
    );
  }
}

export default HelloWorld
// 注意，这里用引号括起来的'HelloWorldApp'必须和你 init 时创建的项目名一致
//AppRegistry.registerComponent('HelloWorld', () => HelloWorld);