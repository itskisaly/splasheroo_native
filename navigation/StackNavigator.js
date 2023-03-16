import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import LoginScreen from '../screens/LoginScreen';
import Signup from '../screens/Signup';
import HomeScreen from '../screens/HomeScreen';
import StepForm from '../screens/StepForm';
import AddVehicle from '../screens/AddVehicle';
import FindVehicle from '../screens/FindVehicle';
import TempScreen from '../screens/TempScreen';
import VerifyScreen from '../screens/VerifyScreen';
import AddCustomVehicle from '../screens/AddCustomVehicle';
import ConfirmLocationScreen from '../screens/ConfirmLocationScreen';
import ChooseVehicleScreen from '../screens/ChooseVehicle';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {View, Text, Image, TouchableOpacity} from 'react-native';
// onPress={() => {
//  navigation.dispatch(DrawerActions.toggleDrawer());
//}}
import menuIcon from '../assets/menu.png';
import PickDate from '../screens/PickDate';
import SelectService from '../screens/SelectService';
import Summary from '../screens/Summary';
import CardDetail from '../screens/CardDetail';
import SelectCard from '../screens/SelectCard';
import Bookings from '../screens/Bookings';
import SuccessBooking from '../screens/SuccessBooking';
import AccountDetails from '../screens/AccountDetails';
import GetVehicle from '../screens/GetVehicle';

const MainStackNavigator = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ConfirmLocationScreen"
        component={ConfirmLocationScreen}
        options={{
          headerShown: false,
        }}
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
      <Stack.Screen name="pickdate" component={PickDate} />
      <Stack.Screen name="SelectService" component={SelectService} />
      <Stack.Screen name="summary" component={Summary} />
      <Stack.Screen name="cardDetail" component={CardDetail} />
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

export default MainStackNavigator;
