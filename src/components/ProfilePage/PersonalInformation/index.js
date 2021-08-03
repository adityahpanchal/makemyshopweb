import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const PersonalInformation = () =>{

    let userState = useSelector(state => state.auth)

    return(
        <main className="col-md-9">
            <div className="card">
                <div className="card-body">
                    <form className="row">
     	                <div className="col-md-12">
     		                <div className="form-row">
                                <div className="col form-group">
                                    <label>First Name</label>
                                    <input disabled type="text" className="form-control" value={userState.user.firstname} />
                                </div> 
                                <div className="col form-group">
                                    <label>Last Name</label>
                                    <input disabled type="email" className="form-control" value={userState.user.lastname} />
                                </div> 
			                </div> 
                            <div className="form-row">
                                <div className="col form-group">
                                    <label>State</label>
                                    <input disabled type="text" className="form-control" value={userState.user.state} />
                                </div> 
                                <div className="col form-group">
                                    <label>City</label>
                                    <input disabled type="text" className="form-control" value={userState.user.city} />
                                </div>
			                </div>
                            <Link to="/profile/update/personal-information" className="btn btn-primary">Update</Link>	
                            <Link to="/profile/update/password" className="btn btn-light mx-3">Change password</Link>
                            <br></br>
                            <br></br>
                            <br></br>

                            <div className="form-row">
                                <div className="row col form-group">
                                    <h6 className="my-2">+91 {userState.user.mobile}</h6>
                                    <Link to="/profile/update/mobile" className="btn btn-primary mx-3">Change Mobile</Link>
                                </div> 
                                <div className="row col form-group">
                                    <h6 className="my-2">{userState.user.isEmailVerified ? userState.user.email : "Email Not Registerd"}</h6>
                                    <Link to={userState.user.isEmailVerified ? '/profile/update/email' : '/profile/update/new/email'} className="btn btn-primary mx-3">Change Email</Link>
                                </div>
			                </div> 	

			                {<br></br>}

     	                </div> 
     	            </form>
                </div> 
            </div> 
        </main> 
    )
}

export default PersonalInformation