import { Link } from "react-router-dom"
import { API } from "../../../Backend"

const CartList = ({cartList, addQuantity, minusQuantity, deleteItem}) =>{

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
                                    <div class="form-group col-md flex-grow-0">
                                        <div class="input-group mb-3 input-spinner">
                                        <div class="input-group-prepend">
                                            <button class="btn btn-light" onClick={() => minusQuantity(x._id)} type="button" id="button-minus"> &minus; </button>
                                        </div>
                                        <input type="text" class="form-control" disabled={true} value={x.quantity} />
                                        <div class="input-group-append">
                                            <button class="btn btn-light" type="button" onClick={() => addQuantity(x._id)} id="button-plus"> + </button>
                                        </div>
                                        </div>
                                    </div>
                                </td>
                                <td> 
                                    <div class="price-wrap"> 
                                        <var class="price h6">{`${x.quantity} * ${x.price}`} <br></br><br></br></var> 
                                        <p>Delivery Charge: {x.dCharge}</p>
                                    </div> 
                                </td>
                                <td class="text-right"> 
                                    <button className="btn btn-danger" onClick={() => deleteItem(x._id)}><i className="icon fas fa-times"></i></button>
                                </td>
                            </tr>
                        )
                    })
                }
            </>
        )
    }

    return(
        <main class="col-md-9">
            <div class="card">
                <table class="table table-borderless table-shopping-cart">
                    <thead class="text-muted">
                        <tr class="small text-uppercase">
                            <th scope="col">Product</th>
                            <th scope="col" width="120">Quantity</th>
                            <th scope="col" width="200">Price</th>
                            <th scope="col" class="text-right" width="70"> </th>
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
                    <Link to="/" class="btn btn-outline-dark float-md-right"> <i class="fa fa-chevron-left"></i> Continue shopping </Link>
                </div>	

            </div>
	    </main>
    )
}

export default CartList