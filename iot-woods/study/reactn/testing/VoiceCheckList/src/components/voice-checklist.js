import React, { Component } from 'react';
import { AppRegistry, Navigator, BackAndroid, StatusBar } from 'react-native';
import HelpWindow from './help';
import MainPage from './main';

let _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator.getCurrentRoutes().length === 1) {
    return false;
  }
  _navigator.pop();
  return true;
});

class VoiceCheckList extends Component {

  render() {
    return (
      <Navigator
        initialRoute={{ id: 'mainPage' }}
        renderScene={this.navigatorRenderScene}
      />
    );
  }
  navigatorRenderScene(route, navigator) {
    _navigator = navigator;
    switch (route.id) {
      case 'mainPage':
        return (<MainPage navigator={navigator} />);
      case 'helpWindow':
        return (<HelpWindow navigator={navigator} />);

    }
  }
}

AppRegistry.registerComponent('VoiceCheckList', () => VoiceCheckList);

