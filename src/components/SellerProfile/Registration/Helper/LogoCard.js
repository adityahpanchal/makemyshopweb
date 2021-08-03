import { useRef, useState } from 'react'
import Loader from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import { API } from '../../../../Backend'
import { fetchUser } from '../../../../redux'

const LogoCard = ({data, logoStatus, status, history}) =>{
    
    const userState = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const inputEl = useRef(null);
    const [file, setFile] = useState({
        file: false,
        fileName: ''
    })

    const resubmitAPI = () =>{
        let formData = new FormData()
        formData.append('logo', file.file)

        return fetch(`${API}/seller/info/resubmit/logo/logo/${userState.user._id}`, {
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
        const resultAPI = await resubmitAPI()
        if(resultAPI.error){
            setError(resultAPI.error)
            return
        }
        setLoading(false)
        setFile({...file, file: false})
        dispatch(fetchUser())
        history.push('/seller/documents/verification/status')
    }
    
    return(
        <div className="mx-auto pt-5 pb-3">
            <h3 style={{textAlign: 'center'}}>Logo</h3>
                {
                    error && <div class="alert alert-danger" role="alert">{error}</div>
                }
                <br></br>
                    <img src={`${API}/seller/docs/${data.url}`} style={{maxHeight: 150, maxWidth: 150, marginLeft: 83}} alt="" className="pb-5" />
                <br></br>

                <input ref={inputEl} style={{display: 'none'}} onChange={(e) => setFile({...file, file: e.target.files[0], fileName: e.target.files[0].name})} type="file"/>
                <label className="ml-3">{file.fileName}</label>
                <br></br>
                {
                    !loading && 
                    <>
                        <button onClick={() => inputEl.current.click()} className="btn rounded-pill btn-outline-primary"> <i className="fa fa-cloud-upload-alt"></i> <span className="text">Re submit</span> </button>
                        <button type="button" className={`mx-1 btn rounded-pill btn-outline-${(logoStatus === true && status === true) ? 'success' : (logoStatus === false && status === true) ? 'danger' : 'warning'}`}>Logo Status:{(logoStatus === true && status === true) ? 'Approved' : (logoStatus === false && status === true) ? 'Rejected' : 'Pending'}</button>
                    
                        {file.file && <button onClick={submit} className="mt-3 btn rounded-pill btn-outline-info"> <i className="fa fa-save"></i> <span className="text">Save</span> </button>}
                    </>
                }
                {
                    loading && <div style={{marginLeft: 70, marginTop: -10}}><Loader type="Rings" color="#FF6A00" height={130} width={100} /></div>
                }
            
        </div>
    )
}

export default LogoCard