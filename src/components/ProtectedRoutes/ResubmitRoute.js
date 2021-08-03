import { useSelector } from "react-redux";
import {  Route } from "react-router-dom"
import { constantCheckAuthentication } from "../../redux";

const ResubmitRoute = ({ component: Component, ...rest }) => {
  const userState = useSelector(state => state.auth)

  const validate = () =>{
    const {type} = rest

    if(userState.user.businessId.registrationStatus === 2){
        if(type === 'gst' && userState.user.businessId.sellingPermission === "All" && userState.user.businessId.gst.isVerified !== 'true'){
            return true
        }
        if(userState.user.businessId[type].isVerified !== 'true'){
            return true
        }
    }
    else{
        return false
    }
  }

  const isError = (props) =>{
    console.log('sssss', props)
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
          isError(props)
        )
      }
    />
  )
}

export default ResubmitRoute
