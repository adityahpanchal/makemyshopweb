import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { API } from "../../../Backend"
import OrderCard from "./OrdersCard"
import ReactToPrint from 'react-to-print'

const Order = () =>{

    const userState = useSelector(state => state.auth)
    const [orderList, setOrderList] = useState([])
    
    useEffect(() => {
        fetch(`${API}/get/user/orders/${userState.user._id}`, {
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
                    let sellersByTid = orderList.filter(obj => {
                        return obj.transactionId === transactionId
                    }).map(y => y.sellerId._id).filter(((z, i2, ar2) => ar2.indexOf(z) === i2))
                   
                    let forName = []
                    sellersByTid.map((seller) =>{
                        let adf = orderList.find(x => x.transactionId === transactionId && x.sellerId._id === seller)
                        forName.push({sellerId: seller, sellerName: adf.sellerId.businessName})
                        return seller
                    })

                    let forTotal = orderList.find(x => x.transactionId === transactionId)
                    return(
                        <div className="card p-3 mt-3 border border-primary col">
                            <h6>Transaction ID : {transactionId}</h6>
                            <hr></hr>
                            {
                                forName.map(sellers =>{
                                    let ordersBySellerId = orderList.filter(ol =>{
                                        return ol.sellerId._id === sellers.sellerId && ol.transactionId === transactionId
                                    })
                                    return(
                                        <div className="card p-3 mt-1 border border-primary rounded col">
                                            <div>
                                                <h6 className="float-left">Seller ID : {sellers.sellerId} <br></br> Seller Name: {sellers.sellerName}</h6>
                                                <Link to="/" className="float-right"> <i className="fa fa-print"></i> Print</Link>
                                            </div>
                                            <hr></hr>
                                            <div className="col-12">
                                                {
                                                    ordersBySellerId.map(orderObj =>{
                                                        return <OrderCard order={orderObj}/>
                                                    })
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
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

export default Order


import {Link} from 'react-router-dom'
import { API } from '../../../Backend'

const OrderCard = ({order}) =>{
    return(
        <main className="col-md-12">
            <article className="card mb-4">
                <header className="card-header">
                    {/* <Link to="/" className="float-right"> <i className="fa fa-print"></i> Print</Link> */}
                    <strong className="d-inline-block mr-3">Order ID : {order._id}</strong>
                    <span>Order {new Date(order.createdAt).toLocaleString()}</span>
                </header>
                <div className="card-body">
                    <div className="row"> 
                        <div className="col-md-8">
                            <h6 className="text-muted">Delivery to</h6>
                            <p>{order.addressId.fullname} {<br></br>}  
                                Mobile: +91 {order.addressId.mobile}{<br></br>}  
                                Location: {<br></br>} {order.addressId.houseNumberandBuilding}, {order.addressId.famousSpot} {<br></br>}  {order.addressId.area},  {order.addressId.city}, {order.addressId.state} {<br></br>}Pincode : {order.addressId.pincode}
                            </p>
                        </div>
                        <div className="col-md-4">
                            <h6 className="text-muted">Payment</h6>
                            <span className="text-dark">
                                <i className="fas fa-truck primary"></i>
                               <span> Payment Method: {order.paymentMethod === 'Online' ? 'Online' : 'Cash on delivey'}</span>
                            </span>
                            <p>Subtotal: {order.quantity} * { order.price} {<br></br>}  
                            Shipping fee:  {order.shippingCost} {<br></br>}  
                            <span className="b">Total: ₹ {(order.quantity * order.price) + order.shippingCost} </span>
                            </p>
                        </div>
                    </div> 
                </div>
                <div className="table-responsive">
                    <table className="table table-hover">
                        <tbody>
                            <tr>
                                <td width="65">
                                    <img style={{objectFit: 'contain'}} src={`${API}/seller/docs/${order.productId.images[0]}`} alt="s" className="img-xs border" />
                                </td>
				                <td> 
                                    <Link to={`/view/product/${order.productId._id}`} target="_blank"><p className="title mb-0">{order.productId.productName} </p></Link>
                                    <var className="price text-muted">₹ {order.price}</var>
				                </td>
				                <Link to={`/shop/${order.sellerId._id}`} target="_blank"> <td> Seller <br></br> {order.sellerId.businessName} </td></Link>
                                <td width="250"> <Link to="/" className="btn btn-outline-primary">Track order</Link> 
                                    <div className="dropdown d-inline-block">
                                        <Link to="/" data-toggle="dropdown" className="dropdown-toggle btn btn-outline-secondary">More</Link>
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <Link to="/" className="dropdown-item">Return</Link>
                                            <Link to="/"  className="dropdown-item">Cancel order</Link>
                                        </div>
                                    </div> 
                                </td>
			                </tr>
                        </tbody>
                    </table>
                </div>
            </article> 
        </main> 
    )
}

export default OrderCard