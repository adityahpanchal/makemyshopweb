import { useEffect, useState } from "react"
import Loader from "react-loader-spinner"
import { useSelector } from "react-redux"
import { API } from "../../../../Backend"
import Modal from "./Modal"

const SubCategory = () =>{
    
    const userState = useSelector(state => state.auth)

    const [popUpTitle, setPopUpTitle] = useState('')
    const [popUpType, setPopUPType] = useState('')
    const [subcategories, setSubCategories] = useState([])
    const [categoryArray, setCategoryArray] = useState([])
    const [loading, setLoading] = useState(false)

    const [updateData, setUpdateData] = useState({}) 

    const addNewHandle = () =>{
        setPopUpTitle('Add New Sub Category')
        setPopUPType('addNew')
    }

    const updateHandler = (id, name, icon, categoryId, label) =>{
        setPopUpTitle('Update Sub Category')
        setPopUPType('update')
        setUpdateData({
            id: id,
            subCategoryName: name,
            icon: icon,
            categoryId: categoryId,
            label: label 
        })
    }

    const deleteHandler = (id) =>{
        setLoading(true)

        fetch(`${API}/delete/subcategory/${userState.user._id}/${id}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${userState.token}`
            }
        }).then((response) =>{
            return response.json()
        }).then((data) =>{
            if(data.error){
                console.log(data.error)
            }else{
                if(data.status === true){
     
                        setSubCategories(data.subcategories)
                        setLoading(false)
      
                }
            }
        }).catch((err) =>{
            console.log(err)
        })
    }

    useEffect(() => {
        setLoading(true)

        fetch(`${API}/all/subcategory`, {
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
                console.log(data)
                if(data.subcategories){
       
                        setLoading(false)
                        setSubCategories(data.subcategories)

                        const arr = data.categoryList.map((val) => {
                            const obj = {
                                label: val.category,
                                value: val._id
                            }
                            return obj
                        })
                        arr.unshift({label: 'choose...', value: 'no'})
                        setCategoryArray(arr)
               
                }
            }
        }).catch((err) =>{
            console.log(err)
        })
    }, [])

    return(
        <main className="col-md-9">
            <Modal title={popUpTitle} setLoader={setLoading} setsubcategory={setSubCategories} cuData={updateData} type={popUpType} categoryArr={categoryArray}/>
            <div className="card p-5">
                {
                    !loading &&
                    <>
                        <div>
                            <button className="btn btn-primary ml-3" data-toggle="modal" data-target="#exampleModalCenter" onClick={addNewHandle}>Add New <i className="fa fa-plus"></i></button>
                        </div>

                        <div class="row my-5">
                            
                            {
                                subcategories &&
                                subcategories.map((cate, i) =>{
                                    return <div key={i} class="col-md-3 mb-3">
                                    <article class="card card-body border-primary">
                                        <figure class="text-center">
                                            <span class="rounded-circle icon-lg bg-primary"><i class={`${cate.icon} white`}></i></span>
                                            <figcaption class="pt-1">
                                            <h4 class="title">{cate.subCategory}</h4>
                                            <span class="rounded-circle icon-sm bg-primary"><i class={`${cate.categoryId.icon} white`}></i></span>
                                            <h6 class="title">{cate.categoryId.category}</h6>
                                                <div className="py-1">
                                                    <button className="btn btn-success mr-3" data-toggle="modal" data-target="#exampleModalCenter" onClick={() => updateHandler(cate._id, cate.subCategory, cate.icon, cate.categoryId._id, cate.categoryId.category)}>Update</button>
                                                    <button className="btn btn-danger" onClick={() => deleteHandler(cate._id)}>Delete</button>
                                                </div>
                                            </figcaption>
                                        </figure> 
                                    </article> 
                                </div>
                                })
                            }

                        </div> 
                    </>
                } 
                {
                    loading &&
                    <div className="mx-auto mt-5">
                        <Loader color="#FF6A00" type="BallTriangle"/>
                    </div>
                }  
            </div>
        </main>
    )
}

export default SubCategory