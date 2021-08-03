import {Link} from 'react-router-dom'
import AddressCard from './AddressCard'

const Addresses = (props) =>{
    // console.log(props)
    return(
        <main className="col-md-9">
            <Link to="/profile/myaddresses/insert" className="btn btn-light mb-3"> <i className="fa fa-plus"></i> Add new address </Link>
            <div className="row">
                <AddressCard />              
            </div>
        </main>      
    )
}

export default Addresses