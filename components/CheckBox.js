import {Pressable, StyleSheet, Text, View,Image} from 'react-native';
import {checkbox,checked} from "../assets"
import React from 'react';

const CheckBox = props => {
  const iconName = props.isChecked
    ? 'checkbox-marked'
    : 'checkbox-blank-outline';

  return (
    <View className="flex-row px-4 mt-5 items-center">
      <Pressable onPress={props.onPress}>
        {props.isChecked ?  <Image source={checked} /> : <Image source={checkbox}/>}
        {/* <MaterialCommunityIcons
					name={iconName} size={24} color="#00BCD4" /> */}
      </Pressable>
      <Text>{props.title}</Text>
    </View>
  );
};

export default CheckBox;
