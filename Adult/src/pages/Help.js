/* eslint-disable react-native/no-inline-styles */
'use strict';

import React, {Fragment} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Swiper from 'react-native-swiper';

var {width, height} = Dimensions.get('window');
var ratio = 1;
if (width > 500) {
  ratio = 1.5;
}

var NAME = '@AsyncStorage:name';

var childDark = '#496378';
var childLight = '#9DB7D5';
var adultDark = '#896d49';
var adultLight = '#C2A278';
var grey = '#D3D3D3';
const styles = StyleSheet.create({
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
    fontFamily: 'AGBookRounded-Regular',
    fontSize: 17.199 * ratio,
  },
  main: {
    flex: 1,
    paddingTop: 55,
    backgroundColor: 'white',
  },
  wrapper: {
    // flex: 1,
    // width: width,
  },
  container: {
    flex: 1,
    width: width,
    alignItems: 'flex-start',
  },
  textContainer: {
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    padding: 15,
    paddingBottom: 5,
    paddingTop: 5,
  },
  scroll: {
    alignSelf: 'stretch',
    padding: 15,
    paddingBottom: 5,
    paddingTop: 5,
    flex: 1,
  },
  title: {
    fontSize: 29.72 * ratio,
    color: 'black',
    fontFamily: 'Roboto-Bold',
  },
  lineBreak: {
    height: 1,
    width: width,
    backgroundColor: grey,
  },
  darkLineBreak: {
    height: 1,
    alignSelf: 'stretch',
    backgroundColor: '#a6a6a6',
  },
  content: {
    color: 'black',
    fontFamily: 'Roboto-Regular',
    fontSize: 24.767 * ratio,
    marginTop: 5,
    marginBottom: 15,
  },
  URL: {
    color: adultDark,
    fontFamily: 'Roboto-Bold',
    fontSize: 24.767 * ratio,
    marginTop: 5,
    marginBottom: 15,
  },
  textBox: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: 50 * ratio,
    borderWidth: 4 * ratio,
    color: adultDark,
    marginBottom: 10,
    paddingLeft: 5,
    fontSize: 24.767 * ratio,
  },
});

class Help extends React.Component {
  constructor(props) {
    super(props);

    var help = [
      {
        id: 'page1',
        title: 'Getting Started',
        line1:
          'Show me where? is used for finding the site of pain or injury in people with verbal disability or those unable to speak English.',
        line2: 'For further information visit:',
        //line3: 'www.cardiffandvaleuhb.wales.nhs.uk/show-me-where',
        line3: 'www.showmewherepain.co.uk',
        line4: '',
        line5: '',
        // line4:
        //   'Show me where? is endorsed by Cardiff and Vale University Health Board.',
        // line5: 'Copyright Cardiff and Vale UHB 2011',
      },
      {
        id: 'page2',
        title: 'Select Language',
        line1: 'English and an additional language may be selected.',
        line2: 'Text will be translated into the chosen language.',
        line3: 'Press and hold text to activate translation audio.',
      },
      {
        id: 'page3',
        title: 'Personalise App',
        line1: 'Hello, my name is: ',
        line2:
          "Enter your name to enable a personalised greeting in your patient's language.",
      },
      {
        id: 'page4',
        title: 'Patient Selection',
        line1: 'Swipe left or right to navigate through body parts.',
        line2: 'Indicate patient selection by tapping the checkbox.',
        line3: "Press 'Results' to view all selections that have been made.",
      },
      {
        id: 'page5',
        title: 'Other Information',
        line1:
          'Show me where? is endorsed by Cardiff and Vale University Health Board.',
        line2: 'Copyright Cardiff and Vale UHB 2011',
        line3: 'Show me where? is licensed exclusively to Focus Games Ltd.',
        line4: 'www.focusgames.com',
        line5: 'Further information email: info@focusgames.com',
      },
    ];

    this.state = {
      help: help,
    };
  }

  componentDidMount() {
    this._loadInitialState().done();
  }

  async _loadInitialState() {
    AsyncStorage.getItem(NAME).then(value => {
      if (value) {
        this.setState({text: value});
      }
    });
  }

  onScroll(event) {
    var currentpage = event.nativeEvent.position;
    this.setState({
      currentPage: currentpage,
    });
  }

  render() {
    var help = this.state.help;
    return (
      <View style={styles.main}>
        <View style={styles.container}>
          <Swiper
            style={styles.wrapper}
            dot={
              <View
                style={{
                  backgroundColor: '#999999',
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  marginLeft: 6,
                  marginRight: 6,
                  marginBottom: 20,
                }}
              />
            }
            activeDot={
              <View
                style={{
                  backgroundColor: 'black',
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  marginLeft: 4,
                  marginRight: 4,
                  marginBottom: 20,
                }}
              />
            }
            width={width}
            paginationStyle={{bottom: 50}}
            loop={false}>
            {help.map(data => this._renderPage(data))}
          </Swiper>
          <View style={styles.bottomPadding} />

          {/* <ViewPagerAndroid
            onPageSelected={this.onScroll.bind(this)}
            style={styles.wrapper}>
            {help.map(data => this._renderPage(data))}
          </ViewPagerAndroid>
          <PageControl
            style={{height: 10, padding: 15, alignSelf: 'center'}}
            numberOfPages={4}
            currentPage={this.state.currentPage}
            hidesForSinglePage={true}
            pageIndicatorTintColor="#999999"
            indicatorSize={{width: 6 * ratio, height: 6 * ratio}}
            indicatorStyle={{marginLeft: 6 * ratio, marginRight: 6 * ratio}}
            currentIndicatorStyle={{
              width: 8 * ratio,
              height: 8 * ratio,
              borderRadius: 4 * ratio,
              marginLeft: 4 * ratio,
              marginRight: 4 * ratio,
            }}
            currentPageIndicatorTintColor="black"
          /> */}
        </View>
      </View>
    );
  }

  _renderPage(data) {
    var lines = (
      <ScrollView bounces={false} style={styles.scroll}>
        <Text style={styles.content}>{data.line1}</Text>
        <Text style={styles.content}>{data.line2}</Text>
        <Text style={styles.content}>{data.line3}</Text>
      </ScrollView>
    );
    switch (data.id) {
      case 'page3':
        lines = (
          <ScrollView bounces={false} style={styles.scroll}>
            <Text style={styles.content}>{data.line1}</Text>
            <TextInput
              style={styles.textBox}
              onChangeText={text => {
                this.setState({text});
                AsyncStorage.setItem(NAME, text);
              }}
              autoCapitalize={'words'}
              maxLength={20}
              selectionColor={adultLight}
              underlineColorAndroid={adultDark}
              value={this.state.text}
            />
            <Text style={styles.content}>{data.line2}</Text>
          </ScrollView>
        );
        break;
      case 'page1':
        lines = (
          <ScrollView bounces={false} style={styles.scroll}>
            <Text style={styles.content}>{data.line1}</Text>
            <Text style={styles.content}>{data.line2}</Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={this._PressURL.bind(this)}>
              <Text style={styles.URL}>{data.line3}</Text>
            </TouchableOpacity>
            <Text style={styles.content}>{data.line4}</Text>
            <Text style={styles.content}>{data.line5}</Text>
          </ScrollView>
        );
        break;
      case 'page5':
        lines = (
          <ScrollView bounces={false} style={styles.scroll}>
            <Text style={styles.content}>{data.line1}</Text>
            <Text style={styles.content}>{data.line2}</Text>
            <Text style={styles.content}>{data.line3}</Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={this._PressURL1.bind(this)}>
              <Text style={styles.URL}>{data.line4}</Text>
            </TouchableOpacity>
            <Text style={styles.content}>{data.line5}</Text>
          </ScrollView>
        );
        break;
    }

    return (
      <View style={styles.container} key={data.id}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{data.title}</Text>
        </View>
        <View style={styles.darkLineBreak} />
        <View style={styles.lineBreak} />
        {lines}
      </View>
    );
  }

  _PressURL() {
    var url = 'http://www.showmewherepain.co.uk'; //'http://www.cardiffandvaleuhb.wales.nhs.uk/show-me-where';
    Linking.openURL(url);
  }
  _PressURL1() {
    var url = 'http://www.focusgames.com';
    Linking.openURL(url);
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
      headerLeft: null,
      headerRight: (
        <TouchableOpacity
          style={{flex: 1, justifyContent: 'center'}}
          onPress={() => {
            navigation.pop();
          }}>
          <Text style={styles.navButton}>Close</Text>
        </TouchableOpacity>
      ),
    };
  };
}

module.exports = Help;
