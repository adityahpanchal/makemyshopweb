import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { API } from "../../../Backend"

const OrderStatus = (props) =>{

    const userState = useSelector(state => state.auth)
    const [orderList, setOrderList] = useState([])
    const [order, setOrder] = useState({})
    const [priceData, setPriceData] = useState({})
    
    useEffect(() => {
        fetch(`${API}/get/order/status/user/${userState.user._id}/${props.match.params.transactionId}/${props.match.params.sellerId}`, {
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

                    // let abcd = data.orders.map(x => x.transactionId).filter((y, i, arr) => arr.indexOf(y) === i)
                    // let sendList = abcd.filter(x => )

                    console.log(data.orders)
                    setPriceData(data.priceData)
                    setOrder(data.orders[0])
                    setOrderList(data.orders)

               }
            }
        }).catch((err) =>{
            console.log(err)
        })
    }, [])
    console.log(order)
    return(
        <div className="card p-3 col">
            {
                orderList.length !== 0 &&
                <main className="col-md-12">
                    <article className=" mb-4">
                        <header className="card-header">
                            <strong className="d-inline-block mr-3">Transaction ID : {order.transactionId}</strong>
                        </header>
                        <header className="card-header">
                            <Link to="/profile/myorders" className="float-right"> <i className="fas fa-left-arrow"></i> Back</Link>
                            <strong className="d-inline-block mr-3">Order ID : {order._id}</strong>
                            <span>Order {new Date(order.createdAt).toLocaleString()}</span>
                        </header>
                        <div>
                            <button className="btn btn-outline-info mx-3 my-3">Delivery Status: {order.orderStatus}</button>
                        </div>
                        <div className="card-body">
                            <div className="row"> 
                                <div className="col-md-4">
                                    <h6 className="text-muted">Seller Information</h6>
                                    <p>{order.sellerId.businessName} {<><br></br></>}  
                                        Mobile: +91 {order.sellerId.businessMobile}{<><br></br><br></br></>}  
                                        Shipping Address: {<br></br>} {order.sellerId.businessAddress.addressLineOne}, {order.sellerId.businessAddress.addressLineTwo} {<br></br>}  {order.sellerId.businessAddress.city},  {order.sellerId.businessAddress.state}, {<br></br>}Pincode : {order.sellerId.businessAddress.pincode}
                                    </p>
                                </div>
                                <div className="col-md-4">
                                    <h6 className="text-muted">Delivery to</h6>
                                    <p>{order.addressId.fullname} {<br></br>}  
                                        Mobile: +91 {order.addressId.mobile}{<><br></br><br></br></>}  
                                        Location: {<br></br>} {order.addressId.houseNumberandBuilding}, {order.addressId.famousSpot} {<br></br>}  {order.addressId.area},  {order.addressId.city}, {order.addressId.state} {<br></br>}Pincode : {order.addressId.pincode}
                                    </p>
                                </div>
                                <div className="col-md-4">
                                    <h6 className="text-muted">Total Payment To: {order.sellerId.businessName}</h6>
                                    <span className="text-dark">
                                        <i className="fas fa-truck primary"></i>
                                    <span> Payment Method: {order.paymentMethod === 'Online' ? 'Online' : 'Cash on delivey'}</span>
                                    </span>
                                    <p>Subtotal: {priceData.product} {<br></br>}  
                                    Shipping fee:  {priceData.shipping} {<br></br>}  
                                    <span className="b">Total: ₹ {priceData.total} </span>
                                    </p>
                                </div>
                            </div> 
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <tbody>
                                    {
                                        orderList.map(orderP => {
                                            return(
                                                <tr>
                                                    <td width="200" width="100">
                                                        <img style={{objectFit: 'contain', height: 100, width: 200}} src={`${API}/seller/docs/${orderP.productId.images[0]}`} alt="s" className="img-xs border" />
                                                    </td>
                                                    <td width="300"> 
                                                        <Link to={`/view/product/${orderP.productId._id}`} target="_blank"><p className="title mb-0">{orderP.productId.productName} </p></Link>
                                                        <var className="price text-muted">₹ {orderP.price}</var><br></br>
                                                        {orderP.isMultiVariant && <var className="price text-muted"> {orderP.mKey}</var>}
                                                        {orderP.isSubVariant && <var className="price text-muted"> {orderP.sKey} ({order.ssKey})</var>}
                                                    </td>
                                                    <Link to={`/shop/${orderP.sellerId._id}`} target="_blank"> <td width="100"> Seller <br></br> {orderP.sellerId.businessName} </td></Link>
                                                    <td>
                                                        <div className="col-md-12">
                                                            <h6 className="text-muted">Payment</h6>
                                                            <span className="text-dark">
                                                                <i className="fas fa-truck primary"></i>
                                                            <span> Payment Method: {orderP.paymentMethod === 'Online' ? 'Online' : 'Cash on delivey'}</span>
                                                            </span>
                                                            <p>Subtotal: {orderP.quantity} * { orderP.price} {<br></br>}  
                                                            Shipping fee:  {orderP.shippingCost} {<br></br>}  
                                                            <span className="b">Total: ₹ {(orderP.quantity * orderP.price) + orderP.shippingCost} </span>
                                                            </p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </article> 
                </main>
            } 
        </div>
    )
}

export default OrderStatus