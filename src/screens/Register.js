import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import {SelectList} from 'react-native-dropdown-select-list';
import COLORS from '../constants/colors';
import Button from '../components/Button';
import uuid from 'react-native-uuid';
import SimpleToast from 'react-native-simple-toast';
import database from '@react-native-firebase/database';

const Signup = ({ navigation }) => {
    const [idCounter, setIdCounter] = useState(1); // Counter for ID
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [category, setServicesOffered] = useState('');
    const [location,setlocation] = useState('')
    const [exp, setWorkExperience] = useState(0);
    const [rating, setRating] = useState('');
    const [prevWork, setPreviousWork] = useState('');

    const handleIncrement = () => {
        setWorkExperience(exp + 1);
    };

    const handleDecrement = () => {
        if (exp > 0) {
            setWorkExperience(exp - 1);
        }
    };

    const RegisterUser = async () => {
        if (email == '' || password == ''||name==''||category==''||location==''||exp==''||prevWork=='' ) {
          SimpleToast.show('Fill in all the fields!');
          return false;
        }
        let data = {
          id: uuid.v4(),
          emailId: email,
          password: password,
          name:name,
          category:category,
          location:location,
          exp:exp,
          prework:prevWork,
          rating:'3'
        };
    
        database()
          .ref('/users/'+data.id)
          .set(data)
          .then(() => {
            SimpleToast.show('Register Successfully!');
            setEmail("");
            setPassword("");
            setServicesOffered('');
            setlocation('')
            setWorkExperience(0);
            setPreviousWork('');
            navigation.navigate("Login");
          });
      };
    const handleSubmit = () => {
        // Increment ID counter and get the current ID
        const id = idCounter;
        setIdCounter(idCounter + 1);

        // Log the submitted data with ID
        console.log(`Sign-up Data for ID ${id}:`, {
            name,
            email,
            password,
            phoneNumber,
            category,
            location,
            exp,
            rating,
            prevWork
        });

        // Clear the form fields after submission
        setName('');
        setEmail('');
        setPassword('');
        setPhoneNumber('');
        setServicesOffered('');
        setlocation('')
        setWorkExperience(0);
        setRating('');
        setPreviousWork('');
    };

    const service = [
        { key: '1', value: 'Electrician'},
        { key: '2', value: 'Carpenter'},
        { key: '3', value: 'Plumber'},   
    ];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1, marginHorizontal: 22 }}>
                    {/* Your input fields here */}
                    {/* Name */}
                    <View style={{ marginBottom: 12 }}>
                        <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your name"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>
                    {/* Email */}
                    <View style={{ marginBottom: 12 }}>
                        <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                    </View>
                    {/* Password */}
                    <View style={{ marginBottom: 12 }}>
                        <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                        />
                    </View>
                    {/* Phone Number */}
                    {/* <View style={{ marginBottom: 12 }}>
                        <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>Phone Number</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your phone number"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            keyboardType="phone-pad"
                        />
                    </View> */}
                    {/* Services Offered */}
                    <View style={{ marginBottom: 12 }}>
                        <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>category</Text>
                        {/* <TextInput
                            style={styles.input}
                            placeholder="Enter services offered"
                            value={category}
                            onChangeText={setServicesOffered}
                        /> */}
                        <SelectList
                         setSelected={setServicesOffered}
                         data={service}
                         placeholder='Select services offered'
                         save='value'
                         />
                         

                    </View>
                    {/*Location */}
                    <View style={{ marginBottom: 12 }}>
                        <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>location</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Your Location"
                            value={location}
                            onChangeText={setlocation}
                        />
                    </View>
                    {/* Work Experience */}
                    <View style={{ marginBottom: 12 }}>
                        <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>exp</Text>
                        <View style={styles.incrementColumn}>
                            <Button title="-" onPress={handleDecrement} />
                            <Text style={styles.workExperienceText}>{exp}</Text>
                            <Button title="+" onPress={handleIncrement} />
                        </View>
                    </View>
                    {/* Rating */}
                    {/* <View style={{ marginBottom: 12 }}>
                        <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>Rating</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your rating"
                            value={rating.toString()}
                            onChangeText={(text) => setRating(parseFloat(text))}
                            keyboardType="numeric"
                        />
                    </View> */}
                    {/* Previous Work */}
                    <View style={{ marginBottom: 12 }}>
                        <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>prev Work</Text>
                        <TextInput
                            style={[styles.input, styles.largeInput]}
                            multiline
                            placeholder="Enter previous work experience"
                            value={prevWork}
                            onChangeText={setPreviousWork}
                        />
                    </View>


                    {/*<Button
                        title="Sign Up"
                        onPress={() => navigation.navigate("RequestsNavigator")}
                        //navigation.navigate('requets', { screen: 'requests' });
                        style={{
                            marginTop: 22,
                            width: "100%"
                        }}/>*/}

                    {/* Signup button */}
                    <Button title="Sign Up" filled onPress={RegisterUser} style={{ marginTop: 18, marginBottom: 4 }} />

                    {/* Navigation to login screen */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                        <Text style={{ fontSize: 16, color: COLORS.black }}>Already have an account?</Text>
                        <Pressable onPress={() => navigation.navigate("Login")}>
                            <Text style={{ fontSize: 16, color: COLORS.primary, fontWeight: "bold", marginLeft: 6 }}>Login</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    largeInput: {
        height: 80,
    },
    incrementColumn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    workExperienceText: {
        marginHorizontal: 10,
        fontSize: 16,
    },
});

export default Signup;
