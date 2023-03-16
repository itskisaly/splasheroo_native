import {useState, useEffect, useContext} from 'react';

import GetLocation from 'react-native-get-location';

import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-paper';

import {AuthContext} from '../context/AuthContext';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, {Callout, Circle, Marker} from 'react-native-maps';
import {mapPin, Mercedes} from '../assets';

import pin2 from '../assets/pin2.png';
import BookingCards from '../components/BookingCards';
import axios from 'axios';

const HomeScreen = () => {
  const navigation = useNavigation();
  const {setBookingDetails, bookingDetails, renderBookingInfo} =
    useContext(AuthContext);

  const [pin, setPin] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  const [upcomingBooking, setUpComingBooking] = useState();
  const [userAddress, setUserAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [delta, setDelta] = useState({
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [found, setFound] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    const value = await AsyncStorage.getItem('userId');
    const options = {
      method: 'GET',
      url:   `https://splasheroo-backend.herokuapp.com/api/booking/updated/${value}`,
      params: {},
      headers: {
        'content-type': 'application/json',
      },
    };

    axios
      .request(options)
      .then(response => {
        setUpComingBooking(response.data.fullTasks[0]);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        console.log(location);
        setPin({
          latitude: location.latitude,
          longitude: location.longitude,
        });
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.navigate('homeScreen');
        return true;
      },
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    loadData();
  }, [renderBookingInfo]);

  const handleCofirmLocation = () => {
    setBookingDetails({
      ...bookingDetails,
      latitude: pin.latitude,
      longitude: pin.longitude,
      address: userAddress,
    });
    navigation.navigate('ConfirmLocationScreen');
  };

  return (
    <>
      <GooglePlacesAutocomplete
        placeholder="Enter Location"
        fetchDetails={true}
        styles={{
          container: {
            flex: 0,
            position: 'absolute',
            width: 372,
            alignSelf: 'center',
            zIndex: 1,
            margin: 10,
          },
          listView: {
            backgroundColor: 'white',
          },
          textInput: {
            color: '#000',
          },
          description: {
            color: '#000',
          },
        }}
        onPress={(data, details = null) => {
          setUserAddress(data.description);
          setPin({
            latitude: details?.geometry?.location.lat,
            longitude: details?.geometry?.location.lng,
          });
        }}
        query={{
          key: 'AIzaSyDHT7BzneZ4BDuC3D6TVmC4JOm7wZoZ_Ss',
          language: 'en',
        }}
      />
      <ScrollView style={{backgroundColor: '#FFFFFF'}}>
        <View style={styles.mapView}>
          {found === true ? (
            <MapView
              region={{
                latitude: pin.latitude,
                longitude: pin.longitude,
                latitudeDelta: 0.0022,
                longitudeDelta: 0.0021,
              }}
              style={styles.map}>
              <Marker
                coordinate={pin}
                draggable={true}
                onDragStart={e => {
                  console.log('Dragstart', e.nativeEvent.coordinate);
                }}
                image={pin2}
                onDragEnd={e => {
                  setPin({
                    latitude: e.nativeEvent.coordinate.latitude,
                    longitude: e.nativeEvent.coordinate.longitude,
                  });
                  console.log(pin);
                }}>
                <Callout>
                  <Text>Your Vehicle!</Text>
                </Callout>
              </Marker>
            </MapView>
          ) : (
            <ActivityIndicator
              style={{marginTop: 200}}
              color="red"
              size={'large'}
            />
          )}
        </View>
        <View
          style={{
            width: '100%',
            height: 400,
            backgroundColor: 'white',
          }}></View>
        <View
          style={{
            width: '100%',
            position: 'absolute',
            backgroundColor: 'white',
            alignSelf: 'center',
            borderRadius: 10,
            top: 450,
          }}>
          <View
            style={{
              marginTop: 10,
              width: 50,
              borderWidth: 1,
              borderColor: '#9B9B9B',
              height: 5,
              borderRadius: 10,
              marginBottom: 20,
              alignSelf: 'center',
            }}></View>
          <View>
            {upcomingBooking ? (
              <>
                <Text
                  style={{
                    fontSize: 12,
                    marginLeft: 20,
                    color: '#000',
                  }}>
                  UPCOMING
                </Text>
                <BookingCards
                  upcomingBooking={upcomingBooking}
                  image={Mercedes}
                />
              </>
            ) : null}
          </View>
          <View>
            <Text
              style={{
                marginHorizontal: 20,
                fontSize: 16,
                marginTop: 10,
                color: '#000',
              }}>
              Where's your Vehicle?
            </Text>
            <Text style={{padding: 20, color: '#000'}}>
              Hold and Move the pin to highlight the correct location of your
              car - it really helps!
            </Text>
          </View>
          <View>
            <Button
              style={{
                marginHorizontal: 10,
                marginTop: 10,
              }}
              onPress={handleCofirmLocation}
              className="bg-[#00BCD4]"
              mode="contained">
              Submit
            </Button>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  mapView: {
    flex: 1,
    height: 500,
    width: '100%',
    maxHeight: 500,
  },
  map: {
    height: 500,
    width: '100%',
  },
});

export default HomeScreen;
