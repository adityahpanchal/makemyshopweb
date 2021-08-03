import React from 'react'
import { Link } from 'react-router-dom'
import { API } from '../../../../Backend'

const Card = (props) =>{
    return(
        <div class="card mt-3">
            <div class="card-body ">
                <div className="row ">
                    <div className="col-md-3 d-flex justify-content-center">
                        <img src={`${API}/seller/docs/${props.logo}`} alt="3" style={{height: 100, width: 150}} />
                    </div>
                    <div className="col-md-9 ">
                        <div className="row mx-auto ">
                            <div className="col-md-4 mx-auto d-flex justify-content-center">
                                <p class="card-text" style={{fontWeight: 'bold', fontSize: 18}}>Business Name:<br></br> {props.businessName}</p>
                            </div>
                            <div className="col-md-4 mx-auto d-flex justify-content-center">
                                <p class="card-text" style={{fontWeight: 'bold', fontSize: 18}}>Seller Name:<br></br> {props.sellerName}</p>
                            </div>
                        </div>
                        <div style={{marginTop: 20, float: 'right', marginRight: 160}}>
                            <Link to={`/admin-verification-panel/${props.userId}`} class="btn btn-primary"> <i class="fa fa-sign-in-alt"></i> <span class="text"> View Details</span> </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card