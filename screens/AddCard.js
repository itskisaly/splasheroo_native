import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Alert,
    TouchableWithoutFeedback,
    Keyboard
} from "react-native";
import React, { useLayoutEffect, useState, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, TextInput, Avatar } from "react-native-paper";
import CalendarPicker from "react-native-calendar-picker";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { Ionicons } from "react-native-vector-icons";
import axios from "axios";
import { back } from "../assets";


const AddCard = () => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState("");
    const [cardNumberTemp, setCardNumberTemp] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cardHolderName, setCardHolderName] = useState("");
    const [userEmailTemp, setUserEmailTemp] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const {
        renderCardInfo,
        setRenderCardInfo
    } = useContext(AuthContext);

    const [cardType, setCardType] = useState("...");

    const [count, setCount] = useState(0);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    });

    const getData = async () => {
        const value = await AsyncStorage.getItem("userId");
        const userEmail = await AsyncStorage.getItem("userEmail");
        setUserId(value);
        setUserEmailTemp(userEmail);
    };

    useEffect(() => {
        getData();
    }, []);

    const handlePrevios = () => {
        navigation.navigate("Account");
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    });



    const handleBooking = () => {
        setIsLoading(true);
        const options = {
            method: "POST",
            url: "https://splasheroo-backend.herokuapp.com/api/bankCard/add",
            params: {},
            headers: {
                "content-type": "application/json",
            },
            data: {
                cardNumber: cardNumberTemp,
                cardHolderName: cardHolderName,
                expiryDate: expiryDate,
                cvvCvc: cvv,
                customer: userId,
                email: userEmailTemp
            },
        };

        axios
            .request(options)
            .then((response) => {
                if (response.data.success) {
                    setIsLoading(false);
                    console.log("added successfully!")
                    setRenderCardInfo(renderCardInfo + 1);
                    navigation.navigate("Account");
                }
            })
            .catch((error) => {
                setIsLoading(false);
                Alert.alert('Card Detail Invalid!!');
                console.error(error);
            });
        // navigation.navigate("SuccessBooking",{param:userId});

    };

    const handleChange = (text) => {
        // Remove non-numeric characters from the input
        const value = text.replace(/\D/g, '');
        setCardNumberTemp(value);

        // Format the input as groups of four digits separated by spaces
        const formattedValue = value.replace(/(\d{4})/g, '$1 ').trim();

        // Set the state with the formatted value
        setCardNumber(formattedValue);
        if (cardNumber[0] == "4") {
            setCardType("VISA");
        } else if (cardNumber[0] == "2" || cardNumber[0] == "5") {
            setCardType("MASTER CARD");
        } else {
            setCardType("");
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView className="bg-white">
            <View className="px-4 bg-white h-full relative">
                <View className="flex-row items-center px-4 mt-0">
                    {/* <Text onPress={handlePrevios}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </Text> */}
                    <Text className="mt-5" onPress={handlePrevios}>
                        {/* <Ionicons name="arrow-back" size={24} color="black" /> */}
                        <Image source={back} />
                    </Text>
                    <Text className="text-2xl ml-3 mt-3 text-center">Card Details</Text>
                </View>
                <View className="flex-row items-center px-4 mt-0">
                </View>
                <Text className="mt-5 ml-3 text-[17px] mb-2">Card number</Text>
                <View
                    style={{
                        flexDirection: "row",
                    }}
                >
                    <View
                        className="px-3"
                        style={{
                            flexGrow: 1,
                        }}
                    >
                        <TextInput
                            type=""
                            label="Enter Card number"
                            value={cardNumber}
                            mode="outlined"
                            className="bg-slate-100"
                            onChangeText={handleChange}
                            maxLength={19}
                        />
                    </View>
                    <View
                        style={{
                            marginTop: cardType == "VISA" ? 20 : 15,
                            width: 60,
                        }}
                    >
                        <Text
                            style={{
                                color:
                                    cardType == "VISA"
                                        ? "blue"
                                        : cardType == "MASTER CARD"
                                            ? "red"
                                            : "black",
                                textAlign: "center",
                                fontWeight: "bold",
                            }}
                        >
                            {cardType}
                        </Text>
                    </View>
                </View>
                <View className="px-3">
                    <Text className="mt-5 text-[17px] mb-2">Cardholder name</Text>
                    <TextInput
                        type=""
                        label="Enter Cardholder name"
                        value={cardHolderName}
                        mode="outlined"
                        className="bg-slate-100"
                        onChangeText={(text) => setCardHolderName(text)}
                    />
                </View>
                <View className="flex-row justify-around mt-5">
                    <View>
                        <Text className="mt-5 text-[17px] mb-2">Expiry date</Text>
                        <TextInput
                            type="email"
                            label="Enter Expiry date"
                            value={expiryDate}
                            mode="outlined"
                            maxLength={5}
                            className="bg-slate-100 w-40"
                            onChangeText={(text) => setExpiryDate(text)}
                        />
                    </View>
                    <View>
                        <Text className="mt-5 text-[17px] mb-2">CVV/CVC</Text>

                        <TextInput
                            type="email"
                            label="Enter CVV/CVC"
                            value={cvv}
                            maxLength={3}
                            mode="outlined"
                            className="bg-slate-100 w-40"
                            onChangeText={(text) => setCvv(text)}
                            secureTextEntry={true}
                        />
                    </View>
                </View>

                <View className="absolute w-full bottom-10 ml-3 mr-2 text-white mt-5">
                    {isLoading ? <ActivityIndicator size="large" color="#0B646B" /> :
                        <Button
                            className="bg-[#00BCD4]"
                            disabled={!cardNumber || !expiryDate ||  !cvv}
                            mode="contained"
                            onPress={handleBooking}
                        >
                            Add Card
                        </Button>
                    }
                </View>
            </View>
        </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

export default AddCard;