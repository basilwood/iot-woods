import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableHighlight,
    AppRegistry
} from 'react-native'
import Style from './Style';


class counter extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            inputValue: 0
        }
    }

onPress1(){
    this.setState({
            inputValue: 0
                });
}
onPress2(){

    let newValue = (this.state.inputValue -1);
    this.setState({
            inputValue: newValue
        })
    
}
onPress3(){
    let newValue = (this.state.inputValue + 1);
    this.setState({
            inputValue: newValue
        })
    
}


    render() {
        return (
            <View style={Style.rootContainer}>
                    <View style={Style.namePlate}>
                            <Text style={{fontWeight: 'bold',fontSize: 38,color: 'white'}}>Counter</Text>
                    </View>
                    <View style={Style.displayContainer}>
                    <Text style={Style.displayText}>{this.state.inputValue}</Text>
                    </View>
                    <View style={Style.inputContainer}>
                        <TouchableHighlight style={Style.v1} onPress={this.onPress1.bind(this)}>
                                <View>
                                    <Text style={{color:'red',fontSize: 20}}> Reset </Text> 
                                </View>
                        </TouchableHighlight>

                        <TouchableHighlight style={Style.v2} onPress={this.onPress2.bind(this)}>
                                <View>
                                     <Text style={{color:'red',fontSize: 20}}>Back</Text> 
                                </View>
                        </TouchableHighlight>
                        
                        <TouchableHighlight style={Style.v3} onPress={this.onPress3.bind(this)}>
                                <View>
                                    <Text style={{color:'red',fontSize: 50}}>Count</Text> 
                                </View>
                        </TouchableHighlight>
                    </View>
            </View>
        );
    }

}

AppRegistry.registerComponent('counter', () => counter);