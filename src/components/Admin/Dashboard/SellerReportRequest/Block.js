import { useState } from "react"
import { useSelector } from "react-redux"
import { API } from "../../../../Backend"

const Block = (props) =>{

    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [valid, setValid] = useState(false)
    const [data, setData] = useState(false)
    const [wait, setWait] = useState(false)
    const userState = useSelector(state => state.auth)

    const [radio, setRadio] = useState('')
    const [inputMsg, setInputMsg] = useState({
        warning: '',
        msg: ''
    })
    const [tempErr, setTempError] = useState('')

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

    const addBlock = () =>{
        if(inputMsg.msg === ''){
            setTempError('Please write block reason')
            return
        }
        
        setWait(true)
        fetch(`${API}/report/add/warning/block/n/y/${text}/${userState.user._id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${userState.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({msg: inputMsg.msg})
        }).then((response) =>{
            return response.json()
        }).then(async(data) =>{
            if(data.error){
                setWait(false)
                setText('')
                setData(false)
                console.log(data.error)

                setRadio('')
                setInputMsg({...inputMsg, msg: '', warning: ''})
            }else{
                setData(false)

                setWait(false)
                setText('')

                setRadio('')
                setInputMsg({...inputMsg, msg: '', warning: ''})
            }
        }).catch((err) =>{
            console.log(err)
        })
    }

    const addWarning = () =>{
        if(inputMsg.warning === ''){
            setTempError('Please write warning')
            return
        }
        
        setWait(true)
        fetch(`${API}/report/add/warning/block/y/n/${text}/${userState.user._id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${userState.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({warning: inputMsg.warning})
        }).then((response) =>{
            return response.json()
        }).then(async(data) =>{
            if(data.error){
                setWait(false)
                setData(false)

                setText('')
                console.log(data.error)

                setRadio('')
                setInputMsg({...inputMsg, msg: '', warning: ''})
            }else{
                setWait(false)
                setData(false)
                setText('')

                setRadio('')
                setInputMsg({...inputMsg, msg: '', warning: ''})
            }
        }).catch((err) =>{
            console.log(err)
        })
    }

    const both = () =>{
        if(inputMsg.warning === '' || inputMsg.msg === ''){
            setTempError('Please write warning and block reason')
            return
        }

        setWait(true)
        fetch(`${API}/report/add/warning/block/y/y/${text}/${userState.user._id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${userState.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({msg: inputMsg.msg, warning: inputMsg.warning})
        }).then((response) =>{
            return response.json()
        }).then(async(data) =>{
            if(data.error){
                setWait(false)
                setText('')
                setData(false)

                console.log(data.error)

                setRadio('')
                setInputMsg({...inputMsg, msg: '', warning: ''})
            }else{
                setData(false)

                setWait(false)
                setText('')

                setRadio('')
                setInputMsg({...inputMsg, msg: '', warning: ''})
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
                    <div className="my-3 p-3 border border-info">
                    <p className="h6 col-4">Current Status</p>
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
                        </>
                    }
                    </div>
                }
                
                {
                    data && !wait &&
                    <>
                    <div className="row">
                        <div class="form-check mx-3">
                            <input class="form-check-input" onChange={(e) => setRadio(e.target.value)} type="radio" name="flexRadioDefaulterd" value="both" id="flexRadidfgoDefault1" />
                            <label class="form-check-label" for="flexRadidfgoDefault1">
                                Add Both
                            </label>
                        </div>
                        <div class="form-check mx-3">
                            <input class="form-check-input" onChange={(e) => setRadio(e.target.value)} type="radio" name="flexRadioDefaulterd" value="warning" id="flexRadidfgdfgoDefault2"  />
                            <label class="form-check-label" for="flexRadidfgdfgoDefault2">
                                Add Only Warning
                            </label>
                        </div>
                        <div class="form-check mx-3">
                            <input class="form-check-input" onChange={(e) => setRadio(e.target.value)} type="radio" name="flexRadioDefaulterd" value="block" id="flexRadioDesdfgfault2"  />
                            <label class="form-check-label" for="flexRadioDesdfgfault2">
                                Only Block
                            </label>
                        </div>
                    </div>
                    <h6 className="text-center text-danger my-3">{tempErr}</h6>
                    {
                        (radio === 'warning' || radio === 'both') &&
                        <div className="mt-3">
                            <textarea className="form-control border border-info" onChange={(e) => {setInputMsg({...inputMsg, warning: e.target.value}); setTempError('')}} value={inputMsg.warning} placeholder="write warning"></textarea>
                        </div>
                    }
                    {
                        (radio === 'block' || radio === 'both') &&
                        <div className="mt-3">
                            <textarea className="form-control border border-info" onChange={(e) => {setInputMsg({...inputMsg, msg: e.target.value}); setTempError('')}} value={inputMsg.msg} placeholder="write block message"></textarea>
                        </div>
                    }
                    {radio === 'warning' && <button onClick={addWarning} className="btn btn-outline-primary mt-3 mr-3">Add Warning</button>}
                    {radio === 'block' && <button onClick={addBlock} className="btn btn-outline-primary mt-3 mr-3">Block Seller</button>}
                    {radio === 'both' &&  <button onClick={both} className="btn btn-outline-primary mt-3 mr-3">Add Warning  & Block Seller</button>}

                    </>
                }
            </div>   
        </div>
    )
}

export default Block