const { fetch_user, authenticate, set_user } = require("./authTypes")

const initialState = {
    user: false,
    isAuthenticated: false,
    isLoading: true,
    token: false,
    userID: false
}

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case fetch_user:
            return{
                ...state,
                user: action.payload.user,
                isAuthenticated: action.payload.isAuthenticated,
                isLoading: action.payload.isLoading,
                token: action.payload.token,
                userID: action.payload.userID
            }
        case authenticate:
            return{
                ...state,
                user: action.payload.user,
                isAuthenticated: action.payload.isAuthenticated,
                isLoading: action.payload.isLoading,
                token: action.payload.token,
                userID: action.payload.userID
            }
        case set_user:
            return{
                ...state,
                user: action.payload.user,
                isAuthenticated: action.payload.isAuthenticated,
                isLoading: action.payload.isLoading,
                token: action.payload.token,
                userID: action.payload.userID
            }
        default: return state
    }
}

export default reducer