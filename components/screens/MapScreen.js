import React, {useState} from 'react'
import { View, Text, StyleSheet, Modal, Dimensions, Pressable, useWindowDimensions, registerCallableModule, } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign'; //icon image that will allow modal popup to appear and disappear
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { Card } from 'react-native-paper';


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const MapScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false); //state that will allow the modal to open and close when they press the button to popup

  return (
    
    <View style={styles.mapContainer}>
        <Text>Hello, this is the Map Navigation page!</Text>       
       {/* create modal functionality here */}

       {/* need modal to be transparent in order to see map in background, TYPE transparent IN THE MODAL TAG TO REMOVE BACKGROUND, BE AWARE THAT THE BACKGROUND STILL EXITS WHICH BLOCKS THE BACKGROUND AND STUFF FROM BEING INTERACTED WITH */} 
       <Modal visible={modalVisible}  animationType='slide'> 
          <Card style={styles.cardStyle}>
            <View >
                <Text> Modal Features here!</Text>
                <AntDesign name="downcircle" size={24} color="black" onPress={() => setModalVisible(false)} style={styles.modalDownButton} /> 
            </View>
          </Card>
        </Modal>


        {/* AntDesign is the creator of the vector icon we are using for the popup and dropdown buttons for the modal. we want this at the bottom of the page */}
        <AntDesign name="upcircle" size={24} color="black" onPress={() => setModalVisible(true)} style={styles.modalUpButton}/> 
        <Text>hello!</Text>
    </View>
  )
}

const { width, height } = Dimensions.get("window"); 

// flex: 1 --> allows items to wrap properly 

const styles = StyleSheet.create({
  mapContainer: {
    height: windowHeight * 0.8,
    width: windowWidth,
  },
  cardStyle: {
    position: 'relative',
    // flex: 1,
    top: windowHeight * 0.6,
    height: windowHeight,
  },
  modalUpButton: {
    position: 'relative',
    left: windowWidth* 0.9,
    top: windowHeight * 0.8, // for some reason, window's height naturally goes out of bounds by a bit
  },
  modalDownButton: {
    position: 'relative',
    left: windowWidth* 0.9, // 
  },
});

export default MapScreen;