import { useState } from "react"
import { useSelector } from "react-redux"
import { API } from "../../../../Backend"

const Unblock = (props) =>{

    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [valid, setValid] = useState(false)
    const [data, setData] = useState(false)
    const [wait, setWait] = useState(false)
    const userState = useSelector(state => state.auth)

    const findSeller = () =>{
        if(text === ''){
            setError(true)
            return
        }
        setLoading(true)
        fetch(`${API}/shop/${text}`, {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        }).then((response) =>{
            return response.json()
        }).then(async(data) =>{
            if(data.error){
                setLoading(false)
                setValid(true)
                console.log(data.error)
            }else{
                setLoading(false)
                setData(data.sellerProfile)
                console.log(data.sellerProfile, 'data.sellerProfile')
            }
        }).catch((err) =>{
            console.log(err)
        })
    }

    const removeBlock = () =>{
        setWait(true)
        fetch(`${API}/report/remove/warning/block/n/y/${text}/${userState.user._id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${userState.token}`
            }
        }).then((response) =>{
            return response.json()
        }).then(async(data) =>{
            if(data.error){
                setWait(false)
                setText('')
                setData(false)
                console.log(data.error)
            }else{
                setData(false)

                setWait(false)
                setText('')
            }
        }).catch((err) =>{
            console.log(err)
        })
    }

    const removeWarning = () =>{
        setWait(true)
        fetch(`${API}/report/remove/warning/block/y/n/${text}/${userState.user._id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${userState.token}`
            }
        }).then((response) =>{
            return response.json()
        }).then(async(data) =>{
            if(data.error){
                setWait(false)
                setData(false)

                setText('')
                console.log(data.error)
            }else{
                setWait(false)
                setData(false)
                setText('')
            }
        }).catch((err) =>{
            console.log(err)
        })
    }

    const removeBoth = () =>{
        setWait(true)
        fetch(`${API}/report/remove/warning/block/y/y/${text}/${userState.user._id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${userState.token}`
            }
        }).then((response) =>{
            return response.json()
        }).then(async(data) =>{
            if(data.error){
                setWait(false)
                setText('')
                setData(false)

                console.log(data.error)
            }else{
                setData(false)

                setWait(false)
                setText('')
            }
        }).catch((err) =>{
            console.log(err)
        })
    }

    return(
        <div className="card col-9">
            <div className="col-6 mx-auto my-5">
                {valid && <h6 className="text-center text-danger">Seller ID is not valid</h6>}
                <input className={`form-control border border-${error ? 'danger' : 'info'}`} onChange={(e) => {setText(e.target.value); setError(false); setValid(false); setData(false)}} placeholder="Write a message" value={text}/>
                <button onClick={findSeller} className="btn btn-outline-info mt-3 ">{loading ? 'Wait a sec' : 'Find'}</button>
                <br></br>

                {
                    data &&
                    <>
                    <div className="row">
                        {
                            data.isDeactivated &&
                            <div className="mt-3 mx-5">
                                <label>Is Blocked</label>
                                <br></br>
                                <div class="icon icon-sm mx-3 bg-success rounded-circle white ">
                                    <i class="fas fa-check"></i>
                                </div>
                            </div>
                            
                        }
                        {
                            !data.isDeactivated &&
                            <div className="mt-3 mx-5">
                                <label>Is Blocked</label>
                                <br></br>
                                <div class="icon icon-sm mx-3 bg-danger rounded-circle white ">
                                    <i class="fas fa-times"></i>
                                </div>
                            </div>
                            
                        }
                            {
                            data.isWarning &&
                            <div className="mt-3 mx-5">
                                <label>Has Warning</label>
                                <br></br>
                                <div class="icon icon-sm mx-3 bg-success rounded-circle white ">
                                    <i class="fas fa-check"></i>
                                </div>
                            </div>
                            
                        }
                        {
                            !data.isWarning &&
                            <div className="mt-3 mx-5">
                                <label>Has Warning</label>
                                <br></br>
                                <div class="icon icon-sm mx-3 bg-danger rounded-circle white ">
                                    <i class="fas fa-times"></i>
                                </div>
                            </div>
                            
                        }
                    </div>
                    {
                        data.isWarning &&
                        <div className="card col-12 my-3 p-3">
                            <p style={{fontWeight: 'bold'}}>Current Warning:</p>
                            <p style={{fontSize: 17}} className="border border-danger p-3">{data.warning}</p>
                        </div>
                    }
                    {
                        data.isDeactivated &&
                        <div className="card col-12 my-3 p-3">
                            <p style={{fontWeight: 'bold'}}>Current Block Message:</p>
                            <p style={{fontSize: 17}} className="border border-danger p-3">{data.msg}</p>
                        </div>
                    }
                    { wait && <h6 className="text-info text-center mt-5">wait a second....</h6>}
                    { !wait && data.isDeactivated && !data.isWarning && <button onClick={removeBlock} className="btn btn-outline-primary mt-3">Remove Block</button>}
                    { !wait && !data.isDeactivated && data.isWarning && <button onClick={removeWarning} className="btn btn-outline-primary mt-3">Remove Warning</button>}
                    { !wait && data.isDeactivated && data.isWarning &&
                        <>
                            <button onClick={removeBlock} className="btn btn-outline-primary mt-3 mr-3">Remove Block</button>
                            <button onClick={removeWarning} className="btn btn-outline-primary mt-3 mr-3">Remove Warning</button>
                            <button onClick={removeBoth} className="btn btn-outline-primary mt-3">Remove Both</button>
                        </>
                    }
                    </>
                }
            </div>   
        </div>
    )
}

export default Unblock