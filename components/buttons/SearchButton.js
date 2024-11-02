import React, { Children } from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';



const StartSearch = () => {

  return (
    <View>
        <TouchableOpacity style={styles.buttonContainer} onPress={Children}>
            <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>    
    </View>
  )
}


const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: 'blue',
        height: 44,
        width: '30%',
        borderRadius: 10, // curve edges
        alignSelf: 'center',
        alignItems: 'center', // centers text in center of button height and width (works with flexdirection)
        justifyContent: 'center',
        flexDirection: 'row', // centers text in center of button height and width (works with align items)
        top: 20,
    },
    buttonText: {
        fontFamily: 'San-Francisco',
        fontSize: 15,
        textAlign: 'center',
        color: 'white',
    },
    buttonSize: {
        height: 5,
        width: 100,
    },
    screenText: {
        color: 'black',
        textAlign: 'center',
        fontFamily: 'San-Francisco',
        fontSize: 25,
    },
});

export default StartSearch