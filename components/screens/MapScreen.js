import React, {useState, useEffect} from 'react'
import { Switch, View, Text, StyleSheet, Modal, Dimensions, Pressable, useWindowDimensions, registerCallableModule, } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign'; //icon image that will allow modal popup to appear and disappear
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { Card } from 'react-native-paper';
import Slider from '@react-native-community/slider'; //slider feature for range
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import StartSearch from '../buttons/SearchButton';


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const MapScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false); //state that will allow the modal to open and close when they press the button to popup
  const [range, setRange] = useState('');
  const [paid, setPaid] = useState(false); //set paid parking originally to false, toggle true based off switch in modal
  const toggleSwitch = () => setPaid(previousState => !previousState); //toggle switch function made to toggle paid filter on and off

  //get user location for starting point of map
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // from expo documentation: https://docs.expo.dev/versions/latest/sdk/location/
  const userLocation = async() => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }   
      let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest});
      // set the location that we just got approved for by the user to the location state variable and update below in the map call where region={location}
      //returns san francisco location ONLY ON LAPTOP SIMULATOR. ON PHONE, RETURNS CORRECT LOCATION
      setLocation({ 
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
  }
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  useEffect(() => {
    userLocation();
  } , []);


  const newLocation = () => {
    setLocation({
    longitude: -140.08635,
    latitude: 60.86168,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  };

  return (
    <View style={styles.mapContainer}>
      {/* text to show current location (longitude, latitude, longitude delta and latitude delta) at top of screen, remove when app works fully */}
      <Text>{text}</Text> 
      {/* map display here */}
       <MapView style={styles.map} 
        region={location}
       />
      {/* create modal functionality here */}
      {/* need modal to be transparent in order to see map in background, TYPE transparent IN THE MODAL TAG TO REMOVE BACKGROUND, BE AWARE THAT THE BACKGROUND STILL EXITS WHICH BLOCKS THE BACKGROUND AND STUFF FROM BEING INTERACTED WITH */} 
       <Modal visible={modalVisible} transparent animationType='slide'> 
          <Card style={styles.cardStyle}>
            <View>
                {/* look at slider documentation for all possible functions */}
                <Text style={styles.settingTitles}>Distance:</Text>
                <View style={styles.sliderContainer}>
                  <Slider
                    style={styles.slider}
                    minimumValue={1}
                    maximumValue={5}
                    step={1} //each increment in slider is 1 unit (miles)
                    minimumTrackTintColor="#5800BB"
                    maximumTrackTintColor="#000000"
                    // below changes the value of the range when user slides the slider
                    onSlidingComplete={(range) => {
                      setRange(range)
                    }}
                    /> 
                  <Text>Searching {range} mi ({(range * 1.609).toFixed(4)} km) distance</Text> 
                </View>
                {/* Toggle button for paid unpaid parking */}
                <Text style={styles.settingTitles}>Paid or Free:</Text>
                {/* from switch implementation files on react native website */}
                <View style={styles.toggleContainer}>

                  {/* switch color features and functionality */}
                  <Switch
                    trackColor={{ false: "#767577", true: "#5800BB" }} // false color , true color
                    thumbColor={paid ? "#f4f3f4" : "#C8C8C8"} //true color : false color
                    ios_backgroundColor="#3e3e3e" // background color
                    onValueChange={toggleSwitch} //when button is toggle is activated, switch the current value from false to true, vice versa
                    value={paid} // bool value set to true or false
                  />
                  {/* displays if user is searching for paid or free parking. syntax for {} statement: if (paid == true) display 'paid' else display 'free'  */}
                  <Text>Searching {paid ? <Text>both free and paid</Text> : <Text>for free</Text>} parking</Text> 
                </View>

                {/* Search button */}
                <StartSearch onPress={() => newLocation()}/>
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
  map: {
    width: '100%',
    height: '100%',
  },
  mapContainer: {
    height: windowHeight * 0.8,
    width: windowWidth,
    flex: 1,
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
    top: '-10%', // for some reason, window's height naturally goes out of bounds by a bit
  },
  modalDownButton: {
    position: 'absolute',
    left: windowWidth* 0.9,
    top: 15, 
  },
  settingTitles: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20,
    marginBottom: 10,
  },
  sliderContainer: {
    marginLeft: 15,
    backgroundColor: '#D3D3D3',
    height: 75,
    width: 210,
    borderRadius: 10,

  },
  slider: {
    width: 200, 
    height: 40,
    marginLeft: 0,
  },
  toggleContainer: {
    marginLeft: 15,
    backgroundColor: '#D3D3D3',
    height: 75,
    width: 210,
    borderRadius: 10,
  },

});

export default MapScreen;