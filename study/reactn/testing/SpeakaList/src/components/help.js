

import React, { Component } from 'react';
import {
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native';
import Style from './styling';

export default class HelpWindow extends Component {

  render() {
    return (
      <View style={Style.rootContainer}>
        <View style={Style.namePlate}>
          <Image style={{ flexShrink: 1 }} source={require('../images/texture.jpg')}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={Style.helpView}>
                <TouchableOpacity onPress={() => { this.props.navigator.pop(); }}>
                  <Text style={Style.backButton}>↩</Text>
                </TouchableOpacity>
              </View>
              <View style={Style.backdropView}>
                <Text style={Style.headline2}>Help</Text>
              </View>
            </View>
          </Image>
        </View>
        <View style={Style.helpListcontainer}>
          <View style={Style.helpContainer}>
            <View style={{ flex: 8, paddingBottom: 10, }}>
              <Text style={{ fontSize: 23, fontWeight: 'bold', color: 'black', textAlign: 'center' }}>Welcome to Speak-a-List help</Text>
              <ScrollView>
                <Text />
                <Text />
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 15, paddingLeft: 3, paddingRight: 3, }}>    How to use the app </Text>
                <Text />
                <Text />
                <Text />
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 15, fontWeight: 'bold' }}>▶</Text>
                  <Text style={{ color: 'black', fontSize: 15, paddingRight: 15, }}>Touch the mic icon and start speaking the first item of the list, say, 1 kg of carrot. At the end, say 'next' to enter it to the list. You may choose not to say 'next' but wait for a moment for the item to appear in the list.</Text>
                </View>
                <Text />
                <Text />
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 15, fontWeight: 'bold' }}>▶</Text>
                  <Text style={{ color: 'black', fontSize: 15, paddingRight: 15, }}>Once the first item appears on the list, proceed to the second item, by following the instructions as above.</Text>
                </View>
                <Text />
                <Text />
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 15, fontWeight: 'bold' }}>▶</Text>
                  <Text style={{ color: 'black', fontSize: 15, paddingRight: 15, }}>Alternatively, touch the text box and use keyboard to type, press the 'enter' key to enter the item in to the list.</Text>
                </View>
                <Text />
                <Text />
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 15, fontWeight: 'bold' }}>▶</Text>
                  <Text style={{ color: 'black', fontSize: 15, paddingRight: 15, }}>Click on the checkbox to check or uncheck an item.</Text>
                </View>
                <Text />
                <Text />
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 15, fontWeight: 'bold' }}>▶</Text>
                  <Text style={{ color: 'black', fontSize: 15, paddingRight: 15, }}>Speak 'undo' to detele the last item from the list.</Text>
                </View>
                <Text />
                <Text />
                 <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 15, fontWeight: 'bold' }}>▶</Text>
                  <Text style={{ color: 'black', fontSize: 15, paddingRight: 15, }}>Alternatively, press 'undo' button to clear the bottom most items in the list.</Text>
                </View>
                <Text />
                <Text />
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 15, fontWeight: 'bold' }}>▶</Text>
                  <Text style={{ color: 'black', fontSize: 15, paddingRight: 15, }}>Click 'clear all' button to delete all items from the list. Alternatively, press the mic icon and say 'delete all'. Confirm 'ok' to delete the list or press 'cancel' to go back. Once deleted, the list cannot be restored.</Text>
                </View>
                <Text />
                <Text />
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 15, fontWeight: 'bold' }}>▶</Text>
                  <Text style={{ color: 'black', fontSize: 15, paddingRight: 15, }}>The app needs an active internect connection to process speech recognition.</Text>
                </View>
              </ScrollView>
            </View>
            <View style={Style.aboutContainer}>
              <Text />
              <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black', textAlign: 'center' }}> Speak-a-List for Android	</Text>
              <Text style={{ color: 'black', fontSize: 10, textAlign: 'center' }}> Version 1.0</Text>
              <Text />
              <Text />
              <Text style={{ color: 'black', fontSize: 10, textAlign: 'center' }}> Contact us: ajuvignesh@gmail.com</Text>
              <Text />
              <Text style={{ color: 'black', fontSize: 10, textAlign: 'center' }}> © 2017 BasilWood</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
