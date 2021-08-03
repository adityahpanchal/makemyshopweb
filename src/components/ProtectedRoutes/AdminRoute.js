import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom"
import { constantCheckAuthentication } from "../../redux";

const AdminRoute = ({ component: Component, ...rest }) => {

  const userState = useSelector(state => state.auth)
  return (
    <Route
      {...rest}
      render={props =>
        userState.isAuthenticated && userState.user.isAdmin === true && constantCheckAuthentication && constantCheckAuthentication()._id === userState.user._id  ? (
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

export default AdminRoute
