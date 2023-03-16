import React, { Component, useLayoutEffect, useState } from 'react'
import { View, Text, SafeAreaView, Image } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'
import { Banner } from '../assets';
import MapView from 'react-native-maps';

const latitudeData = 0.025
const longitudeData = 0.025

class TempScreen extends Component {

    state = {
        region:{
            latitudeData,
            longitudeData,
            latitude: 25.5941,
            longitude:85.1376
        }
    }

    onChangeValue = region => {
        console.log(JSON.stringify(region))
        // alert(JSON.stringify(region))
        this.setState({
            region
        })
    }

    render() {
        return(
            <View style={{flex:1}}>
                <MapView
                    style={{flex:1}}
                    initialRegion={this.state.region}
                    onRegionChangeComplete={this.onChangeValue}
                />
                <View style={{top:"50%",left:"50%",marginLeft:-24,marginTop:-48,position:'absolute'}}>
                    <Image style={{height:48,width:48}} source={{uri:'https://w7.pngwing.com/pngs/825/135/png-transparent-red-location-icon-google-maps-pin-google-map-maker-google-s-heart-map-location.png'}}/>
                </View>
            </View>
        )
    }


}

export default TempScreen