//helped from internet, check saved tabs

// src/components/Login.tsx
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const CreateAccountScreen = () => {
  
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("smith");
  const [email, setEmail] = useState("@gmail.com");
  const [password, setPassword] = useState("hello123");


  const navigation = useNavigation();
  const handleCreateAccount = async () => {
    console.log('Create Account button pressed');
    // Implement your login logic here
    console.log('First name:', fname);
    console.log('Last name:', lname);
    console.log('Email:', email);
    console.log('Password:', password);   //add console log for user first and last name
    navigation.navigate('Login'); //route to map page when account is created
    
  //our logic handling portion starts here aka try block
  try{
    //we are using the fetch API to make a POST request to the server
    //the await keyword pauses the function until fetch is complete
    const info = await fetch('http://localhost:8081/create-account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:  JSON.stringify({fname, lname, email, password}),
  });
  if (!info.ok) {
    throw new Error(`HTTP error! status: ${info.status}`);
  };

  //the response from the completed fetch request is now converted to JSON format but we should check to make sure its in JSON format before doing anything
  //if its unsuccessful, the else block is executed
  const contentType = info.headers.get('content-type');
  let data;
  if (contentType && contentType.includes('application/json')) {
    data = await info.json();
  } else {
    data = await info.text();  // Handle plain text response if not JSON
    console.warn("Expected JSON, received plain text:", data);
  }


  //the if statements check if the response was successful or not
  if(info.ok){// successful it logs the success message, shows an alert and navigates to the Map screen
    console.log('Account created successfully:', data);
    navigation.navigate('Login');

  }else {
    console.error('Error creating account1:', data.error);
  }
  
  //Network issues are caught, issures with parsing the JSON response, etc
  } catch (err) {
    console.error('Error creating account:', err);
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
        <Text style={styles.title}>Create Account</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={fname}
          onChangeText={setFname}
          keyboardType="default"
          autoCapitalize="words" // auto capitalize word since its a name
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lname}
          onChangeText={setLname}
          keyboardType="default"
          autoCapitalize="words" // auto capitalize word since its a name
          autoCorrect={false}
        />        
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
        <Button title="Create Your Account!" onPress={handleCreateAccount}  />
        <Text>{JSON.stringify({first_name: fname, last_name: lname, email: email, password: password})}</Text>
      </Card>
    </View>
    </LinearGradient>
  );
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
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});

export default CreateAccountScreen;