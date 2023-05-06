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
  Alert,
  ActivityIndicator
} from 'react-native';
//import { Ionicons } from 'react-native-vector-icons';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import TextInputNative from '../components/TextInputNative';

const ManualConfirmLOcationScreen = () => {
  const { setBookingDetails, bookingDetails } = useContext(AuthContext);
  const navigation = useNavigation();

  const [landMark, setLandMark] = useState('');
  const [notes, setNotes] = useState('');


  const [addPostCode, setAddPostCode] = useState('');
 

  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [town, setTown] = useState("");
  const [country,setCountry]=useState("");
  const arr = ["le1", "le2", "le3", "le4", "le5", "le6", "le7", "le8", "le9", "le16", "le18", "le19", "le22"];




  const hanldeConfirmLocation = () => {
    let str = addPostCode.replace(/\s/g, '').toLocaleLowerCase().slice(-3);
    let check = addPostCode.replace(/\s/g, '').toLocaleLowerCase().replace(str, '');
   
    if(arr.includes(check)){
    const _landMark = addressLine1 + " " + addressLine2 + " " + town + " " + country
    setBookingDetails({
      ...bookingDetails,
      postCode: addPostCode,
      location: _landMark,
      notes,
    });
    navigation.navigate('ChooseVehicleScreen');
    } else {
      Alert.alert('Try for different postcodes')
    }
  };



  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView>
          <SafeAreaView className="h-full w-full bg-white">
            <View className="px-4 mt-4">
              <Text style={styles.text}>
                Please let us know your exact address so we can collect the key!
              </Text>
              <View className="px-4">
                <TextInput
                  mode="outlined"
                  label="Post Code"
                  textColor="#000"
                  className="bg-slate-100"
                  value={addPostCode}
                  placeholder="Enter Post Code"
                  onChangeText={text => setAddPostCode(text)}
                />
                <TextInput
                  mode="outlined"
                  label="Address Line 1"
                  textColor="#000"
                  className="bg-slate-100 mt-4"
                  value={addressLine1}
                  placeholder="Enter Address Line 1"
                  onChangeText={text => setAddressLine1(text)}
                />

                <TextInput
                  mode="outlined"
                  label="Address Line 2"
                  textColor="#000"
                  className="bg-slate-100 mt-4"
                  value={addressLine2}
                  placeholder="Enter Address Line 2"
                  onChangeText={text => setAddressLine2(text)}
                />
                <TextInput
                  mode="outlined"
                  label="Town Or City"
                  textColor="#000"
                  className="bg-slate-100 mt-4"
                  value={town}
                  placeholder="Enter Town Or City"
                  onChangeText={text => setTown(text)}
                />
                <TextInput
                  mode="outlined"
                  label="Country"
                  textColor="#000"
                  className="bg-slate-100 mt-4"
                  value={country}
                  placeholder="Enter Country"
                  onChangeText={text => setCountry(text)}
                />
              </View>
              <View>
                <Text style={styles.subhead}>Notes</Text>
                <TextInputNative setNotes={setNotes} />
              </View>
              <View>
                <Button
                  className={
                    !addPostCode || !addressLine1 || !country ? 'bg-[#E2EDF6]' : 'bg-[#00BCD4]'
                  }
                  mode="contained"
                  onPress={hanldeConfirmLocation}
                  disabled={!addPostCode || !addressLine1 || !country}
                  >
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

export default ManualConfirmLOcationScreen;
