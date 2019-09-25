/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {BackHandler} from 'react-native';

import {createStackNavigator, createAppContainer} from 'react-navigation';
import Home from './pages/Home';
import Disclaimer from './pages/Disclaimer';
import Help from './pages/Help';
import Language from './pages/Language';
import InPain from './pages/InPain';
import HowItFeels from './pages/HowItFeels';
import BodyParts from './pages/BodyParts';
import ViewSelected from './pages/ViewSelected';

var navigator;

BackHandler.addEventListener('hardwareBackPress', () => {
  if (navigator && navigator.getCurrentRoutes().length > 1) {
    navigator.pop();
    return true;
  }
  return false;
});
const AppNavigator = createStackNavigator(
  {
    Home: Home,
    Disclaimer: Disclaimer,
    Help: Help,
    Language: Language,
    InPain: InPain,
    BodyParts: BodyParts,
    HowItFeels: HowItFeels,
    ViewSelected: ViewSelected,
  },
  {
    headerLayoutPreset: 'center',
  },
  {
    initialRouteName: 'Home',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
