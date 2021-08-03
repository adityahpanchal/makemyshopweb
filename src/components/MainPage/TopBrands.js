import { useEffect, useState } from 'react'
import Loader from 'react-loader-spinner'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { API } from '../../Backend'

const TopBrands = (props) =>{

    const userState = useSelector(state => state.auth)
    const [loader, setLoader] = useState(false)
    const [brandList, setBrandList] = useState([])

    useEffect(() =>{
        let apiPath 
        if(userState.isAuthenticated){
            apiPath = `${API}/mainpage/sellers/india/${userState.user.state}/${userState.user.city}`
        }else{
            apiPath = `${API}/mainpage/sellers/india`
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
                    console.log(data.queryList)
                    setLoader(false)
                    setBrandList([...data.queryList])
                }
            }
        }).catch((err) =>{
            console.log(err)
        })
    }, [userState.isAuthenticated, userState.user.state, userState.user.city])

    return(
        <section className="padding-bottom">
            <header style={{marginLeft: 30, marginRight: 30}}  className="section-heading heading-line">
                <h4 className="title-section text-uppercase">Top Brands</h4>
            </header>

            <div style={{marginLeft: 30, marginRight: 30}} className="card card-home-category">
                <div className="row no-gutters">
                    <div className="col-md-12">
                        {
                            loader &&
                            <div className="p-5 col-12" style={{marginLeft: '45%'}}>
                                <Loader type="Circles" color="#D95A00"/>
                            </div>
                        }
                        {
                            !loader &&
                            <ul className="row no-gutters bordered-cols">
                                {
                                    brandList && brandList.map((x) =>{
                                        return(
                                            <li className="col-12 col-lg-3 col-md-4">
                                                <Link to={`/shop/${x._id}`} target="_blank" className="item"> 
                                                    <div className="card-body">
                                                        <h5 className="title" style={{fontWeight: 'bold'}}>{x.businessName}  </h5>
                                                        <br></br>
                                                        <div className="col mx-auto" style={{height: 100}}>
                                                            <img className="mx-auto" style={{maxWidth: 170, maxHeight: 100, objectFit: 'contain'}} src={`${API}/seller/docs/${x.businessLogo.url}`} alt="brands" /> 
                                                        </div>
                                                        <p className="text-muted mt-3"><i className="fa fa-map-marker-alt"></i> {x.sellingRegion}</p>
                                                    </div>
                                                </Link>
                                            </li>
                                        )
                                    })
                                }
                                <li className="col-6 col-lg-3 col-md-4">
                                    <Link to={`/view/all/sellers`} target="_blank" className="item"> 
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

export default TopBrands