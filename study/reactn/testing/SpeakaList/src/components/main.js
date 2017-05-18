'use strict';
import React, { Component } from 'react';
import {
  ScrollView,
  TextInput,
  Text,
  View,
  Image,
  AsyncStorage,
  TouchableOpacity,
  ToastAndroid,
  StatusBar,
  Alert,
  NativeModules
} from 'react-native';

import CheckBox from 'react-native-icon-checkbox';
import KeepAwake from 'react-native-keep-awake';
import Style from './styling';
import Button from './button';
import Button2 from './undo-button';


const speechProcessor = require('./speech-processor');

class MainPage extends Component {

  state = {
    vars: [], 
    id: 1, 
    //previousState: '', 
    input: '', 
    icontouchDisabled: false, 
    image: require('../images/mic.png')
  };

  async componentDidMount() {
    const value = await AsyncStorage.getItem('myKey');
    this.setState(JSON.parse(value));
    this.state.image = require('../images/mic.png');
    this.setState(this.state);
  }

  onEnterKeyPress(textBox) {
    if (this.state.input === '') {
    } else if (this.state.input === 'undo') {
    } else if (this.state.input.indexOf('next') !== -1) {
    } else if (this.state.input.indexOf('delete all') !== -1) {
    } else {
      this.handleTextInput(`${this.state.input}next`);
      this.refs[textBox].focus();
    }
  }
  // setPreviousState() {
  //   this.state.previousState = '';
  //   this.state.previousState = (JSON.stringify(this.state));
  // }

   setIconToCircle() {
        this.state.image = require('../images/micanim.gif');

        this.state.icontouchDisabled = true;
        this.setState(this.state);
        KeepAwake.activate();
    }

    setIconToMic() {
      this.state.image = require('../images/mic.png');

      this.state.icontouchDisabled = false;
      this.SaveDataToDisk();
      this.setState(this.state);
      KeepAwake.deactivate();
    }

    handleTextInput(userInput) {
      if (userInput === 'next') {
        this.clearDisplay('textBox');
      } else {
        this.state.input = userInput;
        const str = `${this.state.id}.` + ` ${userInput}`;

        speechProcessor.getSpeechTokens().forEach((token) => {
          if ((str.indexOf(token, str.length - token.length)) !== -1) {
            const processingFunction = speechProcessor.findProcessor(token);
            const dataString = str.substring(0, str.length - token.length);
            //console.log(`id before ${this.state.id}`);
            const settingState = processingFunction(dataString, this, this.state);
            this.state.id = settingState;
            //console.log(`id after ${this.state.id}`);
            //console.log('processing function is executed');
            this.asyncStorageresetandSave();
          }
        });
        return null;
      }
    }

    handleTextInputFromSpeechRecognizer(userInput) {
        if (userInput === 'error7') {
          this.setIconToMic();
          this.SaveDataToDisk();
          ToastAndroid.show('Listening is ended', ToastAndroid.SHORT);
         } else if (userInput === 'error1') {
          this.setIconToMic();
          this.SaveDataToDisk();
          ToastAndroid.show('Network error', ToastAndroid.SHORT);
      } else if (userInput === 'error2') {
          this.setIconToMic();
          this.SaveDataToDisk();
          ToastAndroid.show('Network error', ToastAndroid.SHORT);
      } else if (userInput === 'error4') {
          this.setIconToMic();
          this.SaveDataToDisk();
          ToastAndroid.show('Network error', ToastAndroid.SHORT);
      } else if (userInput === 'error5') {
          this.setIconToMic();
          this.SaveDataToDisk();
          ToastAndroid.show('Network error', ToastAndroid.SHORT);
      } else if (userInput === 'error8') {
          this.setIconToMic();
          this.SaveDataToDisk();
          ToastAndroid.show('Network error', ToastAndroid.SHORT);
      } else if (userInput === 'error3') {
          this.setIconToMic();
          this.SaveDataToDisk();
          ToastAndroid.show('Audio recording error', ToastAndroid.SHORT);
        } else if (userInput === 'error6') {
          this.setIconToMic();
          this.SaveDataToDisk();
          ToastAndroid.show('No speech input', ToastAndroid.SHORT);
        } else if ((userInput.indexOf('undo', userInput.length - userInput.length)) !== -1) {
          const newInput = 'undo';
          this.handleTextInput(newInput);
          this.handleSpeechInput();
          this.SaveDataToDisk();
        } else if ((userInput.indexOf('clear', userInput.length - userInput.length)) !== -1) {
          this.handleTextInput('clear');
          this.handleSpeechInput();
          this.SaveDataToDisk();
        }  else if ((userInput.indexOf('delete all', userInput.length - userInput.length)) !== -1) {
          this.handleTextInput('delete all');
          this.handleSpeechInput();
          this.SaveDataToDisk();
        } else if ((userInput.indexOf('next', userInput.length - userInput.length)) === -1) {
          const newInput = `${userInput}next`;
          this.handleTextInput(newInput);
          this.handleSpeechInput();
          this.SaveDataToDisk();
        } else {
          this.handleTextInput(userInput);
          this.SaveDataToDisk();
          this.handleSpeechInput();
        }
      }

    async handleSpeechInput() {
      this.setIconToCircle();
      NativeModules.ListenToSpeech.speech(this.handleTextInputFromSpeechRecognizer.bind(this));
    }

    clearDisplay(fieldName) {
      this.refs[fieldName].setNativeProps({ text: '', placeholder: 'To delete say "undo" or press the undo button.' });
    }

    // undo() {
    //   if (this.state.previousState !== '') {
    //     this.state = JSON.parse(this.state.previousState);
    //     this.setIconToMic();
    //     this.setState(this.state);
    //     this.SaveDataToDisk();
    //   }
    // }

    deleteTheList() {
      Alert.alert(
        'Alert',
        'Delete the list?',
        [
          { text: 'OK', onPress: () => this.deleteListContents() },
          { text: 'Cancel' }
        ]
      );
    }

    deleteListContents() {
      this.setState({ vars: [], id: 1, icontouchDisabled: false });
      this.storeageClear();
      this.clearDisplay('textBox');
    }

    asyncStorageresetandSave() {
      this.storeageClear();
      this.SaveDataToDisk();
    }

    SaveDataToDisk() {
      this.saveData(JSON.stringify(this.state));
    }

    async saveData(value) {
      await AsyncStorage.setItem('myKey', value);
    }

    async storeageClear() {
      AsyncStorage.clear();
    }

    renderList() {
      const onMypress = (item, pressed) => {
        item.checked = pressed;
        this.setState(this.state);
        this.SaveDataToDisk();
      };
      this.state.vars.forEach((item) => {
        item.press = onMypress.bind(null, item);
      });
      return this.state.vars.map((lists) => lists);
    }

    render() {
      return (
        <View style={Style.rootContainer}>
          <StatusBar
            backgroundColor="#383838"
            barStyle="light-content"
          />
          <View style={Style.namePlate}>
            <Image style={{ flexShrink: 1 }} source={require('../images/texture.jpg')}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={Style.backdropView}>
                  <Text style={Style.headline}>Speak-a-List</Text>
                </View>
                <View style={Style.helpView}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigator.push({
                        id: 'helpWindow',
                      });
                    }}
                  >
                    <Text style={Style.help}> ? </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Image>
          </View>
          <View style={Style.displayContainer}>
            <TextInput
              ref='textBox'
              style={{ height: 100 }}
              placeholder="Touch the mic icon, speak and say next. Or touch here for Keyboard."
              onChangeText={(userInput) => this.handleTextInput(userInput)}
              returnKeyType={'done'}
              onSubmitEditing={() => this.onEnterKeyPress('textBox')}
            />
          </View>
          <View style={Style.listcontainer}>
            <ScrollView ref="scrollView" style={{ paddingHorizontal: 10, borderBottomColor: 'red' }} onContentSizeChange={(width, height) => this.refs.scrollView.scrollTo({ y: height })}>
              {
                this.renderList().map((child) =>
                  (<CheckBox
                    key={child.name}
                    label={child.name}
                    size={20}
                    checked={child.checked}
                    onPress={child.press}
                    containerStyle={'yellow'}
                  />)
                )
              }
            </ScrollView>
            <View style={{ height: 45, flexDirection: 'row' }}>
              <View style={{ flex: 0.75 }}/>
              <Button
                onPress={() => this.handleTextInput('delete all')}
              >
                Clear all
            </Button>
              <TouchableOpacity disabled={this.state.icontouchDisabled} style={{ alignItems: 'center', flex: 2, marginBottom: 1 }} onPress={() => this.handleSpeechInput()}>
                <Image style={{ resizeMode: 'contain', height: 50, }} source={this.state.image} />
              </TouchableOpacity>
              <Button2
                onPress={() => this.handleTextInput('undo')}
              >
                Undo
            </Button2>
            <View style={{ flex: 0.75 }}/>
            </View>
          </View>
        </View>
      );
    }
}

  export default MainPage;
