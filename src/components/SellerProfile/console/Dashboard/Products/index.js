import { useState } from 'react'
import { useSelector } from 'react-redux'
import { API } from '../../../../../Backend'
import AddProduct from './AddProduct'
import ProductList from './ProductList'

const Product = () =>{

    const userState = useSelector(state => state.auth)
    const [productListReloaded, setProductListReloaded] = useState(false)

    const ReloadedProductList = () =>{
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
                    setProductListReloaded(data.products)
                }
            }
        }).catch((err) =>{
            console.log(err)
        })
    }

    return(
        <div  className="col-md-9">
            <div className="card p-3">
                <AddProduct reloadedProductList={ReloadedProductList}/>
                <ProductList reloadedProductList={ReloadedProductList} productListReloaded={productListReloaded}/>
            </div>
        </div>
    )
}

export default Product

// let [reloadId, setReloadId] = useState('id#47523')

//     useEffect(() =>{
//         if(reloadId !== 'id#47523'){
            
//         }
//     }, [reloadId])