//helped from internet, check saved tabs

// src/components/Login.tsx
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { Card } from 'react-native-paper';


const CreateAccountScreen = () => {

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const navigation = useNavigation();
  const handleCreateAccount = () => {
    // Implement your login logic here
    console.log('First name:', fname);
    console.log('Last name:', lname);
    console.log('Email:', email);
    console.log('Password:', password);   //add console log for user first and last name
    navigation.navigate('Map'); //route to map page when account is created
  };

  return (
    // <ParallaxScrollView
    //   headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
    //   headerImage={<Ionicons size={310} name="person-outline" style={styles.headerImage} />}> 
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
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lname}
          onChangeText={setLname}
          keyboardType="default"
          autoCapitalize="none" // auto capitalize word since its a name
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
      </Card>
    </View>
    // </ParallaxScrollView>
  );
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