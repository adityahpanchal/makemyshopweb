import { Link } from 'react-router-dom'
import gstlogo from '../../../../Images/gst.png'

const GstCard = ({data}) => {

    const {isVerified, gstNumber} = data

    return(
        <div className="row my-3 mx-3">
            <div className="col-3">
                <img src={gstlogo} alt="" className="img-md  rounded-circle" />
            </div>
            <div className="col-4">
                <button type="button" className={`my-3 btn btn-${isVerified === "true" ? 'success' : isVerified === "reject" ? 'danger' : 'warning'}`}>Status:{isVerified === "true" ? ' Approved' : isVerified === "reject" ? 'Rejected' : 'Pending'}</button>
                <br></br>
                {isVerified !== "true" && <Link to="/seller/documents/resubmit/gst" className="btn rounded-pill btn-outline-primary"> <i className="fa fa-cloud-upload-alt"></i> <span className="text"> Re Submit</span> </Link>}
            </div>
            <div className="col-4">
                <button type="button" className="my-3 btn btn-outline-success">GST No. <br></br>{gstNumber}</button>
            </div>
        </div>
    )
}

export default GstCard