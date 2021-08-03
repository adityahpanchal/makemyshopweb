import { useState } from "react"
import { useSelector } from "react-redux"
import { API } from "../../../../Backend"

const BlockSeller = (props) =>{

    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const userState = useSelector(state => state.auth)

    const blockSeller = () =>{
        if(text === ""){
            setError(true)
            return
        }
        setLoading(true)
        fetch(`${API}/block/seller/report/${userState.user._id}/${props.match.params.sellerId}/${props.match.params.reportId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${userState.token}`
            },
            body: JSON.stringify({msg: text, status: props.match.params.status, reset: props.match.params.reset, onlyWarn: false, prevStatus: props.match.params.status})
        }).then((response) =>{
            return response.json()
        }).then(async(data) =>{
            if(data.error){
                setLoading(false)
                console.log(data.error)
            }else{
                setLoading(false)
                props.history.push('/admin/reported/sellers/request')
            }
        }).catch((err) =>{
            console.log(err)
        })
    }

    const onlyWarning = () =>{
        if(text === ""){
            setError(true)
            return
        }
        setLoading(true)
        fetch(`${API}/block/seller/report/${userState.user._id}/${props.match.params.sellerId}/${props.match.params.reportId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${userState.token}`
            },
            body: JSON.stringify({msg: text, status: props.match.params.status, reset: props.match.params.reset, onlyWarn: true, prevStatus: props.match.params.status})
        }).then((response) =>{
            return response.json()
        }).then(async(data) =>{
            if(data.error){
                setLoading(false)
                console.log(data.error)
            }else{
                setLoading(false)
                props.history.push('/admin/reported/sellers/request')
            }
        }).catch((err) =>{
            console.log(err)
        })
    }

    return(
        <div className="card col-9">
            <div className="col-6 mx-auto my-5">
                <textarea className={`form-control border border-${error ? 'danger' : 'info'}`} onChange={(e) => {setText(e.target.value); setError(false)}} placeholder="Write a message" value={text}></textarea>
                <button onClick={blockSeller} className="btn btn-outline-danger mt-3 mx-3">{loading ? 'Wait a sec' : 'Block Seller'}</button>
                <button onClick={onlyWarning} className="btn btn-outline-warning mt-3">{loading ? 'Wait a sec' : 'Warn Seller'}</button>
            </div>
        </div>
    )
}

export default BlockSeller