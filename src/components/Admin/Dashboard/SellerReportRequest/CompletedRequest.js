import { useEffect, useState } from "react"
import Loader from "react-loader-spinner"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { API } from "../../../../Backend"

const CompletedRequest = () => {

    const userState = useSelector(state => state.auth)
    const [loading, setLoading] = useState(true)
    const [reportList, setReportList] = useState([])
    const [copy, setCopy] = useState([])

    useEffect(() =>{
        setLoading(true)
        fetch(`${API}/get/completed/seller/report/${userState.user._id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${userState.token}`
            }
        }).then((response) =>{
            return response.json()
        }).then(async(data) =>{
            if(data.error){
                setLoading(false)
                console.log(data.error)
            }else{
                setLoading(false)
                setReportList(data.reportList)
                setCopy(data.reportList)
            }
        }).catch((err) =>{
            console.log(err)
        })
    }, [userState.token, userState.user._id])
    
    const handleSearch = (e) =>{
        let id = e.target.value
        if(id === ''){
            setReportList(copy)
        }else{
            let newArr = copy.filter(x => x.sellerId._id == id)
            setReportList(newArr)
        }
    }

    return(
        <div className="card col-9">
            {
                !loading &&
                <div className="mt-5 mx-3">
                    <label>Search</label>
                    <input type="text" placeholder="Seller ID" onChange={handleSearch} className="form-control col-4 border border-info"/>
                </div>
            }       
            {
                loading &&
                <div className="row my-5">
                    <div className="mx-auto my-5">
                        <Loader type="Circles" color="#FF6A00"/>
                    </div>
                </div>
            }
            {
                !loading &&
                <div className="py-3 my-5 mx-3" style={{backgroundColor: '#cdcfca', minHeight: '60vh'}}>
                    
                    <div className="card m-3 ">
                        <div className="row">
                            {
                                reportList.length === 0 &&
                                <div className="col-12 py-3">
                                    <h3 className="text-center">0 Records Found</h3>
                                </div>
                            }
                            {
                                reportList.map(x =>{

                                    let date = new Date(x.updatedAt)
                                    
                                    return(
                                        <div className="col-6">
                                            <div className="border border-primary m-1">
                                                <h4 className="pt-3 px-3">{x.sellerId.businessName} <h6>({`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}, Time: ${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}`})</h6></h4>
                                                <p className="px-3">ID: {x.sellerId._id}</p>

                                                <p style={{fontSize: 16}} className="pt-1 px-3">User Complain: {x.complain}</p>
                                                <button className="btn btn-light border border-info mx-3 mb-3">Current seller status: {x.sellerId.deactivationStatus}</button>
            
                                                {
                                                    x.isBlocked && 
                                                    <>
                                                        <div className="row mb-3 mt-1 mx-3">
                                                            <button className="btn btn-light border border-info mr-1">Previous Status: {x.prevStatus}</button>
                                                            <button className="btn btn-outline-danger">Action type: Blocked Seller</button>
                                                        </div>
                                                        <p style={{fontSize: 16}} className="pt-1 px-3">Admin Message: {x.blockMsg}</p>
                                                    </>
                                                }
                                                {
                                                    !x.isBlocked && 
                                                    <>
                                                        <div className="row mb-3 mt-1 mx-3">
                                                            <button className="btn btn-light border border-info mr-1">Previous Status: {x.prevStatus}</button>
                                                            <button className="btn btn-outline-warning">Action type: Only Warning</button>
                                                        </div>
                                                        <p style={{fontSize: 16}} className="pt-1 px-3">Admin Message: {x.warningMsg}</p>
                                                    </>
                                                }

                                                <div className="row mb-3 mt-1 mx-3">
                                                    <Link to={`/shop/${x.sellerId._id}`} target="_blank" className="btn btn-outline-primary mr-1 ">View</Link>
                                                    <Link to={`/admin/block/seller/${x.sellerId._id}/${x._id}/${x.sellerId.deactivationStatus}/n`} className="btn btn-outline-info mr-1">Take Action</Link>
                                                </div>    
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default CompletedRequest