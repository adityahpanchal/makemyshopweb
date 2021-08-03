import { Route, Switch, useRouteMatch } from "react-router-dom"
import Header from "./Dashboard/Header"
import ProfileNav from "./Dashboard/ProfileNav"
import Product from "./Dashboard/Products"
import SellerProfile from './Dashboard/BusinessDetailsUpdate/index'
import SellerProfileUpdateMobile from './Dashboard/BusinessDetailsUpdate/UpdateMobile'
import SellerProfileUpdateLogo from './Dashboard/BusinessDetailsUpdate/UpdateLogo'
import SellerProfileUpdateBank from './Dashboard/BusinessDetailsUpdate/UpdateBank'
import Acc from '../console/Dashboard/SellerAccountOverView/index'
import TopPageTitle from "./TopPageTitle"
import NewOrders from "./Dashboard/Orders/NewOrder"
import UnderProcessingOrders from "./Dashboard/Orders/UnderProcessingOrders"
import DeliveredOrder from "./Dashboard/Orders/DeliveredOrder"
import OrderStatus from "./Dashboard/Orders/OrderStatus"

const SellerConsole = (props) =>{

    const {path} = useRouteMatch()
    console.log(path)
    return(
        <>
            <Header/>
            <TopPageTitle />
            <section className="section-content padding-y">
                <div className="container">
                    <div style={{marginLeft: -40}} className="row">
                        <ProfileNav />
                        <Switch>
                            <Route exact path={`${path}/`} component={Acc}/>
                            <Route exact path={`${path}/products`} component={Product}/>
                            <Route exact path={`${path}/new/orders`} component={NewOrders}/>
                            <Route exact path={`${path}/processing/orders`} component={UnderProcessingOrders}/>
                            <Route exact path={`${path}/delivered/orders`} component={DeliveredOrder}/>
                            <Route exact path={`${path}/view/delivery/status/:buyerId/:transactionId`} component={OrderStatus}/>
                            <Route exact path={`${path}/seller-info`} component={SellerProfile}/>
                            <Route exact path={`${path}/seller-info/update/mobile`} component={SellerProfileUpdateMobile}/>
                            <Route exact path={`${path}/seller-info/update/logo`} component={SellerProfileUpdateLogo}/>
                            <Route exact path={`${path}/seller-info/update/bank`} component={SellerProfileUpdateBank}/>

                        </Switch>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SellerConsole