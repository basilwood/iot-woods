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
import Icon from 'react-native-vector-icons/FontAwesome';

var alertMessage = 'Delete item?';

const speechProcessor = require('./speech-processor');

class MainPage extends Component {

  state = {
    vars: [], 
    id: 1, 
    deleteItemName: '', 
    input: '', 
    speaking: '',
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
        //console.log('set to circle');
        this.state.icontouchDisabled = true;
        this.setState(this.state);
        KeepAwake.activate();
    }

    setIconToMic() {
      this.state.image = require('../images/mic.png');

      this.state.icontouchDisabled = false;
      this.saveDataToDisk();
      this.setState(this.state);
      KeepAwake.deactivate();
    }

    handleTextInput(userInput) {
      if (userInput === '') {
        this.inputStateToNull();
      } else if (userInput === ' ') {
        this.clearDisplay('textBox');
        this.inputStateToNull();
      } else if (userInput === 'next') {
        this.inputStateToNull();
        this.clearDisplay('textBox');
      } else if (userInput === ' next') {
        this.inputStateToNull();
        this.clearDisplay('textBox');
      } else {
        this.state.input = userInput;
        const str = `${this.state.id}.` + ` ${userInput}`;
        //const str = userInput;
        this.setState(this.state);

        speechProcessor.getSpeechTokens().forEach((token) => {
          if ((str.indexOf(token, str.length - token.length)) !== -1) {
            const processingFunction = speechProcessor.findProcessor(token);
            const dataString = str.substring(0, str.length - token.length);
            //console.log(`id before ${this.state.id}`);
            const settingState = processingFunction(dataString, this, this.state);
            this.state.id = settingState;
            //console.log(`id after ${this.state.id}`);
            //console.log('processing function is executed');
            //console.log(this.state);
            this.state.input = '';
            this.asyncStorageresetandSave();
          }
        });
        return null;
      }
    }

    handleTextInputFromSpeechRecognizer(userInput) {
      if (userInput === 'error7') {
        if (this.state.speaking === false) {
          //console.log(this.state.speaking);
          this.setIconToMic();
        } else {
          //console.log(`this.state is true ${  this.state.speaking}`);
          this.setIconToMic();
          this.saveDataToDisk();
          this.state.speaking = true;
          this.handleSpeechInput();
          //ToastAndroid.show('Listening is ended', ToastAndroid.SHORT);
        }
      } else if (userInput === 'onEndofSpeech') {
        ToastAndroid.show('end of speech'.ToastAndroid.SHORT);
      } else if (userInput === 'error1') {
        this.setIconToMic();
        this.saveDataToDisk();
        ToastAndroid.show('Network error', ToastAndroid.SHORT);
      } else if (userInput === 'error2') {
        this.setIconToMic();
        this.saveDataToDisk();
        ToastAndroid.show('Network error', ToastAndroid.SHORT);
      } else if (userInput === 'error4') {
        this.setIconToMic();
        this.saveDataToDisk();
        ToastAndroid.show('Network error', ToastAndroid.SHORT);
      } else if (userInput === 'error5') {
        this.setIconToMic();
        this.saveDataToDisk();
        ToastAndroid.show('Network error', ToastAndroid.SHORT);
      } else if (userInput === 'error8') {
        this.setIconToMic();
        this.saveDataToDisk();
        this.state.speaking = true;
        this.handleSpeechButton();
        //ToastAndroid.show('Network error', ToastAndroid.SHORT);
      } else if (userInput === 'error3') {
        this.setIconToMic();
        this.saveDataToDisk();
        ToastAndroid.show('Audio recording error', ToastAndroid.SHORT);
      } else if (userInput === 'error6') {
        this.setIconToMic();
        this.saveDataToDisk();
        this.handleSpeechButton();
        ToastAndroid.show('No speech input', ToastAndroid.SHORT);
      } else if ((userInput.indexOf('undo', userInput.length - userInput.length)) !== -1) {
        const newInput = 'undo';
        this.handleTextInput(newInput);
        this.inputStateToNull();
        this.handleSpeechInput();
        this.saveDataToDisk();
      } else if ((userInput.indexOf('clear', userInput.length - userInput.length)) !== -1) {
        this.handleTextInput('clear');
        this.inputStateToNull();
        this.handleSpeechInput();
        this.saveDataToDisk();
      } else if ((userInput.indexOf('delete all', userInput.length - userInput.length)) !== -1) {
        this.handleTextInput('delete all');
        this.handleSpeechInput();
        this.saveDataToDisk();
      } else if ((userInput.indexOf('next', userInput.length - userInput.length)) === -1) {
        if (this.state.input === ''){
        const newInput = `${userInput}next`;
        this.handleTextInput(newInput);
        } else {
        const newInput = `${userInput}next`;
        const stateInput = `${this.state.input} ${newInput}`;
        this.handleTextInput(stateInput);
        this.inputStateToNull();
        this.handleSpeechInput();
        this.saveDataToDisk();
        }
      } else {
        //if this.state.input is !=='', add a space after it. 
        //if not try other
        console.log('state '+ this.state.input);
        if (this.state.input === '') {
        const Input = userInput;
        console.log(Input);
        this.inputStateToNull();
        this.handleTextInput(Input);
      } else {
        const Input = `${this.state.input} ${userInput}`;
        console.log(Input);
        this.inputStateToNull();
        this.handleTextInput(Input);
        this.inputStateToNull();
        this.saveDataToDisk();
        this.handleSpeechInput();
      }
      }
    }

    async handleSpeechInput() {
      this.setIconToCircle();
      NativeModules.ListenToSpeech.startSpeech(this.handleTextInputFromSpeechRecognizer.bind(this));
    }

    clearDisplay(fieldName) {
      this.refs[fieldName].setNativeProps({ text: '', placeholder: 'To delete say "undo" or press the undo button.' });
    }

    // undo() {
    //   if (this.state.previousState !== '') {
    //     this.state = JSON.parse(this.state.previousState);
    //     this.setIconToMic();
    //     this.setState(this.state);
    //     this.saveDataToDisk();
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
      this.inputStateToNull();
      if (this.state.image === require('../images/mic.png')) {
      } else {
      this.state.speaking = true;
      this.handleSpeechButton();
    }
    }

    asyncStorageresetandSave() {
      this.storeageClear();
      this.saveDataToDisk();
    }

    saveDataToDisk() {
      this.state.speaking = null;
      this.saveData(JSON.stringify(this.state));
    }

    async saveData(value) {
      await AsyncStorage.setItem('myKey', value);
    }

    async storeageClear() {
      AsyncStorage.clear();
    }
    
    inputStateToNull() {
      this.state.input = '';
    }

    handleSpeechButton() {
      if (this.state.speaking === true) {
        this.state.speaking = false;
        NativeModules.ListenToSpeech.endSpeech();
        this.setIconToMic();
        this.state.speaking = false;        
      } else {
        this.state.speaking = true;
        this.handleSpeechInput();
      }
    }
    deleteRow(name) {
    //   alertMessage = 'delete "' + name.substring(3) + '" from the list?';
    //   Alert.alert(
    //     'Alert',
    //     alertMessage,
    //     [
    //       {
    //         text: 'OK', onPress: () => this.deleteFromState(name)
    //       },
    //       { text: 'Cancel' }
    //     ])
    //     ;
    this.deleteFromState(name);
    this.state.id = this.state.id - 1;
    }
    

    deleteFromState(index) {
      //console.log(`index is ${index}`);
      const myArray = this.state.vars;
      //console.log(myArray);
      for (let i = myArray.length - 1; i >= 0; i--) {
        if (myArray[i].name === index) {
          //console.log('executed');
          myArray.splice(i, 1);
        }
        console.log(this.state.id);
        this.state.vars = myArray;
        //this.setState(this.state.vars: myArray);
        this.setState(this.state);
        this.saveDataToDisk();
      }
    }

     
    // deleteFromState(index) {
    //   const array = this.state.vars;
    //   const newIndex = index - 1;
    //   array.splice(newIndex, 1);
    //   this.state.id = this.state.id - 1;
    //   this.setState(this.state.vars: array);
    //   this.setState(this.state);
    // }
    // idGenerator() {
    //   const a = this.state.tempid;
    //     this.state.tempid = a - 1;
    //     return this.state.tempid;
    // }
  
    renderList() {
      const onMypress = (item, pressed) => {
        item.checked = pressed;
        this.setState(this.state);
        this.saveDataToDisk();
      };
      this.state.vars.forEach((item) => {
        item.press = onMypress.bind(null, item);
      });
      //console.log(this.state.vars);
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
              placeholder="Touch the mic icon and speak or touch for keyboard"
              onChangeText={(userInput) => this.handleTextInput(userInput)}
              returnKeyType={'done'}
              onSubmitEditing={() => this.onEnterKeyPress('textBox')}
              blurOnSubmit={false}

            />
          </View>
          <View style={Style.listcontainer}>
            <View style={{ flexDirection: 'row', flex: 1 }} >
              <ScrollView ref="scrollView" style={{ paddingLeft: 15, alignSelf: 'stretch' }} onContentSizeChange={(width, height) => this.refs.scrollView.scrollTo({ y: height })}>
                {
                  this.renderList().map((child) =>
                    (
                      <View key={child.name + Math.random()} style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 9.25 }}>
                          <CheckBox
                            key={child.name + Math.random()}
                            label={child.name.substring(3)}
                            size={20}
                            checked={child.checked}
                            onPress={child.press}
                          />
                        </View>
                        <View style={{ flex: 0.75, paddingTop: 5 }}>
                          <TouchableOpacity
                            onPress={() => this.deleteRow(child.name)}
                          >
                            <Icon name="close" size={20} color="#383838" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    )
                  )
                }
              </ScrollView>
            </View>
            <View style={{ height: 45, flexDirection: 'row' }}>
              <View style={{ flex: 0.75 }} />
              <Button
                onPress={() => this.handleTextInput('delete all')}
              >
                Clear
            </Button>
              <TouchableOpacity style={{ alignItems: 'center', flex: 2, marginBottom: 1 }} onPress={() => this.handleSpeechButton()}>
                <Image style={{ resizeMode: 'contain', height: 50, }} source={this.state.image} />
              </TouchableOpacity>
              <Button2
                onPress={() => this.handleTextInput('undo')}
              >
                Undo
            </Button2>
            <View style={{ flex: 0.75 }} />
            </View>
          </View>
        </View>
      );
    }
}

  export default MainPage;
