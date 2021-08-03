import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Signup from './components/Auth/Signup'
import Signin from './components/Auth/Signin'
import MainPage from './components/MainPage'
import Profile from './components/ProfilePage'
import SellerProfile from './components/SellerProfile'
import { useEffect } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { fetchUser } from './redux'
import LoaderScreen from './LoaderScreen'
import PrivateRoute from './components/ProtectedRoutes/PrivateRoute'
import AuthRoute from './components/ProtectedRoutes/AuthRoute'
import AddressConfirmationProtection from './components/ProtectedRoutes/AddressConfirmationProtection'
import SellerRoute from './components/ProtectedRoutes/SellerRoute'
import AdminRoute from './components/ProtectedRoutes/AdminRoute'
import Admin from './components/Admin'
import AdminVerificationPanel from './components/Admin/VerificationPanel/index'
import ViewProduct from './components/CommonHelpers/ViewProduct'
import Cart from './components/CommonHelpers/Cart'
import SellerShop from './components/CommonHelpers/ViewShop'
import SearchBarProduct from './components/CommonHelpers/SearchBar/Product'
import SearchBarSellers from './components/CommonHelpers/SearchBar/Seller'
import SearchCategory from './components/CommonHelpers/SearchBar/SearchCategory'
import ViewAllProduct from './components/CommonHelpers/ViewAll/Product'
import ViewAllSeller from './components/CommonHelpers/ViewAll/Seller'
import ReportSeller from './components/CommonHelpers/ReportSeller'
import AddressVerification from './components/CommonHelpers/Cart/AddressVerification'
import PaymentPage from './components/CommonHelpers/Cart/PaymentPage'
import PaymentPageProtection from './components/ProtectedRoutes/PaymentPageProtection'
import OrderPage from './OrderPage'

const Routes = () =>{

    const userState = useSelector(state => state.auth)
    const dispatch = useDispatch()
    console.log(userState)
    useEffect(() =>{
        if(userState.isAuthenticated === false){
            dispatch(fetchUser())
        }
    }, [userState.isAuthenticated, dispatch])

    return(
        <BrowserRouter>
            {
                userState.isLoading ? <LoaderScreen /> : 
                <Switch>
                    <Route exact path="/" component={MainPage} />
                    <AuthRoute path="/signup" component={Signup} />
                    <AuthRoute path="/signin" component={Signin} />
                    <PrivateRoute path="/profile" component={Profile}/>
                    <SellerRoute path="/seller" isValidationIgnore={true} component={SellerProfile}/>
                    <AdminRoute path="/admin" component={Admin}/>
                    <AdminRoute path="/admin-verification-panel/:userId" component={AdminVerificationPanel}/>
                    <Route path="/view/product/:id" component={ViewProduct}/>
                    <Route path="/cart" component={Cart}/>
                    <Route path="/shop/:id" component={SellerShop}/>
                    <Route path="/search/product" component={SearchBarProduct}/>
                    <Route path="/search/sellers" component={SearchBarSellers}/>
                    <Route path="/search/category" component={SearchCategory}/>
                    <Route path="/view/all/products" component={ViewAllProduct}/>
                    <Route path="/view/all/sellers" component={ViewAllSeller}/>
                    <PrivateRoute path="/report/seller/:id" component={ReportSeller}/>
                    <AddressConfirmationProtection path="/place-order" component={AddressVerification}/>
                    <PaymentPageProtection path="/payment"component={PaymentPage}/>
                    <Route path="/orderpage" component={OrderPage}/>
                </Switch>
            }
        </BrowserRouter>
    )
}

export default Routes