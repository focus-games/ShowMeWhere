import React, {Fragment} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Navigator,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {StackActions} from 'react-navigation';

var {width, height} = Dimensions.get('window');
var ratio = 1;
if (width > 500) {
  ratio = 1.5;
}
var childDark = '#496378';
var childLight = '#9DB7D5';
var childPiping = '#6f89a2';
var adultDark = '#896d49';
var adultLight = '#C2A278';
var adultPiping = '#A68860';
var grey = '#D3D3D3';

var words = require('../../data/words.json');
var Sound = require('react-native-sound');
var backArrow = require('../../images/files/backarrow.png');

var NAME = '@AsyncStorage:name';

class InPain extends React.Component {
  constructor(props) {
    super(props);

    //var route = .state.routeStack[1];
    var id = props.navigation.state.params.language.id;

    var sound = {
      greeting: id + 'greeting.mp3',
      inPain: id + 'inpain.mp3',
      yes: id + 'yes.mp3',
      no: id + 'no.mp3',
    };

    var greeting = {
      english: words.greeting.english,
      translation: words.greeting[id],
    };

    this.state = {
      words: words,
      language: props.navigation.state.params.language,
      sound: sound,
      soundCompleted: true,
      greeting: greeting,
      name: '',
      painTranslation: words.pain[id],
    };
  }

  componentDidMount() {
    this._loadInitialState().done();
  }

  async _loadInitialState() {
    AsyncStorage.getItem(NAME).then(value => {
      if (value) {
        var greeting = this.state.greeting;
        var english = greeting.english.replace('MYNAME', value);
        var language = this.state.language;
        var translation = '';
        if (language.id !== 'default') {
          translation = greeting.translation.replace('MYNAME', value);
        }
        var replace = {english: english, translation: translation};
        this.setState({
          name: value,
          greeting: replace,
        });
      }
    });
  }

  render() {
    var language = this.state.language.id;
    var hello = this.state.greeting;
    var name =
      this.state.name == '' ? (
        <View style={{height: 1}} />
      ) : (
        <View style={{alignSelf: 'stretch'}}>
          <TouchableOpacity
            activeOpacity={0.5}
            delayLongPress={150}
            onLongPress={this._playSound.bind(this, {id: 'greeting'})}
            style={{alignSelf: 'stretch'}}>
            <Text style={styles.greeting1}>{hello.english}</Text>
            <Text style={styles.greeting2}>{hello.translation}</Text>
          </TouchableOpacity>
          <View style={styles.darkLineBreak} />
          <View style={styles.lineBreak} />
          <View style={{margin: 5 * ratio}} />
          <View style={styles.lineBreak} />
          <View style={styles.darkLineBreak} />
        </View>
      );

    var buttons =
      language == 'default' ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={this._onButtonPressed.bind(this, true)}
            delayLongPress={200}
            onLongPress={this._playSound.bind(this, {id: 'yes'})}>
            <Text style={styles.buttonEnglishOnly}>
              {this.state.words.yes.english}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={this._onButtonPressed.bind(this, false)}
            delayLongPress={200}
            onLongPress={this._playSound.bind(this, {id: 'no'})}>
            <Text style={styles.buttonEnglishOnly}>
              {this.state.words.no.english}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={this._onButtonPressed.bind(this, true)}
            delayLongPress={200}
            onLongPress={this._playSound.bind(this, {id: 'yes'})}>
            <Text style={styles.buttonEnglish}>
              {this.state.words.yes.english}
            </Text>
            <Text style={styles.piping}>|</Text>
            <Text style={styles.buttonTranslation}>
              {this.state.words.yes[language]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={this._onButtonPressed.bind(this, false)}
            delayLongPress={200}
            onLongPress={this._playSound.bind(this, {id: 'no'})}>
            <Text style={styles.buttonEnglish}>
              {this.state.words.no.english}
            </Text>
            <Text style={styles.piping}>|</Text>
            <Text style={styles.buttonTranslation}>
              {this.state.words.no[language]}
            </Text>
          </TouchableOpacity>
        </View>
      );

    return (
      <View style={styles.main}>
        <View style={styles.container}>
          {name}
          <TouchableOpacity
            activeOpacity={0.5}
            delayLongPress={150}
            onLongPress={this._playSound.bind(this, {id: 'inPain'})}
            style={styles.textContainer}>
            <Text style={styles.title}>{this.state.words.inPain.english}</Text>
            <Text style={styles.translation}>
              {this.state.words.inPain[language]}
            </Text>
          </TouchableOpacity>
          <View style={styles.darkLineBreak} />
          <View style={styles.lineBreak} />
          {buttons}
        </View>
      </View>
    );
  }

  _playSound(data) {
    if (this.state.soundCompleted) {
      var id = data.id;
      var name = this.state.sound[id];
      var sound = new Sound(name, Sound.MAIN_BUNDLE, error => {
        if (!error) {
          // loaded successfully
          if (sound.isLoaded()) {
            this.setState({soundCompleted: false});
            sound.play(success => {
              this.setState({soundCompleted: true});
              sound.release();
            });
          }
        }
      });
    }
  }

  _onButtonPressed(inPain) {
    if (inPain) {
      const pushAction = StackActions.push({
        routeName: 'BodyParts',
        params: {
          language: this.state.language,
          items: {},
          feels: {
            pain: {
              id: 'pain',
              english: 'Pain',
              translation: this.state.painTranslation,
            },
          },
          bodyPartCounter: 0,
          feelingCounter: 1,
        },
      });
      this.props.navigation.dispatch(pushAction);
    } else {
      const pushAction = StackActions.push({
        routeName: 'HowItFeels',
        params: {
          feels: {},
          feelingCounter: 0,
          language: this.state.language,
        },
      });
      this.props.navigation.dispatch(pushAction);
    }
  }
  static navigationOptions = ({navigation}) => {
    return {
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
      headerStyle: {backgroundColor: adultLight},
      title: 'Show me where? Adult',
      headerLeft: (
        <TouchableOpacity
          style={{flex: 1, alignItems: 'center', flexDirection: 'row'}}
          onPress={() => navigation.pop()}>
          <Image
            source={backArrow}
            resizeMode={'contain'}
            style={styles.navButton}
          />
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity
          style={{flex: 1, justifyContent: 'center'}}
          onPress={() => {
            navigation.push('Help');
          }}>
          <Text style={styles.navButton}>Help</Text>
        </TouchableOpacity>
      ),
    };
  };
}

var styles = StyleSheet.create({
  navBar: {
    backgroundColor: adultLight,
  },
  navButton: {
    color: 'white',
    margin: 10 * ratio,
    fontFamily: 'Roboto-Regular',
    fontSize: 14.333 * ratio,
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
  left: {
    flex: 1,
  },
  textContainer: {
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    padding: 15,
    paddingBottom: 5,
    paddingTop: 5,
  },
  greeting1: {
    alignSelf: 'flex-start',
    margin: 15,
    marginBottom: 0,
    marginTop: 5,
    fontSize: 24.767 * ratio,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
  },
  greeting2: {
    alignSelf: 'flex-start',
    margin: 15,
    marginBottom: 6,
    marginTop: 0,
    fontSize: 24.767 * ratio,
    color: 'black',
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 24.767 * ratio,
    color: 'black',
    fontFamily: 'Roboto-Bold',
  },
  translation: {
    fontSize: 24.767 * ratio,
    color: 'black',
    fontFamily: 'Roboto-Regular',
    textAlign: 'left',
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
  buttonContainer: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    flex: 1,
    paddingLeft: 15 * ratio,
  },
  buttonEnglishOnly: {
    flex: 1,
    fontSize: 24.767 * ratio,
    margin: 10,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
  },
  buttonEnglish: {
    flex: 1,
    fontSize: 24.767 * ratio,
    paddingBottom: 0,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
  },
  buttonTranslation: {
    flex: 1,
    fontSize: 24.767 * ratio,
    paddingBottom: 0,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
  },
  piping: {
    fontSize: 35.664 * ratio,
    marginBottom: 5 * ratio,
    color: adultPiping,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
  },
  button: {
    flexDirection: 'row',
    width: width - 30 * ratio,
    paddingLeft: 7,
    paddingRight: 7,
    backgroundColor: adultDark,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
  },
});

module.exports = InPain;
