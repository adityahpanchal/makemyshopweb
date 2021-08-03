import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import {API} from '../../../../Backend'

const ModalCategory = ({title, type, setLoader, setcategory, cuData}) =>{
    

    const userState = useSelector(state => state.auth)

    const [newCategoryState, setNewCategoryState] = useState({
        categoryName: '',
        icon: ''
    })

    const [updateCategoryState, setUpdateCategoryState] = useState({
        categoryName: '',
        icon: ''
    })

    useEffect(() => {
        setUpdateCategoryState(cuData)
    }, [cuData])

    const updateCategory = () => {
        setLoader(true)
        const newData = updateCategoryState
        fetch(`${API}/update/category/${userState.user._id}/${cuData.id}`, {
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
                        setcategory(data.categories)
                        setUpdateCategoryState({...newCategoryState, categoryName: '', icon: ''})
              
                }
            }
        }).catch((err) =>{
            console.log(err)
        })
    }

    const addCategory = () => {
        if(newCategoryState.categoryName === "" || newCategoryState.icon === ""){
            return
        }
        setLoader(true)
        const newData = newCategoryState
        fetch(`${API}/create/category/${userState.user._id}`, {
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
            }else if(data.exists){
                alert('category already exists')
                setLoader(false)
                setcategory(data.categories)
                setNewCategoryState({...newCategoryState, categoryName: '', icon: ''})
            }else{
                if(data.status === true){
                
                        setLoader(false)
                        setcategory(data.categories)
                        setNewCategoryState({...newCategoryState, categoryName: '', icon: ''})
  
                }
            }
        }).catch((err) =>{
            console.log(err)
        })
    }

    const validate = () =>{
        if(type === 'addNew'){
            if(newCategoryState.categoryName === "" || newCategoryState.icon === ""){
                return true
            }else{
                return false
            }
        }
        if(type === 'update'){
            if(updateCategoryState.categoryName === "" || updateCategoryState.icon === ""){
                return true
            }else{
                return false
            }
        } 
    }

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
                                        <input type="text" onChange={(e) => setNewCategoryState({...newCategoryState, categoryName: e.target.value})} placeholder="Category Name" className="form-control my-3" value={newCategoryState.categoryName} />
                                        <input type="text" onChange={(e) => setNewCategoryState({...newCategoryState, icon: e.target.value})} placeholder="fa fa-icon" className="form-control my-3" name="" value={newCategoryState.icon}/>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button disabled={validate()} type="button" class="btn btn-secondary" onClick={addCategory} data-dismiss="modal">Add</button>
                                    <button type="button" class="btn btn-primary" data-dismiss="modal">Cancel</button>
                                </div>
                            </>
                        }
                        {
                            type === 'update' &&
                            <>
                                <div class="modal-body">
                                    <div class="form-group col-md-12 my-3">
                                        <input type="text" onChange={(e) => setUpdateCategoryState({...updateCategoryState, categoryName: e.target.value})} placeholder="update category Name" className="form-control my-3" value={updateCategoryState.categoryName} />
                                        <input type="text" onChange={(e) => setUpdateCategoryState({...updateCategoryState, icon: e.target.value})} placeholder="update fa fa-icon" className="form-control my-3" name="" value={updateCategoryState.icon}/>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" disabled={validate()} class="btn btn-secondary" onClick={updateCategory} data-dismiss="modal">Update</button>
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