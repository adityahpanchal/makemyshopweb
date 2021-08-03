import { useEffect, useState } from 'react'
import Loader from 'react-loader-spinner'
import { API } from '../../../Backend'
import Header from '../../Header'
import SingleDetailSection from './SingleDetailSection'
import ImageSection from './ImageSection'
import SpecificationSection from './SpecificationSection'
import MultiDetailSection from './MultiDetails'
import SubDetailsSection from './SubVDetails'
import DeactivatedProduct from './DeactivatedProduct'
import {getClientIp} from '../getip'
import { useSelector } from 'react-redux'
import Review from './Review'

const ViewProduct = (props) =>{
    
    const userState = useSelector(state => state.auth)
    const [product, setProduct] = useState(false)
    const [isLoading, setisLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)

    const [reviewData, setReviewData] = useState({})

    const getReviews = () =>{
        let apiPath, headers
        if(userState.isAuthenticated){
            apiPath = `${API}/get/review/with/signin/${userState.user._id}/${props.match.params.id}`
            headers = {
                Accept: "application/json",
                Authorization: `Bearer ${userState.token}`
            }
        }else{
            apiPath = `${API}/get/review/${props.match.params.id}`
            headers = {
                Accept: "application/json"
            }
        }
        return fetch(apiPath, {
            method: "GET",
            headers
        }).then((response) =>{
            return response.json()
        }).catch((err) =>{
            console.log(err)
        })
    
    }
    // console.log(reviewData, 'reviewData')
    useEffect(() =>{
        fetch(`${API}/get/seller/product/${props.match.params.id}`, {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        }).then((response) =>{
            return response.json()
        }).then(async(data) =>{
            if(data.err){
                console.log(data.err)
                    setisLoading(false)
                   setNotFound(true) 
            }else{
                if(data.product){
                    console.log(data.product)

                    const reviews = await getReviews()
                    console.log('review', reviews)
                    setReviewData(reviews)

                    setProduct(data.product)
                    setisLoading(false)
                    getClientIp().then((ip) => {
                        fetch(`${API}/hit/product/add/${ip}/${props.match.params.id}`, {
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
                }else{
                   setisLoading(false)
                   setNotFound(true) 
                }
            }
        }).catch((err) =>{
            console.log(err)
        })
    }, [props.match.params.id, userState.token])

    return(
        <>
            {
                <div style={{height: '100vh', display: isLoading ? '' : 'none'}} className="row">
                    <div className="mx-auto my-auto">
                        <Loader type="Circles" color="#FF6A00" height={100} width={100} visible={isLoading} />
                    </div>
                </div>
            }
            {
                notFound &&
              
                    <div className="mx-auto my-auto">
                        <h4 className="text-center py-5">Product Not Found</h4>
                    </div>
            }
            {
                !isLoading && !notFound && product &&
                <>
                    <Header />
                    <section class="section-content bg-white padding-y">
                        <div class="container">
                            <div class="row">
                                <ImageSection imageArr={product.images}/>
                                {product.isSingleVariant && !product.deactivated && !product.sellerId.isDeactivated && <SingleDetailSection productDetails={product} averageRating={reviewData.averageRating}/>}
                                {product.isMultiVariant && !product.deactivated && !product.sellerId.isDeactivated && <MultiDetailSection productDetails={product} averageRating={reviewData.averageRating}/>}
                                {product.isSubVariant && !product.deactivated && !product.sellerId.isDeactivated && <SubDetailsSection productDetails={product} averageRating={reviewData.averageRating}/>}
                                {product.deactivated && !product.sellerId.isDeactivated && <DeactivatedProduct productDetails={product}/>}
                                {product.sellerId.isDeactivated && <DeactivatedProduct productDetails={product}/>}
                            </div> 
                        </div>
                    </section>
                    <section class="section-name padding-y bg">
                        <div class="container">
                            <div class="row">
                                <SpecificationSection specificationArr={product.specifications}/>  
                                <Review reviewData={reviewData} getReviews={getReviews} token={userState.token} prd={props.match.params.id} uid={userState.user._id} setReviewData={setReviewData}/>
                            </div>
                        </div>
                    </section> 
                </>
            }
        </>
    )
}

export default ViewProduct