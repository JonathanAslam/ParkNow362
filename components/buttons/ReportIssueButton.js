import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';




const LoginButton = ({onPress}) => {
return (
    <View>
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
            <Text style={styles.buttonText}>Report Issue</Text>
        </TouchableOpacity>    
    </View>
)
}


const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: '#5800BB',
        height: 100, // Adjust the size as needed
        width: 100, // Adjust the size as needed
        borderRadius: 50, // Half of the height and width to make it a circle
        alignSelf: 'center',
        alignItems: 'center', // centers text in center of button height and width (works with flexdirection)
        justifyContent: 'center',
        flexDirection: 'row', // centers text in center of button height and width (works with align items)
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

export default LoginButton
