import React, {Fragment} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {StackActions} from 'react-navigation';
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

var languages1 = require('../../data/languages.json');
var leftArrow = require('../../images/files/leftarrow.png');
var Sound = require('react-native-sound');

class Language extends React.Component {
  constructor(props) {
    super(props);

    var sound = {
      arabic: 'arabiclanguage.mp3',
      bengali: 'bengalilanguage.mp3',
      polish: 'polishlanguage.mp3',
      somali: 'somalilanguage.mp3',
      urdu: 'urdulanguage.mp3',
      welsh: 'welshlanguage.mp3',
    };

    this.state = {
      soundCompleted: true,
      sound: sound,
    };
  }

  render() {
    var english = {
      name: 'English Only',
      english: 'English Only',
      translation: '',
      id: 'default',
    };
    return (
      <View style={styles.main}>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Language Selection</Text>
          </View>
          <View style={styles.darkLineBreak} />
          <View style={styles.lineBreak} />
          <View style={{alignSelf: 'stretch', height: 40}}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.whiteRow}
              onPress={this._selectLanguage.bind(this, english)}
              delayLongPress={200}
              onLongPress={this._playSound.bind(this, english)}>
              <Text style={styles.listEnglish}>English Only</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.lineBreak} />
          <View style={styles.darkLineBreak} />
          <View style={styles.textContainer}>
            <Text style={styles.additional}>
              Or choose an additional language
            </Text>
          </View>
          <View style={styles.darkLineBreak} />
          <View style={styles.lineBreak} />
          <FlatList
            bounces={false}
            style={styles.list}
            data={languages1}
            renderItem={this._renderRow.bind(this)}
            keyExtractor={(item, index) => index.toString()}
            renderSeparator={(sectionID, rowID) => (
              <View key={`${sectionID}-${rowID}`} style={styles.border} />
            )}
          />
        </View>
      </View>
    );
  }
  _renderRow({item}) {
    var rowStyle = item.shading ? styles.greyRow : styles.whiteRow;
    var pipingStyle = item.shading ? styles.whitePiping : styles.greyPiping;
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.5}
          style={rowStyle}
          onPress={this._selectLanguage.bind(this, item)}
          delayLongPress={200}
          onLongPress={this._playSound.bind(this, item)}>
          <Text style={styles.listEnglish}>{item.english}</Text>
          <Text style={pipingStyle}>|</Text>
          <Text style={styles.listTranslation}>{item.translation}</Text>
        </TouchableOpacity>
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

  _selectLanguage(data) {
    const pushAction = StackActions.push({
      routeName: 'InPain',
      params: {language: data},
    });
    this.props.navigation.dispatch(pushAction);
  }
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Show me where? Child',
      headerStyle: {backgroundColor: childLight},
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
      headerLeft: null,
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
    backgroundColor: childLight,
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
  textContainer: {
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    padding: 15,
    paddingBottom: 5,
    paddingTop: 5,
  },
  title: {
    fontSize: 24.767 * ratio,
    color: 'black',
    fontFamily: 'Roboto-Bold',
  },
  additional: {
    fontSize: 24.767 * ratio,
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
  },
  whiteRow: {
    flexDirection: 'row',
    height: 45 * ratio,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'white',
    paddingTop: 3,
    paddingBottom: 3,
  },
  greyRow: {
    flexDirection: 'row',
    height: 45 * ratio,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#f3f3f3',
    paddingTop: 3,
    paddingBottom: 3,
  },
  listEnglish: {
    flex: 4,
    fontSize: 24.767 * ratio,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
    color: childDark,
    fontWeight: 'bold',
  },
  listTranslation: {
    flex: 4,
    fontSize: 24.767 * ratio,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
    color: childDark,
  },
  whitePiping: {
    fontSize: 35.664 * ratio,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
    color: 'white',
    marginBottom: 7 * ratio,
  },
  greyPiping: {
    fontSize: 35.664 * ratio,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
    color: '#f3f3f3',
    marginBottom: 7 * ratio,
  },
  border: {
    height: 1,
    backgroundColor: grey,
    alignSelf: 'stretch',
  },
});
export default Language;
