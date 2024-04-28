import { View, Text, TextInput, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../constants/colors';
import {Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import Button from '../components/Button';
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/Reducer/user';
import Navigation from '../services/Navigation';
import Authentication from '../services/Authentication';
import database from '@react-native-firebase/database';
import SimpleToast from 'react-native-simple-toast';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    
    const dispatch = useDispatch();
    const loginUser = async () => {
        database()
          .ref('users/')
          .orderByChild("emailId")
          .equalTo(email)
          .once('value')
          .then( async snapshot => {
            if (snapshot.val() == null) {
               SimpleToast.show("Invalid Email Id!");
               return false;
            }
            let userData = Object.values(snapshot.val())[0];
            if (userData?.password != password) {
               SimpleToast.show("Invalid Password!");
               return false;
            }
    
            console.log('User data: ', userData);
            dispatch(setUser(userData));
            await Auth.setAccount(userData);
            SimpleToast.show("Login Successfully!");
          });
      };
    // Function to handle the login action
    const handleLogin = () => {
        // Validate email and password (you can add more validation if needed)
        if (!email || !password) {
            alert('Please enter both email and password');
            return;
        }

        // Perform login action (replace with your actual login logic)
        // For now, simply log the email and password
        console.log('Email:', email);
        console.log('Password:', password);

        // Navigate to the desired screen upon successful login
        // For example, navigate to the home screen
         // Replace 'Home' with your desired screen name
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', marginVertical: 12, color: COLORS.black }}>
                    Hi Welcome Back ! 👋
                </Text>
                <Text style={{ fontSize: 16, color: COLORS.black }}>Hello again you have been missed!</Text>

                {/* Email input */}
                <View style={{ marginBottom: 12 }}>
                    <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>Email address</Text>
                    <View style={{ width: "100%", height: 48, borderColor: COLORS.black, borderWidth: 1, borderRadius: 8, alignItems: "center", justifyContent: "center", paddingLeft: 22 }}>
                        <TextInput
                            placeholder='Enter your email address'
                            placeholderTextColor={COLORS.black}
                            keyboardType='email-address'
                            style={{ width: "100%" }}
                            onChangeText={setEmail}
                            value={email}
                        />
                    </View>
                </View>

                {/* Password input */}
                <View style={{ marginBottom: 12 }}>
                    <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>Password</Text>
                    <View style={{ width: "100%", height: 48, borderColor: COLORS.black, borderWidth: 1, borderRadius: 8, alignItems: "center", justifyContent: "center", paddingLeft: 22 }}>
                        <TextInput
                            placeholder='Enter your password'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={!isPasswordShown}
                            style={{ width: "100%" }}
                            onChangeText={setPassword}
                            value={password}
                        />
                        {/* Toggle password visibility */}
                        <TouchableOpacity onPress={() => setIsPasswordShown(!isPasswordShown)} style={{ position: "absolute", right: 12 }}>
                            <Ionicons name={isPasswordShown ? "eye-off" : "eye"} size={24} color={COLORS.black} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Remember me checkbox */}
                <View style={{ flexDirection: 'row', marginVertical: 6 }}>
                    <Checkbox style={{ marginRight: 8 }} value={isChecked} onValueChange={setIsChecked} color={isChecked ? COLORS.primary : undefined} />
                    <Text>Remember Me</Text>
                </View>

                {/* Login button */}
                <Button title="Login" filled onPress={loginUser} style={{ marginTop: 18, marginBottom: 4 }} />

                {/* Navigation to signup screen */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                    <View style={{ flex: 1, height: 1, backgroundColor: COLORS.grey, marginHorizontal: 10 }} />
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Don't have an account?</Text>
                    <Pressable onPress={() => navigation.navigate("Register")}>
                        <Text style={{ fontSize: 16, color: COLORS.primary, fontWeight: "bold", marginLeft: 6 }}>Register</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Login;
