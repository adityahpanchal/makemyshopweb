import { useEffect, useState } from "react"
import Loader from "react-loader-spinner"
import { useSelector } from "react-redux"
import { API } from "../../../Backend"
import ProductCard from "./ProductCard"

const ProductList = (props) =>{

    const userState = useSelector(state => state.auth)
    const [wishList, setWishList] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch(`${API}/get/all/wishlist/${userState.user._id}`, {
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
                if(data.wishlistList){
                    setWishList(data.wishlistList)
                    setLoading(false)
                }
            }
        }).catch((err) =>{
            console.log(err)
        })
    }, [userState.user._id, userState.token])

    const Reload = () =>{
        console.log('ddd')
        setLoading(true)
        fetch(`${API}/get/all/wishlist/${userState.user._id}`, {
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
                if(data.wishlistList){
                    console.log(data.wishlistList)
                    setWishList(data.wishlistList)
                    setLoading(false)
                }
            }
        }).catch((err) =>{
            console.log(err)
        })
    }

    return(
        <div style={{height: '100%', width: '100%'}}>
            <div style={{backgroundColor: '#d7d9d7'}} className="card p-3 m-3">
                <div style={{height: '50vh', width: '100vh', display: loading ? '' : 'none'}} className="card mx-auto col-9">
                    <div className="mx-auto my-auto">
                        <Loader type="Circles" color="#FF6A00" height={75} width={75} visible={loading} />
                    </div>
                </div>
                <div class="card-body">
                    {
                        wishList.length !== 0 &&
                        <div class="row">
                            {
                                wishList.map((obj, i) =>{
                                    return <ProductCard key={i} id={obj._id} reload={Reload} productObject={obj.productId}/>
                                })
                            }
                        </div>
                    }
                    {
                        wishList.length === 0 &&
                        <div class="">
                            <h3 className="text-center">Empty !</h3>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductList