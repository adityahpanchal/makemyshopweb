import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../../../Backend";
import { fetchUser } from "../../../../redux";

const Pan = ({history}) =>{

    const userState = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [inputs, setInputs] = useState({
        file: false
    })

    const resubmitAPI = () =>{

        let formData = new FormData()
        formData.append('panCard', inputs.file)

        return fetch(`${API}/seller/info/resubmit/pancard/panCard/${userState.user._id}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${userState.token}`
                },
                body: formData
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
        if(inputs.file === false){
            setError('Please Select File')
            return
        }
        const resultAPI = await resubmitAPI()
        if(resultAPI.error){
            setError(resultAPI.error)
            return
        }
        dispatch(fetchUser())
        history.push('/seller/documents/verification/status')
    }

    return(
        <div className="py-5">
            <div className="card col-6 mx-auto p-5">
                {
                    error && <div class="alert alert-danger" role="alert">{error}</div>
                }
                <h3>Resubmit Pan Details</h3>
                <hr></hr>
                <div class="form-group">
                    <label for="exampleFormControlFile1">Select File</label>
                    <input type="file" class="form-control-file" id="exampleFormControlFile1" onChange={(e) => {
                        setInputs({...inputs, file: e.target.files[0]})
                        setError(false)
                    }}/>
                </div>
                <button onClick={submit} className="col-3 btn btn-warning mx-auto">{loading ? 'Please Wait' : 'Submit'}</button>
            </div>
        </div>
    )
}

export default Pan