import {Link} from 'react-router-dom'
import { API } from '../../../../../Backend'

const OrderCard = ({order}) =>{
    return(
        <main className="col-md-12">
            <article className=" mb-4">
                {/* <header className="card-header">
                    <Link to="/" className="float-right"> <i className="fa fa-print"></i> Print</Link>
                    <strong className="d-inline-block mr-3">Order ID : {order._id}</strong>
                    <span>Order {new Date(order.createdAt).toLocaleString()}</span>
                </header> */}
                {/* <div className="card-body">
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
                </div> */}
                <div className="table-responsive">
                    <table className="table table-hover">
                        <tbody>
                            <tr>
                                <td width="200" width="100">
                                    <img style={{objectFit: 'contain', height: 100, width: 200}} src={`${API}/seller/docs/${order.productId.images[0]}`} alt="s" className="img-xs border" />
                                </td>
				                <td width="300"> 
                                    <Link to={`/view/product/${order.productId._id}`} target="_blank"><p className="title mb-0">{order.productId.productName} </p></Link>
                                    <var className="price text-muted">₹ {order.price}</var><br></br>
                                    {order.isMultiVariant && <var className="price text-muted"> {order.mKey}</var>}
                                    {order.isSubVariant && <var className="price text-muted"> {order.sKey} ({order.ssKey})</var>}
				                </td>
				                <Link to={`/shop/${order.sellerId._id}`} target="_blank"> <td width="100"> Seller <br></br> {order.sellerId.businessName} </td></Link>
                                <td>
                                    <div className="col-md-12">
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