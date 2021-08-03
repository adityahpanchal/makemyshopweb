import {Link} from 'react-router-dom'
import section from '../../Images/section.jpg'

const AccountOverview = (props) =>{
    
    return(
        <main className="col-md-9">
            <article className="card mb-3">
                <div className="card-body">
                    <figure className="icontext">
                        <div className="icon">
                            <img alt="s" className="rounded-circle img-sm border" src={section} />
                        </div>
                        <div className="text">
                            <strong> Mr. Jackson Someone </strong> {<br></br>}
                            <p className="mb-2"> myloginname@gmail.com  </p> 
                            <Link to="/" className="btn btn-light btn-sm">Edit</Link>
                        </div>
                    </figure>
                    <hr></hr>
                    <p>
                        <i className="fa fa-map-marker text-muted"></i> &nbsp; My address:  
                        {<br></br>}
                            Tashkent city, Street name, Building 123, House 321 nbsp 
                        <Link to="/" className="btn-link"> Edit</Link>
                    </p>

                    <article className="card-group card-stat">
                        <figure className="card bg">
                            <div className="p-3">
                                <h4 className="title">38</h4>
                                <span>Orders</span>
                            </div>
                        </figure>
                        <figure className="card bg">
                            <div className="p-3">
                                <h4 className="title">5</h4>
                                <span>Wishlists</span>
                            </div>
                        </figure>
                        <figure className="card bg">
                            <div className="p-3">
                                <h4 className="title">12</h4>
                                <span>Awaiting delivery</span>
                            </div>
                        </figure>
                        <figure className="card bg">
                            <div className="p-3">
                                <h4 className="title">50</h4>
                                <span>Delivered items</span>
                            </div>
                        </figure>
                    </article>
        

                </div> 
            </article> 

            <article className="card  mb-3">
                <div className="card-body">
                    <h5 className="card-title mb-4">Recent orders </h5>	

                    <div className="row">
                        <div className="col-md-6">
                            <figure className="itemside  mb-3">
                                <div className="aside"><img src={section} alt="#" className="border img-sm" /></div>
                                <figcaption className="info">
                                    <time className="text-muted"><i className="fa fa-calendar-alt"></i> 12.09.2019</time>
                                    <p>Great book name goes here </p>
                                    <span className="text-success">Order confirmed </span>
                                </figcaption>
                            </figure>
                        </div>
                    </div> 

                    <Link to="/" className="btn btn-outline-primary btn-block"> See all orders <i className="fa fa-chevron-down"></i>  </Link>
                </div> 
            </article>
        </main>     
    )
}

export default AccountOverview