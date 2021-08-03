import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import { API } from '../Backend'
import { constantCheckAuthentication, setCartRequest } from '../redux'
// import logo from '../Images/logo.png'useDispatch
const Header = (props) =>{
    
    const userState = useSelector(state => state.auth)
    const cartState = useSelector(state => state.cart)

    const [type, setType] = useState('products')
    const [searchString, setSearchString] = useState('')
    // const [cartCount, setCartCount] = useState(0)
    const dispatch = useDispatch()
    // const search = () =>{
    //     let stringQ = searchString.replaceAll(' ', '-')

    // }

    const isUser = () =>{
        if(userState.isAuthenticated && userState.user && constantCheckAuthentication()){
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

    const sellerRoutes = () =>{
        if(userState.user && userState.user.role === 1){
            return{
                path: '/seller/console',
                title: 'Go to console'
            }
        }else if(userState.user.businessId && userState.user.businessId.registrationStatus === 0){
            return{
                path: '/seller',
                title: 'Sale with us'
            }
        }else if(userState.user.businessId && userState.user.businessId.registrationStatus === 1){
            return{
                path: '/seller/documents/upload',
                title: 'Continue Registraion'
            }
        }else if(userState.user.businessId && userState.user.businessId.registrationStatus === 2){
            return{
                path: '/seller/documents/verification/status',
                title: 'Check Status'
            }
        }
    }

    useEffect(() =>{
        fetch(`${API}/count/cart/${userState.user._id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${userState.token}`
            }
        }).then((response) =>{
            return response.json()
        }).then((data) =>{
            if(data.error){
                console.log(data.error)
            }else{
                dispatch(setCartRequest(data.cartCount))
                // setCartCount(data.cartCount)
            }
        }).catch((err) =>{
            console.log(err)
        })
    }, [userState.user._id, userState.token, dispatch])

    return (
        <header className="section-header">
            <section className="header-main border-bottom">
	            <div className="container">
		            <div className="row align-items-center">
			            <div className="col-xl-2 col-lg-3 col-md-12">
                            <Link to="/" className="brand-wrap">
                            {/* <h4>Make My Shop</h4> */}
                                <span className="icon icon-md rounded-circle bg-primary">
                                    
                                    <i className="fas fa-shopping-cart white"></i>
                                </span>
                            </Link>
			            </div>
			            <div className="col-xl-6 col-lg-5 col-md-6">
				            <form  className="search-header" onKeyDown={(e) => {if(e.keyCode === 13){e.preventDefault()}}}>
					            <div className="input-group w-100">
						            <select className="custom-select border-right" onChange={(e) => setType(e.target.value)} name="cfategory_name">
                                        <option value="products">Products</option>
                                        <option value="sellers">Sellers</option>
						            </select>
					                <input type="text" className="form-control" placeholder="Search" onChange={(e) => setSearchString(e.target.value)} />
					    
                                    <div className="input-group-append">
                                        {
                                            type === 'products' &&
                                            <Link className="btn btn-primary" target="_blank" to={`/search/product/?q=${searchString}`}>
                                                <i className="fa fa-search"></i> Search
                                            </Link>
                                        }
                                        {
                                            type === 'sellers' &&
                                            <Link className="btn btn-primary" target="_blank" to={`/search/sellers/?q=${searchString}`}>
                                                <i className="fa fa-search"></i> Search
                                            </Link>
                                        }
                                    </div>
				                </div>
				            </form> 
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
                                    <Link to="/cart" className="widget-view">
                                        <div className="icon-area">
                                            <i className="fa fa-shopping-cart"></i>
                                            <span className="notify">{cartState.cart}</span>
                                        </div>
                                        <small className="text"> Cart </small>
                                     </Link>
                                </div>
                            </div>
			            </div> 
		            </div> 
	            </div> 
            </section>
            
            {/* {Menu Stripe} */}
            <nav className="navbar navbar-main navbar-expand-lg border-bottom">
                <div className="container ">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main_nav" aria-controls="main_nav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse " id="main_nav">
                        <ul className="navbar-nav py-1 ">
                            {
                                userState.isAuthenticated &&
                                <li className="nav-item">
                                <Link className="nav-link btn btn-primary" to={`${sellerRoutes() && sellerRoutes().path}`}>{sellerRoutes() && sellerRoutes().title}</Link>
                            </li>
                            }
                        </ul>
                    </div> 
                </div> 
            </nav>
        </header> 
    
    )
}

export default withRouter(Header)