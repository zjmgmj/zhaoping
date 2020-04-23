import React, {Component} from 'react';
import {Picker} from 'react-native';

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  // UNSAFE_componentWillMount() {
  //   this.props.ref(this);
  // }
  open() {
    this.setState({
      show: true,
    });
  }
  close() {
    this.setState({
      show: false,
    });
  }
  render() {
    const list = this.props.list;
    return this.state.show ? (
      <Picker
        selectedValue={this.state.language}
        style={{
          height: 50,
          width: 100,
        }}
        onValueChange={
          (itemValue, itemIndex) => console.log('itemValue', itemValue)
          // this.setState({language: itemValue})
        }>
        {list.map(item => {
          return <Picker.Item label={item.label} value={item.value} />;
        })}
      </Picker>
    ) : null;
  }
}
export default Select;
