import React, {useEffect, useLayoutEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Banner} from '../assets';
import CheckBox from '../components/CheckBox';
import InputField from '../components/InputField';
import {Ionicons} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../context/AuthContext';
import {back} from '../assets';

import axios from 'axios';

const RegisterAddVehicle = ({route}) => {
  const data = route?.params?.param;
  const navigation = useNavigation();
  const {userInfo,setRenderFetchData,renderFetchData} = useContext(AuthContext);
  const [registrationPlate, setRegistrationPlate] = useState();
  const [model, setModel] = useState();
  const [make, setMake] = useState();
  const [colour, setColour] = useState();
  const [licensed, setLicensed] = useState(false);
  const [agree, setAgree] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  console.log(data,'data00')

  useEffect(() => {
    setRegistrationPlate(data.registrationPlate);
    if(data.uk !== "non-uk"){
            setColour(data.data.vehicleDetails?.colour);
            setMake(data.data.vehicleDetails?.make);
            setModel(data.data.vehicleDetails?.model);
        }
  }, []);

  const handleSubmit = async () => {
    const value = await AsyncStorage.getItem('userId');
    const options = {
      method: 'POST',
      url: 'https://splasheroo-backend.herokuapp.com/api/vehicle/add',
      params: {},
      headers: {
        'content-type': 'application/json',
      },
      data: {
        id: userInfo?.account?._id ? userInfo?.account?._id : value,
        RegistrationPlate: registrationPlate,
        licence: true,
        model,
        make,
        coulor: colour,
      },
    };
    axios
      .request(options)
      .then(response => {
        if (response) {
            navigation.navigate('verifyScreen');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };


  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView>
        <SafeAreaView className="px-4 mt-5 h-full w-full bg-white">
          {/* <Text className="text-lg text-center">
                Add your vehicle
            </Text> */}
          <View className="flex-row px-4 items-center">
            <Text onPress={() => navigation.navigate('FindVehicle')}>
              {/* <Ionicons name="arrow-back" size={24} color="black" /> */}
              <Image source={back} />
            </Text>
            <Text className="text-lg text-black ml-20 text-center">
              Add your vehicle
            </Text>
          </View>
          <View>
            <InputField
              text="Registration plate"
              value={registrationPlate}
              setValue={setRegistrationPlate}
              onChangeText={text => setRegistrationPlate(text)}
            />
            <CheckBox
              onPress={() => setLicensed(!licensed)}
              title="I have a non-UK licensed vehicle"
              isChecked={licensed}
            />
            <InputField text="Model" value={model} setValue={setModel} />
            <InputField text="Make" value={make} setValue={setMake} />
            <InputField text="Colour" value={colour} setValue={setColour} />
          </View>
          <View>
            <Text className="px-4 mt-8 text-[#000]">
              Please check here to agree that we will store and process data
              about your vehicle in order to provide you our services
            </Text>
            <CheckBox
              onPress={() => setAgree(!agree)}
              title="I Agree"
              isChecked={agree}
            />
          </View>
          <View className="px-4 mt-10">
            <Button
              disabled={!agree}
              className="bg-[#00BCD4] mb-5"
              mode="contained"
              onPress={handleSubmit}>
              Submit
            </Button>
          </View>
        </SafeAreaView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default RegisterAddVehicle;
