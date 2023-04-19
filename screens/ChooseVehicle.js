import React, {useLayoutEffect, useState, useContext, useEffect} from 'react';

import {Text, Button} from 'react-native-paper';

import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Mercedes, Edit, Toyota, Tesla} from '../assets';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';
import {back} from '../assets';
import {Ionicons} from 'react-native-vector-icons';

import styles from './StyleScreen';

function ChooseVehicleScreen() {
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
  const {
    setBookingDetails,
    bookingDetails,
    renderFetchData,
    setRenderFetchData,
  } = useContext(AuthContext);
  const [vehicleId, setVehicleId] = useState('');
  const [loading, setLoading] = useState(false);
  const [getVehicleData, setGetVehicleData] = useState();

  console.log(bookingDetails,'bookingDetailskislay')

  const getData = async () => {
    setLoading(true);
    const value = await AsyncStorage.getItem('userId');
    const options = {
      method: 'POST',
      url: 'https://splasheroo-backend.herokuapp.com/api/vehicle/get',
      params: {},
      headers: {
        'content-type': 'application/json',
      },
      data: {
        id: value,
      },
    };

    axios
      .request(options)
      .then(response => {
        setGetVehicleData(response.data.vehicle);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
      });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const handleMoveToDate = () => {
    setBookingDetails({
      ...bookingDetails,
      vechile: vehicleId,
    });
    navigation.navigate('pickdate');
  };

  const handleEdit = item => {
    navigation.navigate('addCustomVehicle', {param: item});
  };

  const handleSelected = item => {
    setVehicleId(item._id);
  };

  useEffect(() => {
    getData();
  }, [renderFetchData]);

  const handlePrevios = () => {
    navigation.navigate('ConfirmLocationScreen');
  };

  return (
    <>
      <SafeAreaView className="h-full bg-white">
        <View className="flex-row items-center px-4">
          <Text onPress={handlePrevios}>
            {/* <Ionicons name="arrow-back" size={24} color="black" /> */}
            <Image source={back} />
          </Text>
          <Text className="text-2xl mt-10 ml-20 text-center">
            Choose vehicles
          </Text>
        </View>
        <ScrollView className="px-4">
          {loading && <ActivityIndicator size="large" color="#0B646B" />}
          {getVehicleData?.length > 0 &&
            getVehicleData?.map(item => (
              <TouchableOpacity
                key={item.make}
                onPress={() => handleSelected(item)}
                className={
                  vehicleId === item._id
                    ? 'bg-[#E5FCFF] rounded-2xl mt-3'
                    : 'bg-[#F6FBFF] rounded-2xl mt-3'
                }>
                <View className="flex-row justify-center items-center p-4">
                  <View style={{width: 50}}>
                    <Image source={Mercedes} />
                  </View>
                  <View style={{flex: 1, marginLeft: 10}}>
                    <Text className="text-black">{item.RegistrationPlate}</Text>
                    <Text className="text-black">
                      {item.make} {item.model} {item.coulor}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => handleEdit(item)}>
                    <Image source={Edit} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          <View className="mt-5">
            <Text
              onPress={() => {
                navigation.navigate('FindVehicle',{param: "addBooking"});
              }}
              style={{textAlign: 'center', color: '#055ED0'}}>
              + Add Vehicle
            </Text>
          </View>
        </ScrollView>
        <View className="px-4 text-white py-5">
          <Button
            className={!vehicleId ? 'bg-[#E2EDF6]' : 'bg-[#00BCD4]'}
            disabled={!vehicleId}
            mode="contained"
            onPress={handleMoveToDate}>
            Next
          </Button>
        </View>
      </SafeAreaView>
    </>
  );
}

export default ChooseVehicleScreen;
