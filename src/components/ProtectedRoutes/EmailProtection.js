import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom"
import { constantCheckAuthentication } from "../../redux";

const EmailProtection = ({ component: Component, ...rest }) => {

  const userState = useSelector(state => state.auth)
  return (
    <Route
      {...rest}
      render={props =>
        !userState.user.isEmailVerified && userState.isAuthenticated && constantCheckAuthentication() && constantCheckAuthentication()._id === userState.user._id  ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/profile",
              state: { from: props.location }
            }}
          /> 
        )
      }
    />
  );
};

export default EmailProtection;
