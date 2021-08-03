import { useEffect, useState } from "react"
import Loader from "react-loader-spinner"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { API } from "../../../Backend"

const AddressCard = () =>{

    const userState = useSelector(state => state.auth)
    const [addresses, setAddresses] = useState([])
    const [loading, setLoading] = useState(true)

    const [isFirstLoadDone, setFirstLoadDone] = useState(false)
    const [shouldReload, setShouldReload] = useState(false)

    const deleteAddress = (id) =>{
        setLoading(true)
        fetch(`${API}/delete/address/${userState.user._id}/${id}`, {
            method: "DELETE",
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
                if(data.status){
                    setLoading(false)
                    setShouldReload(true)
                }
            }
        }).catch((err) =>{
            console.log(err)
        })
    }

    const makeDefault = (id) =>{
        setLoading(true)
        fetch(`${API}/address/makedefault/${userState.user._id}/${id}`, {
            method: "POST",
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
                if(data.status){
                    setLoading(false)
                    setShouldReload(true)
                }
            }
        }).catch((err) =>{
            console.log(err)
        })
    }

    useEffect(() =>{
        if(isFirstLoadDone === false){
            fetch(`${API}/all/address/${userState.user._id}`, {
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
                    if(data.allAddress){
                        let sortAddressDefault = data.allAddress.sort(value => {
                            return value.isDefault ? -1 : 1 
                          })
                        console.log(data.allAddress)
                        setLoading(false)
                        setAddresses(sortAddressDefault)
                        setFirstLoadDone(true)
                        setShouldReload(false)
                    }
                }
            }).catch((err) =>{
                console.log(err)
            })
        }

        if(shouldReload === true){
            fetch(`${API}/all/address/${userState.user._id}`, {
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
                    if(data.allAddress){
                        let sortAddressDefault = data.allAddress.sort(value => {
                            return value.isDefault ? -1 : 1 
                          })
                          
                        console.log(data.allAddress)
                        setLoading(false)
                        setAddresses(sortAddressDefault)
                        setFirstLoadDone(true)
                        setShouldReload(false)
                    }
                }
            }).catch((err) =>{
                console.log(err)
            })
        }
    }, [userState.token, userState.user._id, isFirstLoadDone, shouldReload])

    return(
        <>
            <div style={{height: '50vh', width: '100vh', display: loading ? '' : 'none'}} className="card mx-auto col-9">
                <div className="mx-auto my-auto">
                    <Loader type="Circles" color="#FF6A00" height={75} width={75} visible={loading} />
                </div>
            </div>
            {
                addresses.length !== 0 && addresses.map((addr) => {
                    return(
                        <div style={{display: loading ? 'none' : ''}} className="col-md-6 border-danger">
                            <article className="box mb-4">
                                <h6>{addr.fullname}</h6>
                                <p>{`Mobile: ${addr.mobile} || Alt Mobile: ${addr.altMobile}`}</p>
                                <p>{`${addr.houseNumberandBuilding}, ${addr.famousSpot},`} <br></br> {`${addr.area}, ${addr.city},`} <br></br> {`${addr.state}, ${addr.pincode} (${addr.type})`} </p>
                                
                                {addr.isDefault === false && <button to="/" onClick={() => makeDefault(addr._id)} className="btn btn-warning ml-3"> <i className="fa fa-check mr-3"></i>Make Default</button>}
                                {addr.isDefault && <button to="/" className="btn btn-success ml-3"> <i className="fa fa-check mr-3"></i>Default</button>}

                                <Link to={`/profile/myaddresses/update/${addr._id}`} className="btn btn-light ml-3"> <i className="fa fa-pen"></i> </Link> 
                                
                                <button className="btn btn-light ml-3" onClick={() => deleteAddress(addr._id)}> <i className="text-danger fa fa-trash"></i>  </button>
                            </article>
                        </div> 
                    )
                })
            }
            {
                addresses.length === 0 &&
                <div class="col card p-3">
                    <h3 className="text-center">Empty !</h3>
                </div>
            } 
        </>
    )
}

export default AddressCard