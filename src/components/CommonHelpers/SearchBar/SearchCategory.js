import { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom"
import { API } from "../../../Backend";
import Header from "../../Header";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const SearchCategory = () =>{
    let query = useQuery()
    const [loading, setLoading] = useState(false)
    const userState = useSelector(state => state.auth)
    const [productList, setProductList] = useState([])

    useEffect(() =>{
        let apiPath 
        if(userState.isAuthenticated){
            apiPath = `${API}/search/products/category/${userState.user.state}/${userState.user.city}?q=${query.get("q")}`
        }else{
            apiPath = `${API}/search/products/category?q=${query.get("q")}`
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
                    setProductList(data.queryList)
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
                <div className="card">
                    {
                        loading &&
                        <div className="mx-auto" style={{height: 250, marginTop: 250}}>
                            <Loader color="#D95A00" type="Circles"/> 
                        </div>
                    }
                    {
                        !loading && productList.length === 0 &&
                        <div className="py-5">
                            <h3 className="text-center">0 Product found</h3>
                        </div>
                    }
                    {
                        !loading &&
                        <ul className="row no-gutters bordered-cols ">
                            {
                                productList && productList.map((x) =>{

                                    const forSingle = () =>{
                                        return (
                                            <>
                                                <div class="price ">₹ {x.price} <del>{x.mrp > x.price ? `₹ ${x.mrp}` : ''}</del></div> 
                                            </>
                                        )
                                    }

                                    const forMultiVariant = () =>{

                                        const variantConcat = () =>{
                                            return x.multiVariantStock.map(xy => xy.key).reduce((accumulator, currentValue) =>{
                                                return accumulator + ", " + currentValue
                                            })
                                        }
                                
                                        const sortPrice = () =>{
                                            return x.multiVariantStock.sort((a, b) => {
                                                return a.price - b.price;
                                            })[0]
                                        }
                                        
                                        return(
                                            <>
                                                <p style={{fontSize: 15}} class="text-muted text-truncate"> {variantConcat()}</p>
                                                <div class="price my-2">Starting from ₹ {sortPrice().price} <del>{sortPrice().mrp > sortPrice().price ? `₹ ${sortPrice().mrp}` : ''}</del></div> 
                                            </>
                                        )
                                    }

                                    const forSubVariant = () =>{

                                        const variantConcat = () =>{
                                            return Object.keys(x.subVariantStock).map((xy) => {
                                                return `${xy} (${x.subVariantStock[xy].map(xyz => xyz.subVariant).join(', ')})`
                                            }).join(', ')
                                        }
                                
                                        const sortPrice = () =>{
                                            return Object.keys(x.subVariantStock).map((xy) => {
                                                return x.subVariantStock[xy]
                                            }).reduce((prev, next) => {
                                                return prev.concat(next);
                                            }).sort((a, b) => {
                                                return a.price - b.price;
                                            })[0]
                                        }
                                
                                        return(
                                            <>
                                                <p style={{fontSize: 15}} class="text-muted text-truncate">{variantConcat()}</p>
                                                <div class="price mt-2">Starting from ₹ {sortPrice().price} <del> {sortPrice().mrp > sortPrice().price ? `₹ ${sortPrice().mrp}` : ''}</del></div> 
                                            </>
                                        )
                                    }
                                    
                                    return(
                                        <li className="col-6 col-lg-4 col-md-4 p-3">
                                            <figure className="card card-product-grid py-3">
                                                <Link to={`/view/product/${x._id}`} target="_blank" className="img-wrap">
                                                    <img alt="d" style={{maxHeight: 200, maxWidth: 250, objectFit: 'contain'}} src={`${API}/seller/docs/${x.images[0]}`} />
                                                </Link>
                                                <figcaption className="info-wrap">
                                                    <Link to={`/view/product/${x._id}`} target="_blank" className="title text-truncate">{x.productName}</Link>
                                                    <div class="price-wrap mt-2">
                                                        {x.isSingleVariant && forSingle()}
                                                        {x.isMultiVariant && forMultiVariant()}
                                                        {x.isSubVariant && forSubVariant()}
                                                    </div>  
                                                </figcaption>
                                            </figure> 
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

export default SearchCategory