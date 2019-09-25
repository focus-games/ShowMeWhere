import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  Button,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {StackActions, NavigationActions} from 'react-navigation';

var {width, height} = Dimensions.get('window');
var ratio = 1;
if (width > 500) {
  ratio = 1.5;
}
var childDark = '#496378';
var childLight = '#9DB7D5';
var adultDark = '#896d49';
var adultLight = '#C2A278';
var grey = '#D3D3D3';

var disclaimer = require('../../data/disclaimer.json');

var DISCLAIMER = '@AsyncStorage:disclaimerAccepted';

class Disclaimer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.main}>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Disclaimer</Text>
          </View>
          <View style={styles.darkLineBreak} />
          <View style={styles.lineBreak} />
          <View style={styles.container}>
            <FlatList
              bounces={false}
              style={styles.list}
              data={disclaimer}
              keyExtractor={(item, index) => index.toString()}
              renderItem={this._renderRow.bind(this)}
            />
          </View>
        </View>
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.5}
            onPress={this._acceptDisclaimer.bind(this)}>
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _renderRow({item}) {
    return (
      <View style={{padding: 5}}>
        <Text style={styles.disclaimerText}>{item.text}</Text>
      </View>
    );
  }

  _acceptDisclaimer(data) {
    AsyncStorage.setItem(DISCLAIMER, 'true');
    // this.props.navigator.state.routeStack[0].disclaimerAccepted=true;

    const replaceAction = StackActions.replace({
      routeName: 'Language',
      // action: NavigationActions.navigate
    });
    this.props.navigation.dispatch(replaceAction);

    const pushAction = StackActions.push({
      routeName: 'Help',
      params: {
        screen: 'Disclaimer',
      },
    });
    this.props.navigation.dispatch(pushAction);
    //this.props.navigation.navigate('Help');
  }
  static navigationOptions = {
    headerTitleStyle: {
      alignSelf: 'center',
      flex: 1,
      color: 'white',
      marginTop: 10 * ratio,
      marginBottom: 10 * ratio,
      textAlign: 'center',
      fontSize: 17.199 * ratio,
      fontFamily: 'AGBookRounded-Regular',
    },
    headerStyle: {backgroundColor: childLight},
    title: 'Show me where? Child',
    headerLeft: null,
  };
}

var styles = StyleSheet.create({
  navBar: {
    backgroundColor: childLight,
  },
  navTitle: {
    color: 'white',
    marginTop: 10 * ratio,
    marginBottom: 10 * ratio,
    textAlign: 'center',
    fontSize: 17.199 * ratio,
    fontFamily: 'AGBookRounded-Regular',
  },
  main: {
    flex: 1,
    paddingTop: 55,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
  },
  textContainer: {
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    padding: 15,
    paddingBottom: 5,
    paddingTop: 5,
  },
  title: {
    fontSize: 34.664 * ratio,
    color: 'black',
    fontFamily: 'Roboto-Bold',
  },
  lineBreak: {
    height: 1,
    alignSelf: 'stretch',
    backgroundColor: grey,
  },
  darkLineBreak: {
    height: 1,
    alignSelf: 'stretch',
    backgroundColor: '#a6a6a6',
  },
  list: {
    alignSelf: 'stretch',
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  row: {
    margin: 3,
    flex: 1,
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
  },
  disclaimerText: {
    fontSize: 17.199 * ratio,
    textAlign: 'left',
    fontFamily: 'Roboto-Regular',
  },
  bottomBar: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: childLight,
  },
  button: {
    width: 90 * ratio,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: childDark,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    fontSize: 20.639 * ratio,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
  },
});

export default Disclaimer;
