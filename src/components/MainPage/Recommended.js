import { useEffect, useState } from 'react'
import Loader from 'react-loader-spinner'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { API } from '../../Backend'

const Recommended = () =>{

    const userState = useSelector(state => state.auth)
    const [loader, setLoader] = useState(false)
    const [productList, setProductList] = useState([])

    useEffect(() =>{
        let apiPath 
        if(userState.isAuthenticated){
            apiPath = `${API}/mainpage/products/india/${userState.user.state}/${userState.user.city}`
        }else{
            apiPath = `${API}/mainpage/products/india`
        }
        setLoader(true)
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
                    console.log(data.queryList, 'dddd')
                    setLoader(false)
                    setProductList(data.queryList)
                }
            }
        }).catch((err) =>{
            console.log(err)
        })
    }, [userState.isAuthenticated, userState.user.state, userState.user.city])

    return(
        <section className="padding-bottom">
            <header style={{marginLeft: 30, marginRight: 30}}  className="section-heading heading-line">
                <h4 className="title-section text-uppercase">Recommended Items</h4>
            </header>

            <div style={{marginLeft: 30, marginRight: 30, padding: 10}} className="card card-home-category">
                <div className="row no-gutters">
                    <div className="col-md-12">
                        {
                            loader &&
                            <div className="p-5 col-12" style={{marginLeft: '45%'}}>
                                <Loader type="Circles" color="#D95A00"/>
                            </div>
                        }
                       {
                           !loader && productList.length !== 0 &&
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
                                            <li className="col-12 col-lg-3 col-md-4">
                                                <figure className="card card-product-grid py-3">
                                                    <Link to={`/view/product/${x._id}`} target="_blank" className="img-wrap">
                                                        <img alt="d" style={{maxHeight: 200, maxWidth: 250, objectFit: 'contain'}} src={`${API}/seller/docs/${x.images && x.images[0]}`} />
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
                                <li className="col-6 col-lg-3 col-md-4">
                                    <Link to={`/view/all/products`} target="_blank" className="item"> 
                                        <div className="card-body">
                                            <h5 className="title text-center my-5" style={{fontWeight: 'bold'}}>View All</h5>
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                       }
                    </div>
                </div> 
            </div> 
        </section>       
    )
}

export default Recommended