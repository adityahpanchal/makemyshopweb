import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { API } from "../../../Backend"
import { setUser } from "../../../redux"

const UpdateMobile = (props) =>{

    const userState = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const [err, setErr] = useState('')
    const [inputs, setInputs] = useState({
        obuNMobile: '',
        otpIdByUser: '',
        newMobile: '',
        obuCMobile: ''
    }) 
    const [loading, setLoading] = useState(false)
    const [isOTPSent, setIsOTPSent] = useState(false)

    const handleInput = name => event =>{
        setInputs({...inputs, [name]: event.target.value})
        setErr('')
    }

    const sendOTP = (e) =>{
        e.preventDefault()
        setLoading(true)
        if(inputs.newMobile === '' || inputs.newMobile.toString().length !== 10){
            setErr('Please enter valid mobile number')
            setLoading(false)
            return
        }
        if(inputs.newMobile === userState.user.mobile){
            setErr('New mobile number should not same as current mobile number')
            setLoading(false)
            return
        }
        fetch(`${API}/update/mobile/sendotp/${userState.user._id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${userState.token}`
            },
            body: JSON.stringify({newMobile: inputs.newMobile})
        }).then((response) =>{
            return response.json()
        }).then((data) =>{
            if(data.error){
                setErr(data.error)
                setLoading(false)
            }else{
                if(data.otpID){
                    setLoading(false)
                    setInputs(inputs => ({...inputs, otpIdByUser: data.otpID}))
                    setIsOTPSent(true)
                }
            }
        }).catch((err) =>{
            console.log(err)
        })
    }

    const update = (e) =>{
        e.preventDefault()
        setLoading(true)
        
        if(inputs.obuNMobile === '' || inputs.obuNMobile.length !== 6){
            setErr('OTP for new mobile should be 6 Digits')
            setLoading(false)
            return
        }
        if(inputs.obuCMobile === '' || inputs.obuCMobile.length !== 6){
            setErr('OTP for current mobile should be 6 Digits')
            setLoading(false)
            return
        }
        fetch(`${API}/update/mobile/${userState.user._id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${userState.token}`
            },
            body: JSON.stringify({otpIdByUser: inputs.otpIdByUser, obuNMobile: inputs.obuNMobile, obuCMobile: inputs.obuCMobile})
        }).then((response) =>{
            return response.json()
        }).then((data) =>{
            if(data.error){
                setErr(data.error)
                setLoading(false)
            }else{
                if(data.user){
                    setLoading(false)
                    setIsOTPSent(false)
                    dispatch(setUser(data, () =>{
                        setLoading(false)
                        props.history.push('/profile')
                    }))
                }
            }
        }).catch((err) =>{
            console.log(err)
        })
    }

    const resendOTP = (e) =>{
        e.preventDefault()
        setLoading(true)
        if(inputs.newMobile === '' || inputs.newMobile.toString().length !== 10){
            setErr('Please enter valid mobile number')
            setLoading(false)
            return
        }
        if(inputs.newMobile === userState.user.mobile){
            setErr('New mobile number should not same as current mobile number')
            setLoading(false)
            return
        }
        fetch(`${API}/update/mobile/sendotp/${userState.user._id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${userState.token}`
            },
            body: JSON.stringify({newMobile: inputs.newMobile})
        }).then((response) =>{
            return response.json()
        }).then((data) =>{
            if(data.error){
                setErr(data.error)
                setLoading(false)
            }else{
                if(data.otpID){
                    setLoading(false)
                    setInputs(inputs => ({...inputs, otpIdByUser: data.otpID}))
                    setIsOTPSent(true)
                }
            }
        }).catch((err) =>{
            console.log(err)
        })
    }

    return(
        <main className="col-md-9">
            <div className="card">
                
                <h4 className="my-3 mx-5">Update Mobile</h4>
                <div className="card-body">
                    {
                        err !== '' && <h3 className="text-center text-danger py-3">{err}</h3>
                    }
                    <form className="row">
     	                <div className="col-md-12">
     		                {
                                !isOTPSent &&
                                <>
                                <div className="form-row">
                                    <div className="col-4 form-group">
                                        <label>New Mobile Number</label>
                                        <input type="number" max="10" className="form-control" onChange={handleInput('newMobile')} value={inputs.newMobile} />
                                    </div> 
                                </div> 
                                <button className="btn btn-primary" onClick={sendOTP}>{loading ? 'wait...' : 'Send OTP'}</button>
                                </>
                            }
                            {
                                isOTPSent &&
                                <>
                                <div className="form-row">
                                    <div className="col-4 form-group">
                                        <label>OTP sent on +91 {inputs.newMobile}</label>
                                        <input type="number" className="form-control" onChange={handleInput('obuNMobile')} value={inputs.obuNMobile} />
                                    </div>
			                    </div>
                                <div className="form-row">
                                    <div className="col-4 form-group">
                                        <label>OTP sent on +91 {userState.user.mobile}</label>
                                        <input type="number" className="form-control" onChange={handleInput('obuCMobile')} value={inputs.obuCMobile} />
                                    </div>
			                    </div>
                                <button className="btn btn-primary" onClick={update}>{loading ? 'wait...' : 'Update Mobile'}</button>
                                <br></br>
                                <br></br>

                                <Link className="my-3" onClick={(e) => resendOTP(e)}>Resend</Link>
                                </>
                            }
                            <br></br>
     	                </div> 
     	            </form>
                </div> 
            </div> 
        </main> 
    )
}

export default UpdateMobile