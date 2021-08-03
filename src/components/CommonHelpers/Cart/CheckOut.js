import { useDispatch } from "react-redux"
import { withRouter } from "react-router-dom"
import { setShouldCartToAddressRequest } from "../../../redux"

const CheckOut = (props) =>{

    const dispatch = useDispatch()

    const addCartListRedux = () =>{
        return new Promise((resolve, reject) =>{
            dispatch(setShouldCartToAddressRequest(true))
            resolve(true)
        })
    }

    const placeorder = async() =>{
        const a = await addCartListRedux()
        if(a){
            props.history.push('/place-order')
        }
    }

    return(
        <aside class="col-md-3 mx-auto">
            <div class="card">
                <div class="card-body">
                    <dl class="dlist-align">
                        <dt><b>Products Total:</b></dt>
                        <dd class="text-right">₹ {props.cartPriceTotal.products}</dd>
                    </dl>
                    <dl class="dlist-align">
                        <dt><b>Shipping Total:</b></dt>
                        <dd class="text-right">₹ {props.cartPriceTotal.shipping}</dd>
                    </dl>
                    <dl class="dlist-align">
                        <dt><b>Total:</b></dt>
                        <dd class="text-right  h5"><strong>₹ {props.cartPriceTotal.total}</strong></dd>
                    </dl>
                    <hr></hr>
                    {<button onClick={placeorder} disabled={props.cartPriceTotal.total === 0} className="btn btn-primary float-right">PLACE ORDER</button>}
                </div> 
		    </div> 
	    </aside> 
    )
}

export default withRouter(CheckOut)