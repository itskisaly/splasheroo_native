import React, { useEffect, useLayoutEffect, useState } from "react";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { TextInput, Button } from "react-native-paper";

import * as Location from "expo-location";

const StartBookingScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const [pin, setPin] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [found, setFound] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      setPin({
        latitude: location["coords"]["latitude"],
        longitude: location["coords"]["longitude"],
      });

      setFound(true);
    })();
  }, []);

  return (
    <>
      <ScrollView style={{ backgroundColor: "#FFFFFF" }}>
        <View style={styles.mapView}>
          {found === true ? (
            <MapView
              initialRegion={{
                latitude: pin.latitude,
                longitude: pin.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              onRegionChange={(region) => {
                console.log(JSON.stringify(region));
              }}
              style={styles.map}
            >
              <Marker
                coordinate={pin}
                draggable={false}
                onDragStart={(e) => {
                  console.log("Dragstart", e.nativeEvent.coordinate);
                }}
                onDragEnd={(e) => {
                  setPin({
                    latitude: e.nativeEvent.coordinate.latitude,
                    longitude: e.nativeEvent.coordinate.longitude,
                  });
                }}
              >
                <Callout>
                  <Text>Your Vehicle!</Text>
                </Callout>
              </Marker>
              <Circle center={pin} radius={1000}></Circle>
            </MapView>
          ) : (
            <ActivityIndicator
              style={{ marginTop: 200 }}
              color="red"
              size={"large"}
            />
          )}
        </View>
        <View>
          <Text style={{ marginHorizontal: 20, fontSize: 18, marginTop: 10 }}>
            Where's your Vehicle?
          </Text>
          <TextInput style={{ margin: 20 }} placeholder="Enter location" />
          <Text style={{ padding: 20 }}>
            Hold and Move the pin to highlight the correct location of your car
            - it really helps!
          </Text>
        </View>
        <View>
          <Button
            style={{ marginHorizontal: 10, marginTop: 10 }}
            onPress={() => {
              navigation.navigate("ConfirmLocationScreen");
            }}
            className="bg-[#00BCD4]"
            mode="contained"
          >
            Submit
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

export default StartBookingScreen;

const styles = StyleSheet.create({
  mapView: {
    flex: 1,
    maxHeight: 600,
  },
  map: {
    height: 600,
  },
});
