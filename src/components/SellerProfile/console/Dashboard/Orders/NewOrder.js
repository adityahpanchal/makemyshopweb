import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { API } from "../../../../../Backend"
import OrderCard from "./OrderCard"

const NewOrders = () =>{

    const userState = useSelector(state => state.auth)
    const [orderList, setOrderList] = useState([])
    
    useEffect(() => {
        fetch(`${API}/get/seller/orders/${userState.user.businessId._id}/${userState.user._id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${userState.token}`
            }
        }).then((response) =>{
            return response.json()
        }).then(async(data) =>{
            if(data.error){
                console.log(data.error)
            }else{
               if(data.orders){
                    console.log(data.orders)
                    setOrderList(data.orders)
               }
            }
        }).catch((err) =>{
            console.log(err)
        })
    }, [])

    return(
        <div className="col card p-3">
            {
                orderList.length !== 0 &&
                orderList.map(obj => obj.transactionId).filter((trasIdArr, tiaI, ar) => ar.indexOf(trasIdArr) === tiaI).map(transactionId =>{
                    
                    let productsByTransactionId = orderList.filter(x => x.transactionId === transactionId)
                    let forTotal = orderList.find(x => x.transactionId === transactionId)
                    return(
                        <div className="card p-3 mt-3 border border-primary col">
                            <h6>Transaction ID : {transactionId}</h6>
                            <hr></hr>
                           
                            <Link to={`/seller/console/view/delivery/status/${forTotal.userId._id}/${transactionId}`}>
                                <div className="card p-3 mt-1 border rounded col">
                                    <div>
                                        <h6 className="float-left">Buyer ID : {forTotal.userId._id} <br></br> Buyer Name: {forTotal.userId.firstname} {forTotal.userId.lastname}</h6>
                                        {/* <Link to={`/profile/order/status/${transactionId}/${sellers.sellerId}`} className="float-right "> <i className="fa fa-print"></i> Check Status</Link> */}
                                        {/* <Link to={`/profile/order/status/${transactionId}/${sellers.sellerId}`} className="float-right mx-5 btn btn-outline-info"> <i className="fa fa-truck"></i> Check Status</Link> */}
                                    </div>
                                    <hr></hr>
                                    <div className="col-12">
                                        {
                                            productsByTransactionId.reverse().map(orderObj =>{
                                                return <OrderCard order={orderObj}/>
                                            })
                                        }
                                    </div>
                                </div>
                            </Link>
                                    
                            <div className="col-md-4 mt-1 ">
                                <h6 className="text-muted">Total transaction amount</h6>
                                <p>Subtotal: ₹ {forTotal.totalProductAmount} {<br></br>}  Shipping fee: ₹ {forTotal.totalShippingCost} {<br></br>}  
                                <span className="b">Total: ₹ {forTotal.totalPrice} </span>
                            </p>
                        </div>
                        </div>
                    )
                })
            }
            {
                orderList.length === 0 &&
                <h4 className="text-center mt-5">0 orders found</h4>
            }
        </div>
    )
}

export default NewOrders