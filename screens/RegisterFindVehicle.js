import React, {useLayoutEffect, useState} from 'react';
import {View, Text, SafeAreaView, Image, TouchableOpacity, Alert,ActivityIndicator} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Banner} from '../assets';
import CheckBox from '../components/CheckBox';
import axios from 'axios';

const RegisterFindVehicle = ({route}) => {
  const data = route?.params?.param;
  const navigation = useNavigation();
  const [registrationPlate, setRegistrationPlate] = useState();
  const [licensed, setLicensed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleNavigation = () => {
    setIsLoading(true);
    if(licensed){
      const _data = {
        uk:"non-uk"
      }
      navigation.navigate('RegisterAddVehicle',{param: _data});
    } else {
    const options = {
      method: 'POST',
      url: 'https://splasheroo-backend.herokuapp.com/api/vehicle/getUKVD',
      params: {},
      headers: {
        'content-type': 'application/json',
      },
      data: {
        registrationPlate: registrationPlate,
      },
    };

    axios
      .request(options)
      .then(response => {
        const _data = {
          registrationPlate: registrationPlate,
          data: response.data,
        };
        setIsLoading(false);
        navigation.navigate('RegisterAddVehicle', {param: _data});
        console.log(response.data);
      })
      .catch(error => {
        setIsLoading(false);
        Alert.alert('Oops were unable to find your vehicle. Please add the details manually.');
        console.error(error);
      });
    }
  };

  return (
    <SafeAreaView className="px-4 mt-5 h-full w-full">
      <Text className="text-lg text-center">Find your vehicle</Text>
      <Text className="px-5 mt-5 py-2">Registration plate</Text>
      <View className="mt-1 px-4 flex-row justify-between items-center">
        <View className="w-52">
          <TextInput
            mode="outlined"
            label="Registration plate"
            className="bg-slate-100"
            value={registrationPlate}
            placeholder="Registration plate"
            onChangeText={registrationPlate => {
              setRegistrationPlate(registrationPlate);
            }}
          />
        </View>
        <View>
          {isLoading ? <ActivityIndicator size="large" color="#0B646B" /> : 
          <Button
          disabled={!registrationPlate}
          className="bg-[#00BCD4] border-none py-1 px-1 h-100"
          style={{
            width: 110,
          }}
          mode="contained"
          onPress={handleNavigation}>
            <Text>{!licensed ? "Search" : "Add"}</Text>
          </Button>
          }
        </View>
      </View>
      <View>
        <CheckBox
          onPress={() => setLicensed(!licensed)}
          title="Manually add vehicle"
          isChecked={licensed}
        />
      </View>
    </SafeAreaView>
  );
};

export default RegisterFindVehicle;
