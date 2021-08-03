import {API} from '../../Backend'

export const sendOTP = (mobile, token, userID) =>{
    return fetch(`${API}/seller/create/mobile/verification/sendotp/${userID}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(mobile)
    }).then((response) =>{
        return response.json()
    }).catch((err) =>{
        console.log(err)
    })
} 

export const otpVerification = (data, token, userID) =>{
    return fetch(`${API}/seller/create/mobile/verification/${userID}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }).then((response) =>{
        return response.json()
    }).catch((err) =>{
        console.log(err)
    })
} 