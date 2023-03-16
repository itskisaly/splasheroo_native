

import React, { useState, useEffect, useContext } from "react";
import { View, Text, BackHandler, Image, SafeAreaView, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { Mercedes, Edit, Toyota, Tesla } from "../assets";
import { useNavigation } from "@react-navigation/native";
import BookingCards from '../components/BookingCards'
import { Button, TextInput, Avatar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// import { AntDesign } from 'react-native-vector-icons';
import { card } from "../assets"
import { AuthContext } from '../context/AuthContext';

const AccountDetails = () => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [userCards, setUserCards] = useState([]);
    const [isCardThere, setIsCardThere] = useState(false);
    const {
        renderCardInfo,
        setRenderCardInfo
    } = useContext(AuthContext);

    const loadCardData = async () => {
        const value = await AsyncStorage.getItem('userId')
        console.log(value,'vvv');
        const options = {
            method: "GET",
            url: `https://splasheroo-backend.herokuapp.com/api/bankCard/details/${value}`,
            params: {},
            headers: {
                "content-type": "application/json",
            }
        };

        axios
            .request(options)
            .then((response) => {
                if (response.data.cardList.length > 0) {
                    console.log(response.data.cardList);
                    setIsCardThere(true);
                    setUserCards(response.data.cardList);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }


    const loadData = async () => {
        setIsLoading(true);
        const value = await AsyncStorage.getItem('userId')
        console.log(value)
        const options = {
            method: "GET",
            url: `https://splasheroo-backend.herokuapp.com/api/customer/${value}`,
            params: {},
            headers: {
                "content-type": "application/json",
            }
        };

        axios
            .request(options)
            .then((response) => {
                loadCardData();
                console.log(response.data.customer,'response----')
                setFullName(response.data.customer.customer[0].fullName);
                setPhoneNumber(response.data.customer.customer[0].phone);
                setAddress(response.data.customer.customer[0].address);
                setEmail(response.data.customer.account[0].email)
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    }

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                navigation.navigate("Bookings");
                return true;
            }
        );
        return () => backHandler.remove();
    }, []);

    useEffect(() => {
        loadData();
    }, [renderCardInfo])

    const handleLogout = async () => {
        await AsyncStorage.removeItem("userToken");
        AsyncStorage.removeItem('userId');
        AsyncStorage.removeItem('userEmail');
        navigation.navigate("login");
    };

    const handleDelete = async () => {

        const value = await AsyncStorage.getItem('userId')
        const options = {
            method: "DELETE",
            url: `https://splasheroo-backend.herokuapp.com/api/customer/${value}`,
            params: {},
            headers: {
                "content-type": "application/json",
            }
        };

        axios
            .request(options)
            .then((response) => {
                console.log(response,'rre')
                AsyncStorage.removeItem("userToken");
                AsyncStorage.removeItem('userId');
                AsyncStorage.removeItem('userEmail');
                navigation.navigate("login");
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    };

    return (
        <ScrollView className="h-full w-full bg-white">
            {isLoading ? <ActivityIndicator
                style={{ marginTop: 200 }}
                color="#0B646B"
                size={"large"}
            /> :
                <>
                    <View className="px-3">
                        <View className="px-3">
                            <Text className="mt-5 text-[17px] mb-2">Full Name</Text>
                            <TextInput
                                disabled
                                value={fullName}
                                mode="outlined"
                                className="bg-slate-100"
                            />
                        </View>
                        <View className="px-3 mt-3">
                            <Text className="mt-5 text-[17px] mb-2">Email Address</Text>
                            <TextInput
                                disabled
                                value={email}
                                mode="outlined"
                                className="bg-slate-100"
                            />
                        </View>
                        <View className="px-3 mt-3">
                            <Text className="mt-5 text-[17px] mb-2">Phone Number</Text>
                            <TextInput
                                disabled
                                value={phoneNumber}
                                mode="outlined"
                                className="bg-slate-100"
                            />
                        </View>
                        <View className="px-3 mt-3">
                            <Text className="mt-5 text-[17px] mb-2">Address</Text>
                            <TextInput
                                disabled
                                multiline
                                value={address}
                                mode="outlined"
                                className="bg-slate-100"
                            />
                        </View>
                        <View className="px-3">
                            {userCards.length > 0 &&
                                <View className="px-3">
                                    <Text className="mt-5 text-[17px] mb-2">Your Card</Text>
                                    {userCards.map((item) => (
                                        <View key={item._id} className="bg-[#E5FCFF] rounded-2xl mt-3 px-3">
                                            <View className="flex-row justify-center items-center p-4">
                                                <View style={{ width: 50 }}>
                                                    <Image source={card} />
                                                </View>
                                                <View style={{ flex: 1, marginLeft: 20 }}>
                                                    <Text>{item.brand}</Text>
                                                    <Text>**** **** **** {item.last4}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    ))}
                                </View>}
                        </View>
                    </View>
                    <TouchableOpacity className="px-5 text-center mt-3 ml-5" onPress={() => navigation.navigate("addCard")}>
                        <Text className="text-[#055ED0]">Add more card</Text>
                    </TouchableOpacity>
                    <View className="flex-row mt-5 justify-evenly w-100">
                        <Button className="bg-[#00BCD4] px-4" mode="contained" onPress={handleLogout}>
                            Sign out
                        </Button>
                        <Button className="bg-[#F77B72]" mode="contained" onPress={handleDelete}>
                            Delete Account
                        </Button>
                    </View>
                </>
            }
        </ScrollView>
    );
};

export default AccountDetails;