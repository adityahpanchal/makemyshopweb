import { useEffect, useState } from "react"
import Loader from "react-loader-spinner"
import { useSelector } from "react-redux"
import { API } from "../../../../../Backend"

const DeactivatedPanel = ({data, sellerReview}) =>{

    const [sellerText, setSellerText] = useState('')
    const [loading, setLoading] = useState('')
    const userState = useSelector(state => state.auth)
    const [myReview, setMyReview] = useState(false)

    const [warningShow, setWarningShow] = useState(true)
    const [checked, setChecked] = useState(false)

    useEffect(() =>{
        setMyReview(sellerReview)
    }, [sellerReview])

    const addForReview = () =>{
        setLoading(true)
        fetch(`${API}/seller/account/review/add/${userState.user.businessId._id}/${userState.user._id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${userState.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({sellerText: sellerText, adminMsgOfBlock: data.msg})
        }).then((response) =>{
            return response.json()
        }).then(async(data) =>{
            if(data.error){
                console.log(data.error)
            }else{
               setLoading(false)
               setSellerText('')
               console.log(data.rvReq)
               setMyReview(data.rvReq)
            }
        }).catch((err) =>{
            console.log(err)
        })
    }

    const hideWarning = () =>{
        if(!checked){
            setWarningShow(false)
        }else{
            fetch(`${API}/hide/warning/${userState.user.businessId._id}/${userState.user._id}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${userState.token}`,
                }
            }).then((response) =>{
                return response.json()
            }).then(async(data) =>{
                if(data.error){
                    console.log(data.error)
                }else{
                    setWarningShow(false)

                }
            }).catch((err) =>{
                console.log(err)
            }) 
        }
    }

    return(
        <div className="card col-9">

            {
                data.isWarning && warningShow &&
                <div class="card col-6 mx-auto mt-3 p-3 border border-danger">
                    <p className="text-danger h5 mt-3">Warning</p>
                    <hr></hr>
                    <div class="">
                        <p class="card-text" style={{fontSize: 18}}>{data.warning}.</p>
                        <div class="form-check">
                            <input class="form-check-input"  onChange={(e) => setChecked(e.target.checked)} type="checkbox" value="" id="flexCheckDefajult" />
                            <label class="form-check-label" for="flexCheckDefajult" >
                                Don't show again
                            </label>
                        </div>
                        <button onClick={hideWarning} className="btn btn-primary mt-3"><i className="icon fas fa-check"></i></button>
                    </div>
                </div>
            }
            {
                myReview &&
                <div className="card col-6 mx-auto mt-3 py-3 border border-info">
                    <h5>Review Request</h5>
                    <button className="btn btn-outline-info col-4">Satus: {myReview.status}</button>
                    <p style={{fontSize: 17}} className="mt-3">Your Review: {myReview.sellerText}</p>
                    <p style={{fontSize: 17}} className="mt-3">Admin Reply: {myReview.adminReply}</p>
                </div>
            }
            <div className="card col-9 mx-auto my-5 p-3 border border-danger">
                <h4 className="text-danger">Your Seller Account is Blocked</h4>
                <hr></hr>
                <p style={{fontSize: 17}}>Question: Why my seller account is blocked ??</p>
                <p style={{fontSize: 17}}>Ans: {data.msg}</p>
                <textarea className="form-control mb-3 col-4" onChange={(e) => setSellerText(e.target.value)} value={sellerText} placeholder="Add your review "></textarea>
                {!loading && !myReview && <button onClick={addForReview} className="col-3 btn btn-primary">Request for review</button>}
                {!loading && myReview.status === 'Pending' && <button onClick={addForReview} className="col-3 btn btn-primary">Update review</button>}
                {!loading && myReview.status === 'Rejected' && <button onClick={addForReview} className="col-3 btn btn-primary">resubmit review</button>}
                {loading && <Loader type="Circles" height={50} color="#D95A00"/>}
            </div>
        </div>
    )
}

export default DeactivatedPanel