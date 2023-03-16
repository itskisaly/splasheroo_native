import React,{createContext,useState} from 'react'

export const AuthContext = createContext();


export const AuthProvider = ({children}) => {

    const [userInfo,setUserInfo] = useState();
    const [signupData,setSignupData] = useState();
    const [renderFetchData,setRenderFetchData] = useState(false);
    const [renderBookingInfo,setRenderBookingInfo] = useState(1);
    const [renderCardInfo,setRenderCardInfo] = useState(1);
    const [bookingDetails,setBookingDetails] = useState({
        latitude:"",
        longitude:"",
        address:"",
        postCode:"",
        location:"",
        notes:"",
        vechile:"",
        date:"",
        startTime:"",
        endTime:"",
        service:"",
        promocode:"",
    });

    return (
        <AuthContext.Provider value={{
            userInfo,
            setUserInfo,
            signupData,
            setSignupData,
            bookingDetails,
            setBookingDetails,
            renderFetchData,
            setRenderFetchData,
            renderBookingInfo,
            setRenderBookingInfo,
            renderCardInfo,
            setRenderCardInfo
        }}>
            {children}
        </AuthContext.Provider>
    )
}