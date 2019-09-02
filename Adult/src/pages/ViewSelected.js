/* eslint-disable react-native/no-inline-styles */
'use strict';

import React, {Fragment} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  Image,
  Alert,
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

var words = require('../../data/words.json');
var backArrow = require('../../images/files/backarrow.png');
var Sound = require('react-native-sound');

class ViewSelected extends React.Component {
  state = {items: [], feelingData: []};
  constructor(props) {
    super(props);

    var route = props.navigation.state.params;
    var items = route.items;
    var id = route.language.id;

    var sound = {
      back: id + 'back.mp3',
      bottom: id + 'bottom.mp3',
      chest: id + 'chest.mp3',
      ear: id + 'ear.mp3',
      elbow: id + 'elbow.mp3',
      eyes: id + 'eyes.mp3',
      groin: id + 'groin.mp3',
      hand: id + 'hand.mp3',
      fingers: id + 'fingers.mp3',
      knee: id + 'knee.mp3',
      lowerArm: id + 'lowerarm.mp3',
      lowerLeg: id + 'lowerleg.mp3',
      mouth: id + 'mouth.mp3',
      neck: id + 'neck.mp3',
      nose: id + 'nose.mp3',
      plaster: id + 'plaster.mp3',
      shoulder: id + 'shoulder.mp3',
      thigh: id + 'thigh.mp3',
      toes: id + 'toes.mp3',
      tummy: id + 'tummy.mp3',

      breast: id + 'breast.mp3',
      femaleGenitals: id + 'femalegenitals.mp3',
      penis: id + 'penis.mp3',
      testicles: id + 'testicles.mp3',
      heart: id + 'heart.mp3',
      ribs: id + 'ribs.mp3',
      head: id + 'head.mp3',

      numb: id + 'numb.mp3',
      hot: id + 'hot.mp3',
      cold: id + 'cold.mp3',
      tingling: id + 'tingling.mp3',
      pinsneedles: id + 'pinsneedles.mp3',
      badtaste: id + 'badtaste.mp3',
      ache: id + 'ache.mp3',
      cramps: id + 'cramps.mp3',
      itchy: id + 'itchy.mp3',
      faint: id + 'faint.mp3',
      dizzy: id + 'dizzy.mp3',
      eyeproblems: id + 'eyeproblems.mp3',
      nofeel: id + 'cannotfeel.mp3',
      drowsy: id + 'drowsy.mp3',
      sick: id + 'sick.mp3',
      pain: 'none.mp3',
    };

    var images = {
      back: require('../../images/BackThumbnail.png'),
      bottom: require('../../images/BottomThumbnail.png'),
      chest: require('../../images/ChestThumbnail.png'),
      ear: require('../../images/EarThumbnail.png'),
      elbow: require('../../images/ElbowThumbnail.png'),
      eyes: require('../../images/EyesThumbnail.png'),
      groin: require('../../images/GroinThumbnail.png'),
      hand: require('../../images/HandThumbnail.png'),
      fingers: require('../../images/FingersThumbnail.png'),
      knee: require('../../images/KneeThumbnail.png'),
      lowerArm: require('../../images/LowerArmThumbnail.png'),
      lowerLeg: require('../../images/LowerLegThumbnail.png'),
      mouth: require('../../images/MouthThumbnail.png'),
      neck: require('../../images/NeckThumbnail.png'),
      nose: require('../../images/NoseThumbnail.png'),
      plaster: require('../../images/PlasterThumbnail.png'),
      shoulder: require('../../images/ShoulderThumbnail.png'),
      thigh: require('../../images/ThighThumbnail.png'),
      toes: require('../../images/ToesThumbnail.png'),
      tummy: require('../../images/TummyThumbnail.png'),

      breast: require('../../images/adult/BreastThumbnail.png'),
      femaleGenitals: require('../../images/adult/FemaleGenitalsThumbnail.png'),
      head: require('../../images/adult/HeadThumbnail.png'),
      heart: require('../../images/adult/HeartThumbnail.png'),
      penis: require('../../images/adult/PenisThumbnail.png'),
      ribs: require('../../images/adult/RibsThumbnail.png'),
      testicles: require('../../images/adult/TesticlesThumbnail.png'),
    };

    var feelingData = route.feels;

    console.log(items);
    console.log(feelingData);

    this.state = {
      words: words,
      items: items,
      bodyPartCounter: route.bodyPartCounter,
      feelingCounter: route.feelingCounter,
      language: route.language,
      images: images,
      sound: sound,
      feelingData: feelingData,
      soundCompleted: true,
    };
  }

  render() {
    var language = this.state.language;
    var feelingCounterText =
      this.state.feelingCounter === 1
        ? this.state.feelingCounter + ' item selected'
        : this.state.feelingCounter + ' items selected';
    var bodyPartCounterText =
      this.state.bodyPartCounter === 1
        ? this.state.bodyPartCounter + ' item selected'
        : this.state.bodyPartCounter + ' items selected';

    return (
      <View style={styles.main}>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text>
              <Text style={styles.languageTitle}>Language: </Text>
              <Text style={styles.languageValue}>{language.name}</Text>
            </Text>
          </View>
          <View style={styles.lineBreak} />
          <View style={styles.textContainer}>
            <Text>
              <Text style={styles.title}>Feeling: </Text>
              <Text style={styles.languageValue}>{feelingCounterText}</Text>
            </Text>
          </View>
          <View style={styles.darkLineBreak} />
          <View style={styles.lineBreak} />
          <FlatList
            style={styles.feelingList}
            data={this.state.feelingData}
            renderItem={this._renderFeeling.bind(this)}
            renderSeparator={(sectionID, rowID) => (
              <View key={`${sectionID}-${rowID}`} style={styles.border} />
            )}
          />
          <View style={styles.lineBreak} />
          <View style={styles.darkLineBreak} />
          <View style={styles.textContainer}>
            <Text>
              <Text style={styles.title}>Where: </Text>
              <Text style={styles.languageValue}>{bodyPartCounterText}</Text>
            </Text>
          </View>
          <View style={styles.darkLineBreak} />
          <View style={styles.lineBreak} />
          <FlatList
            style={styles.bodyPartList}
            data={this.state.items}
            renderItem={this._renderRow.bind(this)}
            renderSeparator={(sectionID, rowID) => (
              <View key={`${sectionID}-${rowID}`} style={styles.border} />
            )}
          />
          <View style={styles.bottomBar}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                Alert.alert(
                  words.alerts.restartTitle,
                  words.alerts.restartText,
                  [
                    {text: 'Cancel'},
                    {
                      text: 'OK',
                      onPress: () =>
                        this.props.navigation.dispatch(StackActions.popToTop()),
                    },
                  ],
                )
              }
              onLongPress={this._playSound.bind(this, {id: 'restart'})}>
              <Text style={styles.buttonText}>Restart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  _renderFeeling({item}) {
    var language = this.state.language.id;
    var defaultStyle =
      language === 'default' ? styles.bodyPartEnglishOnly : styles.bodyPart;
    return (
      <View style={styles.row}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.navRow}
          onPress={this._selectFeeling.bind(this, item)}
          delayLongPress={150}
          onLongPress={this._playSound.bind(this, item)}>
          <View style={styles.left}>
            <Text style={defaultStyle}>{item.english}</Text>
            <Text style={styles.translation}>{item.translation}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  _selectFeeling(data) {
    var id = data.id;
    if (id !== 'pain') {
      Alert.alert(data.english, this.state.words.alerts.remove + '?', [
        {text: 'Cancel'},
        {text: 'OK', onPress: () => this._removeFeeling(data)},
      ]);
    }
  }

  _removeFeeling(data) {
    var feelingData = this.state.feelingData;
    var counter = this.state.feelingCounter;

    var id = data.id;
    if (feelingData[id]) {
      delete feelingData[id];
      counter = counter - 1;
    }

    this.setState({
      feelingData: feelingData,
      feelingCounter: counter,
      // feels: ds.cloneWithRows(feelingData),
    });

    this.props.navigator.replaceAtIndex(
      {
        id: 'HowItFeels',
        name: 'HowItFeels',
        feelingCounter: counter,
        feels: feelingData,
        language: this.state.language,
      },
      2,
      null,
    );

    this.props.navigator.replacePrevious({
      id: 'BodyParts',
      name: 'BodyParts',
      items: this.state.items,
      bodyPartCounter: this.state.bodyPartCounter,
      feelingCounter: counter,
      language: this.state.language,
      feels: feelingData,
    });
  }

  _renderRow({item}) {
    var language = this.state.language.id;
    var id = item.id;
    var image = this.state.images[id];
    var defaultStyle =
      language === 'default' ? styles.bodyPartEnglishOnly : styles.bodyPart;
    return (
      <View style={styles.row}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.navRow}
          onPress={this._selectBodyPart.bind(this, item)}
          delayLongPress={150}
          onLongPress={this._playSound.bind(this, item)}>
          <View style={styles.left}>
            <Text style={defaultStyle}>{item.english}</Text>
            <Text style={styles.translation}>{item.translation}</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image style={styles.image} resizeMode={'cover'} source={image} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  _selectBodyPart(data) {
    Alert.alert(data.english, this.state.words.alerts.remove + '?', [
      {text: 'Cancel'},
      {text: 'OK', onPress: () => this._removeItem(data)},
    ]);
  }

  _removeItem(data) {
    var counter = this.state.bodyPartCounter;
    var items = this.state.items;

    var id = data.id;
    if (items[id]) {
      delete items[id];
      counter = counter - 1;
    }

    this.setState({
      bodyPartCounter: counter,
      items: items,
      // dataSource: ds.cloneWithRows(items),
    });
    this.props.navigation.pop();
    // this.props.navigator.replacePrevious({
    //   id: 'BodyParts',
    //   name: 'BodyParts',
    //   items: items,
    //   bodyPartCounter: counter,
    //   feelingCounter: this.state.feelingCounter,
    //   language: this.state.language,
    //   feels: this.state.feels,
    // });
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
            sound.play(() => {
              this.setState({soundCompleted: true});
              sound.release();
            });
          }
        }
      });
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
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  languageTitle: {
    paddingRight: 5,
    fontFamily: 'Roboto-Bold',
    fontSize: 20.639 * ratio,
    color: 'black',
  },
  languageValue: {
    fontFamily: 'Roboto-Regular',
    fontSize: 20.639 * ratio,
    color: 'black',
  },
  title: {
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    fontFamily: 'Roboto-Regular',
    fontSize: 20.639 * ratio,
    color: 'black',
  },
  textContainer: {
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    padding: 15,
    paddingBottom: 2,
    paddingTop: 2,
  },
  navRow: {
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bodyPartEnglishOnly: {
    fontSize: 24.767 * ratio,
    color: 'black',
    fontFamily: 'Roboto-Regular',
  },
  bodyPart: {
    fontSize: 20.639 * ratio,
    color: 'black',
    fontFamily: 'Roboto-Bold',
    marginTop: 5,
  },
  translation: {
    fontSize: 20.639 * ratio,
    color: 'black',
    fontFamily: 'Roboto-Regular',
    textAlign: 'left',
    marginBottom: 5,
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
  feelingList: {
    alignSelf: 'stretch',
    flex: 2,
    backgroundColor: '#f2f2f2',
  },
  bodyPartList: {
    alignSelf: 'stretch',
    flex: 3,
    backgroundColor: '#f2f2f2',
  },
  row: {
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 5,
    marginLeft: 5,
    flex: 1,
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: grey,
    margin: 2 * ratio,
  },
  image: {
    width: 75 * ratio,
    height: 75 * ratio,
    margin: 2,
  },
  border: {
    height: 1,
    backgroundColor: grey,
    alignSelf: 'stretch',
  },
  bottomBar: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: adultLight,
  },
  button: {
    width: 90 * ratio,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: adultDark,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 3,
  },
  buttonText: {
    fontSize: 20.639 * ratio,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
  },
  counter: {
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    color: 'white',
    fontSize: 17.199 * ratio,
    backgroundColor: 'transparent',
    fontFamily: 'Roboto-Regular',
  },
});

module.exports = ViewSelected;
