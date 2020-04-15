import React, {Component} from 'react';
import {Button, View, Text, StyleSheet} from 'react-native';
import Modal, {ModalContent} from 'react-native-modals';

class ZModal extends Component {
  static defaultProps = {
    show: false,
    close: () => {},
    content: '',
  };
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Modal
        visible={this.props.show}
        onTouchOutside={() => {
          this.props.close();
        }}>
        <ModalContent>
          <Text>{this.state.content}</Text>
        </ModalContent>
      </Modal>
    );
  }
}
export default ZModal;
