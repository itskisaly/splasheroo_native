import {StatusBar} from 'expo-status-bar';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider as PaperProvider} from 'react-native-paper';
import {AuthProvider} from './context/AuthContext';
import Signup from './screens/Signup';
import {TailwindProvider} from 'tailwindcss-react-native';

import DrawerNavigation from './navigation/DrawerNavigation';
import StepForm from './screens/StepForm';
import PickDate from './screens/PickDate';
import SelectService from './screens/SelectService';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

import MainStackNavigator from './navigation/StackNavigator';

import Mydrawer from './navigation/drawer';

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider>
        <TailwindProvider>
          <NavigationContainer>
            <Mydrawer />
          </NavigationContainer>
        </TailwindProvider>
      </PaperProvider>
    </AuthProvider>
  );
}

// kislay@test.com
// Kislay@test

//asif@test.com
// Asif@test

// jack@gmail.com
// Jack@123

// For booking:{
//   userId:'33434'
//   latitude: 232.3232,
//   longitude: -323131.23,
//   locatin:'string',
//   postCode:'string',
//   customLandMark:String,
//   notes:'',
//   vehicle:ObjectId('2323232'),
//   date:Date(),
//   time:'9:00 - 10:00',
//   service:ObjectId('2323232'),
// }

// kemeh20779@ekcsoft.com
