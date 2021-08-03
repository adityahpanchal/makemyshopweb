import { useState } from "react"
import { Link } from "react-router-dom"
import { API } from "../../../../../Backend"
import DeactivateModal from "./Helper/DeactivateModal"
import UpdateProduct from "./UpdateProduct"

const ProductCard = ({productObject, reloadedProductList}) =>{

    const [files, setFiles] = useState({})
    const [deactivateId, setDeactivatedId] = useState(false)
    const [deactivateName, setDeactivatedName] = useState(false)
    const [confirmationModal, setConfirmationModal] = useState(false)

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

    const deActivateProduct = (id, name) =>{
        setDeactivatedName(name)
        setDeactivatedId(id)
        setConfirmationModal(true)
    }

    return(
        <>
        {confirmationModal && <DeactivateModal deactivateId={deactivateId} setConfirmationModal={setConfirmationModal} reloadedProductList={reloadedProductList} deactivateName={deactivateName}/>}
        <div class="col-md-4 col-sm-6 ">
            <input type="file" id="22343467576586" multiple onChange={(e) => setFiles(e.target.files)} style={{display: 'none'}}/>
            <div  class="card card-product-grid">
                <div class="img-wrap p-3"> <img alt="" style={{objectFit: 'contain'}} src={`${API}/seller/docs/${productObject.images[0]}`} /> </div>
                <figcaption class="info-wrap">
                    <p class="title text-truncate">{productObject.productName}</p>
                    {productObject.isSingleVariant && forSingle()}
                    {productObject.isMultiVariant && forMultiVariant()}
                    {productObject.isSubVariant && forSubVariant()}
                </figcaption>
                <div className="row ml-3 pb-3">
                    <UpdateProduct files={files} id={productObject._id} reloadedProductList={reloadedProductList}/>
                    <button type="button" onClick={() => {deActivateProduct(productObject._id, productObject.productName)}} data-toggle="modal" data-target="#exampleModal236785" class="btn btn-danger mr-1">Delete</button>
                    <Link to={`/view/product/${productObject._id}`} target="_balnk" type="button" class="btn btn-outline-warning">View</Link>
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