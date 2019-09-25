'use strict';
import React from 'react';
import {StyleSheet, View, Dimensions, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {StackActions} from 'react-navigation';

var {width, height} = Dimensions.get('window');

var background = '#486478';

var DISCLAIMER = '@AsyncStorage:disclaimerAccepted';

class Home extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);

    // var route = this.props.navigator.state.routeStack[0];
    AsyncStorage.getItem(DISCLAIMER).then(value => {
      if (value === 'true') {
        // route.disclaimerAccepted = true;
        this.state.disclaimerAccepted = true;
        console.log(
          'Recovered disclaimerAccepted state: "' +
            value +
            '". Disclaimer has been accepted.',
        );
      } else if (value) {
        // route.disclaimerAccepted = false;
        this.state.disclaimerAccepted = false;
        console.log(
          'Recovered disclaimerAccepted state: "' +
            value +
            '". Disclaimer has not been accepted.',
        );
      } else {
        // route.disclaimerAccepted = false;
        this.state.disclaimerAccepted = false;
        console.log(
          'No saved disclaimer data found. Disclaimer has not been accepted.',
        );
      }
    });

    this.state = {
      isLoading: false,
      splash: require('../../images/files/splash.png'),
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this._onEnd();
    }, 2000);
  }

  render() {
    return (
      <View style={styles.main}>
        <View style={styles.container}>
          <Image source={this.state.splash} resizeMode={'contain'} />
        </View>
      </View>
    );
  }

  _onEnd() {
    if (this.state.disclaimerAccepted) {
      this._selectLanguage();
    } else {
      this._disclaimer();
    }
  }

  _disclaimer() {
    //this.props.navigation.navigate('Disclaimer');
    const replaceAction = StackActions.replace({routeName: 'Disclaimer'});
    this.props.navigation.dispatch(replaceAction);
    //this.props.navigation.replace('Disclaimer');
  }

  _selectLanguage() {
    this.setState({
      disclaimerAccepted: 'true',
    });
    const replaceAction = StackActions.replace({routeName: 'Language'});
    this.props.navigation.dispatch(replaceAction);

    // this.props.navigation.replace('Language');
  }
}

var styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: background,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
  },
});

export default Home;
