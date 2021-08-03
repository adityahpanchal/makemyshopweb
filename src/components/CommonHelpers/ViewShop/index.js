import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { API } from "../../../Backend"
import Header from "./Header"
import LoaderScreen from "../../../LoaderScreen"
import Details from "./Details"
import Loader from "react-loader-spinner"
import ProductCard from "./ProductCard"
import { getClientIp } from "../getip"
import { Link } from "react-router-dom"

const SellerShop = (props) =>{

    const userState = useSelector(state => state.auth)
    const [loading, setLoading] = useState(false)
    const [sellerData, setSellerData] = useState(false)
    const [mLoader, setMLoader] = useState(false)
    const [productList, setProductList] = useState([])
    const [notFound, setNotFound] = useState(false)

    useEffect(() =>{
        setLoading(true)
        setMLoader(true)
        fetch(`${API}/shop/${props.match.params.id}`, {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        }).then((response) =>{
            return response.json()
        }).then((data) =>{
            if(data.error){
                console.log(data.error)
                setNotFound(true)
                setLoading(false)
            }else{
                if(data.sellerProfile){
                    // console.log('shop', data.sellerProfile)
                    setSellerData(data.sellerProfile)
                    setLoading(false)

                    fetch(`${API}/shop/all/products/${props.match.params.id}`, {
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
                            if(data.list){
                                console.log(data.list)
                                setMLoader(false)
                                setProductList(data.list)
                                getClientIp().then((ip) => {
                                    fetch(`${API}/hit/seller/add/${ip}/${props.match.params.id}`, {
                                        method: "POST",
                                        
                                    }).then((response) =>{
                                        return response.json()
                                    }).then((data) =>{
                                        if(data.error){
                                            console.log(data.error)
                                        }else{
                                            console.log(data)
                                        }
                                    }).catch((err) =>{
                                        console.log(err)
                                    })
                                })
                            }
                        }
                    }).catch((err) =>{
                        console.log(err)
                    })
                }
            }
        }).catch((err) =>{
            console.log(err)
        })
    }, [props.match.params.id, userState.token])

    return(
        <>
            {loading ? <LoaderScreen /> : 
                <>
                    {
                        !notFound &&
                        <>
                            <Header logo={sellerData && sellerData.businessLogo.url} clickURL={props.match.params.id} name={sellerData && sellerData.businessName}/>
                            <Details data={sellerData && sellerData}/>
                            <section>
                                <div className="card">
                                    { sellerData.isDeactivated && <h3 className="py-3 text-center text-danger">This Seller Account is Temporarily Blocked</h3> }
                                    {
                                       
                                            <div className="p-5" style={{minHeight: '60vh'}}>
                                                {
                                                    mLoader && <div className="row">
                                                        <div className="mx-auto my-5">
                                                            <Loader type='Circles' color="#D95A00"/>
                                                        </div>
                                                    </div>
                                                }
                                                {
                                                    !mLoader &&
                                                    <>
                                                        <div className="float-right">
                                                            <Link to={`/report/seller/${props.match.params.id}?sn=${sellerData && sellerData.businessName}`}  type="button" style={{backgroundColor: '#414141', color: 'white'}} class="btn">Report Seller</Link>
                                                        </div>
                                                        {
                                                            productList.length === 0 &&  !sellerData.isDeactivated &&
                                                            <div className="row">
                                                                <h3 className="text-center mx-auto">No product added yet</h3>
                                                            </div>
                                                        }
                                                        {
                                                            productList.length !== 0 && !sellerData.isDeactivated &&
                                                            <div className="row">
                                                                {
                                                                    productList.map((x) =>{
                                                                        return <ProductCard data={x}/>
                                                                    })
                                                                }
                                                            </div>
                                                        }
                                                    </>
                                                }
                                            </div>
                                    }
                                </div>
                            </section>
                        </>
                    }
                </>
            }
            {
                notFound &&
                <h4 className="text-center py-5">Seller Not Found</h4>
            }
        </>
    )
}

export default SellerShop