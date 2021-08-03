
import {API} from '../../../../Backend'

export const fetchStatus = (userId, token) =>{
    console.log(userId,token)
    return fetch(`${API}/seller/info/verification/status/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    }).then((response) =>{
        return response.json()
    })
}