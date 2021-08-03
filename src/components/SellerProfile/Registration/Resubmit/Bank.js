import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../../../Backend";
import { fetchUser } from "../../../../redux";

const Bank = ({history}) =>{

    const userState = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [inputs, setInputs] = useState({
        file: false,
        docType: 'Choose...',
        bankAccountNumber: '' ,
        fileName: ''
    })

    const resubmitAPI = () =>{

        let formData = new FormData()
        formData.append('bankAccountNumber', inputs.bankAccountNumber)
        formData.append('docType', inputs.docType)
        formData.append('bankProof', inputs.file)

        return fetch(`${API}/seller/info/resubmit/bank/bankProof/${userState.user._id}`, {
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
        if(inputs.file === false || inputs.docType === 'Choose...' || inputs.bankAccountNumber === ''){
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
                <h3>Resubmit Bank Details</h3>
                <hr></hr>
                <div className="input-group py-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="">Bank Account Number</span>
                    </div>
                    <input type="text" className="form-control" onChange={(e) => {
                        setInputs({...inputs, bankAccountNumber: e.target.value})
                        setError(false)
                        }}/>
                </div>
                <div class="form-group col-md-4">
                    <label for="inputState">Document Type</label>
                    <select id="inputState" class="form-control" onChange={(e) => {
                        setInputs({...inputs, docType: e.target.value})
                        setError(false)
                    }}>
                        <option>Choose...</option>
                        <option>Passbook Copy</option>
                        <option>Blank Cheque</option>
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

export default Bank