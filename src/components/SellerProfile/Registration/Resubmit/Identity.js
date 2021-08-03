import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../../../Backend";
import { fetchUser } from "../../../../redux";

const Identity = ({history}) =>{

    const userState = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [inputs, setInputs] = useState({
        file: false,
        docType: 'Choose...'
    })

    const resubmitAPI = () =>{

        let formData = new FormData()
        formData.append('docType', inputs.docType)
        formData.append('idProof', inputs.file)

        return fetch(`${API}/seller/info/resubmit/identity/idProof/${userState.user._id}`, {
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
        if(inputs.file === false || inputs.docType === 'Choose...'){
            setError('All fields are required')
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
                <h3>Resubmit Identity Details</h3>
                <hr></hr>
                <div class="form-group col-md-4">
                    <label for="inputState">Document Type</label>
                    <select id="inputState" class="form-control" onChange={(e) => {
                        setInputs({...inputs, docType: e.target.value})
                        setError(false)
                    }}>
                        <option>Choose...</option>
                        <option>Aadhar Card</option>
                        <option>Election Card</option>
                        <option>Driving Licence</option>
                    </select>
                </div>
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

export default Identity