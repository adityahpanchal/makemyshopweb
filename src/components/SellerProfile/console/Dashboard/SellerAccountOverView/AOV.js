import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { API } from "../../../../../Backend"

const AOV = ({data}) =>{

    const [warningShow, setWarningShow] = useState(true)
    const [checked, setChecked] = useState(false)
    const [count, setCount] = useState(false)

    const userState = useSelector(state => state.auth)

    useEffect(() => {
        fetch(`${API}/count/seller/orders/product/${userState.user.businessId._id}/${userState.user._id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
            }
        }).then((response) =>{
            return response.json()
        }).then(async(data) =>{
            if(data.error){
                console.log(data.error)
            }else{
                console.log(data)
                setCount(data)
            }
        }).catch((err) =>{
            console.log(err)
        }) 
    }, [])

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
        <div className="card col-md-9 py-3">
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
            <div className="row p-3 ">
                <div className="card col-9 mx-3 mb-5">
                    <h3 className="mx-auto my-3">{userState.user.businessId.businessName}</h3>
                    <div class="card-body">
                        <h5 class="card-title">Your Store Link</h5>

                        <div class="input-group">
                            <input type="text" id="copy1" placeholder="Keyword" class="form-control" value={`http://localhost:3000/shop/${userState.user.businessId._id}`} name="" />
                            <span class="input-group-append"> <button class="btn btn-primary" onClick={(e) =>{
                                let copyText = document.getElementById("copy1")
                                    copyText.select();
                                
                                    copyText.setSelectionRange(0, 99999)
                                    document.execCommand("copy");

 
                                    alert("Copied the text: " + copyText.value)
                            }}> Copy</button></span>
                        </div>
                    </div>
                </div>
                
                <div style={{backgroundColor: '#c9c8c3', height: 150}} className="card col-md-3 p-3 mx-3">
                    <h4 className="text-center my-auto"> Completed Orders</h4>
                    <h3 className="text-center">{count.completedOrders}</h3>
                </div>
                <div style={{backgroundColor: '#c9c8c3', height: 150}} className="card col-md-3 p-3 mx-3">
                    <h4 className="text-center my-auto"> Pending Orders</h4>
                    <h3 className="text-center">{count.pendingOrders}</h3>
                </div>
                <div style={{backgroundColor: '#c9c8c3', height: 150}} className="card col-md-3 p-3 mx-3">
                    <h4 className="text-center my-auto"> Total Products</h4>
                    <h3 className="text-center">{count.productTotal}</h3>
                </div>
                {/* <div style={{backgroundColor: '#c9c8c3', height: 150}} className="card col-3 p-3 mx-3">
                    <h4 className="text-center my-auto"> Total Products</h4>
                    <h3 className="text-center">23</h3>
                </div> */}
            </div>
        </div>
    )
}

export default AOV