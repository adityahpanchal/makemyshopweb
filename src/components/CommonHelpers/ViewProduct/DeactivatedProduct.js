import { Link } from "react-router-dom"
import './style.css'

const DetailSection = ({productDetails}) =>{

    return(
        <main className="col-md-6">
            <article className="product-info-aside">
                {productDetails.productName.length >= 97 && <h4 className="title mt-3">{productDetails.productName} </h4>}
                {productDetails.productName.length <= 97 && <h2 className="title mt-3">{productDetails.productName} </h2>}
                
                {/* <div className="mb-3"> 
                    <var className="price h4">₹ {productDetails.price} </var> 
                    <span className="mx-1 text-muted"><del>{productDetails.mrp > productDetails.price ? `₹ ${productDetails.mrp}` : ''}</del></span> 
                </div>  */}

                <p>
                    {productDetails.description}
                </p>


                <dl className="row">
                    <dt className="col-sm-3">Seller</dt>
                    <dd className="col-sm-9"><Link to="/">{productDetails.sellerId.businessName}</Link></dd>

                    <dt className="col-sm-3">Shipping Address</dt>
                    <dd className="col-sm-9">{`${productDetails.sellerId.businessAddress.addressLineOne}, ${productDetails.sellerId.businessAddress.addressLineTwo}, ${productDetails.sellerId.businessAddress.city}, ${productDetails.sellerId.businessAddress.state} - ${productDetails.sellerId.businessAddress.pincode}`}</dd>

                    <dt className="col-sm-3">Mobile</dt>
                    <dd className="col-sm-9">+91 {productDetails.sellerId.businessMobile}</dd>
                </dl>
                <div className="mt-3">
                    <h4 className="text-danger">Sorry this product is not available</h4>
                </div>
                <div className="form-row mt-3">
                     
                    <div className="form-group col-md">
                        <Link to="/signin" className="btn btn-light ">
                            <i className="fas fa-store"></i> <span className="text">Visit Seller Store</span> 
                        </Link>
                    </div> 
                </div>
            </article>
        </main>
    )
}

export default DetailSection