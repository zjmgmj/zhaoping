import React from 'react';
import './src/global/index';
import MainComponent from './src/page';
import './src/components/commonStyle';
import Loading from './src/components/Loading';
// import SafeAreaView from 'react-native-safe-area-view';
import {View} from 'react-native';

const App: () => React$Node = () => {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <MainComponent />
      {
        <Loading
          ref={ref => {
            global.mLoadingComponentRef = ref;
          }}
        />
      }
    </View>
    // <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
    //   <MainComponent />
    //   {
    //     <Loading
    //       ref={ref => {
    //         global.mLoadingComponentRef = ref;
    //       }}
    //     />
    //   }
    // </SafeAreaView>
  );
};

export default App;
