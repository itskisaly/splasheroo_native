import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
import {
  Foundation,
  AntDesign,
  MaterialCommunityIcons,
} from 'react-native-vector-icons';

import MainStackNavigator from './StackNavigator';

import logo from '../assets/logo.png';

import {
  Image,
  Text,
  View,
  StyleSheet,
  Linking,
  Alert,
  TouchableOpacity,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {Button} from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {terms} from '../assets/index';

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

export default function DrawerNavigation() {
  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    AsyncStorage.removeItem('userId');
    AsyncStorage.removeItem('userEmail');
    navigation.navigate('login');
  };

  const navigation = useNavigation();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        swipeEdgeWidth: 0,
        drawerItemStyle: {
          paddingLeft: 20,
          borderRadius: 20,
        },
      }}
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
              SLASHEROO
            </Text>
            <DrawerContentScrollView>
              <DrawerItem
                label="Home"
                // icon={() => {
                //   return (
                //     <Foundation
                //       style={{marginRight: 4}}
                //       name="home"
                //       size={24}
                //       color="black"
                //     />
                //   );
                // }}
                pressColor="#E2EDF6"
                onPress={() => {
                  changeSelect();
                  map['home'] = true;
                  //console.log("home");
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
                // icon={() => {
                //   return (
                //     <Foundation
                //       style={{marginRight: 4}}
                //       name="clipboard-notes"
                //       size={24}
                //       color="black"
                //     />
                //   );
                // }}
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
                // icon={() => {
                //   return <AntDesign name="car" size={24} color="black" />;
                // }}
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
                label="Account"
                // icon={() => {
                //   return (
                //     <MaterialCommunityIcons
                //       name="account-outline"
                //       size={24}
                //       color="black"
                //     />
                //   );
                // }}
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
            <TouchableOpacity
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
            </TouchableOpacity>
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
                    Alert.alert('Something went wrong!!');
                  }
                });
              }}
              style={{
                height: 40,
                // alignSelf: "center",
                // justifyContent:"space-around"
                marginLeft: 35,
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
                  marginLeft: 20,
                }}>
                Terms And Conditions
              </Text>
            </TouchableOpacity>
          </>
        );
      }}>
      <Drawer.Screen name="Home" component={MainStackNavigator} />
      <Drawer.Screen name="Bookings" component={MainStackNavigator} />
      <Drawer.Screen
        name="ChooseVehicleScreen"
        component={MainStackNavigator}
      />
      <Drawer.Screen name="Account" component={MainStackNavigator} />
    </Drawer.Navigator>
  );
}

const style = StyleSheet.create({
  item: {
    height: 30,
    width: '100%',
  },
  content: {
    fontSize: 15,
  },
});
