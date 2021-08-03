import { useEffect, useState } from "react"
import Loader from "react-loader-spinner"
import { useSelector } from "react-redux"
import { fetchStatus } from './Helper/api'
import GstCard from "./Helper/GstCard"
import BankCard from "./Helper/BankCard"
import PanCard from "./Helper/PanCard"
import IdentityCard from "./Helper/IdentityCard"
import LogoCard from "./Helper/LogoCard"
import BusinessName from "./Helper/BusinessName"
const StepThree = (props) =>{

    const userState = useSelector(state => state.auth)
    const [verificationStatus, setVerificationStatus] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        fetchStatus(userState.user._id, userState.token).then((data) =>{
            if(data.error){
                console.log(data.error)
            }else{
                setVerificationStatus(data)
                setLoading(false)
                console.log(data)
            }
        }).catch((err) =>{
            console.log(err)
        })
    }, [userState])
   
    return(
        <div>
            <div style={{height: '100vh', display: loading ? '' : 'none'}} className="row">
                <div className="mx-auto my-auto">
                    <Loader type="Circles" color="#FF6A00" height={100} width={100} visible={loading} />
                </div>
            </div>
            <div className="row">
                <div className="col-3 my-3 mx-5">
                    <div className="row">
                        <div class="card" >
                            <div class="card-body">
                                <h5 class="card-title">Seller verification status</h5>
                                <div className="border border-primary rounded p-3 my-1">
                                    <label style={{fontWeight: 'bold'}}>Message from Make My Shop</label>
                                    <p style={{fontSize: 16}} class="card-text"><div>{verificationStatus.reSubmit === true && "Previous Message:"}</div>{verificationStatus && ((verificationStatus.status === false && verificationStatus.reSubmit && verificationStatus.reSubmit === true) || verificationStatus.status === false) ? verificationStatus.message : verificationStatus.message}</p>
                                </div>
                                <button class={`btn btn-${verificationStatus && ((verificationStatus.status === false && verificationStatus.reSubmit && verificationStatus.reSubmit === true) || verificationStatus.status === false) ? 'primary': 'danger'}`}>{verificationStatus && ((verificationStatus.status === false && verificationStatus.reSubmit && verificationStatus.reSubmit === true) || verificationStatus.status === false) ? 'Pending' : 'Rejected'}</button>
                            </div>
                        </div>
                        <div className="card col-12 mx-auto my-3">
                            <LogoCard logoStatus={verificationStatus.logo} status={verificationStatus.status} data={userState.user.businessId.businessLogo} history={props.history}/>
                        </div>
                        <div className="card col-12 mx-auto my-3">
                            <BusinessName bnStatus={verificationStatus.businessName} status={verificationStatus.status} data={userState.user.businessId.businessName} history={props.history}/>
                        </div>
                    </div>
                </div>
                <div className="col-6 my-3 mx-5">
                    <div className="row">
                        {userState.user.businessId.sellingPermission === "All" &&
                            <div className="card col-12 mx-auto my-3">
                            {userState.user.businessId.sellingPermission === "All" &&
                            <GstCard data={userState.user.businessId.gst}/>}
                            </div>
                        }
                        <div className="card col-12 mx-auto my-3">
                            <BankCard data={userState.user.businessId.bankAccount} status={verificationStatus.status} baStatus={verificationStatus.bankAccountNumber}/>
                        </div>
                        <div className="card col-12 mx-auto my-3">
                            <PanCard data={userState.user.businessId.panCard} />
                        </div>
                        <div className="card col-12 mx-auto my-3">
                            <IdentityCard data={userState.user.businessId.identity} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StepThree