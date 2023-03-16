import React, { useLayoutEffect, useState, useContext, useEffect } from 'react';

import { Text, Button } from 'react-native-paper';

import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Mercedes, Edit, Toyota, Tesla } from '../assets';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

import { back, card } from '../assets';
// import { Ionicons } from 'react-native-vector-icons';

import styles from './StyleScreen';

function SelectCard({ route }) {
  const data = route?.params?.param;
  const navigation = useNavigation();
  const {
    setBookingDetails,
    bookingDetails,
    renderFetchData,
    setRenderFetchData,
  } = useContext(AuthContext);
  const [vehicleId, setVehicleId] = useState('');
  const [loading, setLoading] = useState(false);
  const [getVehicleData, setGetVehicleData] = useState();
  const [userCards, setUserCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const loadData = async () => {
    const value = await AsyncStorage.getItem('userId')
    const options = {
      method: "GET",
      url: `https://splasheroo-backend.herokuapp.com/api/bankCard/details/${value}`,
      params: {},
      headers: {
        "content-type": "application/json",
      }
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response.data.cardList);
        setUserCards(response.data.cardList);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const completePayment = (item) => {
    setIsLoading(true);
    const options = {
      method: 'POST',
      url: 'https://splasheroo-backend.herokuapp.com/api/payment/charge',
      params: {},
      headers: {
        'content-type': 'application/json',
      },
      data: {
        id_customer: data.userId,
        amount: data.total,
        id_service: data.serviceId,
        stripe_customer_id: item.stripeCustomerId
      },
    };
    axios
      .request(options)
      .then(response => {
        console.log(response.data, 'asd');
        if (response?.data?.success) {
          setIsLoading(false);
          navigation.navigate('SuccessBooking', { param: data._id });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    loadData()
  }, [])

  return (
    <>
      <SafeAreaView className="h-full bg-white">
        <View className="flex-row items-center px-4">
          <Text>
            {/* <Ionicons name="arrow-back" size={24} color="black" /> */}
            <Image source={back} />
          </Text>
          <Text className="text-2xl ml-20 text-center text-black">
            Select Card
          </Text>
        </View>
        <ScrollView className="px-4">
          {/* <TouchableOpacity
            onPress={completePayment}
            className="bg-[#E5FCFF] rounded-2xl mt-3">
            <View className="flex-row justify-center items-center p-4">
              <View style={{width: 50}}>
                <Image source={card} />
              </View>
              <View style={{flex: 1, marginLeft: 20}}>
                <Text className="text-black">{data.cardDetails.brand}</Text>
                <Text className="text-black">
                  **** **** **** {data.cardDetails.last4}
                </Text>
              </View>
            </View>
          </TouchableOpacity> */}
          {userCards?.length > 0 &&
            <View className="px-3">
              <Text className="mt-5 text-[17px] mb-2">Your Card</Text>
              {userCards.map((item) => (
                <TouchableOpacity key={item._id} onPress={() => completePayment(item)} className="bg-[#E5FCFF] rounded-2xl mt-3 px-3">
                  <View className="flex-row justify-center items-center p-4">
                    <View style={{ width: 50 }}>
                      <Image source={card} />
                    </View>
                    <View style={{ flex: 1, marginLeft: 20 }}>
                      <Text>{item.brand}</Text>
                      <Text>**** **** **** {item.last4}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
              {isLoading && <ActivityIndicator
                style={{ marginTop: 200 }}
                color="#0B646B"
                size={"large"}
            /> }
            </View>}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default SelectCard;
