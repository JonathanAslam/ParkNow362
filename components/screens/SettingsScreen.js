import React, {useState} from 'react'
import { View, Text, StyleSheet, TextInput, Dimensions, ScrollView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card} from 'react-native-paper';
import ReportIssueButton from '../buttons/ReportIssueButton';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const SettingsScreen = () => {
    const [email, setEmail] = useState('jonathan@gmail.com');
    const [issue, setIssue] = useState('this is the issue');
    const [description, setDescription] = useState('this is the description');


    const handleSubmitReport = async () => {
        // Implement your login logic here
        console.log('Email:', email);
        console.log('Issue:', issue);
        console.log('Description:', description);
      //our logic handling portion starts here aka try block
    try{
        //we are using the fetch API to make a POST request to the server
        //the await keyword pauses the function until fetch is complete
        const report = await fetch('http://localhost:8081/report-issue', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:  JSON.stringify({email, issue, description}),
    });
    if (!report.ok) {
        throw new Error(`HTTP error! status: ${report.status}`);
    };
    
      //the response from the completed fetch request is now converted to JSON format but we should check to make sure its in JSON format before doing anything
      //if its unsuccessful, the else block is executed
      // const data = await report.json();
    const contentType = report.headers.get('content-type');
    let data;
    if (contentType && contentType.includes('application/json')) {
        data = await report.json();
    } else {
        data = await report.text();  // Handle plain text response if not JSON
        console.warn("Expected JSON, received plain text:", data);
    }
    
    
      //the if statements check if the response was successful or not
    if(report.ok){// successful it logs the success message, shows an alert and navigates to the Map screen
        console.log('Report submitted successfully:', data);
        // Alert.alert('Success', 'Account created successfully');    
    }else {
        console.error('Error submitting report:', data.error);
        // Alert.alert('Error', data.message);
    }
    
      //Network issues are caught, issures with parsing the JSON response, etc
    } catch (err) {
        console.error('Error submitting report1:', err);
      // Handle error more specifically based on error type
    if (err instanceof TypeError) {
        console.error('Network error or JSON parsing error:', err);
    } else {
        console.error('Generic error:', err);
    }
      // Display user-friendly error message to the user
        console.error('Error submitting report2:', err); //error happening here
        // Alert.alert('Error', 'An error occurred while creating the account');  //Alert property does not exist
    }
    };
    
return (
    <LinearGradient
    colors={['#030004', '#051438', '#09235C', '#10348B', '#1748C7', '#1B56F3', '#467BFB', '#80A1FE', '#94AFFF']}
    style={styles.gradient}
    >
    <View style={styles.container}>
        <Card style={styles.card}>
        <ScrollView>
            <Text style={styles.title}>Profile</Text>

            <View style={styles.contentBox}>
                <Text style={styles.content}>
                    First Name:
                </Text>
                <Text style={styles.content}>
                    Last Name:
                </Text>
                <Text style={styles.content}>
                    Email:
                </Text>
            </View>

            <Text style={styles.title}>Report An Issue</Text>
            <View style={styles.contentBox}>
                <Text style={styles.content}>
                    Report an issue here:
                </Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="default"
                            autoCorrect={false}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Issue"
                            value={issue}
                            onChangeText={setIssue}
                            keyboardType="default"
                            autoCorrect={false}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Description"
                            value={description}
                            onChangeText={setDescription}
                            keyboardType="default"
                            autoCorrect={false}
                        />
                    </View>
            </View>
            </ScrollView>
            {/* add button to submit report here */}
            <ReportIssueButton onPress={handleSubmitReport} />
        </Card>
    </View>
    </LinearGradient>
)
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        padding: 20,
        margin: 0,
        height: windowHeight * 0.85,
        width: windowWidth * 0.9,
    },
    reportIssueCard : {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    contentBox: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: windowHeight * 0.08,
        fontSize: 20,
    },
    input: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    inputContainer: {
        marginBottom: 16,
    },

});

export default SettingsScreen
