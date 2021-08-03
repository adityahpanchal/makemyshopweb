import { useEffect, useState } from "react"
import Loader from "react-loader-spinner"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { API } from "../../../Backend"

const UpdatePasswordWithForgot = (props) =>{

    const userState = useSelector(state => state.auth)

    const [inputs, setInputs] = useState({
        newPassword: '',
        confirmNewPassword: '',
        otpByUser: '',
        otpIdByUser: ''
    })
    const [loadingBig, setLoadingBig] = useState(true)
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState('')

    useEffect(() => {
        setLoadingBig(true)
        fetch(`${API}/update/password/sendotp/${userState.user._id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${userState.token}`
            },
            body: JSON.stringify({status: true})
        }).then((response) =>{
            return response.json()
        }).then((data) =>{
            if(data.error){
                console.log(data.error)
                setErr(data.error)
                setLoadingBig(false)
            }else{
                if(data.otpID){
                    setLoadingBig(false)
                    setInputs(inputs => ({...inputs, otpIdByUser: data.otpID}))
                }
            }
        }).catch((err) =>{
            console.log(err)
        })
    }, [userState.token, userState.user._id])

    const handleInput = name => event =>{
        setInputs({...inputs, [name]: event.target.value})
        setErr('')
    }

    const update = (e) =>{
        setLoading(true)
        e.preventDefault()
        if(inputs.otpByUser === "" || inputs.newPassword === "" || inputs.confirmNewPassword === ""){
            setErr('all fields are required')
            setLoading(false)
            return
        }
        if(inputs.newPassword !== inputs.confirmNewPassword){
            setErr('new password and confirm password not match')
            setLoading(false)
            return
        }

        fetch(`${API}/update/password/validate/otp/${userState.user._id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${userState.token}`
            },
            body: JSON.stringify(inputs)
        }).then((response) =>{
            return response.json()
        }).then((data) =>{
            if(data.error){
                console.log(data.error)
                setErr(data.error)
                setLoading(false)
            }else{
                if(data.status){
                   setLoading(false)
                   props.history.push('/profile')
                }
            }
        }).catch((err) =>{
            console.log(err)
        })
    }

    const resendOTP = () =>{
        fetch(`${API}/update/password/sendotp/${userState.user._id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${userState.token}`
            },
            body: JSON.stringify({status: true})
        }).then((response) =>{
            return response.json()
        }).then((data) =>{
            if(data.error){
                console.log(data.error)
                setErr(data.error)
                setLoadingBig(false)
            }else{
                if(data.otpID){
                    setLoadingBig(false)
                    setInputs(inputs => ({...inputs, otpIdByUser: data.otpID}))
                }
            }
        }).catch((err) =>{
            console.log(err)
        })
    }

    return (
        <main className="col-md-9">
            <div className="card">
                
                <h4 className="my-3 mx-5">Update Password</h4>
                <div style={{height: '50vh', width: '100vh', display: loadingBig ? '' : 'none'}} className="card mx-auto col-9">
                    <div className="mx-auto my-auto">
                        <Loader type="Circles" color="#FF6A00" height={75} width={75} visible={loadingBig} />
                    </div>
                </div>
                <div className="card-body">
                    
                    {
                        err !== '' && <h3 className="text-center text-danger py-3">{err}</h3>
                    }

                    <form className="row">
     	                <div className="col-md-12">
     		                <div className="form-row">
                                <div className="col-4 form-group">
                                    <label>New Password</label>
                                    <input type="text" className="form-control" onChange={handleInput('newPassword')} value={inputs.firstname} />
                                </div> 
			                </div> 
                            <div className="form-row">
                                <div className="col-4 form-group">
                                    <label>Confirm New Password</label>
                                    <input type="text" className="form-control" onChange={handleInput('confirmNewPassword')} value={inputs.firstname} />
                                </div>
			                </div>
                            <div className="form-row">
                                <div className="col-3 form-group">
                                    <label>OTP sent on +91 {userState.user.mobile}</label>
                                    <input type="number" className="form-control" onChange={handleInput('otpByUser')} value={inputs.firstname} />
                                </div> 
                            </div>
                            <Link onClick={resendOTP}>Resend</Link>
                            <br></br>
                            <button onClick={update} className="btn btn-primary my-3">{loading ? 'wait...' : 'Update Password'}</button>
                            <br></br>
                            
     	                </div> 
     	            </form>
                </div> 
            </div> 
        </main> 
    )
}

export default UpdatePasswordWithForgot