import {  Switch, useRouteMatch } from 'react-router-dom'
import SellerRoute from '../ProtectedRoutes/SellerRoute'
import ResubmitRoute from '../ProtectedRoutes/ResubmitRoute'
import SellerConsole from './console'
import StepOne from './Registration/StepOne'
import StepThree from './Registration/StepThree'
import StepTwo from './Registration/StepTwo'
import Gst from './Registration/Resubmit/Gst'
import Bank from './Registration/Resubmit/Bank'
import Pan from './Registration/Resubmit/Pan'
import Identity from './Registration/Resubmit/Identity'

const SellerProfile = ({history}) =>{
    const {path} = useRouteMatch()
    
    return(
        <Switch>
            <SellerRoute exact path={`${path}`} isValidationIgnore={false} isConsoleReq={false} isStatusReq={true} status={0} component={StepOne}/>
            <SellerRoute exact path={`${path}/documents/upload`} isValidationIgnore={false} isConsoleReq={false} isStatusReq={true} status={1} component={StepTwo}/>
            <SellerRoute exact path={`${path}/documents/verification/status`} isValidationIgnore={false} isConsoleReq={false} isStatusReq={true} status={2} component={StepThree}/>
            <SellerRoute path={`${path}/console`} isValidationIgnore={false} isConsoleReq={true} isStatusReq={false} status={2} component={SellerConsole}/>
            <ResubmitRoute exact path={`${path}/documents/resubmit/gst`} type="gst" component={Gst}/>
            <ResubmitRoute exact path={`${path}/documents/resubmit/pancard`} type="panCard" component={Pan}/>            
            <ResubmitRoute exact path={`${path}/documents/resubmit/identity`} type="identity" component={Identity}/>            
            <ResubmitRoute exact path={`${path}/documents/resubmit/bank`} type="bankAccount" component={Bank}/>            
        </Switch>
    )
}

export default SellerProfile