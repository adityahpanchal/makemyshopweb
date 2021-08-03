import { useState, useEffect} from "react"
import Loader from "react-loader-spinner"
import { useSelector } from "react-redux"
import { API } from "../../../Backend"
import {list, states} from '../../Assets/India'

const UpdateAddress = (props) =>{

    const userState = useSelector(state => state.auth)

    const [inputs, setInputs] = useState({})
    const [err, setErr] = useState('')
    const [loading, setLoading] = useState(false)
    const [loadingBig, setLoadingBig] = useState(true)
    const [cities, setCities] = useState([])
   
    useEffect(() =>{
        fetch(`${API}/address/${userState.user._id}/${props.match.params.id}`, {
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
                if(data.address){
                    let cityOfStates = list.filter(x => x.state === data.address.state).map(x => x.name)
                    // setLoading(false)
                    console.log(data.address)
                    setLoadingBig(false)
                    setInputs(data.address)
                    setCities(cityOfStates)
                }
            }
        }).catch((err) =>{
            console.log(err)
        })
    }, [props.match.params.id, userState.token, userState.user._id])

    const submit = (e) => {
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
        if(inputs.mobile.toString().length !== 10){
            setLoading(false)
            setErr('Mobile should 10 Digits')
            return
        }
        if(inputs.altMobile.toString().length !== 10){
            setLoading(false)
            setErr('Alternative mobile should 10 Digits')
            return
        }
        if(inputs.pincode.toString().length !== 6){
            setLoading(false)
            setErr('Pincode should 6 Digits')
            return
        }
        fetch(`${API}/update/address/${userState.user._id}/${props.match.params.id}`, {
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
                if(data.status === true){
                    setLoading(false)
                    setInputs({
                        fullname: '',
                        mobile: '',
                        altMobile: '',
                        houseNumberandBuilding: '',
                        famousSpot: '',
                        area: '',
                        city: '',
                        state: '',
                        pincode:'',
                        type: ''
                    })
                    props.history.push('/profile/myaddresses')
                }
            }
        }).catch((err) =>{
            console.log(err)
        })
    }

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

    return(
        <>
        <div style={{height: '100vh', width: '100vh', display: loadingBig ? '' : 'none'}} className="card mx-auto col-9">
            <div className="mx-auto my-auto">
                <Loader type="Circles" color="#FF6A00" height={75} width={75} visible={loadingBig} />
            </div>
        </div>
        <div style={{display: loadingBig ? 'none' : ''}} class="card mx-auto col-9">
            <article class="card-body">
                <header class="mb-4">
                    <h4 class="card-title">Add Address</h4>
                </header>
                {
                    err !== '' && <h1>{err}</h1>
                }
                <form class="block-register">
                    <div class="form-group form-row">
                        <label class="col-md-3 col-form-label">Full name</label>
                        <div class="col-6">
                            <input type="text" class="form-control" onChange={handleInput('fullname')} value={inputs.fullname} placeholder="Full name" />
                        </div>
                    </div>
                    <div class="form-group form-row">
                        <label class="col-md-3 col-form-label">Mobile</label>
                        <div class="col-6">
                            <div class="input-group">
                                <select class="custom-select" style={{maxWidth: 120}}>
                                    <option selected="">IND +91</option>
                                </select>
                                <input name="" onChange={handleInput('mobile')} value={inputs.mobile} class="form-control" placeholder="Phone number" type="number" />
                            </div>
                        </div>
                    </div>
                    <div class="form-group form-row">
                        <label class="col-md-3 col-form-label">Alternative Mobile</label>
                        <div class="col-6">
                            <div class="input-group">
                                <select class="custom-select"  style={{maxWidth: 120}}>
                                    <option selected="">IND +91</option>
                                </select>
                                <input name="" class="form-control" onChange={handleInput('altMobile')} value={inputs.altMobile} placeholder="Phone number" type="number" />
                            </div>
                        </div>
                    </div>
                    <div class="form-group form-row">
                        <label class="col-md-3 col-form-label">House no. and building</label>
                            <div class="col-sm-6">
                                <input type="text" onChange={handleInput('houseNumberandBuilding')} value={inputs.houseNumberandBuilding} class="form-control" placeholder="Enter Your House No. & Building Name" />
                            </div>
                    </div>
                    <div class="form-group form-row">
                        <label class="col-md-3 col-form-label">Nearest famous place</label>
                            <div class="col-sm-6">
                                <input type="text" class="form-control" onChange={handleInput('famousSpot')} value={inputs.famousSpot} placeholder="Enter Nearest famous place or street" />
                            </div>
                    </div>
                    <div class="form-group form-row">
                        <label class="col-md-3 col-form-label">Area</label>
                            <div class="col-sm-6">
                                <input type="text" onChange={handleInput('area')} class="form-control" value={inputs.area} placeholder="Area" />
                            </div>
                    </div>

                    <div class="form-group form-row">
                        <label class="col-md-3 col-form-label">State & City</label>
                        <div class="col-3">
                            <select class="custom-select form-control" onChange={handleInput('state')}>
                                <option>select state</option>
                                {
                                    states().map(x => x.state).sort().map((state) => <option selected={state === inputs.state}>{state}</option>)
                                }
                            </select>
                        </div>
                        <div class="col-3">
                            <select class="custom-select form-control" onChange={handleInput('city')}>
                                <option>select city</option>
                                {
                                    cities.map(x => <option selected={x === inputs.city}>{x}</option>)
                                }
                            </select>
                        </div>
                    </div>
                    <div class="form-group form-row">
                        <label class="col-md-3 col-form-label">Pincode</label>
                        <div class="col-3">
                            <input type="Number" class="form-control" onChange={handleInput('pincode')} value={inputs.pincode} placeholder="Picode" />
                        </div>
                    </div>
                    <div class="form-group form-row">
                        <label class="col-md-3 col-form-label"></label>
                        <div class="col-sm-9 pt-1">
                            <label class="custom-control custom-radio custom-control-inline">
                                <input class="custom-control-input" checked={inputs.type === 'Home'} onChange={handleInput('type')} type="radio" name="account_type" value="Home" />
                                <span class="custom-control-label"> Home </span>
                            </label>
                            <label class="custom-control custom-radio custom-control-inline">
                                <input class="custom-control-input" checked={inputs.type === 'Office'} type="radio" onChange={handleInput('type')} name="account_type" value="Office"/>
                                <span class="custom-control-label"> Office </span>
                            </label>
                        </div>
                    </div>

                    <div class="form-row mb-2">
                        <div class="col-sm-9 offset-sm-3">
                            <button type="submit" onClick={submit} class="btn btn-primary">{loading ? 'Please wait' : 'Save'}</button>
                        </div>
                    </div>
                </form>
            </article> 
        </div>
        

        </>
    )
}

export default UpdateAddress