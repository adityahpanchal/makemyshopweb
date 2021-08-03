import Header from '../Header'
import Footer from '../Footer'
import TopPageTitle from './TopPageTitle'
import ProfileNav from './ProfileNav'
import Address from './Address/index'
import Orders from './Order/index'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import PersonalInformation from './PersonalInformation/index'
import InsertAddress from './Address/InsertAddress'
import UpdateAddress from './Address/UpdateAddress'
import UpdatePersonalInformation from './PersonalInformation/UpdatePersonalInformation'
import UpdatePassword from './PersonalInformation/UpdatePassword'
import UpdatePasswordWithForgot from './PersonalInformation/UpdatePasswordWithForgot'
import UpdateNewEmail from './PersonalInformation/UpdateNewEmail'
import UpdateEmail from './PersonalInformation/UpdateEmail'
import EmailProtection from '../ProtectedRoutes/EmailProtection'
import UpdateMobile from './PersonalInformation/UpdateMobile'
import MyWishList from './Wishlist'
import OrderStatus from './Order/OrderStatus'
import RecentOrder from './Order/RecentOrders'

const ProfileBase = (props) =>{
    
    const {path} = useRouteMatch()
    return(
        <>
            <Header/>
                <TopPageTitle />
                    <section className="section-content padding-y">
                        <div className="container">
                            <div className="row">
                                <ProfileNav />
                                <Switch>
                                    <Route exact path={`${path}/`} component={PersonalInformation}/>
                                    <Route exact path={`${path}/update/personal-information`} component={UpdatePersonalInformation}/>
                                    <Route exact path={`${path}/update/password`} component={UpdatePassword}/>
                                    <Route exact path={`${path}/update/f/password`} component={UpdatePasswordWithForgot}/>
                                    <EmailProtection exact path={`${path}/update/new/email`} component={UpdateNewEmail}/>
                                    <Route exact path={`${path}/update/email`} component={UpdateEmail}/>
                                    <Route exact path={`${path}/update/mobile`} component={UpdateMobile}/>
                                    <Route exact path={`${path}/myaddresses`} component={Address}/>
                                    <Route exact path={`${path}/myaddresses/insert`} component={InsertAddress}/>
                                    <Route exact path={`${path}/myaddresses/update/:id`} component={UpdateAddress}/>
                                    <Route exact path={`${path}/myorders`} component={Orders}/>
                                    <Route exact path={`${path}/myorders/recent`} component={RecentOrder}/>
                                    <Route exact path={`${path}/order/status/:transactionId/:sellerId`} component={OrderStatus}/>
                                    <Route exact path={`${path}/mywishlist`} component={MyWishList}/>
                                </Switch>
                            </div>
                        </div>
                    </section>    
            <Footer />
        </>
    )
}

export default ProfileBase