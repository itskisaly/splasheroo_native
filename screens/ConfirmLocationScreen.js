import React, { useLayoutEffect, useContext, useState, useEffect } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import styles from './StyleScreen';
import { SelectList } from 'react-native-dropdown-select-list';
import CheckBox from '../components/CheckBox';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Alert
} from 'react-native';
//import { Ionicons } from 'react-native-vector-icons';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import TextInputNative from '../components/TextInputNative';

const ConfirmLocationScreen = ({ route }) => {
  const data = route?.params?.param;
  const { setBookingDetails, bookingDetails } = useContext(AuthContext);
  const navigation = useNavigation();

  const [landMark, setLandMark] = useState('');
  const [notes, setNotes] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [manually, setMaually] = useState(false);
  const [getAddress, setGetAddress] = useState([]);
  const [addPostCode, setAddPostCode] = useState('');
  const [addressLoading, setAddressLoading] = useState(false);
  const arr = ["le1", "le2", "le3", "le4", "le5", "le6", "le7", "le8", "le9", "le16", "le18", "le19", "le22"];


  const handleSearch = async () => {
    let str = addPostCode.replace(/\s/g, '').toLocaleLowerCase().slice(-3);
    let check = addPostCode.replace(/\s/g, '').toLocaleLowerCase().replace(str, '');

    if(arr.includes(check)) {
      try {
        setAddressLoading(true);
        const data = await axios.get(
          `https://api.getAddress.io/find/${addPostCode}?api-key=lmNcjSdtG0W1tLhJc-s81g37988`,
        );
        let filteredArr = data.data.addresses.map(function (str) {
          return str.replace(/,/g, '');
        });
        setGetAddress(filteredArr);
        setAddressLoading(false);
      } catch (error) {
        setAddressLoading(false);
        Alert.alert('Go for different postcode!!');
      }
    } else {
      setAddressLoading(false);
      Alert.alert('Go for different postcode!!');
    }
  };

  const handleSelect = addr => {
    setLandMark(addr);
  };

  useEffect(() => {
    if (data) {
      setAddPostCode(data);
    }
  }, [data])

  const handlePrevios = () => {
    navigation.navigate('homeScreen');
  };

  const hanldeConfirmLocation = () => {
    setBookingDetails({
      ...bookingDetails,
      postCode: addPostCode,
      location: landMark,
      notes,
    });
    navigation.navigate('ChooseVehicleScreen');
  };



  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView className="h-full w-full bg-white">
          <SafeAreaView className="h-full w-full bg-white ">
            <View className="px-4">
              <Text style={styles.text}>
                Please confirm post code and hit the search bar to find address!
              </Text>
              <View className="self-center">
                <View className="px-4 mt-1">
                  <Text className="mt-5 text-[17px] text-black">
                    Enter Post Code
                  </Text>
                  <View className="flex-row justify-between items-center">
                    <View className="w-60">
                      <TextInput
                        mode="outlined"
                        label="Post Code"
                        textColor="#000"
                        className="bg-slate-100"
                        value={addPostCode}
                        placeholder="Enter Post Code"
                        onChangeText={text => setAddPostCode(text)}
                      />
                    </View>
                    <View>
                      <TouchableOpacity
                        className="relative bottom-0 bg-[#00BCD4] border-none py-4 px-5 h-100 w-100 mt-1 ml-1"
                        mode="contained"
                        onPress={handleSearch}>
                        <Text className="text-white">Search</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  {addressLoading && <ActivityIndicator size="small" color="#0B646B" />}
                  <View className="mt-5 w-full">
                    <SelectList
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
              <View className="mt-5 px-4">
                {/* <CheckBox
                  onPress={() => setMaually(!manually)}
                  title="Enter Address Manually"
                  isChecked={manually}
                /> */}
                <Button
                  className="bg-[#00BCD4]"
                  mode="contained"
                  onPress={() => navigation.navigate('ManualConfirmLOcationScreen')}>
                  Enter Address Manually
                </Button>
              </View>
              {manually &&
                <View className="px-4">
                  <TextInput
                    mode="outlined"
                    label="address"
                    textColor="#000"
                    className="bg-slate-100"
                    value={landMark}
                    placeholder="Enter Post Code"
                    onChangeText={text => setLandMark(text)}
                  />
                </View>
              }
              <View>
                <Text style={styles.subhead}>Notes</Text>
                <TextInputNative setNotes={setNotes} />
              </View>
              <View>
                <Button
                  className={
                    !addPostCode || !landMark ? 'bg-[#E2EDF6] mt-20' : 'bg-[#00BCD4] mt-20'
                  }
                  mode="contained"
                  onPress={hanldeConfirmLocation}
                  disabled={!addPostCode || !landMark}>
                  Confirm Location
                </Button>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      </TouchableWithoutFeedback>
    </>
  );
};

export default ConfirmLocationScreen;
