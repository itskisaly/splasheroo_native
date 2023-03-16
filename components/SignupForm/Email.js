import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ProgressBar, MD3Colors, TextInput, Button} from 'react-native-paper';

const Email = ({formData, setFormData, error, setError}) => {
  const [emailErrorLabel, setEmailErrorLabel] = useState('');

  const handleChange = email => {
    setFormData({...formData, email});
    if (email.includes('@') && email.includes('.')) {
      setError(false);
      setError({...error, emailError: false});
    } else {
      setError(true);
      setError({...error, emailError: true});

      setEmailErrorLabel('Inavlid Email');
    }
  };

  return (
    <View>
      <View className="px-4 mt-5">
        <Text className="text-black mt-5 text-[17px] mb-5">Email Address</Text>
        <TextInput
          type="email"
          label="Enter Email"
          value={formData.email}
          mode="outlined"
          className="bg-slate-100"
          onChangeText={handleChange}
        />
        <Text
          className={
            !error.emailError
              ? 'text-center mt-3 text-[#009919]'
              : 'text-center mt-3'
          }>
          Email must be valid
        </Text>
      </View>
    </View>
  );
};

export default Email;
