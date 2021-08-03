import gstlogo from '../../../Images/gst.png'
import banklogo from '../../../Images/bank.png'
import pancardlogo from '../../../Images/pancard.png'
import idlogo from '../../../Images/idproof.png'
import {API} from '../../../Backend'
import { useEffect, useState } from 'react'
import Card from './Card'
import { useSelector } from 'react-redux'
import Loader from 'react-loader-spinner'

const StepThree = (props) =>{

    const userState = useSelector(state => state.auth)
    const [checkbox, setCheckbox] = useState({
        logo: true,
        bankAccountNumber: true,
        businessName: true
    })
    const [sellerData, setSellerData] = useState(false)
    const [error, setError] = useState(false)
    const [msg, setMsg] = useState(false)
    const [msgBody, setMsgBody] = useState('')
    const [loading, setLoading] = useState(true)

    const [fields, setFields] = useState({
        gst: '',
        identity: '',
        bankAccount: '',
        panCard: '',
        otherData: 'pending'
    })
    console.log(fields)
    const handleRadioChange = (value, type) =>{
        let obj = {}
        for (const key in fields) {
            if(key === type){
                obj[key] = value
            }else{
                obj[key] = fields[key]
            }
        }
        const validate = Object.values(obj).every(x => x === "true")
        if(validate){
            setMsg(false)
            console.log('d')
        }else{
            setMsg(true)
        }

        setError(false)
        setFields({...fields, [type]: value})
    }

    const submit = () =>{

        let validate = Object.values(fields).every(x => x === 'true' || x === 'reject')
        if(!validate){
            window.scrollTo(0, 0)
           setError('please do all action') 
           return
        }
       
        if(msg && msgBody === ''){
            window.scrollTo(0, 0)
            setError('please write Message')
            return
        }
        if(fields.otherData === 'reject' && Object.values(checkbox).every(x => x === true)){
            window.scrollTo(0, 0)
            setError('please select checkbox')
            return
        }

        const postData = {
            panCard: fields.panCard,
            gst: fields.gst,
            bankAccount: fields.bankAccount,
            otherData: fields.otherData,
            identity: fields.identity,
            checkBoxData: {
              logo: checkbox.logo,
              bankAccountNumber: checkbox.bankAccountNumber,
              businessName: checkbox.businessName  
            },
            message: msgBody
        }
        fetch(`${API}/admin/seller/info/verification/${userState.user._id}/${props.match.params.userId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${userState.token}`
            },
            body: JSON.stringify(postData)
        }).then((response) =>{
            return response.json()
        }).then((data) =>{
            if(data.error){
                console.log(data.error)
            }else{
                console.log(data)
                props.history.goBack()
            }
        }).catch((err) =>{
            console.log(err)
        })
    }

    useEffect(() => {
        fetch(`${API}/admin/seller/info/${userState.user._id}/${props.match.params.userId}`, {
            method: "GET",
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
                console.log(data.sellerData)
                let docsData = data.sellerData.docs
                let sfd = {}
                for (const key in docsData) {
                    let value = docsData[key].isVerified 
                    sfd[key] = value
                }
                if(data.sellerData.osd === "pending"){
                    sfd.otherData = "pending" 
                }else if(data.sellerData.osd === "true"){
                    sfd.otherData = "true"
                }else if(data.sellerData.osd === "false"){
                    sfd.otherData = "reject" 
                    setCheckbox(data.sellerData.osddata)
                }
                // sfd.otherData = "pending"
                
                setFields(sfd)
                setSellerData(data.sellerData)
                setLoading(false)
            }
        }).catch((err) =>{
            console.log(err)
        })
    }, [userState.token, props.match.params.userId, userState.user._id])
    // console.log(fields)

    const handleCheckboxChange = (e, type) =>{
        setCheckbox({...checkbox, [type]: !e.target.checked})
    }
    console.log(checkbox)
    return(
        <div>
            <div style={{display: error ? '' : 'none'}} class="alert alert-danger my-5 col-6 mx-auto" role="alert">
                {error}
            </div>
            { 
                loading && 
                <div style={{height: '100vh', display: loading ? '' : 'none'}} className="row">
                    <div className="mx-auto my-auto">
                        <Loader type="Circles" color="#FF6A00" height={100} width={100} visible={loading} />
                    </div>
                </div>
            } 
            {
                !loading &&
                <>
                    <div className="row my-5 mx-3">
                        {sellerData && sellerData.sellingPermission === 'All' && <Card type="gst" data={sellerData && sellerData.docs.gst} title="GST Details" icon={gstlogo} atr="gst" hrc={handleRadioChange} fields={fields}/>}
                        <Card type="bankAccount" data={sellerData && sellerData.docs.bankAccount} title="Bank Account Details" icon={banklogo} atr="bnk" hrc={handleRadioChange} fields={fields}/>
                        <Card type="panCard" data={sellerData && sellerData.docs.panCard} title="Pan Card Details" icon={pancardlogo} atr="pc" hrc={handleRadioChange} fields={fields}/>
                        <Card type="identity" data={sellerData && sellerData.docs.identity} title="ID Proof" icon={idlogo} atr="id" hrc={handleRadioChange} fields={fields}/>
                    </div>
                    <div className="row">
                        <div className="col-3 mx-5 mt-5">
                            <div className="card mx-auto col-12 p-5">
                                <h4 style={{textAlign:'center'}}>Logo</h4>
                                <hr></hr>
                                <img style={{height: 150, width: 200}} alt="" src={`${API}/seller/docs/${sellerData.logo}`}/>
                            </div>
                        </div>
                        <div className="col-7">
                            <table class="table table-bordered col-12 mx-auto my-5">
                                <tbody>
                                    <tr className="table-primary">
                                        <th scope="row">User ID</th>
                                        <th scope="col">{sellerData.userId}</th>
                                    </tr>
                                    <tr>
                                        <th scope="row">Business ID</th>
                                        <th scope="col">{sellerData.businessId}</th>
                                    </tr>
                                    <tr className="table-primary">
                                        <th scope="row">Business Name</th>
                                        <th scope="col">{sellerData.businessName}</th>
                                    </tr>
                                    <tr>
                                        <th scope="row">Business Mobile</th>
                                        <th scope="col">{sellerData.businessMobile}</th>
                                    </tr>
                                    <tr className="table-primary">
                                        <th scope="row">Seller Type</th>
                                        <th scope="col">{sellerData.sellerType}</th>
                                    </tr>
                                    <tr>
                                        <th scope="row">GST Number</th>
                                        <th scope="col">{sellerData.sellingPermission === "All" ? sellerData.docs.gst.gstNumber : 'Not Provided'}</th>
                                    </tr>
                                    <tr className="table-primary">
                                        <th scope="row">Bank Account</th>
                                        <th scope="col">{sellerData && sellerData.docs.bankAccount.bankAccountNumber}</th>
                                    </tr>
                                    <tr>
                                        <th scope="row">Selling Permission</th>
                                        <th scope="col">{sellerData.sellingPermission}</th>
                                    </tr>
                                    <tr className="table-primary">
                                        <th scope="row">Selling Region</th>
                                        <th scope="col">{sellerData.sellingRegion}</th>
                                    </tr>
                                    <tr>
                                        <th scope="row">Bank Account Document Type</th>
                                        <th scope="col">{sellerData && sellerData.docs.bankAccount.docType}</th>
                                    </tr>
                                    <tr className="table-primary">
                                        <th scope="row">Identity Proof Type</th>
                                        <th scope="col">{sellerData && sellerData.docs.identity.docType}</th>
                                    </tr>
                                    <tr>
                                        <th scope="row"></th>
                                        <th scope="col">
                                            <button type="button" class="btn btn-outline-success" onClick={() => handleRadioChange("true", 'otherData')}>
                                                <div class="form-check">
                                                    <input class="form-check-input" id="tabledata"  type="radio" name="od" checked={fields.otherData === "true" ? true : false}/>
                                                    <label class="form-check-label" htmlFor="tabledata">
                                                        Verify
                                                    </label>
                                                </div>
                                            </button>
                                            <button type="button" class="btn btn-outline-danger mx-3" onClick={() => handleRadioChange('reject', 'otherData')}>
                                                <div class="form-check">
                                                    <input class="form-check-input" id="tabledata1" name="od" type="radio" checked={fields.otherData === "reject" ? true : false}/>
                                                    <label class="form-check-label" htmlFor="tabledata1">
                                                        Reject
                                                    </label>
                                                </div>
                                            </button>
                                            <br></br>
                                            {
                                                fields.otherData === 'reject' && 
                                                <div className="my-3">
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox1" checked={checkbox.logo === false ? true : false} onChange={(e) =>handleCheckboxChange(e, 'logo')} value="logo"/>
                                                        <label class="form-check-label" for="inlineCheckbox1">Logo</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox2" checked={checkbox.bankAccountNumber === false ? true : false} onChange={(e) => handleCheckboxChange(e, 'bankAccountNumber')} value="bankAccountNumber"/>
                                                        <label class="form-check-label" for="inlineCheckbox2">Bank Account </label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox3" checked={checkbox.businessName === false ? true : false} onChange={(e) => handleCheckboxChange(e, 'businessName')} value="businessName"/>
                                                        <label class="form-check-label" for="inlineCheckbox3">Business Name</label>
                                                    </div>
                                                </div>
                                            }
                                            {
                                                msg && 
                                                <div class="form-group my-3">
                                                    <label for="formGroupExampleInput">Write Message</label>
                                                    <input onChange={e => {setMsgBody(e.target.value); setError(false)}} type="text" class="form-control" id="formGroupExampleInput" placeholder="Write Message" value={msgBody}/>
                                                </div>
                                            }
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row mx-auto my-5">
                    <div className="col-4"></div>
                    <div className="col-4"></div>

                        <div className="col-4">
                        <button type="button" class="btn btn-primary mx-3 " onClick={submit}>Submit</button>
                        <button type="button" class="btn btn-primary mx-auto" onClick={() =>{
                            props.history.goBack()
                        }}>Go Back</button>
                        </div>
                    </div> 
                </>
            }      
        </div>
    )
}

export default StepThree