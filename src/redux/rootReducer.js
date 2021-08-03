import {combineReducers} from 'redux'
import authReducer from './auth/authReducer'
import cartReducer from './cart/cartReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer
})

export default rootReducer