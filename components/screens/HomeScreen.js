import React from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import LoginButton from '../buttons/LoginButton';

const HomeScreen = ({navigation}) => {
  
  return (
    <View>
      <Text style={styles.screenText}>Hello, this is the home page!</Text>
      <LoginButton/>
    </View>
  )
}
const styles = StyleSheet.create({
  screenText: {
    color: 'black',
    textAlign: 'center',
    fontFamily: 'San-Francisco',
    fontSize: 25,
  },
});

export default HomeScreen;
