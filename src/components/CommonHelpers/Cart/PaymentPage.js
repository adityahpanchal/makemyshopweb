import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { API } from "../../../Backend"
import FinalList from "./FinalList"
import { paymentPageTotal } from "./Helper"
import reactlogo from '../../../Images/reactlogo.png'
import Loader from "react-loader-spinner"
import { setShouldAddressToPaymentRequest } from "../../../redux"

const PaymentPage = (props) =>{

    const disptach = useDispatch()
    const userState = useSelector(state => state.auth)
    const cartState = useSelector(state => state.cart)
    const [cartList, setCartList] = useState([])
    const [priceData, setPriceData] = useState({})
    const [loading, setLoading] = useState(true)
    const [paymentLoading, setPaymentLoading] = useState(false)
    console.log(cartState)
    useEffect(() =>{
        fetch(`${API}/cart/lock/quantity/${userState.user._id}`, {
            method: "POST",
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
                if(data.lockedList){
                    console.log(data.lockedList)
                    setCartList(data.lockedList)
                    let priceTotal = await paymentPageTotal(data.lockedList)
                    setPriceData(priceTotal)
                    setLoading(false)
                }
            }
        }).catch((err) =>{
            console.log(err)
        })

        return () => {
            disptach(setShouldAddressToPaymentRequest(false))
        }
    }, [])

    const loadRazorPay = () =>{
        return new Promise((resolve, reject) =>{
            const script = document.createElement('script')
            script.src = 'https://checkout.razorpay.com/v1/checkout.js'
            script.onload = () =>{
                console.log('script done')
                resolve(true)
            }
            script.onerror = () =>{
                console.log('script done')
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }

    const payOnline = async() =>{

        const res = await loadRazorPay()
        if(!res){
            alert('Rezorpay SDK failed to load')
        }

        const orderIdReq = await fetch(`${API}/razorpay/${userState.user._id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${userState.token}`
            },
            body: JSON.stringify(priceData)
        }).then(t => t.json())
        // console.log(orderIdReq)

        const options = {
            key: "rzp_test_XVDfNdUcaStwfX",
            amount: orderIdReq.paymentObj.amount, 
            currency: orderIdReq.paymentObj.currency,
            name:  `Hello ${userState.user.firstname}`,
            description: "Happy Shopping",
            image: reactlogo,
            order_id: orderIdReq.paymentObj.id, 
            handler: function (response){
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature)
                // console.log(response)
                if(response.razorpay_payment_id){
                    setPaymentLoading(true)
                    fetch(`${API}/create/order/online/${cartState.addressId}/${response.razorpay_payment_id}/${response.razorpay_order_id}/${userState.user._id}`, {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            Authorization: `Bearer ${userState.token}`,
                            "Content-Type": "application/json",
                        }
                    }).then((response) =>{
                        return response.json()
                    }).then(async(data) =>{
                        if(data.error){
                            console.log(data.error)
                        }else{
                           if(data.status){
                                setTimeout(() =>{
                                    setPaymentLoading(false)
                                    props.history.push('/profile/myorders')
                                }, 2000)
                           }
                        }
                    }).catch((err) =>{
                        console.log(err)
                    })
                }
            },
            prefill: {
                name: `${userState.user.firstname} ${userState.user.lastname}`,
                email: `${userState.user.email === undefined ? '' : userState.user.email}`,
                contact: `${userState.user.mobile}`
            },
            notes: {
                address: "Razorpay Corporate Office"
            },
            theme: {
                color: "#FF6A00"
            }
        }
        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
    }

    const cashOnDelivery = () =>{
        setPaymentLoading(true)
        fetch(`${API}/create/order/cod/${cartState.addressId}/${userState.user._id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${userState.token}`,
                "Content-Type": "application/json",
            }
        }).then((response) =>{
            return response.json()
        }).then(async(data) =>{
            if(data.error){
                console.log(data.error)
            }else{
               if(data.status){
                    setTimeout(() =>{
                        setPaymentLoading(false)
                        props.history.push('/profile/myorders')
                    }, 2000)
               }
            }
        }).catch((err) =>{
            console.log(err)
        })
    }

    return(
        <>
        {
            paymentLoading &&
            <div className="row ">
                <div className="mx-auto" style={{marginTop: '35vh'}}>
                    <h4 className="py-3">Please wait</h4>
                    <Loader type="RevolvingDot" color="#FF6A00" height={200} width={200}/>
                </div>
            </div>
        }
        {
        !paymentLoading &&
        <div className="row">
            <div className="card col-8 py-3 ml-5 mt-5">
                <h4 className="text-center m-3">Your Cart List</h4>
                {
                    loading &&
                    <div className="row mx-auto mt-5">
                        <Loader type="Circles" color="#FF6A00" height={75}/>
                    </div>
                }
                {!loading && <FinalList cartList={cartList}/>}
            </div>
            <aside class="col-md-3 mt-5 mx-auto">
                <div class="card">
                    {
                        loading &&
                        <div className="row mx-auto mt-5">
                            <h4 className="text-center col-12">Confirm Your Order</h4>
                            <div className="mx-auto mt-3 p-3">
                                <Loader type="Circles" color="#FF6A00" height={50}/>
                            </div>
                        </div>
                    }
                    {
                        !loading &&
                        <div class="card-body">
                            <h4>Confirm Your Order</h4>
                            <hr></hr>
                            <dl class="dlist-align">
                                <dt><b>Products Total:</b></dt>
                                {<dd class="text-right">₹ {priceData.products}</dd>}
                            </dl>
                            <dl class="dlist-align">
                                <dt><b>Shipping Total:</b></dt>
                                {<dd class="text-right">₹ {priceData.shipping}</dd>}
                            </dl>
                            <dl class="dlist-align">
                                <dt><b>Total:</b></dt>
                                {<dd class="text-right  h5"><strong>₹ {priceData.total}</strong></dd>}
                            </dl>
                            <hr></hr>
                            {<button onClick={cashOnDelivery} className="btn btn-primary float-right"><span class="text">CASH ON DELIVERY</span><i className="fas fa-money-bill-alt "></i></button>}
                            <br></br>
                            <br></br>
                            {<button onClick={payOnline} className="btn btn-primary mt-1 float-right"><span class="text">PAY NOW</span><i className="fas fa-credit-card "></i></button>}
                        </div> 
                    }
                </div> 
            </aside> 
        </div>
        }
        </>
    )
}

export default PaymentPage