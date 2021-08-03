import { useState } from "react"
import { useSelector } from "react-redux"
import { API } from "../../../Backend"
import {list, states} from '../../Assets/India'

const AddAddress = (props) =>{

    const userState = useSelector(state => state.auth)

    const [inputs, setInputs] = useState({
        fullname: 'Aditya Panchal',
        mobile: '8980445467',
        altMobile: '9824669296',
        houseNumberandBuilding: '41, Raykanagar Society',
        famousSpot: 'Shivam Gas Road',
        area: 'Chandlodia',
        city: 'Ahmedabad',
        state: 'Gujarat',
        pincode:'382481',
        type: 'Home'
    })
    const [err, setErr] = useState('')
    const [loading, setLoading] = useState(false)
    const [cities, setCities] = useState([])

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
        if(inputs.mobile.length !== 10){
            setLoading(false)
            setErr('Mobile should 10 Digits')
            return
        }
        if(inputs.altMobile.length !== 10){
            setLoading(false)
            setErr('Alternative mobile should 10 Digits')
            return
        }
        if(inputs.pincode.length !== 6){
            setLoading(false)
            setErr('Pincode should 6 Digits')
            return
        }
        fetch(`${API}/create/address/${userState.user._id}`, {
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
                    props.offAddress(false)
                    props.afterAddAddressFn(data.id)
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
        <div class="card mx-auto col-9 m-3">
            <article class="card-body">
                <div className="row">
                    <div className="col-6">
                        <header class="mb-4">
                            <h4 class="card-title">Add Address</h4>
                        </header>
                    </div>
                    {
                        props.isAddMode &&
                    <div className="col-6">
                        <button onClick={() => props.offAddressMode(false)} className="btn btn-primary float-right">cancel</button>
                    </div>
                    }
                </div>
                {
                    err !== '' && <h5 className="text-center text-danger my-3">{err}</h5>
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
                                    states().map(x => x.state).sort().map((state) => <option>{state}</option>)
                                }
                            </select>
                        </div>
                        <div class="col-3">
                            <select class="custom-select form-control" onChange={handleInput('city')}>
                                <option>select city</option>
                                {
                                    cities.map(x => <option>{x}</option>)
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
                                <input class="custom-control-input" onChange={handleInput('type')} type="radio" name="account_type" value="Home" />
                                <span class="custom-control-label"> Home </span>
                            </label>
                            <label class="custom-control custom-radio custom-control-inline">
                                <input class="custom-control-input" type="radio" onChange={handleInput('type')} name="account_type" value="Office"/>
                                <span class="custom-control-label"> Office </span>
                            </label>
                        </div>
                    </div>

                    <div class="form-row mb-2">
                        <div class="col-sm-9 offset-sm-3">
                            <button type="submit" onClick={submit} class="btn btn-primary">{loading ? 'Please wait' : 'Add'}</button>
                        </div>
                    </div>
                </form>
            </article> 
        </div>
        

        </>
    )
}

export default AddAddress