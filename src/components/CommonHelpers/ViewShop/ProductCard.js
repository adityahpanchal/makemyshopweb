import { Link } from "react-router-dom"
import { API } from "../../../Backend"

const ProductCard = ({data}) =>{

    const forSingle = () =>{
        return (
            <>
                <div class="price ">₹ {data.price} <del>{data.mrp > data.price ? `₹ ${data.mrp}` : ''}</del></div> 
            </>
        )
    }

    const forMultiVariant = () =>{

        const variantConcat = () =>{
            return data.multiVariantStock.map(x => x.key).reduce((accumulator, currentValue) =>{
                return accumulator + ", " + currentValue
            })
        }

        const sortPrice = () =>{
            return data.multiVariantStock.sort((a, b) => {
                return a.price - b.price;
            })[0]
        }
     
        return(
            <>
                <p style={{fontSize: 15}} class="text-muted text-truncate"> {variantConcat()}</p>
                <div class="price my-2">Starting from ₹ {sortPrice().price} <del>{sortPrice().mrp > sortPrice().price ? `₹ ${sortPrice().mrp}` : ''}</del></div> 
            </>
        )
    }

    const forSubVariant = () =>{

        const variantConcat = () =>{
            return Object.keys(data.subVariantStock).map((x) => {
                return `${x} (${data.subVariantStock[x].map(x => x.subVariant).join(', ')})`
            }).join(', ')
        }

        const sortPrice = () =>{
            return Object.keys(data.subVariantStock).map((x) => {
                return data.subVariantStock[x]
            }).reduce((prev, next) => {
                return prev.concat(next);
            }).sort((a, b) => {
                return a.price - b.price;
            })[0]
        }

        return(
            <>
                <p style={{fontSize: 15}} class="text-muted text-truncate">{variantConcat()}</p>
                <div class="price mt-2">Starting from ₹ {sortPrice().price} <del> {sortPrice().mrp > sortPrice().price ? `₹ ${sortPrice().mrp}` : ''}</del></div> 
            </>
        )
    }

    return(
        <div class="col-md-3" >
            <figure class="card card-product-grid p-3">
                <div class="img-wrap"> 
                    <img alt="c" style={{objectFit: 'contain'}} src={`${API}/seller/docs/${data.images[0]}`} />
                </div> 
                <figcaption class="info-wrap">
                    <div class="fix-height">
                        <Link to="#" class="title text-truncate" >{data.productName}</Link>
                        <div class="price-wrap mt-2">
                            {data.isSingleVariant && forSingle()}
                            {data.isMultiVariant && forMultiVariant()}
                            {data.isSubVariant && forSubVariant()}
                        </div> 
                    </div>
                    {
                        data.isSingleVariant &&
                        <div >
                            <Link to={`/view/product/${data._id}`} target="_blank" class="btn btn-block btn-primary">View </Link>
                        </div>
                    }
                    {
                        !data.isSingleVariant &&
                        <div className="py-3">
                            <Link to={`/view/product/${data._id}`} target="_blank" class="btn btn-block btn-primary">View </Link>
                        </div>
                    }
                </figcaption>
            </figure>
        </div>
    )
}

export default ProductCard