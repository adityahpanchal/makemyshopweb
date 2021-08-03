import { useEffect, useState } from "react"
import Loader from "react-loader-spinner"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { API } from "../../../../Backend"

const ReviewCompleted = () =>{

    const userState = useSelector(state => state.auth)
    const [loading, setLoading] = useState(true)
    const [reportList, setReportList] = useState([])
    const [copy, setCopy] = useState([])

    const [id, setId] = useState('')
    const [radio, setRadio] = useState('')

    useEffect(() =>{
        setLoading(true)
        fetch(`${API}/get/all/completed/seller/review/${userState.user.businessId._id}/${userState.user._id}`, {
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
                console.log(data.reportList, 'sdfsdfsdfsdf')
            }
        }).catch((err) =>{
            console.log(err)
        })
    }, [])
    
    const handleSearch = (e) =>{
        setId(e.target.value)
        let searchVal = e.target.value
        if(searchVal === '' && radio === 'All'){
            setReportList(copy)
        }
        if(searchVal === '' && radio !== 'All'){
            let newArr = copy.filter(x => x.status === radio)
            setReportList(newArr)
        }
        if(searchVal !== '' && radio === 'All'){
            let newArr = copy.filter(x => x.sellerId._id == searchVal)
            setReportList(newArr)
        }
        if(searchVal !== '' && radio !== 'All'){
            let newArr = copy.filter(x => x.sellerId._id == searchVal && x.status === radio)
            setReportList(newArr)
        }
    }

    const handleRadio = (e) =>{
        setRadio(e.target.value)
        let radioVal = e.target.value
        if(id === '' && radioVal === 'All'){
            setReportList(copy)
        }
        if(id === '' && radioVal !== 'All'){
            let newArr = copy.filter(x => x.status === radioVal)
            setReportList(newArr)
        }
        if(id !== '' && radioVal === 'All'){
            let newArr = copy.filter(x => x.sellerId._id == id)
            setReportList(newArr)
        }
        if(id !== '' && radioVal !== 'All'){
            let newArr = copy.filter(x => x.sellerId._id == id && x.status === radioVal)
            setReportList(newArr)
        }
    }

    return(
        <div className="card col-9">
            {
                !loading &&
                <div className="mt-5 mx-3 row col-12">
                   <div className="col-12">
                        <label>Search</label>
                        <input type="text" placeholder="Seller ID" onChange={handleSearch} className="form-control col-4 border border-info"/>
                   </div>
                   <div className="col-12 mt-3 mx-1 row">
                        <div class="form-check mr-3">
                            <input class="form-check-input" onChange={handleRadio} type="radio" value="All" name="4thhet" id="flexRadiofghhhDefault1" />
                            <label class="form-check-label" for="flexRadiofghhhDefault1">
                                All
                            </label>
                        </div>
                        <div class="form-check mr-3">
                            <input class="form-check-input" onChange={handleRadio} type="radio" value="Approved" name="4thhet" id="flegfggxRadioDefault2" />
                            <label class="form-check-label" for="flegfggxRadioDefault2">
                                Approved
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" onChange={handleRadio} type="radio" value="Rejected" name="4thhet" id="flexRadfdsfdioDefault1" />
                            <label class="form-check-label" for="flexRadfdsfdioDefault1">
                                Rejected
                            </label>
                        </div>
                   </div>
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
                                            <h4 className="pt-3 px-3">{x.sellerId.businessName}  <h6>({`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}, Time: ${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}`})</h6></h4>
                                            <p className="px-3">ID: {x.sellerId._id}</p>
                                                <p style={{fontSize: 16}} className="pt-1 px-3">Seller Review: {x.sellerText}</p>
                                                <p style={{fontSize: 16}} className="pt-1 px-3">Admin Message: {x.adminMsgOfBlock}</p>
                                                <p style={{fontSize: 16}} className="pt-1 px-3">Admin Reply: {x.adminReply}</p>
                                                <button className="btn btn-light border border-info mx-3 mb-3">Seller Account Status: {x.sellerId.deactivationStatus}</button>
                                                <button className="btn btn-light border border-info mx-3 mb-3">Action By Admin: {x.status}</button>
                                                <div className="row mb-3 mt-1 mx-3">
                                                    <Link to={`/shop/${x.sellerId._id}`} target="_blank" className="btn btn-outline-primary mr-1 ">View</Link>
                                                    <Link to={`/admin/review/action/${x.sellerId._id}/${x._id}/y`} className="btn btn-outline-info mr-1">Take Action</Link>
                                    
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

export default ReviewCompleted