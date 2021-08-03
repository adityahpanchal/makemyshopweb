import { set_cart, set_cartToAddress, set_addressToPayment, set_addressId } from "./cartTypes"


export const setCartRequest = (data) =>{
    return{
        type: set_cart,
        payload: data
    }
}

export const setShouldCartToAddressRequest = (data) =>{
    return{
        type: set_cartToAddress,
        payload: data
    }
}

export const setShouldAddressToPaymentRequest = (data) =>{
    return{
        type: set_addressToPayment,
        payload: data
    }
}

export const setAddressIdRequest = (data) =>{
    return{
        type: set_addressId,
        payload: data
    }
}
