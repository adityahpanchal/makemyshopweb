import { useEffect, useState } from "react"
import Loader from "react-loader-spinner"
import { useDispatch, useSelector } from "react-redux"
import { withRouter } from "react-router-dom"
import { API } from "../../../Backend"
import { setAddressIdRequest, setShouldAddressToPaymentRequest, setShouldCartToAddressRequest } from "../../../redux"
import { stateFinder } from "../../Assets/India"
import Header from '../../Header'
import AddAddress from "./AddAddress"
import TopTitle from './TopTitle'
import UpdateAddress from "./UpdateAddress"

const AddressVerification = (props) =>{

    const dispatch = useDispatch()
    const cartState = useSelector(state => state.cart)
    const userState = useSelector(state => state.auth)
    const [addressList, setAddressList] = useState([])
    const [defaultAddress, setDefaultAddress] = useState({})
    const [isAddress, setIsAddress] = useState(false)
    const [addAddressMode, setAddAddressMode] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)

    //err
    const [isSingelErr, setIsSingelErr] = useState(false)
    const [singelErr, setSingelErr] = useState('')

    const [ime, setIme] = useState(false)
    const [imeArr, setImeArr] = useState([])

    const [priceData, setPriceData] = useState({})
    const [priceLoading, setPriceLoading] = useState(true)
    const [cartProductList, setCartProductList] = useState([])
    const [loading, setLoading] = useState([])
    const [isAddressConfirmed, setIsAddressConfirmed] = useState(false)    
    
    useEffect(() =>{
        setLoading(true)
        setPriceLoading(true)
        // console.log(cartState, 'cartState')

        fetch(`${API}/cart/all/${userState.user._id}`, {
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
                if(data.cartObj){
                    setPriceData(data.cartObj.priceTotal)
                    setCartProductList(data.cartObj.finalList)
                    setPriceLoading(false)
                }
            }
        }).catch((err) =>{
            console.log(err)
        })

        fetch(`${API}/all/address/${userState.user._id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${userState.token}`
            }
        }).then((response) =>{
            return response.json()
        }).then((data) =>{
            if(data.error){
                console.log(data.error)
            }else{
                if(data.allAddress){
                    console.log(data.allAddress)

                    if(data.allAddress.length !== 0){
                        let sortAddressDefault = data.allAddress.sort(value => {
                            return value.isDefault ? -1 : 1 
                        })
                        setAddressList(sortAddressDefault)
                        let filterDefault = data.allAddress.filter((x) => x.isDefault)
                        if(filterDefault.length === 0){
                            setDefaultAddress(data.allAddress[0])
                        }else{
                            setDefaultAddress(filterDefault[0])
                        }
                        setIsAddress(true)
                        // setTimeout(() => {
                        //     props.history.push('/cart')
                        // }, 10000)
                    }else{
                        setIsAddress(false)
                        // setTimeout(() => {
                        //     props.history.push('/cart')
                        // }, 10000)
                    }
                    setLoading(false)
                }
            }
        }).catch((err) =>{
            console.log(err)
        })

        return () => {
            dispatch((setShouldCartToAddressRequest(false)))
        }
    }, [userState.token, userState.user._id])

    const afterAddAddress = (id) =>{
        console.log(id, 'sfrsdjh')
        setLoading(true)
        fetch(`${API}/all/address/${userState.user._id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${userState.token}`
            }
        }).then((response) =>{
            return response.json()
        }).then((data) =>{
            if(data.error){
                console.log(data.error)
            }else{
                if(data.allAddress){
                    console.log(data.allAddress)

                    if(data.allAddress.length !== 0){
                        let sortAddressDefault = data.allAddress.sort(value => {
                            return value.isDefault ? -1 : 1 
                        })
                        setAddressList(sortAddressDefault)
                        let filterDefault = data.allAddress.filter((x) => x._id == id)[0]
                        setDefaultAddress(filterDefault)
                        setIsAddress(true)
                        setIsAddressConfirmed(false)
                    }else{
                        setIsAddress(false)
                        setIsAddressConfirmed(false)
                    }
                    setLoading(false)
                    setIsAddressConfirmed(false)
                }
            }
        }).catch((err) =>{
            console.log(err)
        })
    }

    const confirmAddress = () =>{
        if(!isAddress){
            setIsSingelErr(true)
            setSingelErr('Add new address')
            setTimeout(() =>{
                setIsSingelErr(false)
                setSingelErr('')
            }, 4000)
            return
        }

        let user = userState.user
        let isErr = false
        let errArr = []
        for (let i = 0; i < cartProductList.length; i++) {
            const element = cartProductList[i];
            let sr = element.sellerId.sellingRegion
            if((sr === user.city || sr === user.state || sr === 'India') === false){
                isErr = true
                errArr.push(`sorry the product ${element.productId.productName} you have added to cart is only available in ${sr} ${stateFinder(element.sellerId.sellingRegion) ? 'state' : 'city'} you can add address of ${sr} ${stateFinder(element.sellerId.sellingRegion) ? 'state' : 'city'} or remove from cart`)
            }
        }
        if(isErr === false){
            setIsAddressConfirmed(true)
        }else{
            setIme(true)
            setImeArr(errArr)
        }
    }

    const addressChange = (e) =>{
        setIsAddressConfirmed(false)
        let id = e.target.value
        let newDefault = addressList.filter(x => x._id == id)[0]
        setDefaultAddress(newDefault)

        // let newAddressList = addressList.map((x) =>{
        //     if(x._id == id){
        //         x.isDefault = true
        //         return x
        //     }else{
        //         x.isDefault = false
        //         return x
        //     }
        // })
        // setAddressList(newAddressList)
    }
    // console.log(defaultAddress, "default address")
    // console.log(addressList, "address")
    const addCartListRedux = () =>{
        return new Promise((resolve, reject) =>{
            dispatch(setShouldAddressToPaymentRequest(true))
            dispatch(setAddressIdRequest(defaultAddress._id))
            resolve(true)
        })
    }

    const placeOrder = async() =>{
        fetch(`${API}/cart/validate/stocks/${userState.user._id}`, {
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
                if(data.status){
                    console.log('data.status')
                    const a = await addCartListRedux()
                    if(a){
                        props.history.push('/payment')
                    }
                }
            }
        }).catch((err) =>{
            console.log(err)
        })
    }

    return(
        <>
            <Header />
            <TopTitle title="PLACE YOUR ORDER"/>
            <section class="section-content padding-y" style={{backgroundColor: 'white'}}>
                <div class="container">
                    {isSingelErr && <h4>{singelErr}</h4>}
                    {ime && 
                        <>
                            <div onClick={() =>{setImeArr([]); setIme(false)}}><i className="icon col-6 fas fa-times float-right"></i></div>
                            <br></br>
                            {
                                imeArr.map(x => {
                                    return(
                                        <div class="alert alert-danger col-6" role="alert">
                                            {x}
                                        </div>
                                    )
                                })
                            }
                        </>
                    }
                    <div class="row">
                        <main class="col-md-9">
                            <div style={{borderWidth: 1, borderColor: '#D95A00', borderRadius: 10}} class="card ">
                                {
                                    loading &&
                                    <div className="row py-5 mx-auto">
                                        <Loader color="#D95A00" type='Circles'/>
                                    </div>
                                }
                                
                                {
                                    !loading && isAddress &&
                                    <div className="p-3">
                                        <div class="form-group col-6 ">
                                            <label for="selectaad">Select Address</label>
                                            <select onChange={addressChange} class="form-control" id="selectaad">
                                                {
                                                    addressList.map(x =><option value={x._id} selected={x._id == defaultAddress._id} className="p-3">{x.fullname} (+91 {x.mobile}), {x.houseNumberandBuilding}, {x.famousSpot}, {x.area}, {x.city}, {x.state}.. Pinocde-{x.pincode} ({x.type}) </option>)
                                                }
                                            </select>
                                        </div>
                                        {addAddressMode && <AddAddress isAddMode={true} offAddress={setAddAddressMode} afterAddAddressFn={afterAddAddress}/>}
                                        {isEditMode && <UpdateAddress offEditMode={setIsEditMode} addrssData={defaultAddress} afterAddAddressFn={afterAddAddress}/>}
                                        {
                                            !addAddressMode && 
                                            <div className="mt-3">
                                                <button className="btn btn-primary float-right " onClick={() => setAddAddressMode(true)} style={{marginRight: 200}}>Add Address</button>
                                            </div>
                                        }
                                        <br></br>
                                        <div className="col-md-6 mx-5">
                                            <div className="card" style={{borderWidth: 1, borderColor: '#D95A00', borderRadius: 1}}>
                                                <div>
                                                    <h4 className="text-center py-3">Selected Address</h4>
                                                    <div className="mx-3">
                                                        <h6>{defaultAddress.fullname}</h6>
                                                        <p>Mobile: +91 {defaultAddress.mobile}, {`+91 ${defaultAddress.altMobile && defaultAddress.altMobile}`}</p>
                                                        <p style={{fontSize: 17}} className="mb-3">{defaultAddress.houseNumberandBuilding}, {defaultAddress.famousSpot} <br></br>{defaultAddress.area}, {defaultAddress.city}, {defaultAddress.state} <br></br> Pincode: {defaultAddress.pincode}</p>
                                                    </div>
                                                    <div className="row ml-3 mb-3">
                                                        {!isAddressConfirmed && <button onClick={confirmAddress} className={`btn btn-info mr-3`}>Deliver Here</button>}
                                                        {isAddressConfirmed && <button className={isAddressConfirmed ? 'btn btn-outline-success mr-3' : 'btn btn-outline-info mr-3'}>Address Confirmed</button>}
                                                        <button onClick={() => {setIsEditMode(true); setAddAddressMode(false)}} className="btn btn-outline-dark">Edit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                
                                {!isAddress && <AddAddress isAddMode={false} offAddress={setAddAddressMode} afterAddAddressFn={afterAddAddress}/>}   
                            </div>
                        </main>
                        {/* checkout */}
                        <aside class="col-md-3 mx-auto">
                            <div class="card">
                                <div class="card-body">
                                    <dl class="dlist-align">
                                        <dt><b>Products Total:</b></dt>
                                        {priceLoading && <Loader type="Circles" color="#FF6A00" height={30}/>}
                                        {!priceLoading && <dd class="text-right">₹ {priceData.products}</dd>}
                                    </dl>
                                    <dl class="dlist-align">
                                        <dt><b>Shipping Total:</b></dt>
                                        {priceLoading && <Loader type="Circles" color="#FF6A00" height={30}/>}
                                        {!priceLoading && <dd class="text-right">₹ {priceData.shipping}</dd>}
                                    </dl>
                                    <dl class="dlist-align">
                                        <dt><b>Total:</b></dt>
                                        {priceLoading && <Loader type="Circles" color="#FF6A00" height={30}/>}
                                        {!priceLoading && <dd class="text-right  h5"><strong>₹ {priceData.total}</strong></dd>}
                                    </dl>
                                    <hr></hr>
                                    {!priceLoading && <button disabled={!isAddressConfirmed} onClick={placeOrder} className="btn btn-primary float-right">PLACE ORDER</button>}
                                </div> 
                            </div> 
                        </aside> 
                    </div>
                </div>
            </section>        
        </>
    )
}

export default  withRouter(AddressVerification)