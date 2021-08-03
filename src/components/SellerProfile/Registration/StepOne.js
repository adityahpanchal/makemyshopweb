import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {states, list} from '../../Assets/India'
import { useState } from 'react'
import { sendOTP, otpVerification } from '../api'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../../redux'
import { API } from '../../../Backend'

const StepOne = (props) =>{
    
    const userState = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const [values, setValues] = useState({
        businessName: "Intact Furniture",
        businessMobile: "8980445467",
        addressLineOne: "41, SV Square, Balol Nagar Road",
        addressLineTwo: "New Ranip",
        city: "Ahmedabad",
        state: "Gujarat",
        pincode: "382470",
        loading: false,
        error: false,
        otpID: "",
        otp: "",
        didRedirect: false
      });

    const [cities, setCities] = useState([])
    const [isStateSelected, setIsStateSelected] = useState(false)
    const [isOtpSent, setIsOtpSent] = useState(false)

    const {businessName, businessMobile, addressLineOne, addressLineTwo, city, state, loading, error, otpID, otp, pincode} = values

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
        // console.log(values)
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
      
    const onSubmit = (event) =>{
        event.preventDefault()
        setValues({...values, loading: true, error: false})
        if(!businessName || !businessMobile || !addressLineOne || !addressLineTwo || !pincode){
            if(businessMobile.length !== 10){
                setValues({...values, error: "please enter valid mobile", loading: false})
                return
            }
            console.log(values)
            setValues({...values, error: "required all fields", loading: false})
            return
        }
        if(state === 'Choose...' || city === 'Choose...'){
            setValues({...values, error: "please select state and city", loading: false})
            return
        }
        console.log(businessMobile)
        sendOTP({mobile: businessMobile}, userState.token, userState.user._id).then((data) =>{
            if(data.error){
                setValues({...values, loading: false, error: data.error})
            }else{
                setValues({...values, loading: false, otpID: data.otpID})
                setIsOtpSent(true)
            }
        })
    }

    const verifyOTP = (event) =>{
        event.preventDefault()
        setValues({...values, loading: true, error: false})
        if(otp.length !== 6){
            setValues({...values, error: "please enter valid otp", loading: false})
        }
        const data = {
            userOTP:{
                otpID: otpID,
                otpNumber: otp
            },
            businessDetails: {
                businessName,
                businessAddress:{
                    addressLineOne,
                    addressLineTwo,
                    pincode,
                    city,
                    state
                }
            }
        }
        console.log(data)
        otpVerification(data, userState.token, userState.user._id).then(async(data) =>{
            if(data.error){ 
                setValues({...values, error: data.error, loading: false})
            }else{
                if(data.status === true){
                    const updatedUser = await getUser() 
                    dispatch(setUser(updatedUser, () =>{
                        props.history.push('/seller/documents/upload')
                    }))
                }
                // const updateUser = userState
                // updateUser.user.businessId = data.businessId
                // // dispatch(setUser(updateUser, () => {
                // //     setIsOtpSent(false)
                // //     setValues({...values, error: data.error})
                // // }))
                // console.log('ok')
            }
        })
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
                    <strong> +91 {businessMobile}</strong> <Link className="btn-link" to="/">Change</Link>
                </p>
                <br></br>
                <form className="px-10 mb-5 col-5 mx-auto">
                    <div className="form-group">
                        <input type="text" onChange={handleChange('otp')} autoFocus required className="form-control form-control-lg text-center" placeholder="* * * * * *" />
                    </div>
                    <button onClick={verifyOTP} type="submit" className="btn btn-block btn-primary col-7 mx-auto">Verify</button>
                </form>

                <p className="text-center"> <Link to="/" className="btn-link"> <i className="fa fa-redo"></i> Send again </Link></p>
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
                        <header className="mb-4"><h4 className="card-title">Become Seller</h4></header>
                        <form>
                                <div className="form-row">
                                    <div className="col form-group">
                                        <label>Business Name</label>
                                        <input type="text" onChange={handleChange("businessName")} className="form-control" placeholder="Enter First Name" value={businessName} />
                                    </div>
                                    <div className="col form-group">
                                        <label>Business Number</label>
                                        <input type="number" onChange={handleChange("businessMobile")} className="form-control" placeholder="Enter Mobile" value={businessMobile}/>
                                    </div> 
                                </div> 
                                <div className="form-group">
                                    <label>Business Address</label>
                                    <input type="text" onChange={handleChange("addressLineOne")} className="form-control" placeholder="Enter Address Line One" value={addressLineOne}/>
                                    <br></br>
                                    <input type="text" onChange={handleChange("addressLineTwo")} className="form-control" placeholder="Enter Address Line Two" value={addressLineTwo}/>
                                </div> 
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>State</label>
                                        <select value={values.state} id="inputState" className="form-control" onChange={(e) => stateHandler(e, "state")}>
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
                                        <select id="inputCity" onChange={handleChange("city")} className="form-control">
                                            {   
                                                isStateSelected ? 
                                                    cities.map((s, i) =>{
                                                        return <option>{s.name}</option>
                                                }) : <option> Choose...</option>
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Pincode</label>
                                        <input type="text" onChange={handleChange("pincode")} className="form-control" placeholder="Pincode" value={pincode}/>
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
            </section>)
    }

    return (
        <>
           {registration()}
           {otpVarification()}
        </>
    )
}

export default StepOne