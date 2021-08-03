import { useState } from "react"
import Loader from "react-loader-spinner"
import { useSelector } from "react-redux"
import { API } from "../../../../../Backend"
import AOV from "./AOV"
import DeactivatedPanel from "./DeactivatedPanel"

const SellerAccountOverView = () =>{

    const userState = useSelector(state => state.auth)
    const [data, setData] = useState(false)
    const [loading, setLoading] = useState(true)
    const [sellerReview, setSellerReview] = useState([]) 

    useState(() =>{
        fetch(`${API}/shop/${userState.user.businessId._id}`, {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        }).then((response) =>{
            return response.json()
        }).then(async(data) =>{
            if(data.error){
                setLoading(false)
                console.log(data.error)
            }else{
                if(data.sellerProfile.isDeactivated){
                    fetch(`${API}/seller/account/review/${userState.user.businessId._id}/${userState.user._id}`, {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            Authorization: `Bearer ${userState.token}`
                        }
                    }).then((response) =>{
                        return response.json()
                    }).then(async(data2) =>{
                        if(data2.error){
                            setLoading(false)
                            console.log(data2.error)
                        }else{
                            if(data2.sellerReview === null){
                                setLoading(false)
                                setData(data.sellerProfile)
                                setSellerReview(false)
                                console.log('comes hear')
                            }else{
                                setLoading(false)
                                setData(data.sellerProfile)
                                setSellerReview(data2.sellerReview)
                                console.log('comes hefdfar', data2.sellerReview)
                            }
                        }
                    }).catch((err) =>{
                        console.log(err)
                    })
                }else{
                    setLoading(false)
                    setData(data.sellerProfile)
                    console.log(data.sellerProfile, 'data.sellerProfil fdgdge')
                }
            }
        }).catch((err) =>{
            console.log(err)
        })
    }, [])

    return(
        <>
            {
                loading &&
                <div className="card col-9">
                    <div className="row mx-auto mt-5">
                        <Loader type="Circles" color="#FF6A00"/>
                    </div>
                </div>
            }
            {!data.isDeactivated && !loading && <AOV data={data}/>}
            {data.isDeactivated && !loading && <DeactivatedPanel sellerReview={sellerReview} data={data}/>}
        </>
    )
}

export default SellerAccountOverView