import { View, Text } from 'react-native'
import React from 'react'
import { TextInput, Button } from 'react-native-paper';

const InputField = ({text,value,setValue}) => {
    return (

        <View className="px-4 mt-1">
            <Text className="mt-5 text-[17px] mb-1">{text}</Text>
            <TextInput
                value={value}
                mode="outlined"
                className="bg-slate-100"
                onChangeText={(fullName) => {
                    setValue(fullName)
                }}
            />
        </View>
    )
}

export default InputField