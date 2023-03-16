import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ProgressBar, MD3Colors, TextInput, Button} from 'react-native-paper';
import {SelectList} from 'react-native-dropdown-select-list';
import axios from 'axios';

const PostCode = ({formData, setFormData}) => {
  // const [postCode, setPostCode] = useState("S11 0AZ");
  const [getAddress, setGetAddress] = useState([]);
  const {user_address} = formData;

  const handleSearch = async () => {
    const data = await axios.get(
      `https://api.getAddress.io/find/${formData.postCode}?api-key=lmNcjSdtG0W1tLhJc-s81g37988`,
    );
    let filteredArr = data.data.addresses.map(function (str) {
      return str.replace(/,/g, '');
    });
    setGetAddress(filteredArr);
    //setFormData({ ...formData, user_address:data.data.addresses.toString()})
  };

  //LE22FW
  // const data = [
  //     { key: '1', value: 'Address 1' },
  //     { key: '2', value: 'Address 2' },
  //     { key: '3', value: 'Address 3' },
  //     { key: '4', value: 'Address 4' },
  //     { key: '5', value: 'Address 5' },
  //     { key: '6', value: 'Address 6' },
  //     { key: '7', value: 'Address 7' },
  // ]

  const handleSelect = addr => {
    setFormData({...formData, user_address: addr});
  };

  return (
    <View className="self-center">
      <View className="px-4 mt-5 ">
        <Text className="mt-5 text-[17px] text-black">Enter Post Code</Text>
        <View className="mt-3 flex-row justify-between items-center">
          <View className="w-60">
            <TextInput
              mode="outlined"
              label="Post Code"
              className="bg-slate-100"
              value={formData.postCode}
              placeholder="Enter Post Code"
              onChangeText={postCode => {
                setFormData({...formData, postCode});
              }}
            />
          </View>
          <View>
            <TouchableOpacity
              className="relative bottom-0 bg-[#00BCD4] border-none py-4 px-5 h-100 w-100 mt-1 ml-2"
              mode="contained"
              onPress={handleSearch}>
              <Text className="text-white">Search</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="mt-5 w-full">
          {/* <TextInput
                    type="number"
                    label=""
                    disabled
                    multiline
                    value={getAddress.toString()}
                    mode="outlined"
                    className="bg-slate-100 h-90"
                /> */}
          <SelectList
            // setSelected={(address) => {
            //     setFormData({...formData,address.toString()})
            // }}
            boxStyles={{
              borderColor: '#000',
            }}
            dropdownStyles={{
              borderColor: '#000',
            }}
            inputStyles={{
              color: '#000',
            }}
            dropdownTextStyles={{
              color: '#000',
            }}
            setSelected={addr => handleSelect(addr)}
            data={getAddress}
            save="value"
          />
        </View>
      </View>
    </View>
  );
};

export default PostCode;
