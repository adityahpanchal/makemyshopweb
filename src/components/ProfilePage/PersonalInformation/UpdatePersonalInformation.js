import { useEffect, useState } from "react"
import Loader from "react-loader-spinner"
import { useDispatch, useSelector } from "react-redux"
import { API } from "../../../Backend"
import { setUser } from "../../../redux/auth/authActions"
import { list, states} from '../../Assets/India'

const UpdatePersonalInformation = (props) =>{

    let dispatch = useDispatch()
    let userState = useSelector(state => state.auth)

    const [inputs, setInputs] = useState({
        firstname: '',
        lastname: '',
        state: '',
        city: ''
    })
    const [cities, setCities] = useState([])
    const [err, setErr] = useState('')
    const [loadingBig, setLoadingBig] = useState(true)
    const [loading, setLoading] = useState(false)

    useEffect(() =>{
        if(userState.user){
            setLoadingBig(true)
            setInputs({
                firstname: userState.user.firstname,
                lastname: userState.user.lastname,
                state: userState.user.state,
                city: userState.user.city
            })
            let citiesOfState = list.filter(x => x.state === userState.user.state).map(x => x.name)
            setCities(citiesOfState)
            setLoadingBig(false)
        }
    }, [userState.user])

    const handleInput = name => event =>{
        setErr('')
        if(name === 'state'){
            let cityOfStates = list.filter(x => x.state === event.target.value).map(x => x.name)
            setCities(cityOfStates)
            setInputs({...inputs, [name]: event.target.value})
        }else{
            setInputs({...inputs, [name]: event.target.value})
        }
    }

    const update = (e) =>{
        setLoading(true)
        e.preventDefault()
        let validateBlank = Object.values(inputs).every(x => x !== '')
        if(!validateBlank){
            setLoading(false)
            setErr('Please Enter All Fields')
            return
        }
        if(inputs.state === 'select state'){
            setLoading(false)
            setErr('please select state')
            return
        }
        if(inputs.city === 'select city'){
            setLoading(false)
            setErr('please select city')
            return
        }
        fetch(`${API}/update/personal/details/${userState.user._id}`, {
            method: "PUT",
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
            }else{
                if(data.user){
                    
                    dispatch(setUser(data, () =>{
                        setLoading(false)
                        setInputs({
                            firstname: '',
                            lastname: '',
                            city: '',
                            state: ''
                        })
                        props.history.push('/profile')
                    }))
                }
            }
        }).catch((err) =>{
            console.log(err)
        })
    }
    
    return(
        <main className="col-md-9">
            <div className="card">
                
                <h4 className="my-3 mx-5">Update Personal Information</h4>
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
                                <div className="col form-group">
                                    <label>First Name</label>
                                    <input type="text" className="form-control" onChange={handleInput('firstname')} value={inputs.firstname} />
                                </div> 
                                <div className="col form-group">
                                    <label>Last Name</label>
                                    <input type="text" className="form-control" onChange={handleInput('lastname')} value={inputs.lastname} />
                                </div> 
			                </div> 
                            <div className="form-row">
                                <div className="col form-group">
                                    <label>State</label>
                                    <select onChange={handleInput('state')} className="form-control">
                                        <option>select state</option>
                                        {
                                            states().map(x => x.state).sort().map((state) => <option selected={state === inputs.state}>{state}</option>)
                                        }
                                    </select>
                                </div> 
                                <div className="col form-group">
                                    <label>City</label>
                                    <select onChange={handleInput('city')} className="form-control">
                                        <option>select city</option>
                                        {
                                            cities.map(x => <option selected={x === inputs.city}>{x}</option>)
                                        }
                                    </select>
                                </div>
			                </div>
                        
                            <button onClick={update} className="btn btn-primary my-3">{loading ? 'wait...' : 'Save'}</button>
                            <br></br>
                            
     	                </div> 
     	            </form>
                </div> 
            </div> 
        </main> 
    )
}
export default UpdatePersonalInformation

