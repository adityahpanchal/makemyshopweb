import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Select from "react-select"
import {API} from '../../../../Backend'

const ModalCategory = ({title, type, setLoader, setsubcategory, cuData, categoryArr}) =>{
    

    const userState = useSelector(state => state.auth)

    const [newSubCategoryState, setNewSubCategoryState] = useState({
        subCategoryName: '',
        icon: '',
        categoryId: ''
    })
  
    const [updateSubCategoryState, setUpdateSubCategoryState] = useState({
        subCategoryName: '',
        icon: '',
        categoryId: ''
    })
    useEffect(() => {
        setUpdateSubCategoryState(cuData)
    }, [cuData])

    const updateSubCategory = () => {
        setLoader(true)
        const newData = updateSubCategoryState
        fetch(`${API}/update/subcategory/${userState.user._id}/${updateSubCategoryState.categoryId}/${updateSubCategoryState.id}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${userState.token}`
            },
            body: JSON.stringify(newData)
        }).then((response) =>{
            return response.json()
        }).then((data) =>{
            if(data.error){
                console.log(data.error)
            }else{
                if(data.status === true){
              
                        setLoader(false)
                        setsubcategory(data.subcategories)
                        setUpdateSubCategoryState({...updateSubCategoryState, subCategoryName: '', icon: '', categoryId: ''})
            
                }
            }
        }).catch((err) =>{
            console.log(err)
        })
    }

    const addSubCategory = () => {
        if(newSubCategoryState.subCategoryName === "" || newSubCategoryState.icon === "" || newSubCategoryState.icon === "" || newSubCategoryState.categoryId === 'no'){
            return
        }
        setLoader(true)
        const newData = newSubCategoryState
        fetch(`${API}/create/subcategory/${userState.user._id}/${newSubCategoryState.categoryId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${userState.token}`
            },
            body: JSON.stringify(newData)
        }).then((response) =>{
            return response.json()
        }).then((data) =>{
            if(data.error){
                console.log(data.error)
            }else{
                if(data.status === true){
                    setNewSubCategoryState({...newSubCategoryState, subCategoryName: '', icon: '', categoryId: ''})
                        setLoader(false)
                        setsubcategory(data.subcategories)
                        
               
                }
            }
        }).catch((err) =>{
            console.log(err)
        })
    }

    const validate = () =>{
        if(type === 'addNew'){
            if(newSubCategoryState.subCategoryName === "" || newSubCategoryState.icon === "" || newSubCategoryState.categoryId === "" || newSubCategoryState.categoryId === "no"){
                return true
            }else{
                return false
            }
        }
        if(type === 'update'){
            if(updateSubCategoryState.subCategoryName === "" || updateSubCategoryState.icon === "" || updateSubCategoryState.categoryId === "" || updateSubCategoryState.categoryId === "no"){
                return true
            }else{
                return false
            }
        } 
    }
    console.log(updateSubCategoryState)
    return(
        <>
            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">{title}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        {/* {New Category} */}
                        {
                            type === 'addNew' &&
                            <>
                                <div class="modal-body">
                                    <div class="form-group col-md-12 my-3">

                                        <Select onChange={(val) => setNewSubCategoryState({...newSubCategoryState, categoryId: val.value})} defaultValue={{value: 'no', label: 'choose...'}} options={categoryArr} />
                                        <input type="text" onChange={(e) => setNewSubCategoryState({...newSubCategoryState, subCategoryName: e.target.value})} placeholder="sub category name" className="form-control my-3" value={newSubCategoryState.subCategoryName} />
                                        <input type="text" onChange={(e) => setNewSubCategoryState({...newSubCategoryState, icon: e.target.value})} placeholder="fa fa-icon" className="form-control my-3" name="" value={newSubCategoryState.icon}/>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button disabled={validate()} type="button" class="btn btn-secondary" onClick={addSubCategory} data-dismiss="modal">Add</button>
                                    <button type="button" class="btn btn-primary" data-dismiss="modal">Cancel</button>
                                </div>
                            </>
                        }
                        {
                            type === 'update' &&
                            <>
                                <div class="modal-body">
                                    <div class="form-group col-md-12 my-3">
                                        <Select  onChange={(val) => setUpdateSubCategoryState({...updateSubCategoryState, categoryId: val.value})} value={{value: cuData.categoryId, label: cuData.label}} options={categoryArr} />
                                        <input type="text" onChange={(e) => setUpdateSubCategoryState({...updateSubCategoryState, subCategoryName: e.target.value})} placeholder="update category Name" className="form-control my-3" value={updateSubCategoryState.subCategoryName} />
                                        <input type="text" onChange={(e) => setUpdateSubCategoryState({...updateSubCategoryState, icon: e.target.value})} placeholder="update fa fa-icon" className="form-control my-3" name="" value={updateSubCategoryState.icon}/>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" disabled={validate()} class="btn btn-secondary" onClick={updateSubCategory} data-dismiss="modal">Update</button>
                                    <button type="button" class="btn btn-primary" data-dismiss="modal">Cancel</button>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalCategory