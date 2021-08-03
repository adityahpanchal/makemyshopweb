import ProductOne from "./Helper/ProductOne"
import ProductTwo from "./Helper/ProductTwo"
import ProductThree from "./Helper/ProductThree"
import ProductFour from "./Helper/ProductFour"
import { useEffect, useState } from "react"
import { API } from "../../../../../Backend"
import { withRouter } from "react-router-dom"
import { useSelector } from "react-redux"
import Loader from "react-loader-spinner"

const UpdateProduct = (props) =>{

    const userState = useSelector(state => state.auth)

    const [dataForUpdate, setDataForUpdate] = useState(false)
    const [loading, setLoading] = useState(true)

    const [index, setIndex] = useState(1)
    const [modal, isModal] = useState(false)

    const [details, setDetails] = useState({})
    const [specificationArray, setSpecificatonArray] = useState([])
    const [stock, setStock] = useState() 
    // const [files, setFiles] = useState({})

    const [categoryList, setCategoryList] = useState([])
    const [subCategoryList, setSubCategoryList]= useState([])
    const [tokens, setTokens] = useState(1)
 
    const updateProduct = (imgControll) =>{
        let formData = new FormData()
        formData.append("productName", details.productName)
        formData.append("category", details.category)
        formData.append("subCategory", details.subCategory)
        formData.append("maxQauntity", details.maxQauntity)
        formData.append("dCharge", details.dCharge)
        formData.append("description", details.description)
        if(specificationArray.length !== 0){
            let specifications = JSON.stringify({data: specificationArray})
            formData.append("specifications", specifications)
        }
        if(stock.type === 0){
            formData.append("isSingleVariant", true)
            formData.append("isMultiVariant", false)
            formData.append("isSubVariant", false)
            formData.append("stock", stock.data.stock)
            formData.append("mrp", stock.data.mrp)
            formData.append("price", stock.data.price)
        }
        if(stock.type === 1){
            formData.append("isSingleVariant", false)
            formData.append("isMultiVariant", true)
            formData.append("isSubVariant", false)

            let variationsarr = JSON.stringify({data: stock.data})
            formData.append("multiVariantStock", variationsarr)
        }
        if(stock.type === 2){
            formData.append("isSingleVariant", false)
            formData.append("isMultiVariant", false)
            formData.append("isSubVariant", true)

            let variationsobj = JSON.stringify({data: stock.data})
            formData.append("subVariantStock", variationsobj)
        }
        if(imgControll === 'updateImage'){
            for (const key in props.files) {
                formData.append("images", props.files[key])
            }
        }

        let url
        if(imgControll === 'updateImage'){
            url = `${API}/update/product/withimg/${userState.user._id}/${userState.user.businessId._id}/${props.id}`
        }else{
            console.log('dd')
            url = `${API}/update/product/withoutimg/${userState.user._id}/${userState.user.businessId._id}/${props.id}`
        }

        fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${userState.token}`
            },
            body: formData
        }).then((response) =>{
            return response.json()
        }).then((data) =>{
            console.log(data)
            console.log(props)
            
            props.history.push('/seller/console/products')
            document.getElementById('123456').click()
            props.reloadedProductList()
            props.history.push('/seller/console/products')
        }).catch((err) =>{
            console.log(err)
        })
    }

    const getRandomToken = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    }

    useEffect(() => {
        fetch(`${API}/get/seller/product/${props.id}`, {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        }).then((response) =>{
            return response.json()
        }).then((data) =>{
            if(data.err){
                console.log(data.err)
            }else{
                if(data.product){
                    setDataForUpdate(data.product)
                }
                fetch(`${API}/all/category/subcategory`, {
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
                        if(data.categories){
                            let cate = data.categories.map((el) =>{
                                const obj = {
                                    label: el.category,
                                    value: el._id
                                }
                                return obj
                            })
                            cate.unshift({value: 'no', label: 'choose...'})
                            setCategoryList(cate)
                            setSubCategoryList(data.subcategories)
                            setTimeout(() => {
                                setLoading(false)
                            }, 2000)
                        }
                    }
                }).catch((err) =>{
                    console.log(err)
                })
            }
        }).catch((err) =>{
            console.log(err)
        })
    }, [props.id, tokens])

    return(
        <>
            <button type="button" onClick={() => {isModal(true); setTokens(getRandomToken(10))}} data-toggle="modal" data-target="#exampleModalLongTwo" class="btn btn-success mr-1">Update</button>
            {
             modal &&
                <div class="modal fade col-12" data-keyboard="false" data-backdrop="static" id="exampleModalLongTwo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTwoTitle" aria-hidden="true">
                    <div class="modal-dialog modal-lg "  role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTwoTitle">Update Product Details</h5>
                                <button type="button" id="123456" class="close" aria-label="Close" data-dismiss ="modal" onClick={() => {isModal(false); setIndex(1)}}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            {
                                loading === false && 
                                <div class="modal-body">
                                    {<ProductOne dataForUpdate={dataForUpdate} index={index} modalType="update" setIndex={setIndex} setData={setDetails} details={details} modalClose={isModal} subcategories={subCategoryList} categories={categoryList}/>}
                                    {<ProductTwo dataForUpdate={dataForUpdate} index={index} modalType="update" setIndex={setIndex} setData={setSpecificatonArray} specificationArray={specificationArray} modalClose={isModal}/>}
                                    {<ProductThree dataForUpdate={dataForUpdate} index={index} modalType="update" setIndex={setIndex} setData={setStock} modalClose={isModal}/>}
                                    {<ProductFour dataForUpdate={dataForUpdate} index={index} files={props.files} modalType="update" setIndex={setIndex} modalClose={isModal} updateProduct={updateProduct} />}
                                </div>
                            }
                            {
                                loading &&
                                <div style={{height: '100%', display: loading ? '' : 'none'}} className="row my-3">
                                    <div className="mx-auto my-auto">
                                        <Loader type="Circles" color="#FF6A00" height={75} width={75} visible={loading} />
                                    </div>
                                </div>
                            }
                            <div class="modal-footer">
                                <button id="123456" type="button" class="btn btn-primary" onClick={() => {isModal(false); setIndex(1)}} data-dismiss="modal">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default withRouter(UpdateProduct)