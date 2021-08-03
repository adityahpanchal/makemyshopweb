import { useSelector } from 'react-redux'
import {Link, withRouter} from 'react-router-dom'

const Header = (props) =>{

    const userState = useSelector(state => state.auth)

    return (
        <header className="section-header">
            <section className="header-main border-bottom">
	            <div className="container">
		            <div className="row align-items-center">
			            <div className="col-xl-2 col-lg-3 col-md-12">
                            <Link to="/" className="brand-wrap">
                                <span className="icon icon-md rounded-circle bg-primary">
                                    <i className="fas fa-shopping-cart white"></i>
                                </span>
                            </Link>
			            </div>
			            <div className="col-xl-6 col-lg-5 col-md-6">
				            <h3 style={{textAlign: 'center', fontWeight:'bold', fontStyle: 'revert'}}>Seller's Console</h3>
			            </div>
			            <div className="col-xl-4 col-lg-4 col-md-6">
				            <div className="widgets-wrap float-md-right">
                                    
                                    <div className="widget-header mr-3">
                                        <Link to='/' className="widget-view">
                                            <div className="icon-area">
                                                <i className='fa fa-home'></i>
                                                
                                            </div>
                                            <small className="text">Home</small>
                                        </Link>
					                </div>
                                    <div className="widget-header mr-3">
                                        <Link to='/profile' className="widget-view">
                                            <div className="icon-area">
                                                <i className='fa fa-user'></i>
                                                
                                            </div>
                                            <small className="text">Profile</small>
                                        </Link>
					                </div>
                            </div>
			            </div> 
		            </div> 
	            </div> 
            </section>
        </header> 
    )
}

export default withRouter(Header)