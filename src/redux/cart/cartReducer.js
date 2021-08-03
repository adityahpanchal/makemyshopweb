const { set_cart, set_cartToAddress, set_addressToPayment, set_addressId } = require("./cartTypes")

const initialState = {
    cart: 0,
    shouldCartToAddress: false,
    shouldAddressToPayment: false,
    addressId: ''
}

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case set_cart:
            return{
                ...state,
                cart: action.payload,
            }
        case set_cartToAddress:
            return{
                ...state,
                shouldCartToAddress: action.payload,
            }
        case set_addressToPayment:
            return{
                ...state,
                shouldAddressToPayment: action.payload,
            }
        case set_addressId:
            return{
                ...state,
                addressId: action.payload,
            }
        default: return state
    }
}

export default reducer