import {View, Text, SafeAreaView, Image} from 'react-native';
import React, {useEffect, useContext} from 'react';
import {Button, TextInput, Avatar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {BottomBg, circle} from '../assets';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';

const SuccessBooking = ({route}) => {
  const {setRenderBookingInfo, renderBookingInfo} = useContext(AuthContext);
  const navigation = useNavigation();
  const data = route?.params?.param;

  useEffect(() => {
    const options = {
      method: 'PUT',
      url: 'https://splasheroo-backend.herokuapp.com/api/booking/updatePaymentStatus',
      params: {},
      headers: {
        'content-type': 'application/json',
      },
      data: {
        id: data,
      },
    };

    axios
      .request(options)
      .then(response => {
        console.log(response.data, 'final');
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const hanldeHomeScreen = () => {
    setRenderBookingInfo(renderBookingInfo + 1);
    navigation.navigate('homeScreen');
  };

  return (
    <SafeAreaView className="relative h-full bg-white">
      <View className="flex-row justify-center items-center mt-20">
        <Image source={circle} />
      </View>
      <Text className="text-center mt-4 font-semibold text-black">
        Booking confirmed!
      </Text>
      <Text className="text-center mt-3 px-5 text-black">
        Thank you for booking with us we will get back to you soon
      </Text>
      <View className="px-10 mt-5">
        <Button
          className="bg-[#00BCD4]"
          mode="contained"
          onPress={hanldeHomeScreen}>
          Back Home
        </Button>
      </View>
      <View className="absolute bottom-0">
        <Image source={BottomBg} />
      </View>
    </SafeAreaView>
  );
};

export default SuccessBooking;
