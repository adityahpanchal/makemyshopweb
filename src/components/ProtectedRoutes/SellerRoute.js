import { useSelector } from "react-redux";
import {  Redirect, Route } from "react-router-dom"
import { constantCheckAuthentication } from "../../redux";

const SellerRoute = ({ component: Component, ...rest }) => {
  // console.log(rest)
  const userState = useSelector(state => state.auth)

  const validate = () =>{
    const {isValidationIgnore, isConsoleReq, isStatusReq, status} = rest

    if(!isValidationIgnore){
      if(isConsoleReq && userState.user.role === 1){
        return true
      }
      if(isStatusReq && userState.user.businessId.registrationStatus === status){
        return true
      }
      return false
    }else{
      return true
    }
  }

  const isError = (props) =>{
    // console.log('sssss', props)
    if(userState.user.role === 1){
      props.history.push('/seller/console')
    }else if(userState.user.businessId.registrationStatus === 0){
      props.history.push('/seller')
    }else if(userState.user.businessId.registrationStatus === 1){
      props.history.push('/seller/documents/upload')
    }else if(userState.user.businessId.registrationStatus === 2){
      props.history.push('/seller/documents/verification/status')
    }
  }

  return (
    <Route
      {...rest}
      render={props =>
        userState.isAuthenticated && constantCheckAuthentication() && constantCheckAuthentication()._id === userState.user._id  && validate() ? (
          <Component {...props} />
        ) : (
        userState.isAuthenticated ? isError(props) : <Redirect to="/signin"/>  
        )
      }
    />
  )
}

export default SellerRoute
