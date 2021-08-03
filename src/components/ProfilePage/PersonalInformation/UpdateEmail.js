import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { API } from "../../../Backend"
import { setUser } from "../../../redux"

const UpdateEmail = (props) =>{

    const userState = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const [err, setErr] = useState('')
    const [inputs, setInputs] = useState({
        obuNEmail: '',
        otpIdByUser: '',
        newEmail: '',
        obuCEmail: ''
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
        if(inputs.newEmail === ''){
            setErr('Please enter email')
            setLoading(false)
            return
        }
        if(inputs.newEmail === userState.user.email){
            setErr('New email should not same as current email')
            setLoading(false)
            return
        }
        fetch(`${API}/update/email/sendotp/${userState.user._id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${userState.token}`
            },
            body: JSON.stringify({newEmail: inputs.newEmail})
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
        
        if(inputs.obuNEmail === '' || inputs.obuNEmail.length !== 6){
            setErr('OTP for new email should be 6 Digits')
            setLoading(false)
            return
        }
        if(inputs.obuCEmail === '' || inputs.obuCEmail.length !== 6){
            setErr('OTP for current email should be 6 Digits')
            setLoading(false)
            return
        }
        fetch(`${API}/update/email/${userState.user._id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${userState.token}`
            },
            body: JSON.stringify({otpIdByUser: inputs.otpIdByUser, obuNEmail: inputs.obuNEmail, obuCEmail: inputs.obuCEmail})
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
        if(inputs.newEmail === ''){
            setErr('Please enter email')
            setLoading(false)
            return
        }
        if(inputs.newEmail === userState.user.email){
            setErr('New email should not same as current email')
            setLoading(false)
            return
        }
        fetch(`${API}/update/email/sendotp/${userState.user._id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${userState.token}`
            },
            body: JSON.stringify({newEmail: inputs.newEmail})
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
                
                <h4 className="my-3 mx-5">Update Email</h4>
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
                                        <label>New Email Address</label>
                                        <input type="email" className="form-control" onChange={handleInput('newEmail')} value={inputs.newEmail} />
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
                                        <label>OTP sent on {inputs.newEmail}</label>
                                        <input type="number" className="form-control" onChange={handleInput('obuNEmail')} value={inputs.obuNEmail} />
                                    </div>
			                    </div>
                                <div className="form-row">
                                    <div className="col-4 form-group">
                                        <label>OTP sent on {userState.user.email}</label>
                                        <input type="number" className="form-control" onChange={handleInput('obuCEmail')} value={inputs.obuCEmail} />
                                    </div>
			                    </div>
                                <button className="btn btn-primary" onClick={update}>{loading ? 'wait...' : 'Update Email'}</button>
                                <br></br>
                                <br></br>

                                <Link className="my-3" onClick={resendOTP}>Resend</Link>
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

export default UpdateEmail