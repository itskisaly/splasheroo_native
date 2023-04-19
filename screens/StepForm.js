import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  BackHandler,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState, useContext} from 'react';
import {
  ProgressBar,
  MD3Colors,
  TextInput,
  Button,
  Checkbox,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Name from '../components/SignupForm/Name';
import Email from '../components/SignupForm/Email';
import Password from '../components/SignupForm/Password';
import PhoneNumber from '../components/SignupForm/PhoneNumber';
import PostCode from '../components/SignupForm/PostCode';
import CheckBox from '../components/CheckBox';
// import { Ionicons } from 'react-native-vector-icons';
import {AuthContext} from '../context/AuthContext';
import {back} from '../assets';
import axios from 'axios';

const StepForm = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        return true;
      },
    );
    return () => backHandler.remove();
  }, []);

  const {setUserInfo, setSignupData} = useContext(AuthContext);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    postCode: '',
    user_address: '',
    phoneNumber: '',
  });
  const [selectScreen, setSelectScreen] = useState(0);
  const [progressValue, setProgressValue] = useState(0.1);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [error, setError] = useState({
    emailError: true,
    passwordError: true,
    phoneError: true,
  });
  const [termsChecked, setTermsChecked] = useState(false);
  const [drivingCheck, setDrivingCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {fullName, email, password, postCode, user_address, phoneNumber} =
    formData;
  const {emailError, passwordError, phoneError} = error;
  const formTitles = [
    'What’s your name?',
    'What’s your email address?',
    'Create a password',
    'What’s your address?',
    'What’s your phone number?',
    'One last step, you’re almost done!',
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const ConfirmationWindow = () => {
    return (
      <View
        style={{
          marginLeft: 15,
          marginTop: 20,
          // borderWidth: 1,
          // borderColor: '#000',
          width: 250,
        }}>
        <CheckBox
          onPress={() => setTermsChecked(!termsChecked)}
          title="I accept the Terms & Conditions and Privacy Policy"
          isChecked={termsChecked}
        />
        <CheckBox
          onPress={() => setDrivingCheck(!drivingCheck)}
          title="I agree to not use this app while driving"
          isChecked={drivingCheck}
        />
      </View>
    );
  };

  const screenDisplay = () => {
    if (selectScreen === 0) {
      return <Name formData={formData} setFormData={setFormData} />;
    } else if (selectScreen === 1) {
      return (
        <Email
          formData={formData}
          setFormData={setFormData}
          error={error}
          setError={setError}
        />
      );
    } else if (selectScreen === 2) {
      return (
        <Password
          formData={formData}
          setFormData={setFormData}
          error={error}
          setError={setError}
        />
      );
    } else if (selectScreen === 3) {
      return <PostCode formData={formData} setFormData={setFormData} />;
    } else if (selectScreen === 4) {
      return (
        <PhoneNumber
          formData={formData}
          setFormData={setFormData}
          error={error}
          setError={setError}
        />
      );
    } else if (selectScreen === 5) {
      return <ConfirmationWindow />;
    }
  };

  const handleNext = () => {
    // if(formData.email && selectScreen === 1){
    //   const options = {
    //     method: "POST",
    //     url: "https://splasheroo-backend.herokuapp.com/api/checkEmail",
    //     params: {},
    //     headers: {
    //       "content-type": "application/json",
    //     },
    //     data: {
    //      email: formData.email
    //     },
    //   };
      
    //   axios
    //     .request(options)
    //     .then( (response) => {
    //       console.log(response.data);
    //       if(response.data.success){
    //         Alert.alert('Email already exists');
    //       } else {
    //         setSelectScreen(selectScreen + 1);
    //         setProgressValue(progressValue + 0.2);
    //       }
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // } else {
      setSelectScreen(selectScreen + 1);
      setProgressValue(progressValue + 0.2);
    //}
  };

  const handlePrevios = () => {
    if (selectScreen == 0) {
      navigation.navigate('Signup');
      return;
    }
    setSelectScreen(selectScreen - 1);
    setProgressValue(progressValue - 0.2);
  };

  useEffect(() => {
    if (selectScreen === 0 && !fullName) {
      setButtonDisabled(true);
    } else if (selectScreen === 1 && emailError) {
      setButtonDisabled(true);
    } else if (selectScreen === 2 && passwordError) {
      setButtonDisabled(true);
    } else if (selectScreen === 3 && !postCode && !user_address) {
      setButtonDisabled(true);
    } else if (selectScreen === 4 && phoneError) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [formData, selectScreen]);

  const handleSubmit = () => {
    setIsLoading(true);
    setSignupData(formData);
    console.log(formData,'formData')
    const options = {
      method: 'POST',
      url: 'https://splasheroo-backend.herokuapp.com/api/register',
      params: {},
      headers: {
        'content-type': 'application/json',
        role: 'customer',
      },
      data: {
        fullName: formData.fullName,
        password: formData.password,
        phone: formData.phoneNumber,
        email: formData.email,
        postCode: formData.postCode,
        address: formData.user_address,
      },
    };

    axios
      .request(options)
      .then(response => {
        console.log(response, 'res');
        if (response.status === 200) {
          setUserInfo(response.data);
          AsyncStorage.setItem('userToken', response.data.token);
          AsyncStorage.setItem('userId', response.data.account._id);
          AsyncStorage.setItem('userEmail', response.data.account.email);
          setIsLoading(false);
          navigation.navigate('RegisterFindVehicle');
        } else {
          console.log('network Error');
          setIsLoading(false);
        }
      })
      .catch(error => {
        Alert.alert('Server not responding!');
        setIsLoading(false);
        console.error(error);
      });
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView className="px-4 mt-5 h-full w-full relative">
          <View className="flex-row px-4 items-center">
            {selectScreen >= 0 && (
              <Text onPress={handlePrevios}>
                <Image source={back} />
              </Text>
            )}
            <Text
              style={{
                color: '#000',
              }}
              className={
                selectScreen > 0
                  ? 'text-lg ml-20 text-center'
                  : 'text-lg ml-10 px-9'
              }>
              Create Account
            </Text>
          </View>
          <View className="mt-5 px-4">
            <ProgressBar progress={progressValue} color="#00BCD4" />
          </View>
          <View>
            <Text className="text-center mt-2 color-[#000]">
              {formTitles[selectScreen]}
            </Text>
          </View>

          <View>{screenDisplay()}</View>

          <View
            className="w-full px-4 text-white"
            style={{
              marginTop: 400,
            }}>
            {selectScreen < 5 ? (
              <View>
                <Button
                  className="bg-[#00BCD4]"
                  style={{
                    width: '100%',
                  }}
                  disabled={buttonDisabled}
                  mode="contained"
                  onPress={handleNext}>
                  Next
                </Button>
              </View>
            ) : (
              isLoading ? <ActivityIndicator size="large" color="#0B646B" /> :
              <Button
                className="bg-[#00BCD4]"
                disabled={!(termsChecked && drivingCheck)}
                mode="contained"
                onPress={handleSubmit}>
                Submit
              </Button>
            )}
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default StepForm;
