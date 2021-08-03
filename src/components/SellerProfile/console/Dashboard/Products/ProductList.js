import { useEffect, useState } from "react"
import Loader from "react-loader-spinner"
import { useSelector } from "react-redux"
import { API } from "../../../../../Backend"
import ProductCard from "./ProductCard"

const ProductList = (props) =>{

    const userState = useSelector(state => state.auth)
    const [productList, setProductList] = useState([])
    const [firstLoad, setFirstLoad] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if(firstLoad === false){
            setLoading(true)
            fetch(`${API}/get/all/seller/products/${userState.user.businessId._id}`, {
                method: "GET",
                headers: {
                    Accept: "application/json"
                }
            }).then((response) =>{
                return response.json()
            }).then((data) =>{
                if(data.error){
                    console.log(data.error)
                }else{
                    if(data.products){
                        console.log(data.products)
                        setProductList(data.products)
                        setFirstLoad(true)
                        setLoading(false)
                    }
                }
            }).catch((err) =>{
                console.log(err)
            })
        }
        if(props.productListReloaded !== false){ //if array is there than call productlistreloaded
            setLoading(true)
            fetch(`${API}/get/all/seller/products/${userState.user.businessId._id}`, {
                method: "GET",
                headers: {
                    Accept: "application/json"
                }
            }).then((response) =>{
                return response.json()
            }).then((data) =>{
                if(data.error){
                    console.log(data.error)
                }else{
                    if(data.products){
                        console.log(data.products)
                        setProductList(data.products)
                        setLoading(false)
                    }
                }
            }).catch((err) =>{
                console.log(err)
            })
        }
    }, [userState.user.businessId._id, props.productListReloaded, firstLoad])

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
                        productList.length === 0 &&
                        <div className="row">
                                <h3 className="mx-auto">0 product added</h3>
                        </div>
                    }
                    {
                        productList.length !== 0 &&
                        <div class="row">
                            {
                                productList.map((productObject, i) =>{
                                    return <ProductCard key={i} reloadedProductList={props.reloadedProductList} productObject={productObject}/>
                                })
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductList