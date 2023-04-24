// React Native Navigation Drawer
// https://aboutreact.com/react-native-navigation-drawer/
import 'react-native-gesture-handler';

import * as React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {useNavigation} from '@react-navigation/native';

import {
  Image,
  Text,
  View,
  StyleSheet,
  Linking,
  Alert,
  TouchableOpacity,
} from 'react-native';

import homeIcon from '../assets/home.png';
import bookingIcon from '../assets/Booking.png';
import carIcon from '../assets/car.png';
import accountIcon from '../assets/account.png';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';

import logo from '../assets/logo.png';

import terms from '../assets/Terms.png';

import HomeScreen from '../screens/HomeScreen';
import Bookings from '../screens/Bookings';
import GetVehicle from '../screens/GetVehicle';
import AccountDetails from '../screens/AccountDetails';

import LoginScreen from '../screens/LoginScreen';
import Signup from '../screens/Signup';
import StepForm from '../screens/StepForm';
import FindVehicle from '../screens/FindVehicle';
import TempScreen from '../screens/TempScreen';
import VerifyScreen from '../screens/VerifyScreen';
import AddCustomVehicle from '../screens/AddCustomVehicle';
import ConfirmLocationScreen from '../screens/ConfirmLocationScreen';
import ManualConfirmLOcationScreen from '../screens/ManualConfirmLocationScreen';
import ChooseVehicleScreen from '../screens/ChooseVehicle';
import RegisterAddVehicle from "../screens/RegisterAddVehicle";
import RegisterFindVehicle from '../screens/RegisterFindVehicle';

import AddVehicle from '../screens/AddVehicle';

import {createNavigationContainerRef} from '@react-navigation/native';
const navigationRef = createNavigationContainerRef();

function navigate(name) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name);
  }
}

import menuIcon from '../assets/menu.png';

import PickDate from '../screens/PickDate';
import SelectService from '../screens/SelectService';
import Summary from '../screens/Summary';
import CardDetail from '../screens/CardDetail';
import SelectCard from '../screens/SelectCard';
import SuccessBooking from '../screens/SuccessBooking';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

import {DrawerActions} from '@react-navigation/native';
import AddHomeVehicle from '../screens/AddHomeVehicle';
import AddCard from '../screens/AddCard';

const FirstScreenStack = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ConfirmLocationScreen"
        options={{
          headerTitle: 'Confirm Location',
        }}
        component={ConfirmLocationScreen}
      />
      <Stack.Screen
        name="ManualConfirmLOcationScreen"
        options={{
          headerTitle: 'Confirm Location',
        }}
        component={ManualConfirmLOcationScreen}
      />
      <Stack.Screen
        name="stepForm"
        component={StepForm}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FindVehicle"
        component={FindVehicle}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddVehicle"
        component={AddVehicle}
        options={{
          headerShown: false,
        }}
      />
        <Stack.Screen
        name="RegisterAddVehicle"
        component={RegisterAddVehicle}
        options={{
          headerShown: false,
        }}
      />
        <Stack.Screen
        name="RegisterFindVehicle"
        component={RegisterFindVehicle}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="verifyScreen"
        component={VerifyScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="addCustomVehicle"
        component={AddCustomVehicle}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="addHomeVehicle"
        component={AddHomeVehicle}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Bookings"
        component={Bookings}
        options={{
          headerLeft: () => {
            return (
              <>
                <TouchableOpacity
                  onPress={() => {
                    navigation.dispatch(DrawerActions.toggleDrawer());
                  }}>
                  <Image
                    source={menuIcon}
                    style={{
                      height: 45,
                      width: 45,
                      marginTop: 10,
                    }}
                  />
                </TouchableOpacity>
              </>
            );
          },
        }}
      />
      <Stack.Screen
        name="Account"
        component={AccountDetails}
        options={{
          headerLeft: () => {
            return (
              <>
                <TouchableOpacity
                  onPress={() => {
                    navigation.dispatch(DrawerActions.toggleDrawer());
                  }}>
                  <Image
                    source={menuIcon}
                    style={{
                      height: 45,
                      width: 45,
                      marginTop: 10,
                    }}
                  />
                </TouchableOpacity>
              </>
            );
          },
        }}
      />
      <Stack.Screen
        name="Vehicles"
        component={GetVehicle}
        options={{
          headerLeft: () => {
            return (
              <>
                <TouchableOpacity
                  onPress={() => {
                    navigation.dispatch(DrawerActions.toggleDrawer());
                  }}>
                  <Image
                    source={menuIcon}
                    style={{
                      height: 45,
                      width: 45,
                      marginTop: 10,
                    }}
                  />
                </TouchableOpacity>
              </>
            );
          },
        }}
      />
      <Stack.Screen
        name="homeScreen"
        component={HomeScreen}
        options={{
          header: () => {
            return (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    marginTop:40 //for ios
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.dispatch(DrawerActions.toggleDrawer());
                    }}>
                    <Image
                      source={menuIcon}
                      style={{
                        height: 45,
                        width: 45,
                        marginTop: 15,
                      }}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      marginLeft: 100,
                      marginTop: 20,
                      color: '#00bcd4',
                      fontWeight: 'bold',
                      fontSize: 18,
                    }}>
                    SPLASHEROO
                  </Text>
                </View>
              </>
            );
          },
        }}
      />
      <Stack.Screen
        name="pickdate"
        component={PickDate}
        options={{
          headerTitle: 'Pick a date and time',
        }}
      />
      <Stack.Screen name="SelectService" component={SelectService} />
      <Stack.Screen name="summary" component={Summary} />
      <Stack.Screen name="cardDetail" component={CardDetail} />
      <Stack.Screen name="addCard" component={AddCard} />
      <Stack.Screen name="selectCard" component={SelectCard} />
      <Stack.Screen
        name="SuccessBooking"
        component={SuccessBooking}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChooseVehicleScreen"
        component={ChooseVehicleScreen}
      />
    </Stack.Navigator>
  );
};

const SecondScreenStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="booking"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="booking" component={Bookings} />
    </Stack.Navigator>
  );
};

const ThirdScreenStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="GetVehincle"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="GetVehincle" component={GetVehicle} />
    </Stack.Navigator>
  );
};

const FourthScreenStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="account"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="account" component={AccountDetails} />
    </Stack.Navigator>
  );
};

let map = {
  home: true,
  booking: false,
  GetVehicle: false,
  account: false,
};

function changeSelect() {
  map['home'] = false;
  map['booking'] = false;
  map['GetVehicle'] = false;
  map['account'] = false;

  // console.log(map);
}

function Mydrawer() {
  const navigation = useNavigation();
  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('userEmail');
    navigation.navigate('login');
    // navigationRef.navigate('login');
  };

  return (
    <Drawer.Navigator
      initialRouteName="home"
      drawerContent={() => {
        return (
          <>
            <Image
              source={logo}
              style={{
                //marginHorizontal: 30,
                alignSelf: 'center',
                marginTop: 30,
                height: 200,
                width: 200,
              }}
            />
            <Text
              style={{
                color: '#00BCD4',
                fontSize: 20,
                textAlign: 'center',
                fontWeight: '900',
              }}>
              SPLASHEROO
            </Text>
            <DrawerContentScrollView>
              <DrawerItem
                label="Home"
                icon={() => {
                  return (
                    <Image
                      source={homeIcon}
                      style={{
                        height: 25,
                        width: 25,
                      }}
                    />
                  );
                }}
                pressColor="#E2EDF6"
                labelStyle={{
                  color: '#000',
                }}
                onPress={() => {
                  changeSelect();
                  map['home'] = true;
                  console.log('home');
                  navigation.navigate('homeScreen');
                }}
                style={{
                  backgroundColor: map['home'] == true ? '#E2EDF6' : '#FFF',
                  borderRadius: 30,
                  padding: 8,
                  paddingLeft: 12,
                }}
              />
              <DrawerItem
                label="Bookings"
                labelStyle={{
                  color: '#000',
                }}
                icon={() => {
                  return (
                    <Image
                      source={bookingIcon}
                      style={{
                        height: 25,
                        width: 25,
                      }}
                    />
                  );
                }}
                onPress={() => {
                  changeSelect();
                  map['booking'] = true;
                  navigation.navigate('Bookings');
                  //console.log(map);
                }}
                pressColor="#E2EDF6"
                style={{
                  backgroundColor: map['booking'] == true ? '#E2EDF6' : '#FFF',
                  borderRadius: 30,
                  padding: 8,
                  paddingLeft: 12,
                }}
              />
              <DrawerItem
                label="Choose Vehicle"
                labelStyle={{
                  color: '#000',
                }}
                icon={() => {
                  return (
                    <Image
                      source={carIcon}
                      style={{
                        height: 25,
                        width: 25,
                      }}
                    />
                  );
                }}
                onPress={() => {
                  changeSelect();
                  map['GetVehicle'] = true;
                  navigation.navigate('Vehicles');
                  //console.log("GetVehicle");
                }}
                pressColor="#E2EDF6"
                style={{
                  backgroundColor:
                    map['GetVehicle'] == true ? '#E2EDF6' : '#FFF',
                  borderRadius: 30,
                  padding: 8,
                }}
              />
              <DrawerItem
                labelStyle={{
                  color: '#000',
                }}
                label="Account"
                icon={() => {
                  return (
                    <Image
                      source={accountIcon}
                      style={{
                        height: 25,
                        width: 25,
                      }}
                    />
                  );
                }}
                onPress={() => {
                  changeSelect();
                  map['account'] = true;
                  navigation.navigate('Account');
                  //console.log("account");
                }}
                pressColor="#E2EDF6"
                style={{
                  backgroundColor: map['account'] == true ? '#E2EDF6' : '#FFF',
                  borderRadius: 30,
                  padding: 8,
                }}
              />
            </DrawerContentScrollView>
            {/* <TouchableOpacity
              onPress={handleLogout}
              style={{
                marginHorizontal: 20,
                height: 40,
                borderRadius: 20,
                marginBottom: 30,
                backgroundColor: '#00BCD4',
              }}>
              <Text style={{color: '#FFF', textAlign: 'center', marginTop: 8}}>
                Log Out
              </Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => {
                // Linking.openURL("https://www.google.com");
                Linking.canOpenURL(
                  'https://splasheroo.co.uk/terms-and-conditions.html',
                ).then(supported => {
                  if (supported) {
                    Linking.openURL(
                      'https://splasheroo.co.uk/terms-and-conditions.html',
                    );
                  } else {
                    console.log(supported);
                    Alert.alert('Something went wrong!!');
                  }
                });
              }}
              style={{
                height: 40,
                // alignSelf: "center",
                // justifyContent:"space-around"
                marginLeft: 25,
                flexDirection: 'row',
                marginBottom: 30,
              }}>
              <Image
                source={terms}
                style={{
                  height: 25,
                  width: 25,
                  marginTop: 8,
                }}
              />
              <Text
                style={{
                  fontWeight: '300',
                  color: '#000',
                  textAlign: 'center',
                  marginTop: 9,
                  marginLeft: 10,
                }}>
                Terms And Conditions
              </Text>
            </TouchableOpacity>
          </>
        );
      }}
      screenOptions={{
        swipeEdgeWidth: 0,
        drawerStyle: {
          backgroundColor: '#FFFFFF', //Set Drawer background
          width: 250, //Set Drawer width
        },
        headerStyle: {
          backgroundColor: '#f4511e', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
        header: () => {
          return (
            <>
              <Image
                source={logo}
                style={{
                  //marginHorizontal: 30,
                  alignSelf: 'center',
                  marginTop: 30,
                  height: 200,
                  width: 200,
                }}
              />
              <Text
                style={{
                  color: '#00BCD4',
                  fontSize: 20,
                  textAlign: 'center',
                  fontWeight: '900',
                }}>
                SLASHEROO
              </Text>
            </>
          );
        },
      }}>
      <Drawer.Screen
        name="home"
        options={{
          drawerLabel: 'Home',
          title: 'First Stack',
          headerShown: false,
          drawerIcon: () => {
            return (
              <Image
                source={homeIcon}
                style={{
                  height: 20,
                  width: 20,
                }}
              />
            );
          },
        }}
        component={FirstScreenStack}
      />
      <Drawer.Screen
        name="booking"
        options={{
          drawerLabel: 'Bookings',
          title: 'Second Stack',
          drawerIcon: () => {
            return (
              <Image
                source={bookingIcon}
                style={{
                  height: 20,
                  width: 20,
                }}
              />
            );
          },
        }}
        component={SecondScreenStack}
      />
      <Drawer.Screen
        name="GetVehicle"
        options={{
          drawerLabel: 'Vehicles',
          title: 'Third Stack',
          headerShown: false,
          drawerIcon: () => {
            return (
              <Image
                source={carIcon}
                style={{
                  height: 20,
                  width: 20,
                }}
              />
            );
          },
        }}
        component={ThirdScreenStack}
      />
      <Drawer.Screen
        name="account"
        options={{
          drawerLabel: 'Account',
          title: 'Fourth Stack',
          headerShown: false,
          drawerIcon: () => {
            return (
              <Image
                source={accountIcon}
                style={{
                  height: 20,
                  width: 20,
                }}
              />
            );
          },
        }}
        component={FourthScreenStack}
      />
    </Drawer.Navigator>
  );
}

export default Mydrawer;
