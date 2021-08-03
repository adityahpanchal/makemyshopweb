import { useDispatch } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { signoutUser } from "../../redux"

const ProfileNav = (props) =>{
    const dispatch = useDispatch()
    const isActive = (history, path) =>{
        if(history.location.pathname === path){
            return 'list-group-item active'
        }else{
            return 'list-group-item'
        }        
    }

    const signout = next => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("jwt");
          next();
        }
      }

    return(
        <aside className="col-md-3">
            <nav className="list-group">
                <Link className={isActive(props.history, `${props.match.url}`)} to={`${props.match.url}`}> Personal Information  </Link>
                <Link className={isActive(props.history, `${props.match.url}/myaddresses`)} to={`${props.match.url}/myaddresses`}> My Address </Link>
                <Link className={isActive(props.history, `${props.match.url}/myorders`)} to={`${props.match.url}/myorders`}> My New Orders </Link>
                <Link className={isActive(props.history, `${props.match.url}/myorders/recent`)} to={`${props.match.url}/myorders/recent`}> My Recent Orders </Link>
                {!props.history.location.pathname.includes('my') && props.history.location.pathname !== "/profile" && <Link className={isActive(props.history,  props.history.location.pathname)} to={`${props.location.pathname}`}> My Orders Status </Link>}
                <Link className={isActive(props.history, `${props.match.url}/mywishlist`)} to={`${props.match.url}/mywishlist`}> My wishlist </Link>
                <Link className={isActive(props.history, `${props.match.url}/logout`)} to={`${props.match.url}/logout`} 
                    onClick={() => {
                        signout(() => {
                          dispatch(signoutUser())
                          props.history.push("/");
                        });
                    }}
                > Log Out </Link>
            </nav>
        </aside>
    )
}

export default withRouter(ProfileNav)