import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import StarRatings from "react-star-ratings/build/star-ratings"
import { API } from "../../../Backend"
import { constantCheckAuthentication, setCartRequest } from "../../../redux"
import { stateFinder } from "../../Assets/India"
import './style.css'

const MultiDetailSection = ({productDetails, averageRating}) =>{

    const userState = useSelector(state => state.auth)

    const [selectedVariant, setSelectedVariant] = useState(false)
    const [variantData, setVariantData] = useState({
        stock: '',
        price: '',
        mrp: ''
    })

    const [wishlistStatus, setWishListState] = useState('Add to Wishlist')
    const [cartStatus, setCartState] = useState('Add to Cart')

    const dispatch = useDispatch()
    const cartState = useSelector(state => state.cart)

    const sortPrice = () =>{
        return productDetails.multiVariantStock.sort((a, b) => {
            return a.price - b.price;
        })[0]
    }

    const handleVariantChange = (e) =>{
        let key = e.target.value
        let data = productDetails.multiVariantStock.filter(x => x.key === key)[0]
        setSelectedVariant(key)
        setVariantData({...variantData, stock: parseInt(data.value), mrp: parseInt(data.mrp), price: parseInt(data.price)}) 
    }

    const addToCart = () =>{
        setCartState('Adding...')
        fetch(`${API}/cart/add/${userState.user._id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${userState.token}`
            },
            body: JSON.stringify({
                productId: productDetails._id,
                sellerId: productDetails.sellerId._id,
                type: 'multi',
                mKey: selectedVariant
            })
        }).then((response) =>{
            return response.json()
        }).then((data) =>{
            if(data.error){
                console.log(data.error)
            }else{
                if(data.status === true){
                    setCartState('Added')
                    dispatch(setCartRequest(cartState.cart + 1))
                }else{
                    setCartState('Added')

                }
            }
        }).catch((err) =>{
            console.log(err)
        })
    }

    const addToWishList = () =>{
        setWishListState('Adding...')
        fetch(`${API}/wishlist/create/${userState.user._id}/${productDetails._id}`, {
            method: "POST",
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
                    setWishListState('Added')
                }
            }
        }).catch((err) =>{
            console.log(err)
        })
    }

    return(
        <main className="col-md-6">
            <article className="product-info-aside">
                {productDetails.productName.length >= 97 && <h4 className="title mt-3">{productDetails.productName} </h4>}
                {productDetails.productName.length <= 97 && <h2 className="title mt-3">{productDetails.productName} </h2>}
                <div className="pb-3">
                    {averageRating === 0 && <h7 className="mx-1 my-3">No ratings</h7>}
                    <br></br>
                    <StarRatings
                        rating={averageRating}
                        starRatedColor="#D95A00"
                        starDimension="25px"
                        starSpacing="3px"
                        numberOfStars={5}
                        name='rating'
                    />
                </div>
                <div className="mb-3"> 
                    <var className="price h6">starting from ₹ {sortPrice().price} </var> 
                    <span className="mx-1 text-muted"><del>{sortPrice().mrp > sortPrice().price ? `₹ ${sortPrice().mrp}` : ''}</del></span> 
                </div> 

                <p className="mt-3">
                    <b>Discription</b>: <br></br>
                    {productDetails.description}
                </p>


                <dl className="row">
                    
                    <dt className="col-sm-3">Category</dt>
                    <dd className="col-sm-9">{productDetails.category.category}</dd>

                    <dt className="col-sm-3">Sub category</dt>
                    <dd className="col-sm-9">{productDetails.subCategory.subCategory}</dd>

                    <dt className="col-sm-3">Seller</dt>
                    <dd className="col-sm-9"><Link to={`/shop/${productDetails.sellerId._id}`} target="_blank">{productDetails.sellerId.businessName}</Link></dd>

                    <dt className="col-sm-3">Seller Address</dt>
                    <dd className="col-sm-9">{`${productDetails.sellerId.businessAddress.addressLineOne}, ${productDetails.sellerId.businessAddress.addressLineTwo}, ${productDetails.sellerId.businessAddress.city}, ${productDetails.sellerId.businessAddress.state} - ${productDetails.sellerId.businessAddress.pincode}`}</dd>

                    <dt className="col-sm-3">Mobile</dt>
                    <dd className="col-sm-9">{productDetails.sellerId.businessMobile}</dd>

                    {
                        productDetails.sellerId.sellingRegion === "India" && 
                        <>
                            <dt className="col-sm-3">Available In</dt>
                            <dd className="col-sm-9">All India</dd>
                        </>
                    }
                    {
                        stateFinder(productDetails.sellerId.sellingRegion) && 
                        <>
                            <dt className="col-sm-3">Available In</dt>
                            <dd className="col-sm-9">Only in {productDetails.sellerId.sellingRegion} state</dd>
                        </>
                    }
                    {
                        !stateFinder(productDetails.sellerId.sellingRegion) && productDetails.sellerId.sellingRegion !== 'India' && 
                        <>
                            <dt className="col-sm-3">Available In</dt>
                            <dd className="col-sm-9">Only in {productDetails.sellerId.sellingRegion} city</dd>
                        </>
                    }

                    {productDetails.stock <= 10 && <dt className="col-sm-3 my-3 text-danger">Hurry on {productDetails.stock} left</dt>}
                </dl>
                <>
                    {!selectedVariant && <h5 className="mt-3">select any variant</h5>}
                    <div className="my-3">
                        {
                            productDetails.multiVariantStock.map((x, i) => {
                                return (
                                    <div class="form-check form-check-inline mr-3">
                                        <input class="form-check-input" type="radio" onChange={handleVariantChange} name="multivariantstocks" id={`${x.key}${i}`} value={x.key} />
                                        <label class="form-check-label" htmlFor={`${x.key}${i}`}>{x.key}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                </>
                {
                    selectedVariant && 
                    <>
                    <div className="mt-3"> 
                        <var className="price h4">Price ₹{variantData.price} <del>{variantData.price < variantData.mrp ? `₹${variantData.mrp}` : ''}</del> </var> 
                    </div> 
                    {variantData.stock < 20 && variantData.stock > 0 && <div className="mt-3"> 
                        <h6 className="text-danger">Hurry only {variantData.stock} left !!</h6> 
                    </div>}
                    {variantData.stock === 0 && <div className="mt-3"> 
                        <h6 className="text-danger">Out of stock</h6> 
                    </div>}
                    </>
                }
                
                    <div className="my-3"> 
                        <h6>Delivery Charge ₹{productDetails.dCharge}</h6>
                    </div> 
                <div className="form-row  mt-4">
                    <div className="form-group col-md">
                        {
                            constantCheckAuthentication() &&
                            <>
                                <button className="btn  btn-primary" onClick={addToCart} disabled={!selectedVariant || variantData.stock === 0}> 
                                    <i className="fas fa-shopping-cart"></i> <span className="text">{cartStatus}</span> 
                                </button>
                                <button className="btn ml-3" onClick={addToWishList} style={{backgroundColor: '#c73434', color: 'white'}} > 
                                    <i className="fas fa-heart"></i> <span className="text">{wishlistStatus}</span> 
                                </button>
                            </>
                        }
                         {
                            !constantCheckAuthentication() &&
                            <>
                                <Link to="/signin" className="btn  btn-primary"  disabled={!selectedVariant || variantData.stock === 0}> 
                                    <i className="fas fa-shopping-cart"></i> <span className="text">{cartStatus}</span> 
                                </Link>
                                <Link to="/signin" className="btn ml-3" style={{backgroundColor: '#c73434', color: 'white'}} > 
                                    <i className="fas fa-heart"></i> <span className="text">{wishlistStatus}</span> 
                                </Link>
                            </>
                        }
                        <Link to={`/shop/${productDetails.sellerId._id}`} target="_blank" className="btn btn-light mx-3">
                            <i className="fas fa-store"></i> <span className="text">Visit Seller Store</span> 
                        </Link>
                    </div> 
                </div>
            </article>
        </main>
    )
}

export default MultiDetailSection