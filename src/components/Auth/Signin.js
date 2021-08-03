import { useState } from 'react'
import {Link, Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import { signin, fpSendOTP, fpVerifyOTP } from './api'
import {useDispatch} from 'react-redux'
import {authenticateUser} from '../../redux'

const Signin = () =>{

    const dispatch = useDispatch()
 
    const [values, setValues] = useState({
        username: "8980445467",
        password: "aditya",
        loading: false,
        error: "",
        didRedirect: false,
        isFSOpen: false, //forgot password
        isVopen: false, //otp varifier
        mobile: '',
        otpID: '',
        otp: '',
        newPassword: ''
    })

    const {username, password, error, didRedirect, loading ,isFSOpen, mobile, otp, isVopen, newPassword, otpID} = values

    const handleChange =  name => event =>{
        setValues({...values, error: false, [name]: event.target.value})
    }

    const handleSubmit = (e) =>{
        setValues({...values, loading: true})
        e.preventDefault()
        if(!username){
            setValues({...values, error: "please enter email or mobile"})
            return
        }
        if(!password){
            setValues({...values, error: "please enter password"})
            return
        }

        signin({username, password}).then(data => {
            console.log(data, 'dara')
            if(!data){
                setValues({...values, error: 'something went wrong', loading: false})
            }
            if (data.error) {
                setValues({ ...values, error: data.error, success: false })
            }
            else{
                setTimeout(() =>{
                    dispatch(authenticateUser(data, () =>{
                        setValues({
                            ...values,
                            loading: false,
                            didRedirect: true
                        })
                    }))
                    // authenticate(data, () => {
                    //     setValues({
                    //         ...values,
                    //         loading: false,
                    //         didRedirect: true
                    //     })
                    // })
                }, 10)
            }
        }).catch(err => console.log(err));
    }

    const handleForPassSubmit = event =>{
        setValues({...values, loading: true})
        event.preventDefault()
        if(!mobile){
            setValues({...values, error: "please enter mobile"})
            return
        }
        fpSendOTP({mobile}).then(data => {
            console.log(data, 'dara')
            if (data.error) {
                setValues({ ...values, error: data.error, success: false })
            }
            else{
                setTimeout(() =>{
                    setValues({...values, otpID: data.otpID, loading: false, isVopen: true, isFSOpen: false})
                }, 10)
            }
        }).catch(err => console.log(err));
    }

    const handlverify = event =>{
        setValues({...values, loading: true})
        event.preventDefault()
        if(!otp){
            setValues({...values, error: "please enter mobile", loading: false})
            return
        }

        const data = {
            newPassword: newPassword,
            uOtp: otp,
            uOtpID: otpID,
            mobile: mobile
        }
        console.log(data)
        fpVerifyOTP(data).then(data => {
            console.log(data, 'dara')
            if (data.error) {
                setValues({ ...values, error: data.error, success: false })
            }
            else{
                setTimeout(() =>{
                    setValues({...values, otpID: data.otpID, loading: false, isVopen: false, isFSOpen: false })
                }, 10)
            }
        }).catch(err => console.log(err));
    }

    if(didRedirect){
        return <Redirect to="/" />
    }
    

    return (
        <section className="section-conten padding-y" style={{minHeight: '84vh'}}>
	        <div className="card mx-auto" style={{maxWidth: 380, marginTop: 100}} >
                <div className="card-body">
                    <h4 className="card-title mb-4">{isFSOpen ? "Forgot Password" : isVopen ? "Verify OTP" : "Sign In"}</h4>
                    <div style={{display: error ? "" : "none"}} className="alert alert-primary m-3 p-2" role="alert">
                        {error} 
                    </div>
                    <form>
                        {
                            isFSOpen && 
                            <> 
                                <div className="form-group">
                                    <input name="" className="form-control" placeholder="Mobile" onChange={handleChange('mobile')} value={mobile} type="text" />
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
                                        <button type="submit" onClick={handleForPassSubmit} className="btn btn-primary btn-block"> Send OTP </button>  
                                    }
                                </div> 
                            </>
                        }
                        {
                            isVopen &&
                            <>
                                <div className="form-group">
                                        <input name="sfsf" className="form-control my-3" placeholder="OTP" onChange={handleChange('otp')} value={otp} type="number" />
                                        <input name="sdffs" className="form-control" placeholder="New Password" onChange={handleChange('newPassword')} value={newPassword} type="password" />
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
                                        <button type="submit" onClick={handlverify} className="btn btn-primary btn-block"> Verify </button>  
                                    }
                                </div> 
                            </>
                        }
                        {!isFSOpen && !isVopen &&
                            <>
                                <div className="form-group">
                                    <input name="" className="form-control" placeholder="Username" onChange={handleChange('username')} value={username} type="text" />
                                </div>
                                <div className="form-group">
                                    <input name="" className="form-control" placeholder="Password" onChange={handleChange('password')} value={password} type="password" />
                                </div>
                                <div className="form-group">
                                    <Link onClick={() => setValues({...values, isFSOpen: true, error: ''})} className="float-right">Forgot password?</Link> 
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
                                        <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-block"> Login </button>  
                                    }
                                </div> 
                            </>
                        } 
                    </form>
                </div> 
            </div> 

            <p className="text-center mt-4">Don't have account? <Link to="/signup">Sign up</Link></p>
            <br/><br/>
        </section>
    )
}

export default Signin