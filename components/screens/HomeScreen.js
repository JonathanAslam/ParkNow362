import React from 'react';
import { View, StyleSheet, Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LoginButton from '../buttons/LoginButton';


const HomeScreen = ({navigation}) => {
  
  return (
    <LinearGradient
      colors={['#030004', '#051438', '#09235C', '#10348B', '#1748C7', '#1B56F3', '#467BFB', '#80A1FE', '#94AFFF']}
      style={styles.container}
    >
    <View style={styles.innerContainer}>
      <Image source={require('../../assets/park_now_logo.png')} style={styles.image} />
      <LoginButton/>
    </View>
    </LinearGradient>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain', // Adjust the resize mode as needed
  },
  screenText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'San-Francisco',
    fontSize: 25,
  },
});

export default HomeScreen;
