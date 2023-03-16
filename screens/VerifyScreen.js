import {View, Text, Image} from 'react-native';
import React, {useLayoutEffect, useContext, useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ProgressBar,
  MD3Colors,
  TextInput,
  Button,
  Checkbox,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../context/AuthContext';
import {Verify} from '../assets';
import axios from 'axios';

const VerifyScreen = () => {
  const navigation = useNavigation();
  const {userInfo, signupData} = useContext(AuthContext);
  const [checkStatus, setCheckStatus] = useState(false);
  const [verified, setVerified] = useState(false);
  const [loginChecked, setLoginChecked] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    navigation.navigate('login');
  };

  // console.log(signupData,'signupData')
  // console.log(userInfo,'userInfo')

  const login = () => {
    const options = {
      method: 'POST',
      url: 'https://splasheroo-backend.herokuapp.com/api/login',
      params: {},
      headers: {
        'content-type': 'application/json',
        role: 'customer',
      },
      data: {
        password: signupData.password,
        email: signupData.email,
      },
    };

    axios
      .request(options)
      .then(response => {
        if (response.data.account.completedProfile) {
          setLoginChecked(true);
          navigation.navigate('homeScreen');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const emailVerification = () => {
    const options = {
      method: 'POST',
      url: 'https://splasheroo-backend.herokuapp.com/api/email/send',
      params: {},
      headers: {
        'content-type': 'application/json',
      },
      data: {
        email: signupData.email,
        date: '2/10/2023',
        name: signupData.fullName,
        id: userInfo.account._id,
      },
    };

    axios
      .request(options)
      .then(response => {
        setCheckStatus(response.data.success);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    emailVerification();
  }, []);

  useEffect(() => {
    let intervalId = null;
    if (checkStatus && !loginChecked) {
      intervalId = setInterval(() => login(), 2000);
    }
    if (loginChecked) {
      clearInterval(intervalId);
    }
    return () => {
      if (!loginChecked) {
        clearInterval(intervalId);
      }
    };
  }, [checkStatus, loginChecked]);

  return (
    <SafeAreaView>
      <View className="px-4">
        <View className="flex justify-center items-center">
          <Image source={Verify} />
        </View>
        <Text className="text-center text-black">
          You have not yet verified your email
        </Text>
        <View className="mt-5 px-5">
          <Text className="text-center text-black">
            We sent you a verification link via email. Please click it to verify
            your email address. If you don’t see it, please check your spam
            folder.
          </Text>
        </View>
        <View className="mt-10 px-4">
          <Button
            className="bg-[#00BCD4]"
            mode="contained"
            onPress={emailVerification}>
            Not received it? Send Again
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VerifyScreen;
