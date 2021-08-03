import { useDispatch } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { signoutUser } from "../../../../redux"

const ProfileNav = (props) =>{
    const dispatch = useDispatch()

    const isActive = (history, path) =>{
        if(history.location.pathname === path){
            return 'list-group-item active'
        }else{
            return 'list-group-item'
        }        
    }

    // const isActive2 = (history, path) =>{
    //     if(history.location.pathname === path){
    //         return 'list-group-item active'
    //     }else{
    //         return 'list-group-item'
    //     }        
    // }

    const signout = next => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("jwt");
          next();
        }
    }

    return(
        <aside className="col-md-3">
            <nav className="list-group">
                <Link className={isActive(props.history, `${props.match.url}`)} to={`${props.match.url}`}>Account Overview</Link>
                <Link className={isActive(props.history, `${props.match.url}/products`)} to={`${props.match.url}/products`}>Products</Link>
                <Link className={isActive(props.history, `${props.match.url}/new/orders`)} to={`${props.match.url}/new/orders`}>New Orders</Link>
                <Link className={isActive(props.history, `${props.match.url}/processing/orders`)} to={`${props.match.url}/processing/orders`}>Under Processing Orders</Link>
                <Link className={isActive(props.history, `${props.match.url}/delivered/orders`)} to={`${props.match.url}/delivered/orders`}>Delivered Orders</Link>
                {props.history.location.pathname.includes('view/delivery/status') && 
                <Link className={isActive(props.history, props.history.location.pathname)} to={`${props.history.location.pathname}`}>View Order Status</Link>
                }
                {/* <Link className={isActive(props.history, `${props.match.url}/update-seller-info`)} to={`${props.match.url}/seller-info`}>Seller Profile</Link> */}
                <Link className={isActive(props.history, `${props.match.url}/logout`)} to={`${props.match.url}/logout`} 
                    onClick={() => {
                        signout(() => {
                          dispatch(signoutUser())
                          props.history.push("/");
                        });
                    }}
                > Log Out </Link>
            </nav>
            {/* {
                props.history.location.pathname.includes('/seller/console/seller-info') &&
                <nav className="list-group my-5">
                <Link className={isActive2(props.history, '/seller/console/seller-info')} to={`/seller/console/seller-info`}>Seller Profile Details</Link>
                <Link className={isActive2(props.history, '/seller/console/seller-info/update/mobile')} to={`/seller/console/seller-info/update/mobile`}>Update Mobile</Link>
                <Link className={isActive2(props.history, '/seller/console/seller-info/update/logo')} to={`/seller/console/seller-info/update/logo`}>Update Logo</Link>
                <Link className={isActive2(props.history, '/seller/console/seller-info/update/bank')} to={`/seller/console/seller-info/update/bank`}>Update Bank Details</Link>
            </nav>
            } */}
        </aside>
    )
}

export default withRouter(ProfileNav)