import { useState } from "react"
import Loader from "react-loader-spinner"
import { useDispatch, useSelector } from "react-redux"
import { API } from "../../../../Backend"
import { fetchUser } from "../../../../redux"


const BusinessName = ({data, bnStatus, status, history}) =>{

    const userState = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [isInputOpen, setInputOpen] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    
    const resubmitAPI = () =>{
      
        return fetch(`${API}/seller/info/resubmit/businessname/${userState.user._id}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userState.token}`
                },
                body: JSON.stringify({
                    businessName: name
                })
            }).then((response) =>{
                return response.json()
            }).then((data) =>{
                return data
            }).catch((err) =>{
                return err
            })
    }

    const submit = async() =>{
        setLoading(true)
        const resultAPI = await resubmitAPI()
        if(resultAPI.error){
            setError(resultAPI.error)
            return
        }
        setInputOpen(false)
        setLoading(false)
        setName('')
        dispatch(fetchUser())
        history.push('/seller/documents/verification/status')
    }
    
    return(
        <div className="mx-auto pt-5 pb-3">
            <h3 style={{textAlign: 'center'}}>Business Name</h3>
            {
                error && <div class="alert alert-danger" role="alert">{error}</div>
            }
            <hr></hr>
 
            <div className="mx-auto">
                <label style={{fontSize: 18}}>Name: </label>
                <button type="button" class="mx-3 mb-3 btn btn-outline-secondary">{data}</button>
                <br></br>
                {
                    !loading && 
                    <>
                        {isInputOpen && <input type="text" class="form-control my-3" onChange={(e) => setName(e.target.value)} placeholder="Enter New Name"></input>}
                        <button onClick={() => {setInputOpen(!isInputOpen); if(isInputOpen){setName('')}}} className="btn rounded-pill btn-outline-primary">{isInputOpen ? "Cancel" : "Update"}</button>
                        <button type="button" className={`mx-1 btn rounded-pill btn-outline-${(bnStatus === true && status === true) ? 'success' : (bnStatus === false && status === true) ? 'danger' : 'warning'}`}>Business Name Status:{(bnStatus === true && status === true) ? 'Approved' : (bnStatus === false && status === true) ? 'Rejected' : 'Pending'}</button>
                        <br></br>
                        {isInputOpen && <button onClick={submit} disabled={name.length <= 0 || name === data} className="mt-3 btn rounded-pill btn-outline-info"> <i className="fa fa-save"></i> <span className="text">Save</span> </button>}
                    </>
                }
                {
                    loading && <div style={{marginLeft: 70, marginTop: -10}}><Loader type="Rings" color="#FF6A00" height={130} width={100} /></div>
                }
            </div>    
        </div>
    )
}

export default BusinessName