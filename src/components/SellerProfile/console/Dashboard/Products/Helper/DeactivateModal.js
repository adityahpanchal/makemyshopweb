import { useSelector } from "react-redux"
import { withRouter } from "react-router-dom"
import { API } from "../../../../../../Backend"

const DeactivateModal = (props) =>{

    const userState = useSelector(state => state.auth)

    const performDeactivate = (id) =>{
        console.log('okd')
        fetch(`${API}/deactivate/product/${userState.user._id}/${userState.user.businessId._id}/${id}`, {
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
                console.log('ok')
                if(data.status === true){
                    console.log('ddfgsdf')
                    props.reloadedProductList()
                    document.getElementById('dsasasd').click()
                    props.setConfirmationModal(false)
                }
            }
        }).catch((err) =>{
            console.log(err)
        })
    }

    return(
        <div class="modal" tabindex="-1" role="dialog"  data-keyboard="false" data-backdrop="static" id="exampleModal236785">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-danger">Alert </h5>
                    <button onClick={() => props.setConfirmationModal(false)} type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>Are you sure to delete <br></br> {props.deactivateName}.</p>
                    <p>ID: {props.deactivateId}.</p>
                </div>
                <div class="modal-footer">
                    <button id="dsasa5sd" type="button" onClick={() => performDeactivate(props.deactivateId)} class="btn btn-primary">Yes</button>
                    <button id="dsasasd" type="button" class="btn btn-secondary" data-dismiss="modal" onClick={() => props.setConfirmationModal(false)}>No</button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(DeactivateModal)