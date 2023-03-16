import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TextInput} from 'react-native-paper';

const Password = ({formData, setFormData, error, setError}) => {
  const [lowerValidated, setLowerValidated] = useState(false);
  const [upperValidated, setUpperValidated] = useState(false);
  const [specialValidated, setSpecialValidated] = useState(false);
  const [lengthValidated, setLengthValidated] = useState(false);

  const valid = password => {
    let validate = {};
    const lower = new RegExp('(?=.*[a-z])');
    const upper = new RegExp('(?=.*[A-Z])');
    const special = new RegExp('(?=.*[!@#$%^&*])');
    const length = new RegExp('(?=.{8,})');
    if (lower.test(password)) {
      setLowerValidated(true);
      validate.lower = true;
    } else {
      setLowerValidated(false);
    }
    if (upper.test(password)) {
      setUpperValidated(true);
      validate.upper = true;
    } else {
      setUpperValidated(false);
    }
    if (special.test(password)) {
      setSpecialValidated(true);
      validate.special = true;
    } else {
      setSpecialValidated(false);
    }
    if (length.test(password)) {
      setLengthValidated(true);
      validate.length = true;
    } else {
      setLengthValidated(false);
    }
    if (Object.keys(validate).length === 4) {
      setError({...error, passwordError: false});
    } else {
      setError({...error, passwordError: true});
    }
  };

  const handleChange = password => {
    setFormData({...formData, password});
    valid(password);
  };

  useEffect(() => {
    valid(formData.password);
  }, [formData.password]);

  return (
    <View>
      <View className="px-4 mt-5">
        <Text className="mt-5 text-[17px] mb-3">Create Password</Text>
        <TextInput
          label="Enter Password"
          value={formData.password}
          mode="outlined"
          className="bg-slate-100"
          onChangeText={handleChange}
          secureTextEntry={true}
        />
        <View className="flex-column justify-center self-center absolute top-32 items-center mt-5">
          <Text className={lengthValidated ? 'mt-3 text-[#009919]' : 'mt-3'}>
            More than 6 characters
          </Text>
          <Text className={lowerValidated ? 'mt-3 text-[#009919]' : 'mt-3'}>
            Contains Lowercase
          </Text>
          <Text className={upperValidated ? 'mt-3 text-[#009919]' : 'mt-3'}>
            Containse UpperCase
          </Text>
          <Text className={specialValidated ? 'mt-3 text-[#009919]' : 'mt-3'}>
            Contains Special Character
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Password;
