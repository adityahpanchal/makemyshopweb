import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { API } from "../../../Backend"

const ProductCard = ({productObject, id, reload}) =>{

    const userState = useSelector(state => state.auth)
    const [loading, setLoading] = useState(false)

    const forSingle = () =>{
        return (
            <>
                <small class="text-muted">.</small>
                <div class="price mt-2">₹ {productObject.price} <del>{productObject.mrp > productObject.price ? `₹ ${productObject.mrp}` : ''}</del></div> 
            </>
        )
    }

    const forMultiVariant = () =>{

        const variantConcat = () =>{
            return productObject.multiVariantStock.map(x => x.key).reduce((accumulator, currentValue) =>{
                return accumulator + ", " + currentValue
            })
        }

        const sortPrice = () =>{
            return productObject.multiVariantStock.sort((a, b) => {
                return a.price - b.price;
            })[0]
        }
     
        return(
            <>
                <small class="text-muted">Variants: {variantConcat()}</small>
                <div class="price mt-2">Starting from ₹ {sortPrice().price} <del>{sortPrice().mrp > sortPrice().price ? `₹ ${sortPrice().mrp}` : ''}</del></div> 
            </>
        )
    }

    const forSubVariant = () =>{

        const variantConcat = () =>{
            return Object.keys(productObject.subVariantStock).map((x) => {
                return `${x} (${productObject.subVariantStock[x].map(x => x.subVariant).join(', ')})`
            }).join(', ')
        }

        const sortPrice = () =>{
            return Object.keys(productObject.subVariantStock).map((x) => {
                return productObject.subVariantStock[x]
            }).reduce((prev, next) => {
                return prev.concat(next);
            }).sort((a, b) => {
                return a.price - b.price;
            })[0]
        }

        return(
            <>
                <small class="text-muted">{variantConcat()}</small>
                <div class="price mt-2">Starting from ₹ {sortPrice().price} <del> {sortPrice().mrp > sortPrice().price ? `₹ ${sortPrice().mrp}` : ''}</del></div> 
            </>
        )
    }

    const removeWishlist = () => {
        setLoading(true)
        fetch(`${API}/wishlist/delete/${userState.user._id}/${productObject._id}/${id}`, {
            method: "DELETE",
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
                if(data.status){
                    console.log('deleted')
                    setLoading(false)
                    reload()
                }
            }
        }).catch((err) =>{
            console.log(err)
        })
    }

    return(
        <>
        <div class="col-md-4 col-sm-6 ">
            <div  target="_balnk" class="card card-product-grid">
                <div class="img-wrap p-3"> <img alt="" style={{objectFit: 'contain'}} src={`${API}/seller/docs/${productObject.images[0]}`} /> </div>
                <figcaption class="info-wrap">
                    <p class="title text-truncate">{productObject.productName}</p>
                    {productObject.isSingleVariant && forSingle()}
                    {productObject.isMultiVariant && forMultiVariant()}
                    {productObject.isSubVariant && forSubVariant()}
                </figcaption>
                <div className="row ml-3 pb-3">
                    <Link type="button" to={`/view/product/${productObject._id}`} target="_balnk" class="btn btn-outline-warning">View</Link>
                    <button type="button" onClick={removeWishlist} class="btn btn-outline-danger mx-3">{loading ? 'wait...' : 'Remove'}</button>
                    <br></br>
                    {productObject.deactivated && <button type="button" class="btn btn-outline-secondary mt-3">Not Available</button>}
                </div>
            </div>
        </div>
        </>
    )
} 

export default ProductCard



// const variantConcadt = () =>{
//     return Object.keys(productObject.subVariantStock).map((x) => {
//         return `${x} (${productObject.subVariantStock[x].map(x => x.subVariant).join(', ')})`
//     }).join(', ')
// }


// const variantConcat = () =>{
//     return Object.keys(productObject.subVariantStock).reduce((acc, curr, indx) =>{
//         return acc + ", " + `${curr} (${
//             productObject.subVariantStock[curr].map(x => x.subVariant).reduce((accumulator, currentValue) =>{
//                 return accumulator + ", " + currentValue
//             })
//         })`  
//     })
// }