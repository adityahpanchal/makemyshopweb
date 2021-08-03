import { useEffect, useState } from 'react'
import Loader from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import { API } from '../../../Backend'
import { setCartRequest } from '../../../redux'
import Header from '../../Header'
import CartList from './CartList'
import CheckOut from './CheckOut'
import { validatorAvailibility } from './Helper'
import TopTitle from './TopTitle'

const Cart = () =>{

    const userState = useSelector(state => state.auth)
    const cartState = useSelector(state => state.cart)
    const dispatch = useDispatch()
    
    const [cartList, setCartList] = useState([])
    const [cartPriceTotal, setCartPriceTotal] = useState({})

    const [isLoading, setisLoading] = useState(false)
    const [shouldCall, setShouldCall] = useState(true)
    const [qErr, setQErr] = useState(false)
    const [msg, setMsg] = useState('')

    useEffect(() =>{
        if(shouldCall === true){
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
                    setShouldCall(false)
                }else{
                    if(data.cartObj){
                        console.log(data.cartObj.finalList)
                        setCartList(data.cartObj.finalList)
                        setCartPriceTotal(data.cartObj.priceTotal)
                        setisLoading(false)
                        setShouldCall(false)
                        // let obj = await validatorAvailibility(data.cartList)
                        // console.log(obj.finalList)
                        // setCartList(obj.finalList)
                        // setCartPriceTotal(obj.priceTotal)
                        // setisLoading(false)
                        // setShouldCall(false)
                    }
                }
            }).catch((err) =>{
                console.log(err)
            })
        }
    }, [userState.token, userState.user._id, shouldCall])

    const deleteItem = (id) =>{
        fetch(`${API}/cart/delete/${userState.user._id}/${id}`, {
            method: "DELETE",
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
                    setShouldCall(true)
                    dispatch(setCartRequest(cartState.cart - 1))
                }
            }
        }).catch((err) =>{
            console.log(err)
        })
    }
    
    const addQuantity = (id) =>{
        fetch(`${API}/cart/add/quantity/${userState.user._id}/${id}`, {
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
                    let newCartList = cartList.map(x => {
                        if(x._id === id){
                            let currentQuantity = x.quantity
                            let newQuantity = currentQuantity + 1
                         
                            setCartPriceTotal({...cartPriceTotal, total: cartPriceTotal.total + x.price, products: cartPriceTotal.products + x.price})
                            x.quantity = newQuantity
                            return x
                        
                        }else{
                            return x
                        }
                    })
                    setCartList(newCartList)
                }
                if(data.msg){
                    setMsg(data.msg)
                    setQErr(true)
                    setTimeout(() => {
                        setQErr(false)
                    }, 5000)
                }
            }
        }).catch((err) =>{
            console.log(err)
        })
    }

    const minusQuantity = (id) =>{
        fetch(`${API}/cart/remove/quantity/${userState.user._id}/${id}`, {
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
                    let newCartList = cartList.map(x => {
                        if(x._id === id){
                            let currentQuantity = x.quantity
                            let newQuantity = currentQuantity - 1
                            
                            setCartPriceTotal({...cartPriceTotal, total: cartPriceTotal.total - x.price, products: cartPriceTotal.products - x.price})
                            x.quantity = newQuantity
                            return x
                        }else{
                            return x
                        }
                    })
                    setCartList(newCartList)
                }
                if(data.msg){
                    setMsg(data.msg)
                    setQErr(true)
                    setTimeout(() => {
                        setQErr(false)
                    }, 5000)
                }
            }
        }).catch((err) =>{
            console.log(err)
        })
    }

    return (
        <>
            {
                <div style={{height: '100vh', display: isLoading ? '' : 'none'}} className="row">
                    <div className="mx-auto my-auto">
                        <Loader type="Circles" color="#FF6A00" height={100} width={100} visible={isLoading} />
                    </div>
                </div>
            }
            {
                !isLoading &&
                <>
                    <Header />
                    <TopTitle title="Shopping cart"/>
                    <section class="section-content padding-y" style={{backgroundColor: 'white'}}>
                        <div class="container">
                            {qErr && <h6 className="text-danger my-3" style={{marginLeft: '30%'}}>{msg}</h6> }
                            <div class="row">
                                <CartList deleteItem={deleteItem} addQuantity={addQuantity} minusQuantity={minusQuantity} cartList={cartList} />
                                <CheckOut cartPriceTotal={cartPriceTotal} cartList={cartList}/>
                            </div>
                        </div>
                    </section>        
                </>
            }
        </>
    )
}

export default Cart