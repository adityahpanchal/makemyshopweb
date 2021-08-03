import { useEffect, useState } from "react"
import Loader from "react-loader-spinner"
import { useSelector } from "react-redux"
import { API } from "../../../../Backend"
import Modal from "./Modal"

const Category = () =>{
    
    const userState = useSelector(state => state.auth)

    const [popUpTitle, setPopUpTitle] = useState('')
    const [popUpType, setPopUPType] = useState('')
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)

    const [updateData, setUpdateData] = useState({}) 

    const addNewHandle = () =>{
        setPopUpTitle('Add New Category')
        setPopUPType('addNew')
    }

    const updateHandler = (id, name, icon) =>{
        setPopUpTitle('Update Category')
        setPopUPType('update')
        setUpdateData({
            id: id,
            categoryName: name,
            icon: icon 
        })
    }

    const deleteHandler = (id) =>{
        setLoading(true)

        fetch(`${API}/delete/category/${userState.user._id}/${id}`, {
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
            
                        setCategories(data.categories)
                        setLoading(false)
             
                }
            }
        }).catch((err) =>{
            console.log(err)
        })
    }

    useEffect(() => {
        setLoading(true)

        fetch(`${API}/all/category`, {
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
                if(data.categories){
              
                        setLoading(false)
                        setCategories(data.categories)
           
                }
            }
        }).catch((err) =>{
            console.log(err)
        })
    }, [])

    return(
        <main className="col-md-9">
            <Modal title={popUpTitle} setLoader={setLoading} setcategory={setCategories} cuData={updateData} type={popUpType}/>
            <div className="card p-5">
                {
                    !loading &&
                    <>
                        <div>
                            <button className="btn btn-primary ml-3" data-toggle="modal" data-target="#exampleModalCenter" onClick={addNewHandle}>Add New <i className="fa fa-plus"></i></button>
                        </div>

                        <div class="row my-5">
                            
                            {
                                categories &&
                                categories.map((cate, i) =>{
                                    return <div key={i} class="col-md-3 mb-3">
                                    <article class="card card-body border-primary">
                                        <figure class="text-center">
                                            <span class="rounded-circle icon-md bg-primary"><i class={`${cate.icon} white`}></i></span>
                                            <figcaption class="pt-4">
                                            <h5 class="title">{cate.category}</h5>
                                                <div className="py-1">
                                                    <button className="btn btn-success mr-3" data-toggle="modal" data-target="#exampleModalCenter" onClick={() => updateHandler(cate._id, cate.category, cate.icon)}>Update</button>
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

export default Category

// const specification = {
//     [key]: value
// }
// specification[key] = value
// for (const key in newSpec) {
//     specification[key] = value
// }