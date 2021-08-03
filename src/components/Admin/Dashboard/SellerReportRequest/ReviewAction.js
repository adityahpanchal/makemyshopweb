import { useState } from "react"
import { useSelector } from "react-redux"
import { API } from "../../../../Backend"

const ReviewAction = (props) =>{

    const [text, setText] = useState('')
    const [msg, setMsg] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const userState = useSelector(state => state.auth)

    const Unblock = () =>{
        setLoading(true)
        fetch(`${API}/unblock/seller/review/${props.match.params.sellerId}/${userState.user._id}/${props.match.params.reviewId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${userState.token}`
            },
            body: JSON.stringify({adminReply: text})
        }).then((response) =>{
            return response.json()
        }).then(async(data) =>{
            if(data.error){
                setLoading(false)
                console.log(data.error)
            }else{
                setLoading(false)
                props.history.push('/admin/seller/review')
            }
        }).catch((err) =>{
            console.log(err)
        })
    }

    const Reject = () =>{
        if(text === ""){
            setError(true)
            return
        }
        setLoading(true)
        fetch(`${API}/reject/seller/review/${props.match.params.sellerId}/${userState.user._id}/${props.match.params.reviewId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${userState.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({adminReply: text, msg: msg})
        }).then((response) =>{
            return response.json()
        }).then(async(data) =>{
            if(data.error){
                setLoading(false)
                console.log(data.error)
            }else{
                setLoading(false)
                props.history.push('/admin/seller/review')
            }
        }).catch((err) =>{
            console.log(err)
        })
    }

    const RejectYVala = () =>{
        if(text === ""){
            setError(true)
            return
        }
        if(msg === ''){
            setError(true)
            return
        }
        setLoading(true)
        fetch(`${API}/rejectyvala/seller/review/${props.match.params.sellerId}/${userState.user._id}/${props.match.params.reviewId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${userState.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({adminReply: text, msg: msg})
        }).then((response) =>{
            return response.json()
        }).then(async(data) =>{
            if(data.error){
                setLoading(false)
                console.log(data.error)
            }else{
                setLoading(false)
                props.history.push('/admin/seller/review')
            }
        }).catch((err) =>{
            console.log(err)
        })
    }


    return(
        <div className="card col-9">
            <div className="col-6 mx-auto my-5">
                <textarea className={`form-control border border-${error ? 'danger' : 'info'}`} onChange={(e) => {setText(e.target.value); setError(false)}} placeholder="Write a Admin Reply" value={text}></textarea>
                {props.match.params.isMsg === 'y' && <textarea className={`form-control mt-3 border border-${error ? 'danger' : 'info'}`} onChange={(e) => {setMsg(e.target.value); setError(false)}} placeholder="Write a message" value={msg}></textarea>}
                {props.match.params.isMsg === 'n' && <button onClick={Reject} className="btn btn-outline-danger mt-3 mx-3">{loading ? 'Wait a sec' : 'Reject'}</button>}
                
                {props.match.params.isMsg === 'y' && <button onClick={RejectYVala} className="btn btn-outline-danger mt-3 mx-3">{loading ? 'Wait a sec' : 'Reject'}</button>}
                <button onClick={Unblock} className="btn btn-outline-warning mt-3">{loading ? 'Wait a sec' : 'Unblock'}</button>
            </div>
        </div>
    )
}

export default ReviewAction