import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { API } from "../../../Backend"

const UpdatePassword = (props) =>{

    let userState = useSelector(state => state.auth)

    const [inputs, setInputs] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    })
    const [err, setErr] = useState('')
    const [loading, setLoading] = useState(false)

    const handleInput = name => event =>{
        setInputs({...inputs, [name]: event.target.value})
        setErr('')
    }

    const update = (e) =>{
        setLoading(true)
        e.preventDefault()
        if(inputs.currentPassword === "" || inputs.newPassword === "" || inputs.confirmNewPassword === ""){
            setErr('all fields are required')
            setLoading(false)
            return
        }
        if(inputs.currentPassword === inputs.newPassword){
            setErr('New password is should not same as current password')
            setLoading(false)
            return
        }
        if(inputs.newPassword !== inputs.confirmNewPassword){
            console.log(inputs.newPassword, inputs.confirmNewPassword)
            setErr('new password and confirm password not match')
            setLoading(false)
            return
        }
        fetch(`${API}/update/password/${userState.user._id}`, {
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
    
    return(
        <main className="col-md-9">
            <div className="card">
                
                <h4 className="my-3 mx-5">Update Paasword</h4>
                <div className="card-body">
                    {
                        err !== '' && <h4 className="text-center text-danger py-3">{err}</h4>
                    }
                    <form className="row">
     	                <div className="col-md-12">
     		                <div className="form-row">
                                <div className="col-4 form-group">
                                    <label>New Paasword</label>
                                    <input type="text" className="form-control" onChange={handleInput('newPassword')} value={inputs.newPassword} />
                                </div> 
			                </div> 
                            <div className="form-row">
                                <div className="col-4 form-group">
                                    <label>Confirm New Password</label>
                                    <input type="text" className="form-control" onChange={handleInput('confirmNewPassword')} value={inputs.confirmNewPassword} />
                                </div> 
			                </div>
                            <div className="form-row">
                                <div className="col-4 form-group">
                                    <label>Current Password</label>
                                    <input type="text" className="form-control" onChange={handleInput('currentPassword')} value={inputs.currentPassword} />
                                </div> 
			                </div> 
                            <Link to="/profile/update/f/password">Forget Password?</Link>
                            <br></br>
                            <button onClick={update} className="btn btn-primary my-3">{loading ? 'wait...' : 'Change'}</button>
                            <br></br>
                            
     	                </div> 
     	            </form>
                </div> 
            </div> 
        </main> 
    )
}
export default UpdatePassword

