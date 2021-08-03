import { Link } from "react-router-dom"
import { stateFinder } from "../../Assets/India"

const Details =  ({data}) =>{

    const availability = () =>{
        let validate = stateFinder(data.sellingRegion)
        if(data.sellingRegion === "India"){
            return "India"
        }else if(validate){
            return `only in ${data.sellingRegion} state`
        }else if(!validate && data.sellingRegion !== 'India'){
            return `only in ${data.sellingRegion} city`
        }
    }

    return(
        <section class="section-pagetop bg">
            <div class="container">
                <nav> 
                    <div className="row">
                        <div className="col-6 ">
                            <h2 class="title-page">Seller Information</h2>
                            <ol class="breadcrumb text-white my-1">
                                <li class="breadcrumb-item"><Link><b>Mobile</b>{`: +91 ${data.businessMobile}`}</Link></li>
                            </ol>  
                            <ol class="breadcrumb text-white my-1">
                                <li class="breadcrumb-item"><Link><b>Available in</b>{`: ${availability()}`}</Link></li>
                            </ol> 
                        </div>
                        <div className="col-6">
                            <div className="ml-5 my-1">
                                <h4 class="title-page">Seller Address</h4>
                                {
                                    data.businessAddress &&
                                    <p>{`${data.businessAddress.addressLineOne}, ${data.businessAddress.addressLineTwo}`} <br></br>{`${data.businessAddress.city}, ${data.businessAddress.state} - ${data.businessAddress.pincode}`}</p>
                                }
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </section>
    )
}

export default Details