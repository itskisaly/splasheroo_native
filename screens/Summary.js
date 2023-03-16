import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Image,
  BackHandler,
} from 'react-native';
import React, {useLayoutEffect, useState, useContext, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Button, TextInput, Avatar, ProgressBar} from 'react-native-paper';
import CalendarPicker from 'react-native-calendar-picker';
import {AuthContext} from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {Ionicons} from 'react-native-vector-icons';
import {back} from '../assets';
import axios from 'axios';

const Summary = ({route}) => {
  const data = route?.params?.param;
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        return true;
      },
    );
    return () => backHandler.remove();
  }, []);
  const navigation = useNavigation();
  const [pCode, setPcode] = useState('');
  const {bookingDetails, setBookingDetails} = useContext(AuthContext);
  const [userEmailTemp, setUserEmailTemp] = useState('');
  const [userId, setUSerId] = useState('');
  const [checkPromoCode, setCheckPromoCode] = useState(false);
  const [promocodeLabel, setPromocodeLabel] = useState('');
  const [promoCodePrice, setPromoCodePrice] = useState();
  const [refferenceId, setRefferenceId] = useState('');
  const [cardDetailAvailable, setCardDetailAvailable] = useState(false);
  const [discountPrice, setDiscountPrice] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const {promocode} = bookingDetails;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const getData = async () => {
    const value = await AsyncStorage.getItem('userId');
    const userEmail = await AsyncStorage.getItem('userEmail');
    setUSerId(value);
    setUserEmailTemp(userEmail);
    const options = {
      method: 'GET',
      url: `https://splasheroo-backend.herokuapp.com/api/bankCard/details/${value}`,
      params: {},
      headers: {
        'content-type': 'application/json',
      },
    };

    axios
      .request(options)
      .then(response => {
        if (response.data.success) {
          setCardDetailAvailable(true);
        } else {
          setCardDetailAvailable(false);
        }
      })
      .catch(error => {
        setCardDetailAvailable(false);
        console.error(error);
      });
  };

  const rnd = (len, chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789') =>
    [...Array(len)]
      .map(() => chars.charAt(Math.floor(Math.random() * chars.length)))
      .join('');

  useEffect(() => {
    getData();
    let ref = rnd(7);
    setRefferenceId(ref);
  }, []);

  //console.log(bookingDetails, 'bookingDetails')

  const handleCofirm = () => {
    setIsLoading(true);
    const options = {
      method: 'POST',
      url: 'https://splasheroo-backend.herokuapp.com/api/booking/add',
      params: {},
      headers: {
        'content-type': 'application/json',
      },
      data: {
        userId: userId,
        ref: refferenceId,
        promocode: pCode,
        ...bookingDetails,
      },
    };
    axios
      .request(options)
      .then(response => {
        console.log(response);
        if (response.data.success) {
          const cardData = {
            serviceId: bookingDetails.service,
            total: checkPromoCode ? discountPrice : data.price,
            _id: response.data.task.external_id,
          };
          const selectDetails = {
            ...cardData,
            userId,
          };
          if (cardDetailAvailable) {
            setIsLoading(false);
            navigation.navigate('selectCard', {param: selectDetails});
          } else {
            setIsLoading(false);
            navigation.navigate('cardDetail', {param: cardData});
          }
        }
      })
      .catch(error => {
        setIsLoading(false);
        console.error(error);
      });
  };

  const addPromoCode = () => {
    const options = {
      method: 'GET',
      url: `https://splasheroo-backend.herokuapp.com/api/promoCode/find/${pCode}`,
      params: {},
      headers: {
        'content-type': 'application/json',
      },
    };

    axios
      .request(options)
      .then(response => {
        let expiry = moment(response.data.promoCode[0].expireDate).format(
          'DD/MM/YYYY',
        );
        let endDate = moment(expiry, 'DD/MM/YYYY');
        let current = moment(new Date()).format('DD/MM/YYYY');
        let currentDate = moment(current, 'DD/MM/YYYY');
        let result = endDate.diff(currentDate, 'days');
        if (result > 1) {
          setBookingDetails({
            ...bookingDetails,
            promocode: pCode,
          });
          setCheckPromoCode(true);
          setPromocodeLabel('Promo Code added Successfuly!');
          setPromoCodePrice(response.data.promoCode[0].amount);
          setDiscountPrice(data.price - response.data.promoCode[0].amount);
        }
      })
      .catch(error => {
        // console.error(error);
        setCheckPromoCode(false);
        setPromocodeLabel('Promo Code Invalid!');
      });
  };

  const handlePrevios = () => {
    navigation.navigate('SelectService');
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView className="bg-white">
        <SafeAreaView className="bg-white h-full">
          <View className="px-4 bg-white h-full">
            <View className="flex-row items-center px-4 mt-0">
              <Text className="text=black" onPress={handlePrevios}>
                {/* <Ionicons name="arrow-back" size={24} color="black" /> */}
                <Image source={back} />
              </Text>
              <Text className="text-2xl mt-3 ml-10 text-center text-black">
                Review Summary
              </Text>
            </View>
            <View className="flex-row mt-5 bg-[#F6FBFF] p-5 justify-between border-sm">
              <View>
                <Text className="mt-1 color-[#000000]">Service</Text>
                <Text className="mt-4 color-[#000000]">Date & Time</Text>
                <Text className="mt-4 color-[#000000]">Duration</Text>
                <Text className="mt-4 color-[#000000]">Address</Text>
                <Text className="mt-4 color-[#000000]">Post Code</Text>
                <Text className="mt-4 color-[#000000]">Reference</Text>
              </View>
              <View>
                <Text className="mt-1 text-black">{data?.serviceName}</Text>
                <Text className="mt-4 text-black">
                  {moment(bookingDetails.date).format('DD-MM-YYYY')}
                </Text>
                <Text className="mt-4 text-black">
                  {bookingDetails.startTime}
                  {'-'}
                  {bookingDetails.endTime}
                </Text>
                <Text className="mt-4 text-black">
                  {bookingDetails.location.substring(0, 20)}
                </Text>
                <Text className="mt-4 uppercase text-black">
                  {bookingDetails.postCode}
                </Text>
                <Text className="mt-4 text-black">{refferenceId}</Text>
              </View>
            </View>
            <Text className="mt-5 text-1xl text-black">Promo Code</Text>
            <View className="mt-3 flex-row justify-between items-center">
              <View className="w-60">
                <TextInput
                  mode="outlined"
                  label="Promo Code"
                  className="bg-slate-100"
                  value={pCode}
                  onChangeText={text => setPcode(text)}
                />
              </View>
              <View>
                <TouchableOpacity
                  className="relative bottom-0 bg-[#00BCD4] rounded-full py-4 px-5 h-100 w-100"
                  mode="contained"
                  onPress={addPromoCode}>
                  <Text className="text-white text-1xl">+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text className="mt-3 text-[#00BCD4]">{promocodeLabel}</Text>
            <View className="flex-row mt-5 p-10 justify-between bg-[#F6FBFF]">
              <View>
                <Text className="color-[#000000] text-lg">Full Service</Text>
                {checkPromoCode && (
                  <Text className="text-[#00BCD4] text-lg mt-4">Promo</Text>
                )}
                <Text className="color-[#000000] text-lg mt-4">Total</Text>
              </View>
              <View>
                <Text className="text-lg text-black">£{data.price}</Text>
                {checkPromoCode && (
                  <Text className="text-lg text-[#00BCD4] mt-4">
                    -£{promoCodePrice}
                  </Text>
                )}
                <Text className="text-lg mt-4 text-black">
                  £{checkPromoCode ? discountPrice : data.price}
                </Text>
              </View>
            </View>
            <View className="relative mb-3 mt-20 px-4 w-full text-white">
              {isLoading ? (
                <ActivityIndicator size="large" color="#0B646B" />
              ) : (
                <Button
                  className="bg-[#00BCD4]"
                  // disabled={selectedTime}
                  mode="contained"
                  onPress={handleCofirm}>
                  Proceed to Payment
                </Button>
              )}
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default Summary;
