import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {ProgressBar, MD3Colors, TextInput, Button} from 'react-native-paper';

const PhoneNumber = ({formData, setFormData, error, setError}) => {
  const handleChange = phoneNumber => {
    setFormData({...formData, phoneNumber});
    if (phoneNumber.length >= 10) {
      setError(false);
      setError({...error, phoneError: false});
    } else {
      setError(true);
      setError({...error, phoneError: true});
    }
  };

  return (
    <View>
      <View className="px-4 mt-5">
        <Text className="text-black mt-5 text-[17px] mb-5">
          Enter Phone Number
        </Text>
        <TextInput
          type="number"
          label="Enter Phone Number"
          value={formData.phoneNumber}
          mode="outlined"
          className="bg-slate-100"
          onChangeText={handleChange}
        />
        <Text
          className={
            !error.phoneError
              ? 'text-center mt-3 text-[#009919]'
              : 'text-center mt-3'
          }>
          Phone number must have 10 digits
        </Text>
      </View>
    </View>
  );
};

export default PhoneNumber;
