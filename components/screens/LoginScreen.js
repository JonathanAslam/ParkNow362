import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, StyleSheet, TextInput, Button, Image, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-paper';



const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  const handleLogin = async () => {
    // Implement your login logic here
    console.log('Email:', email);
    console.log('Password:', password);
    
    try {
      const response = await fetch('http://localhost:8081/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      if (response.ok) {
        const data = await response.json();   
        // Store the token or session ID
        const { token } = data;
        await AsyncStorage.setItem('token', token); // Store token
        //when login is complete, navigate to the map page
        navigation.navigate('Map'); 
      } else {
        const errorData = await response.json();
        console.log('Error response data:', errorData);
        // current issue 
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
    }
    
  };
  

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Login" onPress={handleLogin}  />
        <Button title="CreateAccount" onPress={() => navigation.navigate("Create Account")}/>
      </Card>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  // headerImage: {
  //   color: '#808080',
  //   bottom: -90,
  //   left: -35,
  //   position: 'absolute',
  // },
  // titleContainer: {
  //   flexDirection: 'row',
  //   gap: 8,
  // },
});
export default LoginScreen;
