import React, {useLayoutEffect, useState, useContext} from 'react';
import {View, Text, SafeAreaView, Image} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Banner} from '../assets';

const Signup = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="bg-white h-full">
      <View>
        <Image source={Banner} />
      </View>
      <View>
        <Text className="px-4 text-[17px] text-black">Create Account</Text>
      </View>
      <View className="mt-5 py-5 w-full px-4 text-white">
        <Button
          className="bg-[#00BCD4]"
          mode="contained"
          onPress={() => navigation.navigate('stepForm')}>
          Sign up with Email
        </Button>
      </View>
      <View className="mt-10 px-4 flex-row justify-center align-items-center relative top-10">
        <Text className="text-black">Have an account?</Text>
        <Text
          onPress={() => {
            navigation.navigate('login');
          }}
          className="font-bold ml-1 text-[#00BCD4]">
          Log in
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Signup;
