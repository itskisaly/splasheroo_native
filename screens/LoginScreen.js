import React, { useEffect, useLayoutEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { TextInput, Button, Modal, Portal, Provider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Banner } from '../assets';
import { AuthContext } from '../context/AuthContext';
// import {
//     AntDesign,
//     AntDesign,
//     MaterialCommunityIcons,
//   } from "react-native-vector-icons";
import Ionicons from 'react-native-vector-icons/Ionicons';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const { setUserInfo } = useContext(AuthContext);
  const [visible, setVisible] = React.useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading,setResetLoading] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 50 };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const getData = async () => {
    const value = await AsyncStorage.getItem('completeProfile');
    if (value === "completed") {
      navigation.navigate('homeScreen');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = () => {
    setUserLoggedIn(true);
    const options = {
      method: 'POST',
      url: 'https://splasheroo-backend.herokuapp.com/api/login',
      params: {},
      headers: {
        'content-type': 'application/json',
        role: 'customer',
      },
      data: {
        email: email,
        password: password,
      },
    };

    axios
      .request(options)
      .then(response => {
        setUserInfo(response.data);
        setUserLoggedIn(false);
        AsyncStorage.setItem('userToken', response.data.token);
        AsyncStorage.setItem('userId', response.data.account._id);
        AsyncStorage.setItem('userEmail', response.data.account.email);

        if (response.data.account.completedProfile) {
          AsyncStorage.setItem('completeProfile', "completed");
          navigation.navigate('homeScreen');
        } else {
          Alert.alert('Please verify your account');
        }
      })
      .catch(error => {
        Alert.alert('Invalid Email/password');
        setUserLoggedIn(false);
      });
  };

  const handleReset = () => {
    setResetLoading(true);
    const options = {
      method: "POST",
      url: "https://splasheroo-backend.herokuapp.com/api/email/reset",
      params: {},
      headers: {
        "content-type": "application/json",
      },
      data: {
        email: resetEmail,
      },
    };

    axios
      .request(options)
      .then((response) => {
        setResetLoading(false);
        hideModal();
        Alert.alert('Check your email to reset your password');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView className="bg-white h-full">
        <View>
          <Image source={Banner} />
        </View>
        <View>
          <Text className="px-4 text-[17px] text-black">
            Sign in to your account
          </Text>
        </View>
        <View className="px-4 mt-5">
          <TextInput
            label="Email Address"
            value={email}
            mode="outlined"
            className="bg-slate-100"
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View className="px-4 mt-5">
          <TextInput
            label="Password"
            value={password}
            mode="outlined"
            secureTextEntry={true}
            className="bg-slate-100"
            onChangeText={text => setPassword(text)}
          />
        </View>
        <Text onPress={showModal} className="text-right mt-3 px-4 text-[#055ED0]">
          Forget password?
        </Text>
        {userLoggedIn ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#0B646B" />
          </View>
        ) : (
          <View>
            <View className="mt-5 py-5 w-full px-4 text-white">
              <Button
                className="bg-[#00BCD4]"
                disabled={userLoggedIn}
                mode="contained"
                onPress={handleSubmit}>
                Submit
              </Button>
            </View>
            <View className="mt-6 px-4 flex-row justify-center align-items-center relative top-10">
              <Text className="text-black">Don’t have an account?</Text>
              <Text
                className="font-bold ml-1 text-[#00BCD4]"
                onPress={() => navigation.navigate('Signup')}>
                Sign up
              </Text>
            </View>
          </View>
        )}
        <Portal>
          <Modal style={{ padding: 20 }} visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <>
              <Text>Enter you registered email</Text>
              <TextInput
                label="Email Address"
                value={resetEmail}
                mode="outlined"
                style={{ marginTop: 10 }}
                onChangeText={text => setResetEmail(text)}
              />
             {!resetLoading ? <Button
                style={{ marginTop: 20, backgroundColor: "#00BCD4" }}
                disabled={!resetEmail}
                mode="contained"
                onPress={handleReset}>
                Submit
              </Button> : 
                <View style={{marginTop:10}}>
                  <ActivityIndicator size="small" color="#0B646B" /> 
                </View>
              }
            </>
          </Modal>
        </Portal>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
