import { useSelector } from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import { API } from '../../../Backend'
// import logo from '../Images/logo.png'

const Header = (props) =>{
    
    const userState = useSelector(state => state.auth)

    const isUser = () =>{
        if(userState.isAuthenticated && userState.user){
            return{
                title: "My Profile",
                path: "/profile",
                icon: "user"
            }
        }else{
            return{
                title: "Sign In",
                path: "/signin",
                icon: "sign-in-alt"
            }
        }
    }
    // console.log('logo', props)
    return (
        <header className="section-header py-3">
            <section className="header-main ">
	            <div className="container">
		            <div className="row align-items-center">
			            <div className="col-xl-2 col-lg-3 col-md-12 ">
                            <Link to={`/shop/${props.clickURL}`} className="brand-wrap">
                                <span className="icon icon-md rounded-circle">
                                    <img alt="w" style={{objectFit: 'contain', maxHeight: 80, maxWidth: 250}}  src={`${API}/seller/docs/${props.logo}`} />
                                </span>
                            </Link>
			            </div>
			            <div className="col-xl-6 col-lg-5 col-md-6">
                            <div className="mx-auto">
                                <h1 style={{fontFamily: 'Lobster'}} className="text-center">{props.name}</h1>
                            </div>
				            {/* <form  className="search-header">
					            <div className="input-group w-100">
						            <select className="custom-select border-right"  name="category_name">
                                        <option value="">All type</option><option value="codex">Special</option>
                                        <option value="comments">Only best</option>
                                        <option value="content">Latest</option>
						            </select>
					                <input type="text" className="form-control" placeholder="Search" />
					    
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" type="submit">
                                            <i className="fa fa-search"></i> Search
                                        </button>
                                    </div>
				                </div>
				            </form>  */}
			            </div>
			            <div className="col-xl-4 col-lg-4 col-md-6">
				            <div className="widgets-wrap float-md-right">
                                
                                {
                                    props.match.path !== '/' &&
                                    <div className="widget-header mr-3">
                                        <Link to='/' className="widget-view">
                                            <div className="icon-area">
                                                <i className='fa fa-shopping-bag'></i>
                                                
                                            </div>
                                            <small className="text">Shop</small>
                                        </Link>
					                </div>
                                }

                                {
                                    userState.user.isAdmin === true && props.match.path !== '/admin' &&
                                    <div className="widget-header mr-3">
                                        <Link to='/admin' className="widget-view">
                                            <div className="icon-area">
                                                <i className='fa fa-user-shield'></i>
                                                
                                            </div>
                                            <small className="text">Admin Area</small>
                                        </Link>
					                </div>
                                }

					            {
                                    props.match.path !== isUser().path &&
                                    <div className="widget-header mr-3">
                                        <Link to={isUser().path} className="widget-view">
                                            <div className="icon-area">
                                                <i className={`fa fa-${isUser().icon}`}></i>
                                            </div>
                                            <small className="text">{isUser().title}</small>
                                        </Link>
					                </div>
                                }
                                
                                {
                                    props.history.location.pathname !== '/profile/myorders' &&
                                    <div className="widget-header mr-3">
                                        <Link to="/profile/myorders" className="widget-view">
                                            <div className="icon-area">
                                                <i className="fa fa-store"></i>
                                            </div>
                                            <small className="text"> Orders </small>
                                        </Link>
                                    </div>
                                }
                                <div className="widget-header">
                                    <Link to="/" className="widget-view">
                                        <div className="icon-area">
                                            <i className="fa fa-shopping-cart"></i>
                                            <span className="notify">0</span>
                                        </div>
                                        <small className="text"> Cart </small>
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