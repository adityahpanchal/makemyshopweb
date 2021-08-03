import { Link } from 'react-router-dom'
import { API } from '../../../../Backend'
import banklogo from '../../../../Images/bank.png'

const BankCard = ({data, baStatus, status}) => {

    const {isVerified, bankAccountNumber, docType, url} = data
    console.log(baStatus, status)
    return(
        <div className="row my-3 mx-3">
            <div className="col-3">
                <img src={banklogo} alt="" className="img-md  rounded-circle" />
            </div>
            <div className="col-4">
                <button type="button" className={`my-3 btn btn-${isVerified === "true" ? 'success' : isVerified === "reject" ? 'danger' : 'warning'}`}><label>Document Status:</label>{isVerified === "true" ? ' Approved' : isVerified === "reject" ? 'Rejected' : 'Pending'}</button>
                <button type="button" className={`my-3 btn btn-${(baStatus === true && status === true) ? 'success' : (baStatus === false && status === true) ? 'danger' : 'warning'}`}><label>Bank Account Number Status:</label>{(baStatus === true && status === true) ? 'Approved' : (baStatus === false && status === true) ? 'Rejected' : 'Pending'}</button>
                <br></br>
                {isVerified !== "true" && <Link to="/seller/documents/resubmit/bank" className="btn rounded-pill btn-outline-primary"> <i className="fa fa-cloud-upload-alt"></i> <span className="text"> Re Submit</span> </Link>}
            </div>
            <div className="col-4 mx-auto">
                <button type="button" className="my-3 btn btn-outline-success"><label>Bank Account Number<br></br></label> {bankAccountNumber}</button>
                <button type="button" className="my-3 btn btn-outline-success"><label>Document Type:</label><br></br>{docType}</button>
                <br></br>
                <a href={`${API}/seller/docs/${url}`} target="_blank" rel="noreferrer" class="btn btn-md btn-outline-info">View</a>
            </div>
        </div>
    )
}

export default BankCard