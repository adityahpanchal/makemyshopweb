import { useState } from "react"
import Loader from "react-loader-spinner"
import { useDispatch, useSelector } from "react-redux"
import { gstSec} from '../../../Backend'
import {API, isAPIRun} from '../../../Backend'
import { setUser } from "../../../redux"

const StepTwo = (props) =>{

    const userState = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const [helper, setHelper] = useState({
        loading: false,
        error: false,
        gstVerification: false
    })

    const [gst, setGST] = useState('24AOFPP4370P1ZG')
    const [sellingPermission, setSellingPermission] = useState(false)
    const [sellerType, setSellerType] = useState('both')
    const [sellingRegion, setSellingRegion] = useState('India')

    const handleRadioChange = (e) =>{
        setSellingPermission(e.target.value)
    }

    const nextStep = (e) =>{
        e.preventDefault()
        setHelper({...helper, gstVerification: true, error: false})
    }

    const verifyGST = (e) =>{
        setHelper({...helper, error: false, loading: true})
        e.preventDefault()
        if(!gst){
            setHelper({...helper, error: 'please enter gst number'})
        }else{
            if(isAPIRun === "true" || isAPIRun === true){
                fetch(`https://appyflow.in/api/verifyGST?gstNo=${gst}&key_secret=${gstSec}`, {
                    method: "GET",
                    headers:{
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then((response) =>{
                    return response.json()
                }).then((data) =>{
                    if(data.error){
                        setHelper({...helper, error: data.message, loading: false})
                    }else{
                        setHelper({...helper, error: false, loading: false, gstVerification: true})
                    }
                }).catch((err) =>{
                    console.log(err)
                })
            }else{
                setHelper({...helper, error: false, loading: false, gstVerification: true})
            }
        }
    }
    const [bankAccountNumber, setBankAccountNumber] = useState('33115039615')
    const [files, setFiles] = useState({
        logo: {
            file: ''
        },
        bankProof: {
            file: '',
            fileType: 'Passbook Photo (First Page)'
        },
        idProof: {
            file: '',
            fileType: 'Driving Licence'
        },
        panCard:{
            file: ''
        }
    })

    const {loading, error, gstVerification} = helper
   console.log(files)
    const handleFileChange = name => event =>{
        setHelper({...helper, error: false})
        setFiles({...files, [name]: {...files[name], file: event.target.files[0]}})
    }
    const handleFileTypeChange = name => event =>{
        setHelper({...helper, error: false})
        setFiles({...files, [name]: {...files[name], fileType: event.target.value}})
    }

    const getUser = () =>{
        return fetch(`${API}/getuser/${userState.user._id}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userState.token}`
          }
          }).then((data) => {
            return data.json()
          }).then((data) => {
            return data
          })
      }

    const handleSubmit = (e) =>{

        e.preventDefault()
        console.log(sellingPermission)
        for (const key in files) {
            if(key !== 'logo' && files[key].file === ''){
                setHelper({...helper, error: `please select all documents`})
                return
            }
            if(key !== 'logo' && files[key].fileType === ''){
                setHelper({...helper, error: `please select all documents types`})
                return
            }
            if(key === 'logo' && files[key].file === ''){
                setHelper({...helper, error: `please select logo`})
                return 
            }
        }
        
        const formData = new FormData()
        if(sellingPermission === 'All'){
            formData.append('gst', gst)  
        }
        formData.append('logo', files.logo.file)
        formData.append('panCard', files.panCard.file)
        formData.append('bankProof', files.bankProof.file)
        formData.append('bankProofType', files.bankProof.fileType)
        formData.append('idProof', files.idProof.file)
        formData.append('idProofType', files.idProof.fileType)
        formData.append('sellerType', sellerType)
        formData.append('sellingPermission', sellingPermission)
        formData.append('sellingRegion', sellingRegion)
        formData.append('bankAccountNumber', bankAccountNumber)
        console.log(userState)
        fetch(`${API}/seller/create/upload/docs/${userState.user._id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${userState.token}`
            },
            body: formData
        }).then((response) =>{
            return response.json()
        }).then(async(data) =>{
            console.log(data)
            if(data.status === true){
                const updatedUser = await getUser() 
                dispatch(setUser(updatedUser, () =>{
                    props.history.push('/seller/documents/verification/status')
                }))
            }
        }).catch((err) =>{
            console.log(err)
        })
    }

    return(
        <section className="section-content padding-y">
            <div className="card mx-auto" style={{maxWidth: 520, marginTop:40}}>
                <div style={{display: error ? "" : "none"}} className="alert alert-primary m-3 p-2" role="alert">
                    {error} 
                </div>
                <article className="card-body">
                    <header className="mb-4"><h4 className="card-title">Business Document Verification</h4></header>

                    <form style={{display: gstVerification ? 'none': ''}}>
                        <div className="form-group">
                            <label style={{display: sellingPermission === 'All' ? '' : 'none' }}>Verify GST No.</label>
                            <input style={{display: sellingPermission === 'All' ? '' : 'none' }} type="text" onChange={(e) => {setGST(e.target.value); setHelper({...helper, error: false})}} className="form-control" placeholder="Enter Your GST Number" value={gst}/>
                            
                            <div className="form-group  mx-auto my-3">
                                <div class="form-check">
                                    <input class="form-check-input" id="exampleRadios1" onChange={handleRadioChange} name="gst" type="radio" value="All"/>
                                    <label class="form-check-label" htmlFor="exampleRadios1">
                                        I have GST
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" id="exampleRadios2" onChange={handleRadioChange} name="gst" type="radio" value="Books"/>
                                    <label class="form-check-label" htmlFor="exampleRadios2">
                                        I want just sell books
                                    </label>
                                </div>
                                <br></br>
                                {
                                    loading ? 
                                        (<div style={{display: "flex", justifyContent: "center", margin: 5}}>
                                            <Loader
                                                type="Bars"
                                                color="#ff6a00"
                                                height={60}
                                                width={80}
                                            />
                                        </div>):
                                    <button type="submit" style={{display: sellingPermission ? '' : 'none'}} onClick={sellingPermission === 'All' ? verifyGST : nextStep} className="btn btn-primary btn-block"> {sellingPermission === 'All' ? 'Verify' : 'Next'} </button>
                                }
                            </div>
                        </div>
                    </form>

                    <form style={{display: gstVerification ? '': 'none'}}>
                        <div className="form-group">
                            <h5 style={{color: '#D95A00'}}>Logo</h5>
                            <div class="input-group mb-3">
                                <div class="custom-file">
                                    <input onChange={handleFileChange('logo')} type="file" class="custom-file-input" id="inputGroupFile01"/>
                                    <label class="custom-file-label" for="inputGroupFile01">{files.logo.file && files.logo.file.name !== undefined ? files.logo.file.name : "Choose file" }</label>
                                </div>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="form-group">
                            <h5 style={{color: '#D95A00'}}>Pan Card</h5>
                            <div class="input-group mb-3">
                                <div class="custom-file">
                                    <input onChange={handleFileChange('panCard')} type="file" class="custom-file-input" id="inputGroupFile01" />
                                    <label class="custom-file-label" for="inputGroupFile01">{files.panCard.file && files.panCard.file.name !== undefined ? files.panCard.file.name : "Choose file" }</label>
                                </div>
                            </div>
                        </div>
                        <hr></hr>

                        <h5 style={{color: '#D95A00'}}>ID Proof</h5>
                        <div className="form-group">
                            <label>Document Type</label>
                            <select value={files.idProof.fileType} onChange={handleFileTypeChange('idProof')} id="inputCity" className="form-control">
                                <option> Choose... </option>
                                <option> Aadhar Card </option>
                                <option> Driving Licence  </option>
                                <option> Election Card </option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Choose File</label>
                            <div class="input-group mb-3">
                                <div class="custom-file">
                                    <input onChange={handleFileChange('idProof')} type="file" class="custom-file-input" id="inputGroupFile01" />
                                    <label class="custom-file-label" for="inputGroupFile01">{files.idProof.file && files.idProof.file.name !== undefined ? files.idProof.file.name : "Choose file" }</label>
                                </div>
                            </div>
                        </div>

                        <hr></hr>

                        <h5 style={{color: '#D95A00'}}>Bank Account Proof</h5>
                        <div className="form-group">
                            <label>Document Type</label>
                            <select value={files.bankProof.fileType} onChange={handleFileTypeChange('bankProof')} id="inputCity" className="form-control">
                                <option> Choose... </option>
                                <option> Passbook Photo (First Page) </option>
                                <option> Blank Cheque  </option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Choose File</label>
                            <div class="input-group mb-3">
                                <div class="custom-file">
                                    <input onChange={handleFileChange('bankProof')} type="file" class="custom-file-input" id="inputGroupFile01" />
                                    <label class="custom-file-label" for="inputGroupFile01">{files.bankProof.file && files.bankProof.file.name !== undefined ? files.bankProof.file.name : "Choose file" }</label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Bank Account Number</label>
                            <input onChange={(e) => setBankAccountNumber(e.target.value)} type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter Bank Account" value={bankAccountNumber}/>
                        </div>
                        <hr></hr>

                        <h5 style={{color: '#D95A00'}}>Selling Region</h5>
                        <div className="form-group">
                            <select value={sellingRegion} onChange={(e) => setSellingRegion(e.target.value)} id="inputCity" className="form-control">
                                <option> Choose... </option>
                                <option> India </option>
                                <option> {userState && userState.user.businessId.businessAddress.state}  </option>
                                <option> {userState && userState.user.businessId.businessAddress.city} </option>
                            </select>
                        </div>

                        <hr></hr>

                        <h5 style={{color: '#D95A00'}}>Seller Type</h5>
                        <div className="form-group">
                            <select value={sellerType} onChange={(e) => setSellerType(e.target.value)} id="inputCity" className="form-control">
                                <option> Choose... </option>
                                <option> wholesale </option>
                                <option> retail </option>
                                <option> both  </option>
                            </select>
                        </div>
                        <div className="form-group">
                            {
                                loading ? 
                                    (<div style={{display: "flex", justifyContent: "center", margin: 5}}>
                                        <Loader
                                            type="Bars"
                                            color="#ff6a00"
                                            height={60}
                                            width={80}
                                        />
                                    </div>):
                                <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-block"> Register  </button>  
                            }
                        </div>    
                    </form>
                </article>
            </div> 
            
        </section>
    )
}

export default StepTwo