// import { Link } from "react-router-dom"
import { API } from "../../../Backend"

const Card = ({data, icon, title, atr, hrc, type, fields}) =>{

    return(
        <div className="col-md-3">
            <article className="card card-body">
                <figure className="text-center">
                    <img src={icon} alt="" class="img-md  rounded-circle"></img>
                    <br></br>

                    <span className={`rounded-circle icon-sm bg-${data.isVerified === "true" ? 'success': data.isVerified === 'pending' ? 'warning' : 'danger'} mt-2`}><i className={`fa fa-${data.isVerified === "true" ? 'user-check': data.isVerified === "pending" ? 'user-clock' : 'times-circle'} white`}></i></span>
                    <br></br>

                    <button type="button" class={`btn btn-${data.isVerified === "true" ? 'success': data.isVerified === "pending" ? 'warning' : 'danger'} mt-2`}>{data.isVerified === "true" ? 'status: Verified': data.isVerified === 'pending' ? 'status: Pending' : 'status: Rejected'}</button>
                    <br></br>

                    <div className="my-3 ">
                        <button type="button" onClick={(e) => hrc("true", type)} class="btn btn-outline-success">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name={title} id={atr} value="true" onChange={(e) => hrc("true", type)} checked={fields[type] === "true" ? true : false}/>
                                <label class="form-check-label" htmlFor={atr}>
                                    Verify
                                </label>
                            </div>
                        </button>
                        <button type="button" onClick={(e) => hrc('reject', type)} class="mx-3 btn btn-outline-danger">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name={title} id={`${atr}1`} value="reject" onChange={(e) => hrc(e.target.value, type)} checked={fields[type] === 'reject' ? true : false}/>
                                <label class="form-check-label" htmlFor={`${atr}1`}>
                                    Reject 
                                </label>
                            </div>
                        </button>
                        <br></br>
                        <br></br>

                        {data.url && <a href={`${API}/seller/docs/${data.url}`} target="_blank" rel="noreferrer" class="btn btn-md btn-outline-primary">View</a>}
                    </div>
                    
                    <figcaption className="pt-4">
                        <h5 className="title">{title}</h5>
                    </figcaption>
                </figure> 
            </article> 
        </div>
    )
}

export default Card