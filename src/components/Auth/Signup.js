import {Link, Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {states, list} from '../Assets/India'
import { useState } from 'react'
import {signup, otpVerifierApi} from './api'
import { useDispatch } from 'react-redux'
import { authenticateUser } from '../../redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Signup = () =>{
    
    const dispatch = useDispatch()
    const [values, setValues] = useState({
        firstname: "Aditya",
        lastname: "Panchal",
        mobile: "8980445467",
        password: "aditya",
        repeatPassword: "aditya",
        city: "Ahmedabad",
        state: "Gujarat",
        loading: false,
        error: false,
        success: false,
        otpID: "",
        otp: "",
        didRedirect: false
      });

    const [cities, setCities] = useState([])
    const [isStateSelected, setIsStateSelected] = useState(false)
    const [isOtpSent, setIsOtpSent] = useState(false)
    const notify = () => toast("OTP Resent")

    const { firstname, lastname, mobile, password, repeatPassword, otp, loading, error, city, state, otpID, didRedirect } = values

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const stateHandler = (e, field) =>{
        console.log(values)
        setValues({...values, error: false, [field]: e.target.value})
        let state = e.target.value
        if(state !== "Choose..."){
            let cities = list.filter((v) =>{
                return v.state === state
            })
            setIsStateSelected(true)
            cities.unshift({id: 0, name: "Choose...", state: "nn"})
            setCities(cities)
        }else{
            setIsStateSelected(false)
        }
    }

    const onSubmit = (event) =>{
        event.preventDefault();
        console.log(values)
        setValues({ ...values, error: false, loading: true})
        
        if(!firstname || !lastname || !mobile || !password){
            setValues({ ...values, error: "All fields are required", loading: false})
            return
        }

        if(mobile.length !== 10){
            setValues({ ...values, error: "please enter valid mobile number", loading: false})
            return
        }
        
        if(city === "Choose..." || state === "Choose..." || city === "" || state === ""){
            setValues({ ...values, error: "All fields are required", loading: false})
            return
        }

        if(password !== repeatPassword){
            setValues({ ...values, error: "password is not match", loading: false})
            return
        }
        
        signup({ mobile }).then(data => {
            if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
            }
            else{
                setValues({
                    ...values,
                    success: true,
                    loading: false,
                    otpID: data.otpID
                })
                setIsOtpSent(true)
            }
        }).catch(console.log("Error in signup"))  
    }

    const otpResend = () =>{
        notify()
        signup({ mobile }).then(data => {
            if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
            }
            else{
                setValues({
                    ...values,
                    success: true,
                    loading: false,
                    otpID: data.otpID
                })
                setIsOtpSent(true)
            }
        }).catch(console.log("Error in signup"))  
    }

    const otpVerifier = (event) =>{
        event.preventDefault();
        setValues({ ...values, error: false, loading: true})
        if(!otp || otp.length !== 6 ){
            console.log(otp)
            setValues({ ...values, error: "please enter valid otp", loading: false})
            return
        }
        const userData = {
            userOTP: {
                otpID: otpID,
                otpNumber: otp
            },
            user:{
                firstname: firstname,
                lastname: lastname,
                password: password,
                city: city,
                state: state
            } 
        }
        otpVerifierApi(userData).then(data => {
            if(data.error) {
                setValues({ ...values, error: data.error, success: false })
            }
            else{
                dispatch(authenticateUser(data, () =>{
                    setValues({
                        ...values,
                        loading: false,
                        didRedirect: true
                    })
                }))
                setIsOtpSent(false)
            }
        }).catch((err) => console.log(err));
    }

    const otpVarification = () =>{
        return(
            <section className="padding-around" style={{paddingTop: 30, display: isOtpSent ? "" : "none"}}>
                <div style={{display: error ? "" : "none"}} className="alert alert-primary m-3 p-2" role="alert">
                        {error} 
                </div>
                <div className="text-center">
                    <span className="icon bg-white icon-lg rounded-circle rotate"><i className="fa text-warning fa-sms"></i></span>
                </div>
                <p className="text-center" style={{paddingTop: 30}}>
                    We sent confirmation code to 
                    <strong> +91 {mobile}</strong> <Link className="btn-link" to="/">Change</Link>
                </p>
                <br></br>
                <form className="px-10 mb-5 col-5 mx-auto">
                    <div className="form-group">
                        <input type="text" onChange={handleChange('otp')} autoFocus={true} required className="form-control form-control-lg text-center" placeholder="* * * * * *" />
                    </div>
                    <button type="submit" onClick={otpVerifier} className="btn btn-block btn-primary col-7 mx-auto">Verify</button>
                </form>

                <p onClick={otpResend} className="text-center"> <button className="btn btn-outline-dark"> <i className="fa fa-redo"></i> Send again</button></p>
            </section>
        )
    }

    const registration = () =>{

        return(<section className="section-content padding-y" style={{display: isOtpSent ? "none" : ""}}>
                <div className="card mx-auto" style={{maxWidth: 520, marginTop:40}}>
                    <div style={{display: error ? "" : "none"}} className="alert alert-primary m-3 p-2" role="alert">
                        {error} 
                    </div>
                    <article className="card-body">
                        <header className="mb-4"><h4 className="card-title">Sign up</h4></header>
                        <form>
                                <div className="form-row">
                                    <div className="col form-group">
                                        <label>First name</label>
                                        <input type="text" onChange={handleChange("firstname")} value={values.firstname} className="form-control" placeholder="Enter First Name" />
                                    </div>
                                    <div className="col form-group">
                                        <label>Last name</label>
                                        <input type="text" onChange={handleChange("lastname")} value={values.lastname} className="form-control" placeholder="Enter Last Name" />
                                    </div> 
                                </div> 
                                <div className="form-group">
                                    <label>Mobile</label>
                                    <input type="number" onChange={handleChange("mobile")} value={values.mobile} className="form-control" placeholder="Enter Mobile" />
                                    <small className="form-text text-muted">We'll never share your mobile with anyone else.</small>
                                </div> 
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>State</label>
                                        <select id="inputState" value={values.state} className="form-control" onChange={(e) => stateHandler(e, "state")}>
                                            <option> Choose...</option>
                                                {
                                                    states().map((s, i) =>{
                                                        return <option key={i}>{s.state}</option>
                                                    })
                                                }
                                        </select>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>City</label>
                                        <select id="inputCity" value={values.city} onChange={handleChange("city")} className="form-control">
                                            {   
                                                isStateSelected ? 
                                                    cities.map((s, i) =>{
                                                        return <option key={i}>{s.name}</option>
                                                }) : <option> Choose...</option>
                                            }
                                        </select>
                                    </div>
                                </div> 
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Create password</label>
                                        <input className="form-control" value={values.password} onChange={handleChange("password")} type="password" />
                                    </div> 
                                    <div className="form-group col-md-6">
                                        <label>Repeat password</label>
                                        <input className="form-control" value={values.repeatPassword} onChange={handleChange("repeatPassword")} type="password" />
                                    </div> 
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
                                        <button type="submit" onClick={onSubmit} className="btn btn-primary btn-block"> Register  </button>  
                                    }
                                </div>    
                            </form>
                    </article>
                </div> 
                <p className="text-center mt-4">Have an account? <Link to="/signin">Sign In</Link></p>
                            
            </section>)
    }

    if(didRedirect){
        return <Redirect to="/" />
    }
    
    return (
        <>
            <ToastContainer />
           {registration()}
           {otpVarification()}
        </>
    )
}

export default Signup