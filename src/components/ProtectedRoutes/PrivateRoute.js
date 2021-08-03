import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom"
import { constantCheckAuthentication } from "../../redux";

const PrivateRoute = ({ component: Component, ...rest }) => {

  const userState = useSelector(state => state.auth)
  return (
    <Route
      {...rest}
      render={props =>
        userState.isAuthenticated && constantCheckAuthentication() && constantCheckAuthentication()._id === userState.user._id ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          /> 
        )
      }
    />
  );
};

export default PrivateRoute;
