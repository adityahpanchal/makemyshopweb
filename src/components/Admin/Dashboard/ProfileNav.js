import { useDispatch } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { signoutUser } from "../../../redux"

const ProfileNav = (props) =>{
    const dispatch = useDispatch()
    console.log('router check', props)
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
                <Link className={isActive(props.history, `${props.match.url}`)} to={`${props.match.url}`}> Admin Overview  </Link>
                <Link className={isActive(props.history, `${props.match.url}/new/seller/request`)} to={`${props.match.url}/new/seller/request`}> New Seller Request  </Link>
                <Link className={isActive(props.history, `${props.match.url}/resubmited/seller/request`)} to={`${props.match.url}/resubmited/seller/request`}> Resubmited Seller Request </Link>
                <Link className={isActive(props.history, `${props.match.url}/completed/seller/request`)} to={`${props.match.url}/completed/seller/request`}> completed request </Link>
                <Link className={isActive(props.history, `${props.match.url}/active/sellers`)} to={`${props.match.url}/active/sellers`}> Sellers </Link>
                <Link className={isActive(props.history, `${props.match.url}/reported/sellers/request`)} to={`${props.match.url}/reported/sellers/request`}> Report Requests </Link>
                <Link className={isActive(props.history, `${props.match.url}/completed/reported/sellers/request`)} to={`${props.match.url}/completed/reported/sellers/request`}> Completed Report Requests </Link>
                <Link className={isActive(props.history, `${props.match.url}/seller/review`)} to={`${props.match.url}/seller/review`}> Review Report Requests </Link>
                <Link className={isActive(props.history, `${props.match.url}/seller/review/completed`)} to={`${props.match.url}/seller/review/completed`}> Review Report Requests Completed </Link>
                <Link className={isActive(props.history, `${props.match.url}/seller/remove-warning/unblock-seller`)} to={`${props.match.url}/seller/remove-warning/unblock-seller`}> Unblock Seller & Remove Warning </Link>
                <Link className={isActive(props.history, `${props.match.url}/seller/add-warning/block-seller`)} to={`${props.match.url}/seller/add-warning/block-seller`}> Block Seller & Add Warning </Link>
                <Link className={isActive(props.history, `${props.match.url}/category`)} to={`${props.match.url}/category`}>Manage Category </Link>
                <Link className={isActive(props.history, `${props.match.url}/subcategory`)} to={`${props.match.url}/subcategory`}>Manage Sub Category </Link>
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