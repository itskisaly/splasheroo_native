import React, {useLayoutEffect, useContext, useState, useEffect} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import styles from './StyleScreen';
import {SelectList} from 'react-native-dropdown-select-list';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator
} from 'react-native';
//import { Ionicons } from 'react-native-vector-icons';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';
import TextInputNative from '../components/TextInputNative';

const ConfirmLocationScreen = ({route}) => {
  const data = route?.params?.param;
  const {setBookingDetails, bookingDetails} = useContext(AuthContext);
  const navigation = useNavigation();

  const [postCode, setPostCode] = useState('');
  const [landMark, setLandMark] = useState('');
  const [notes, setNotes] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const hanldeConfirmLocation = () => {
    setBookingDetails({
      ...bookingDetails,
      postCode: addPostCode,
      location: landMark,
      notes,
    });
    navigation.navigate('ChooseVehicleScreen');
  };

  const [getAddress, setGetAddress] = useState([]);
  const [addPostCode, setAddPostCode] = useState('');
  const [addressLoading,setAddressLoading] = useState(false);

  const handleSearch = async () => {
    setAddressLoading(true);
    const data = await axios.get(
      `https://api.getAddress.io/find/${addPostCode}?api-key=lmNcjSdtG0W1tLhJc-s81g37988`,
    );
    let filteredArr = data.data.addresses.map(function (str) {
      return str.replace(/,/g, '');
    });
    setGetAddress(filteredArr);
    setAddressLoading(false);
  };

  const handleSelect = addr => {
    setLandMark(addr);
  };

  useEffect(() => {
    if(data){
      setAddPostCode(data);
    }
  },[data])

  const handlePrevios = () => {
    navigation.navigate('homeScreen');
  };

  console.log(bookingDetails,'bookingDetails')

  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView className="h-full w-full bg-white">
          <ScrollView>
            <View className="px-4">
              <Text style={styles.text}>
                Please let us know your exact address so we can collect the key!
              </Text>
              <View className="self-center">
                <View className="px-4 mt-5">
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
                  {addressLoading && <ActivityIndicator size="small" color="#0B646B"/>}
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

              <View>
                <Text style={styles.subhead}>Notes</Text>
                {/* <TextInput
              className="bg-slate-100"
              style={{ height: 300, margin: 20,textAlignVertical: "top" }}
              placeholder="Any extra information that will help us find your car easily"
              onChangeText={(text) => setNotes(text)}
            /> */}
                <TextInputNative setNotes={setNotes} />
              </View>
              <View>
                <Button
                  className={
                    !addPostCode || !landMark ? 'bg-[#E2EDF6]' : 'bg-[#00BCD4]'
                  }
                  mode="contained"
                  onPress={hanldeConfirmLocation}
                  disabled={!addPostCode || !landMark}>
                  Confirm Location
                </Button>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </>
  );
};

export default ConfirmLocationScreen;
