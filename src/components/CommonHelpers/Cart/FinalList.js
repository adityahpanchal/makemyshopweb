import { Link } from "react-router-dom"
import { API } from "../../../Backend"

const FinalList = ({cartList}) =>{

    const cartCard = () =>{
        return(
            <>
                {
                    cartList.map(x =>{
                        return(
                            <tr>
                                <td>
                                    <figure class="itemside">
                                        <div class="aside"><img alt="d" style={{objectFit: 'contain'}} src={`${API}/seller/docs/${x.productId.images[0]}`} class="img-sm" /></div>
                                        <figcaption class="info">
                                            <Link to={`/view/product/${x.productId._id}`} target="_blank" class="title text-dark">{x.productId.productName}</Link>
                                            {x.isSingleVariant && <p class="text-muted small"> Seller: {x.sellerId.businessName}</p>}
                                            {x.isMultiVariant && <p class="text-muted small">{x.mKey}<br></br> Seller: {x.sellerId.businessName}</p>}
                                            {x.isSubVariant && <p class="text-muted small">{x.sKey} : {x.ssKey}<br></br> Seller: {x.sellerId.businessName}</p>}
                                        </figcaption>
                                    </figure>
                                </td>
                                <td> 
                                    <div class="price-wrap"> 
                                        <var class="price h6">{`${x.finalQuantity} * ${x.finalPrice}`} <br></br><br></br></var> 
                                        <p>Delivery Charge: {x.finalDcharge}</p>
                                    </div> 
                                </td>
                            </tr>
                        )
                    })
                }
            </>
        )
    }

    return(
        <main class="col-md-12">
            <div class="card">
                <table class="table table-borderless table-shopping-cart">
                    <thead class="text-muted">
                        <tr class="small text-uppercase">
                            <th scope="col">Product</th>
                            <th scope="col" width="200">Price</th>
                        </tr>
                    </thead>
                    {
                        cartList.length !== 0 &&
                        <tbody>
                            {cartCard()}
                        </tbody>
                    }
                    {
                        cartList.length === 0 &&
                        <tbody>
                            <h4 className="text-center">Cart is Empty</h4>
                        </tbody>
                    }
                </table>

                <div class="card-body border-top">
                    <Link to="/cart" class="btn btn-outline-dark float-md-right"> <i class="fa fa-chevron-left"></i> BACK TO CART </Link>
                </div>	

            </div>
	    </main>
    )
}

export default FinalList