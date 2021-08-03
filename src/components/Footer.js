import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Footer = () =>{
    
    const userState = useSelector(state => state.auth)

    const list = () =>{
        if(userState.isAuthenticated && userState.user){
            return <>
                <li> <Link to="/profile"> My Profile </Link></li>
                <li> <Link to="/profile/setting"> Account Setting </Link></li>
                <li> <Link to="/profile/myorders"> My Orders </Link></li>
            </>
        }else{
            return <>
                <li> <Link to="/signin"> User Login </Link></li>
                <li> <Link to="/signup"> User register </Link></li>
                <li> <Link to="/signin"> Account Setting </Link></li>
                <li> <Link to="/signin"> My Orders </Link></li>
            </>
        }
    }

    return(
        <footer className="section-footer bg-secondary">
            <div className="container">
                <section className="footer-top padding-y-lg text-white">
                    <div className="row">
                        <aside className="col-md col-6">
                            <h6 className="title">Services</h6>
                            <ul className="list-unstyled">
                                <li> <Link to="#">About us</Link></li>
                                <li> <Link to="#">Rules and terms</Link></li>
                            </ul>
                        </aside>
                       
                        <aside className="col-md col-6">
                            <h6 className="title">Account</h6>
                            <ul className="list-unstyled">
                                {list()}
                            </ul>
                        </aside>
                        <aside className="col-md">
                            <div className="row">
                                <div className="col-lg-12 col-md-6">
                                    <form className="form-row">
                                        <div className="col-md-8 col-3">
                                            <input className="form-control border-0" placeholder="Your Email" type="email" />
                                        </div> 
                                        <div className="col-md-4 col-5">
                                            <button type="submit" className="btn btn-block btn-warning"> <i className="fa fa-envelope"></i> Subscribe </button>
                                        </div> 
                                    </form>
                                    <small className="form-text text-white-50">We’ll never share your email address with a third-party. </small>
                                </div> 
                            </div>
                        </aside>
                    </div> 
                </section>	

                <section className="footer-bottom text-center">
                        <p className="text-white">Privacy Policy - Terms of Use - User Information Legal Enquiry Guide</p>
                        <p className="text-muted"> copy 2021 Make My Shop, All rights reserved </p>
                        <br></br>
                </section>
            </div>
        </footer>
    )
}

export default Footer