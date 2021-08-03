import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
// import {composeWithDevTools} from 'redux-devtools-extension'
// import logger from 'redux-logger'
import rootReducer from './rootReducer'


const store =  createStore(rootReducer, applyMiddleware(thunk))

export default store