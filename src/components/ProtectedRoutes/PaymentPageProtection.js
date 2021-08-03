import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom"
import { constantCheckAuthentication } from "../../redux";

const PaymentPageProtection = ({ component: Component, ...rest }) => {

  const userState = useSelector(state => state.auth)
  const cartState = useSelector(state => state.cart)
  return (
    <Route
      {...rest}
      render={props =>
        userState.isAuthenticated && constantCheckAuthentication() && constantCheckAuthentication()._id === userState.user._id  && cartState.shouldAddressToPayment ? (
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

export default PaymentPageProtection

// cartState.isRedirectedFromCart === true
