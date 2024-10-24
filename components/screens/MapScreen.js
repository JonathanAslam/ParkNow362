import React from 'react'
import { View, Text, StyleSheet} from 'react-native';

const MapScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
        <Text>Hello, this is the Map Navigation page!</Text>
        <Text style={styles.inputContainer}>NOTE: add Modal Here Later</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'flex-start',
    padding: 20,
  },
  inputContainer: {
    position: 'relative',
    bottom: -300,
    left: -20,
    width: '150%',
    height: '40%',
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});

export default MapScreen;