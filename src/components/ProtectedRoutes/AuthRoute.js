import { useSelector } from "react-redux";
import { Route } from "react-router-dom"
import { constantCheckAuthentication } from "../../redux";

const AuthRoute = ({ component: Component, ...rest }) => {

  const userState = useSelector(state => state.auth)
  return (
    <Route
      {...rest}
      render={props =>
        userState.isAuthenticated === false && !constantCheckAuthentication() ? (
          <Component {...props} />
        ) : (
          props.history.goBack()
        )
      }
    />
  );
};

export default AuthRoute;
