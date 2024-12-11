import { View, Text, StyleSheet, TextInput, Button, Image, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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
    console.log('Login button pressed');
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
        const { token, user } = data;
        await AsyncStorage.setItem('token', token); // Store token
        console.log('User:', JSON.stringify(user));
        await AsyncStorage.setItem('user', JSON.stringify(user)); // Store email
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
    <LinearGradient
      colors={['#030004', '#051438', '#09235C', '#10348B', '#1748C7', '#1B56F3', '#467BFB', '#80A1FE', '#94AFFF']}
      style={styles.gradient}
    >
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
    </LinearGradient>
  )
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
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
});
export default LoginScreen;
