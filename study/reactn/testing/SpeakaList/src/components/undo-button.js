import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button2 = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={styles.UndoButtonStyle}>
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
  UndoButtonStyle: {
    flex: 3.25,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    marginLeft: 0,
    // marginRight: 20,
    marginTop: 5,
    marginBottom: 5
  }
};

export default Button2;
