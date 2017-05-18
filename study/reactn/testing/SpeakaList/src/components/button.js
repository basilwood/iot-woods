import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: 'grey',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 5,
    paddingBottom: 10,
    marginLeft: 5,
    marginRight: 5
  },
  buttonStyle: {
    flex: 3.25,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    // marginLeft: 20,
    marginRight: 0,
    marginTop: 5,
    marginBottom: 5
  },
};

export default Button;
