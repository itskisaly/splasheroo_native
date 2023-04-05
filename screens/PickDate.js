import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
  BackHandler,
} from 'react-native';
import React, { useLayoutEffect, useState, useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import CalendarPicker from 'react-native-calendar-picker';
import { AuthContext } from '../context/AuthContext';
import { Ionicons } from 'react-native-vector-icons';
import moment from 'moment-timezone';
import { back } from '../assets';
import axios from 'axios';
import { transparent } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const PickDate = () => {
  const [selectedDate, setSelectDate] = useState();
  const [selectedTime, setSelectTime] = useState({
    id: '',
    startTime: '',
    endTime: '',
  });
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
  const minDate = moment.tz("Europe/London").format("YYYY-MM-DD") // Today
  // const maxDate = new Date(
  //   minDate.getFullYear(),
  //   minDate.getMonth() + 3,
  //   minDate.getDate(),
  // ).toLocaleDateString();
  const [maxDay, setMaxDay] = useState('');
  const { setBookingDetails, bookingDetails } = useContext(AuthContext);
  const [allTime, setAllTime] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [slotsAvailable, setSlotsAvailable] = useState(false);
  const { startTime, endTime, date } = bookingDetails;

  const loadDate = async isDate => {
    setIsLoading(true);
    const _data = await axios.get(
      `https://splasheroo-backend.herokuapp.com/api/slot/getSlotsAvailability/${isDate}`,
    );
    //let temp = false;
    // _data.data.slots.map(element => {
    //   if (moment.tz(element.startTime, "Europe/London").hours() > moment.tz("Europe/London").hours()
    //     && element.isEnabled === true && element.slotsLeft > 0) {

    //     console.log('yyyyyy')
    //     temp = true;
    //   }
    //   console.log('ininini')
    // })
    // let today = moment.tz("Europe/London");
    // let diff = moment.tz(selectedDate, "Europe/London");
    // if(diff.isAfter(today))
    // temp = true
    // console.log(temp,'tesmp--')
    // temp ? setSlotsAvailable(true) : setSlotsAvailable(false);
    setAllTime(_data.data.slots);
    setIsLoading(false);
  };

  useEffect(() => {
    setSelectDate(moment.tz("Europe/London").format('YYYY-MM-DD'));
    loadDate(moment.tz("Europe/London").format('YYYYMMDD'));
  }, []);

  const onDateChange = date => {
    setSelectDate(date);
    loadDate(moment.tz(date, "Europe/London").format('YYYYMMDD'));
  };

  const handleTime = value => {
    setSelectTime({
      id: value._id,
      startTime: value.startTime,
      endTime: value.endTime,
    });
  };

  const handleNext = () => {
    setBookingDetails({
      ...bookingDetails,
      startTime: moment.utc(selectedTime.startTime).hour() + ':' + '00',
      endTime: moment.utc(selectedTime.endTime).hour() + ':' + '00',
      date: selectedDate,
    });
    navigation.navigate('SelectService');
  };

  const handlePrevios = () => {
    navigation.navigate('ChooseVehicleScreen');
  };

  const Temp = () => {
   setSlotsAvailable(true); 
    return true;
  }

  useEffect(() => {
    console.log(selectedDate,'selectedDate00')
  },[selectedDate])




  console.log(selectedDate, 'selectedDate')
  return (
    <SafeAreaView className="bg-white h-full">
      <View className="flex-row items-center px-4">
        <Text onPress={handlePrevios}>
          {/* <Ionicons name="arrow-back" size={24} color="black" /> */}
          {/* <Image source={back} /> */}
        </Text>
        {/* <Text className="text-2xl ml-20 text-center">Pick a date and time</Text> */}
      </View>
      <View className="px-4 mt-5 bg-[#F6FBFF] rounded-2xl">
        <CalendarPicker
          minDate={minDate}
          initialDate={minDate}
          //todayBackgroundColor="#e6ffe6"
          selectedDayColor="#00BCD4"
          selectedDayTextColor="#000000"
          // maxDate={maxDate}
          todayBackgroundColor="#F6FBFF"
          selectedStartDate={minDate}
          onDateChange={onDateChange}
          width={360}
        />
      </View>
      <Text className="text-center mt-3 text-black">
        {moment.tz(selectedDate, "Europe/London").format('DD-MM-YYYY')}
      </Text>
      {isLoading ? (
        <ActivityIndicator
          style={{ marginTop: 200 }}
          color="#0B646B"
          size={'large'}
        />
      ) : (
        <>
          <ScrollView className="px-5">
            {allTime.map(item => (
              <>
                {moment.tz(selectedDate, "Europe/London").format('DD-MM-YYYY') ===
                  moment.tz("Europe/London").format('DD-MM-YYYY')
                  ? moment.tz(item.startTime, "Europe/London").hour() > moment.tz("Europe/London").hour() &&
                  item.slotsLeft > 0 && (
                    <TouchableOpacity
                      key={Math.random() * 100}
                      onPress={() => handleTime(item)}
                      className={
                        selectedTime.id === item._id
                          ? 'bg-[#00BCD4] mt-5 p-5 rounded-xl border-inherit'
                          : 'bg-[#E2EDF6] mt-5 p-5 rounded-xl border-inherit'
                      }>
                      <Text
                        className={
                          selectedTime === item.startTime
                            ? 'text-center text-white'
                            : 'text-center'
                        }>
                        {moment.tz(item.startTime, "Europe/London").hour() + ':' + '00'} {'-'}{' '}
                        {moment.tz(item.endTime, "Europe/London").hour() + ':' + '00'}
                      </Text>
                    </TouchableOpacity>
                  )
                  : item.slotsLeft > 0 && (
                    <TouchableOpacity
                      key={item.startTime}
                      onPress={() => handleTime(item)}
                      className={
                        selectedTime.id === item._id
                          ? 'bg-[#00BCD4] mt-5 p-5 rounded-xl border-inherit'
                          : 'bg-[#E2EDF6] mt-5 p-5 rounded-xl border-inherit'
                      }>
                      <Text
                        className={
                          selectedTime === item.startTime
                            ? 'text-center text-white'
                            : 'text-center'
                        }>
                        {moment.tz(item.startTime, "Europe/London").hour() + ':' + '00'} {'-'}{' '}
                        {moment.tz(item.endTime, "Europe/London").hour() + ':' + '00'}
                      </Text>
                    </TouchableOpacity>
                  )}
              </>
            ))}
          </ScrollView>
          <View className="px-4 text-white py-5 mt-5 mb-5">
            <Button
              className={
                !selectedTime.startTime ? 'bg-[#E2EDF6]' : 'bg-[#00BCD4]'
              }
              disabled={!selectedTime.startTime}
              mode="contained"
              onPress={handleNext}>
              Next
            </Button>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default PickDate;
