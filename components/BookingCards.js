import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import moment from 'moment';

const BookingCards = ({image, upcomingBooking}) => {
  return (
    <View
      style={{
        margin: 15,
        borderColor: '#00BCD4',
        padding: 20,
        backgroundColor: '#F7FBFF',
        borderRadius: 15,
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontWeight: 'bold', color: '#000'}}>
          {upcomingBooking?.reference}
        </Text>
        <Text
          style={{
            fontSize: 10,
            padding: 5,
            paddingHorizontal: 15,
            color: 'white',
            borderRadius: 20,
            backgroundColor: '#055ED0',
          }}>
          {upcomingBooking?.service?.serviceName}
        </Text>
      </View>
      <Text className="mt-3 text-black">
        {upcomingBooking?.address?.raw_address}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <Text className="text-black">
          {moment(upcomingBooking.date).format('MM-DD-YYYY')}
        </Text>
        <Text style={{color: '#000'}}>
          {upcomingBooking?.startTime} - {upcomingBooking?.endTime}
        </Text>
      </View>
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <View style={{width: 50}}>
          <Image source={image} />
        </View>
        <View>
          <Text style={{fontWeight: 'bold', color: '#000'}}>
            {upcomingBooking?.car?.model}
          </Text>
          <Text className="text-black">
            {upcomingBooking?.car?.RegistrationPlate}
          </Text>
        </View>
        <View style={{flex: 1}}>
          <Text
            style={{
              textAlign: 'right',
              marginRight: 20,
              color: '#00BCD4',
              fontSize: 25,
            }}>
            ...
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BookingCards;
