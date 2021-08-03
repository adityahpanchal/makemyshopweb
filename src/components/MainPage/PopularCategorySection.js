import {Link} from 'react-router-dom'

const PopularCategorySection = () =>{
    return(
        <div className="col-md d-none d-lg-block flex-grow-1">
		    <aside className="special-home-right">
			    <h6 className="bg-blue text-center text-white mb-0 p-2">Popular category</h6>

			    <div className="card-banner border-bottom">
                    <div className="py-3" style={{width: '80%'}}>
                        <h6 className="card-title">Electronics</h6>
                        <Link to="/search/category?q=607cfd8e00069c18c491b149" target="_blank" className="btn btn-secondary btn-sm"> Source now </Link>
                    </div> 
                    <div className="my-3">
                        <span class="icon icon-sm rounded-circle bg-blue">
                            <i class="fa fa-laptop white"></i>
                        </span>
                    </div>
                </div>
                <div className="card-banner border-bottom">
                    <div className="py-3" style={{width: '80%'}}>
                        <h6 className="card-title">Men clothing</h6>
                        <Link to="/search/category?q=607ac5eae711a47c3c310b20" target="_blank" className="btn btn-secondary btn-sm"> Source now </Link>
                    </div> 
                    <div className="my-3">
                        <span class="icon icon-sm rounded-circle bg-blue">
                            <i class="fa fa-tshirt white"></i>
                        </span>
                    </div>
                </div>
                <div className="card-banner border-bottom">
                    <div className="py-3" style={{width: '80%'}}>
                        <h6 className="card-title">Woman clothing</h6>
                        <Link to="/search/category?q=607ac64ce711a47c3c310b21" target="_blank" className="btn btn-secondary btn-sm"> Source now </Link>
                    </div> 
                    <div className="my-3">
                        <span class="icon icon-sm rounded-circle bg-blue">
                            <i class="fa fa-female white"></i>
                        </span>
                    </div>
                </div>

            </aside>
	    </div>
    )
}

export default PopularCategorySection