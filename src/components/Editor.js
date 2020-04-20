import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Platform,
  Image,
  Keyboard,
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import RNDraftView from 'react-native-draftjs-editor';
import {baseStyle} from './baseStyle';
import {selectPhotoTapped} from './SelectPhotoTapped';

const EditorToolBar = ({
  activeStyles,
  blockType,
  toggleStyle,
  toggleBlockType,
  setEditorContent,
}) => {
  return (
    <View style={styles.toolbarContainer}>
      <TouchableOpacity
        onPress={() => {
          setEditorContent('<p>zhjm</p>');
          // selectPhotoTapped({
          //   me: this,
          //   cb: res => {
          //     console.log(res);
          //     // const imgElement = <Image source={{uri: res}} />;
          //     const imgElement = `<img src="${res}" />`;
          //     setEditorContent(imgElement);
          //     // setEditorContent(imgElement);
          //   },
          // });
        }}
        style={styles.toolbarContainerItem}>
        <Image
          style={{width: 27, height: 27, resizeMode: 'contain'}}
          source={require('../images/photo_icon.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.toolbarContainerItem}>
        <Image
          style={{width: 27, height: 27, resizeMode: 'contain'}}
          source={require('../images/chat_add_icon.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styleMap = {
  STRIKETHROUGH: {
    textDecoration: 'line-through',
  },
};
const Editor = ({defaultValue, onChange}) => {
  const _draftRef = React.createRef();
  const [activeStyles, setActiveStyles] = useState([]);
  const [blockType, setActiveBlockType] = useState('unstyled');
  const [editorState, setEditorState] = useState('');

  // const defaultValue = '';

  const editorLoaded = () => {
    _draftRef.current && _draftRef.current.focus();
    // console.log('_draftRef', _draftRef.current);
  };

  const toggleStyle = style => {
    _draftRef.current && _draftRef.current.setStyle(style);
  };

  const toggleBlockType = blockType => {
    _draftRef.current && _draftRef.current.setBlockType(blockType);
  };
  useEffect(() => {
    /**
     * Get the current editor state in HTML.
     * Usually keep it in the submit or next action to get output after user has typed.
     */
    setEditorState(_draftRef.current ? _draftRef.current.getEditorState() : '');
  }, [_draftRef]);
  onChange(editorState);
  return (
    <SafeAreaView style={styles.containerStyle}>
      <View style={{flex: 1}}>
        <View style={styles.RNDraftView}>
          <RNDraftView
            style={styles.draftViewStyle}
            defaultValue={defaultValue}
            onEditorReady={editorLoaded}
            placeholder={'正文'}
            ref={_draftRef}
            onStyleChanged={setActiveStyles}
            // onStyleChanged={res => {
            //   console.log('onStyleChanged', _draftRef.current);
            // }}
            // onBlockTypeChanged={setActiveBlockType}
            styleMap={styleMap}
          />
        </View>
        <View style={styles.toolBarStyle}>
          <EditorToolBar
            activeStyles={activeStyles}
            // blockType={blockType}
            toggleStyle={toggleStyle}
            // toggleBlockType={toggleBlockType}
            setEditorContent={res => {
              // console.log(
              //   '_draftRef',
              // );
              // _draftRef.current.setEditorState(res);
              // _draftRef.current.state.editorState = '<p>123</p>';
              // _draftRef.current.setBlockType(res);
              // setEditorState(res);
            }}
          />
        </View>
        {Platform.OS === 'ios' ? <KeyboardSpacer /> : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  draftViewStyle: {
    flex: 1,
    padding: 10,
  },
  toolBarStyle: {
    flex: 1,
    position: 'absolute',
    width: baseStyle.screenWidth,
    bottom: 0,
    zIndex: 1,
  },
  toolbarContainer: {
    height: 48.5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F4',
    paddingLeft: 10,
    paddingRight: 10,
  },
  toolbarContainerItem: {
    paddingLeft: 20,
  },
  controlButtonContainer: {
    // padding: 8,
    borderRadius: 2,
  },
  RNDraftView: {
    paddingLeft: 20,
    paddingRight: 20,
    minHeight: 200,
  },
});

export default Editor;
