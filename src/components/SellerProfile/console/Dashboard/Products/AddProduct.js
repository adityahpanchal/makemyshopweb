import ProductOne from "./Helper/ProductOne"
import ProductTwo from "./Helper/ProductTwo"
import ProductThree from "./Helper/ProductThree"
import ProductFour from "./Helper/ProductFour"
import { useEffect, useState } from "react"
import { API } from "../../../../../Backend"
import { withRouter } from "react-router-dom"
import { useSelector } from "react-redux"

const AddProduct = (props) =>{

    const userState = useSelector(state => state.auth)

    const [index, setIndex] = useState(1)
    const [modal, isModal] = useState(false)

    const [details, setDetails] = useState({})
    const [specificationArray, setSpecificatonArray] = useState([])
    const [stock, setStock] = useState() 
    const [files, setFiles] = useState({})

    const [categoryList, setCategoryList] = useState([])
    const [subCategoryList, setSubCategoryList]= useState([])
 
    const createProduct = () =>{
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
        for (const key in files) {
            formData.append("images", files[key])
        }
        fetch(`${API}/create/product/${userState.user._id}/${userState.user.businessId._id}`, {
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
            // isModal(false)
            props.history.push('/seller/console/products')
            document.getElementById('12346').click()
            props.reloadedProductList()
        }).catch((err) =>{
            console.log(err)
        })
    }

    useEffect(() => {
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
                    if(userState.user.businessId.sellingPermission === 'All'){
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
                    }
                    if(userState.user.businessId.sellingPermission === 'Books'){
                        let cate = data.categories.filter((x) => x._id === '605453db01a54a6c6c9a7723').map((el) =>{
                            const obj = {
                                label: el.category,
                                value: el._id
                            }
                            return obj
                        })
                        cate.unshift({value: 'no', label: 'choose...'})
                        setCategoryList(cate)
                        setSubCategoryList(data.subcategories)
                    }
                }
            }
        }).catch((err) =>{
            console.log(err)
        })
    }, [userState.user.businessId.sellingPermission])

    return(
        <>
            <div className="mx-auto">
                <h4>Manage Products</h4>
            </div>
            <div className="py-3 ml-3">
                <button className="ml-5 btn btn-primary"  data-toggle="modal" data-target="#exampleModalLong" onClick={() => {isModal(!modal)}}>Add Product <i className="fas fa-plus"></i></button>
            </div>
            {
                modal &&
                <div class="modal fade col-12" data-keyboard="false" data-backdrop="static" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                    <div class="modal-dialog modal-lg "  role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">Product Details</h5>
                                <button type="button" id="12346"  class="close" aria-label="Close" data-dismiss ="modal" onClick={() => {isModal(false); setIndex(1)}}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div class="modal-body">
                                {<ProductOne index={index} modalType="insert" setIndex={setIndex} setData={setDetails} details={details} modalClose={isModal} subcategories={subCategoryList} categories={categoryList}/>}
                                {<ProductTwo index={index} modalType="insert" setIndex={setIndex} setData={setSpecificatonArray} specificationArray={specificationArray} modalClose={isModal}/>}
                                {<ProductThree index={index} modalType="insert" setIndex={setIndex} setData={setStock} modalClose={isModal}/>}
                                {<ProductFour index={index} modalType="insert" setIndex={setIndex} setData={setFiles} modalClose={isModal} createProduct={createProduct} files={files} setFiles={setFiles}/>}
                            </div>
                            <div class="modal-footer">
                                <button id="12346" type="button" class="btn btn-primary" onClick={() => {isModal(false); setIndex(1)}} data-dismiss="modal">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default withRouter(AddProduct)