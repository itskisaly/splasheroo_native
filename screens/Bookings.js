import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  BackHandler,
  Image,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Mercedes, Edit, Toyota, Tesla} from '../assets';
import {ProgressBar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import BookingCards from '../components/BookingCards';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Bookings = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [upcomingBookings, setUpComingBookings] = useState();

  const loadData = async () => {
    try {
      setIsLoading(true);
      const value = await AsyncStorage.getItem('userId');
      console.log(value, 'value');
      const options = {
        method: 'GET',
        url: `https://splasheroo-backend.herokuapp.com/api/booking/all/${value}`,
        params: {},
        headers: {
          'content-type': 'application/json',
        },
      };

      axios
        .request(options)
        .then(response => {
          setUpComingBookings(response.data.fullTasks);
          setIsLoading(false);
        })
        .catch(error => {
          setIsLoading(false);
          console.error(error);
        });
    } catch (error) {
      console.error('test---');
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.navigate('Bookings');
        return true;
      },
    );
    return () => backHandler.remove();
  }, []);
  //let toggle = true;

  const [toggle, setToggle] = useState(true);

  return (
    <>
      <ScrollView style={{flex: 1, backgroundColor: '#FFF'}}>
        <View className="flex-row justify-around mt-5">
          <Text
            onPress={() => {
              setToggle(true);
            }}
            style={{
              borderBottomWidth: toggle == true ? 2 : 0,
              borderBottomColor: 'red',
              color: '#000',
            }}>
            Upcoming
          </Text>
          <Text
            style={{color: '#000'}}
            onPress={() => {
              setToggle(false);
            }}>
            Completed
          </Text>
        </View>
        <View className="px-4 mt-3">
          {toggle ? (
            <ProgressBar
              progress={0.5}
              color="#00BCD4"
              style={{backgroundColor: '#F7FBFF'}}
            />
          ) : (
            <ProgressBar
              progress={0.5}
              color="#F7FBFF"
              style={{backgroundColor: '#00BCD4'}}
            />
          )}
        </View>
        {toggle == true ? (
          <View className="pt-4">
            {isLoading ? (
              <ActivityIndicator
                style={{marginTop: 200}}
                color="#0B646B"
                size={'large'}
              />
            ) : (
              upcomingBookings?.length > 0 &&
              upcomingBookings.map(
                upcomingBooking =>
                  upcomingBooking.state !== 'completed' && (
                    <BookingCards
                      key={upcomingBooking._id}
                      upcomingBooking={upcomingBooking}
                      image={Mercedes}
                    />
                  ),
              )
            )}
          </View>
        ) : (
          <View className="pt-4">
            {isLoading ? (
              <ActivityIndicator
                style={{marginTop: 200}}
                color="#0B646B"
                size={'large'}
              />
            ) : (
              upcomingBookings?.length > 0 &&
              upcomingBookings.map(
                upcomingBooking =>
                  upcomingBooking.state === 'completed' && (
                    <BookingCards
                      key={upcomingBooking._id}
                      upcomingBooking={upcomingBooking}
                      image={Mercedes}
                    />
                  ),
              )
            )}
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default Bookings;
