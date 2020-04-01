import React from 'react';
import './src/global/index';
import MainComponent from './src/page';
import './src/components/commonStyle';
//import SafeAreaView from 'react-native-safe-area-view';

const App: () => React$Node = () => {
  return (
    <MainComponent />
    // <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
    //   <MainComponent />
    // </SafeAreaView>
  );
};

export default App;
