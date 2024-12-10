import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/screens/HomeScreen';
import MapScreen from './components/screens/MapScreen';
import LoginScreen from './components/screens/LoginScreen';
import CreateAccountScreen from './components/screens/CreateAccountScreen';
import SettingsScreen from './components/screens/SettingsScreen';


export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Map" component={MapScreen}/>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Create Account" component={CreateAccountScreen}/>
        <Stack.Screen name="Settings" component={SettingsScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

