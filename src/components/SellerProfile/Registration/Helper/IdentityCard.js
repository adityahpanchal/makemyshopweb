import { Link } from 'react-router-dom'
import { API } from '../../../../Backend'
import idlogo from '../../../../Images/idproof.png'

const IdentityCard = ({data}) => {

    const {isVerified, docType, url} = data
    
    return(
        <div className="row my-3 mx-3">
            <div className="col-3">
                <img src={idlogo} alt="" className="img-md  rounded-circle" />
            </div>
            <div className="col-4">
                <button type="button" className={`my-3 btn btn-${isVerified === "true" ? 'success' : isVerified === "reject" ? 'danger' : 'warning'}`}><label>Document Status:</label>{isVerified === "true" ? ' Approved' : isVerified === "reject" ? 'Rejected' : 'Pending'}</button>
                <br></br>
                {isVerified !== "true" && <Link to="/seller/documents/resubmit/identity" className="btn rounded-pill btn-outline-primary"> <i className="fa fa-cloud-upload-alt"></i> <span className="text"> Re Submit</span> </Link>}
            </div>
            <div className="col-4 mx-auto">
                <button type="button" className="my-3 btn btn-outline-success"><label>Document Type:</label><br></br>{docType}</button>
                <br></br>
                <a href={`${API}/seller/docs/${url}`} target="_blank" rel="noreferrer" class="btn btn-md btn-outline-info">View</a>
            </div>
        </div>
    )
}

export default IdentityCard