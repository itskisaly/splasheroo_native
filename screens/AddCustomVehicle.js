import React, {useEffect, useLayoutEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Banner} from '../assets';
import CheckBox from '../components/CheckBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputField from '../components/InputField';
// import { Ionicons } from '@expo/vector-icons';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';
import {back} from '../assets';

const AddCustomVehicle = ({route}) => {
  const data = route?.params?.param;
  const navigation = useNavigation();
  const {userInfo, setRenderFetchData, renderFetchData} =
    useContext(AuthContext);
  const [registrationPlate, setRegistrationPlate] = useState();
  const [currentUserId, setCurrentUserId] = useState();
  const [model, setModel] = useState();
  const [make, setMake] = useState();
  const [colour, setColour] = useState();
  const [licensed, setLicensed] = useState(false);
  const [agree, setAgree] = useState(false);

  const getData = async () => {
    const value = await AsyncStorage.getItem('userId');
    setCurrentUserId(value);
  };

  const handleSubmit = () => {
    const options = {
      method: 'POST',
      url: 'https://splasheroo-backend.herokuapp.com/api/vehicle/add',
      params: {},
      headers: {
        'content-type': 'application/json',
      },
      data: {
        id: currentUserId,
        RegistrationPlate: registrationPlate,
        licence: true,
        model,
        make,
        coulor: colour,
      },
    };
    console.log({
      id: currentUserId,
      RegistrationPlate: registrationPlate,
      licence: true,
      model,
      make,
      coulor: colour,
    });

    axios
      .request(options)
      .then(response => {
        if (response) {
          navigation.navigate('ChooseVehicleScreen');
          setRenderFetchData(!renderFetchData);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleUpdate = () => {
    const options = {
      method: 'POST',
      url: 'https://splasheroo-backend.herokuapp.com/api/vehicle/update',
      params: {},
      headers: {
        'content-type': 'application/json',
      },
      data: {
        id: data._id,
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
        console.log(response.data);
        navigation.navigate('ChooseVehicleScreen');
        setRenderFetchData(!renderFetchData);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (data) {
      setRegistrationPlate(data.RegistrationPlate);
      setModel(data.model);
      setMake(data.make);
      setColour(data.coulor);
    }
  }, [data]);

  console.log(data, 'data000');

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView className="px-4 mt-5 h-full w-full bg-white">
        {/* <Text className="text-lg text-center">
                Add your vehicle
            </Text> */}
        <View className="flex-row px-4 items-center">
          <Text onPress={() => navigation.navigate('ChooseVehicleScreen')}>
            <Image source={back} />
          </Text>
          <Text className="text-lg ml-20 text-center text-black">
            Add your custom vehicle
          </Text>
        </View>
        <View className="px-4">
          <Text className="mt-5 text-[17px] mb-1 text-black">
            Registration Plate
          </Text>
          <TextInput
            mode="outlined"
            className="bg-slate-100"
            text="Registration plate"
            value={registrationPlate}
            onChangeText={text => setRegistrationPlate(text)}
          />
          <CheckBox
            onPress={() => setLicensed(!licensed)}
            title="I have a non-UK licensed vehicle"
            isChecked={licensed}
          />
          <Text className="mt-5 text-[17px] mb-1 text-black">Model</Text>
          <TextInput
            mode="outlined"
            className="bg-slate-100"
            text="Model"
            value={model}
            onChangeText={text => setModel(text)}
          />
          <Text className="mt-5 text-[17px] mb-1 text-black">Make</Text>
          <TextInput
            mode="outlined"
            className="bg-slate-100"
            text="Make"
            value={make}
            onChangeText={text => setMake(text)}
          />
          <Text className="mt-5 text-[17px] mb-1 text-black">Colour</Text>
          <TextInput
            mode="outlined"
            className="bg-slate-100"
            text="Colour"
            value={colour}
            onChangeText={text => setColour(text)}
          />
        </View>
        <View>
          <Text className="px-4 mt-8 text-[#000]">
            Please check here to agree that we will store and process data about
            your vehicle in order to provide you our services
          </Text>
          <CheckBox
            onPress={() => setAgree(!agree)}
            title="I Agree"
            isChecked={agree}
          />
        </View>
        <View className="px-4 mt-10">
          {data ? (
            <Button
              className="bg-[#00BCD4]"
              mode="contained"
              onPress={handleUpdate}>
              Update
            </Button>
          ) : (
            <Button
              disabled={!agree}
              className="bg-[#00BCD4]"
              mode="contained"
              onPress={handleSubmit}>
              Submit
            </Button>
          )}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default AddCustomVehicle;
