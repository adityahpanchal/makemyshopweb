import { useState } from "react"
import { useSelector } from "react-redux"
import {API, gstSec} from '../../../../Backend'

const Gst = ({history}) =>{

    const userState = useSelector(state => state.auth)
    const [gstNumber, setgstNumber] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const isGstValid = () =>{
        return fetch(`https://appyflow.in/api/verifyGST?gstNo=${gstNumber}&key_secret=${gstSec}`, {
                method: "GET",
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then((response) =>{
                return response.json()
            }).then((data) =>{
                return data
            }).catch((err) =>{
                return err
            })
    }

    const resubmitAPI = () =>{
        return fetch(`${API}/seller/info/resubmit/gst/${userState.user._id}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userState.token}`
                },
                body: JSON.stringify({gstNumber})
            }).then((response) =>{
                return response.json()
            }).then((data) =>{
                return data
            }).catch((err) =>{
                return err
            })
    }

    const handleSubmit = async () =>{
        setLoading(true)
        if(gstNumber === ''){
            setError('please enter gst number')
            return
        }
        const resultGSTAPI = await isGstValid()
        if(resultGSTAPI.error){
            setError(resultGSTAPI.error)
            return
        }else{
            const resultAPI = await resubmitAPI()
            if(resultAPI.error){
                setError(resultAPI.error)
            }
            history.push('/seller/documents/verification/status')
        }
    }

    return(
        <div className="py-5">
            <div className="card col-6 mx-auto p-5">
                {
                    error && <div class="alert alert-danger" role="alert">{error}</div>
                }
                <h3>Resubmit GST Details</h3>
                <hr></hr>
                <div className="input-group py-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="">GST Number</span>
                    </div>
                    <input type="text" className="form-control" onChange={(e) => {setgstNumber(e.target.value); setError(false)}} value={gstNumber}/>
                </div>
                <button className="col-3 btn btn-warning mx-auto" onClick={handleSubmit}>{loading ? 'Please Wait' : 'Submit'}</button>
            </div>
        </div>
    )
}

export default Gst