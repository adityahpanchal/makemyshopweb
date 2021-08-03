import { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom"
import { API } from "../../../Backend";
import Header from "../../Header";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const SearchSellerBar = () =>{
    let query = useQuery()
    const [loading, setLoading] = useState(false)
    const userState = useSelector(state => state.auth)
    const [brandList, setBrandList] = useState([])

    useEffect(() =>{
        let apiPath 
        if(userState.isAuthenticated){
            apiPath = `${API}/search/sellers/india/${userState.user.state}/${userState.user.city}?q=${query.get("q")}`
        }else{
            apiPath = `${API}/search/seller/sellers/?q=${query.get("q")}`
        }
        setLoading(true)
        fetch(apiPath, {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        }).then((response) =>{
            return response.json()
        }).then((data) =>{
            if(data.error){
                console.log(data.error)
            }else{
                if(data.queryList){
                    console.log(data.queryList, 'searched')
                    setLoading(false)
                    setBrandList(data.queryList)
                }
            }
        }).catch((err) =>{
            console.log(err)
        })
    }, [userState.isAuthenticated, userState.user.state, userState.user.city])

    return(
        <>
            <Header />
            <div className="col-9 mx-auto my-3">
                <div style={{minHeight: '80vh'}} className="card">
                    {
                        loading &&
                        <div className="mx-auto" style={{height: 250, marginTop: 250}}>
                            <Loader color="#D95A00" type="Circles"/> 
                        </div>
                    }
                    {
                        !loading && brandList.length === 0 &&
                        <div className="py-5">
                            <h3 className="text-center">0 Sellers found</h3>
                        </div>
                    }
                    {
                        !loading &&
                        <ul className="row  bordered-cols ">
                            {
                                brandList && brandList.map((x) =>{
                                    return(
                                        <li className="col-6 col-lg-4 col-md-4 p-3">
                                            <Link to={`/shop/${x._id}`} target="_blank" className="item"> 
                                                <div className="card-body">
                                                    <h5 className="title" style={{fontWeight: 'bold'}}>{x.businessName}  </h5>
                                                    <br></br>
                                                    <div className="col">
                                                        <img className="mx-auto" style={{maxWidth: 170, maxHeight: 100, objectFit: 'contain'}} src={`${API}/seller/docs/${x.businessLogo.url}`} alt="brands" /> 
                                                    </div>
                                                    <p className="text-muted mt-3"><i className="fa fa-map-marker-alt"></i> {x.sellingRegion}</p>
                                                </div>
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    }
                </div>
            </div>
        </>
    )
}

export default SearchSellerBar