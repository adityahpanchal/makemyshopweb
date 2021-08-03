import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom"
import { constantCheckAuthentication } from "../../redux";

const AddressConfirmationProtection = ({ component: Component, ...rest }) => {

  const userState = useSelector(state => state.auth)
  const cartState = useSelector(state => state.cart)
  return (
    <Route
      {...rest}
      render={props =>
        userState.isAuthenticated && constantCheckAuthentication() && cartState.shouldCartToAddress && constantCheckAuthentication() && constantCheckAuthentication()._id === userState.user._id  ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/cart",
              state: { from: props.location }
            }}
          /> 
        )
      }
    />
  );
};

export default AddressConfirmationProtection

// cartState.isRedirectedFromCart === true
