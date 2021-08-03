import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { API } from "../../../Backend";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const ReportSeller = (props) =>{

    let query = useQuery()
    const [text,setText] = useState('')
    const userState = useSelector(state => state.auth)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const submit = () =>{

        if(text === ""){
            setError(true)
            return
        }
        setLoading(true)

        fetch(`${API}/add/seller/report/${userState.user._id}/${props.match.params.id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${userState.token}`
            },
            body: JSON.stringify({complain: text})
        }).then((response) =>{
            return response.json()
        }).then(async(data) =>{
            if(data.error){
                setLoading(false)
                console.log(data.error)
            }else{
                setLoading(false)
                props.history.goBack()
                alert(`Thank you for report (${query.get("sn")})`)
            }
        }).catch((err) =>{
            console.log(err)
        })
    }

    return(
        <div className="card col-9 my-5 mx-auto py-3">
            <div className="mx-auto">
                <h3>Report Seller ({query.get("sn")})</h3>
            </div>
            <hr></hr>
            <div className="col-6 mx-auto mt-3">
                <label className="label h6">Write something </label>
                <textarea onChange={(e) => {setText(e.target.value); setError(false)}} value={text} className={`form-control ${error ? 'border-danger' : ''}`}>{text}</textarea>
                <button onClick={submit} className="mx-auto mt-3 btn btn-primary">{loading ? 'Wait a sec' : 'Submit'}</button>
            </div>
        </div>
    )
}

export default ReportSeller