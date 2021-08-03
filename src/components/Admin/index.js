import { Route, Switch, useRouteMatch } from "react-router-dom"
import AdminOverview from "./Dashboard/AdminOverview"
import Category from "./Dashboard/Category/"
import Header from "./Dashboard/Header"
import ProfileNav from "./Dashboard/ProfileNav"
import Block from "./Dashboard/SellerReportRequest/Block"
import BlockSeller from "./Dashboard/SellerReportRequest/BlockSeller"
import CompletedRequest from "./Dashboard/SellerReportRequest/CompletedRequest"
import NewRequest from "./Dashboard/SellerReportRequest/NewRequest"
import Unblock from "./Dashboard/SellerReportRequest/Unblock"
import SellerRequest from "./Dashboard/SellerRequest"
import SubCategory from "./Dashboard/SubCategory/"
import Review from './Dashboard/SellerReportRequest/Review'
import ReviewAction from "./Dashboard/SellerReportRequest/ReviewAction"
import ReviewCompleted from "./Dashboard/SellerReportRequest/ReviewCompleted"

const Admin = (props) =>{

    const {path} = useRouteMatch()

    return(
        <>
            <Header/>
            <section className="section-content padding-y">
                <div className="container">
                    <div style={{marginLeft: -40}} className="row">
                        <ProfileNav />
                        <Switch>
                            <Route exact path={`${path}/`} component={AdminOverview}/>
                            <Route exact path={`${path}/new/seller/request`} component={SellerRequest}/>
                            <Route exact path={`${path}/resubmited/seller/request`} component={SellerRequest}/>
                            <Route exact path={`${path}/completed/seller/request`} component={SellerRequest}/>
                            <Route exact path={`${path}/active/sellers`} component={SellerRequest}/>
                            <Route exact path={`${path}/reported/sellers/request`} component={NewRequest}/>
                            <Route exact path={`${path}/completed/reported/sellers/request`} component={CompletedRequest}/>
                            <Route exact path={`${path}/block/seller/:sellerId/:reportId/:status/:reset`} component={BlockSeller}/>
                            <Route exact path={`${path}/category`} component={Category}/>
                            <Route exact path={`${path}/subcategory`} component={SubCategory}/>
                            <Route exact path={`${path}/seller/remove-warning/unblock-seller`} component={Unblock}/>
                            <Route exact path={`${path}/seller/add-warning/block-seller`} component={Block}/>
                            <Route exact path={`${path}/seller/review`} component={Review}/>
                            <Route exact path={`${path}/seller/review/completed`} component={ReviewCompleted}/>
                            <Route exact path={`${path}/review/action/:sellerId/:reviewId/:isMsg`} component={ReviewAction}/>
                        </Switch>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Admin