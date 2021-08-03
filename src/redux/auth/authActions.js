import { fetch_user, authenticate, set_user } from "./authTypes"
import { setCartRequest } from '../cart/cartAction'
import {API} from '../../Backend'

export const fetchUserRequest = (data) =>{
    return{
        type: fetch_user,
        payload: data
    }
}

export const authenticateUserRequest = (data) =>{
    return{
        type: authenticate,
        payload: data 
    } 
}

export const setUserRequest = (data) =>{
    return{
        type: set_user,
        payload: data
    }
}

export const setUser = (data, next) =>{
    console.log("data---", data)
        
    return (dispatch) =>{
        const credintials = JSON.parse(localStorage.getItem("jwt"))
        if(data.user.businessId === undefined){
            data.user.businessId = {}
            data.user.businessId.registrationStatus = 0 
         //    data.user.role = 1
         }
         console.log('ddd')
        let sendPayload = {
            isAuthenticated: true,
            user: data.user,
            isLoading: false,
            token: credintials.token,
            userID: data.user._id
        } 
        console.log("payload", sendPayload)
        dispatch(setUserRequest(sendPayload))
        next();
    }
}

export const fetchUser = () =>{
    return (dispatch) =>{
        if (localStorage.getItem("jwt")) {
            const credintials = JSON.parse(localStorage.getItem("jwt"))

            // dispatch(fetchUserRequest(credintials))

            fetch(`${API}/getuser/${credintials._id}`, {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  Authorization: `Bearer ${credintials.token}`
                }
            }).then(response => {
                return response.json();
            }).then(data => {
                if(data.user.businessId === undefined){
                   data.user.businessId = {}
                   data.user.businessId.registrationStatus = 0 
                //    data.user.role = 1
                }
                console.log(data.user)
                let sendPayload = {
                    isAuthenticated: true,
                    user: data.user,
                    isLoading: false,
                    token: credintials.token,
                    userID: credintials._id
                }
                setTimeout(() => {
                    dispatch(fetchUserRequest(sendPayload))
                }, 100);
            })
            .catch(err => console.log(err));
            
        } else {
            let sendPayload = {
                user: false,
                isAuthenticated: false,
                isLoading: false,
                token: false,
                userID: false
            }
            dispatch(fetchUserRequest(sendPayload))
        }
    }
}

export const authenticateUser = (data, next) =>{
    return (dispatch) =>{
        if (typeof window !== "undefined") {
            const credintials = {
                token: data.token,
                _id: data.user._id
            }
            if(data.user.businessId === undefined){
                data.user.businessId = {}
                data.user.businessId.registrationStatus = 0 
             //    data.user.role = 1
             }
            let sendPayload = {
                isAuthenticated: true,
                user: data.user,
                isLoading: false,
                token: data.token,
                userID: data.user._id
            }
            console.log(sendPayload)
            localStorage.setItem("jwt", JSON.stringify(credintials));
            dispatch(authenticateUserRequest(sendPayload))
            next();
        }
    }
}

export const signoutUser = () =>{
    return (dispatch) =>{
        let sendPayload = {
            isAuthenticated: false,
            user: false,
            isLoading: false,
            token: false,
            userID: false
        }
        dispatch(setCartRequest(0))
        dispatch(setUserRequest(sendPayload))
    }
}

export const constantCheckAuthentication = () =>{
    if (typeof window == "undefined") {
        return false;
      }
      if (localStorage.getItem("jwt")) {
        //   console.log(localStorage.getItem('jwt'))
        return JSON.parse(localStorage.getItem("jwt"));
      } else {
        return false;
      }
    }


// export const isAuthenticated = () =>{
//     return (dispatch) =>{
//         dispatch(fetchUsersRequest())
//         axios.get('https://jsonplaceholder.typicode.com/users').then(response => {
//             const users = response.data
//             setTimeout(() => {
//                 dispatch(fetchUsersSuccess(users))
//             }, 3000)
//         }).catch(error => {
//             const errorMsg = error.message
//             dispatch(fetchUsersFailure(errorMsg))
//         })
//     }
// }