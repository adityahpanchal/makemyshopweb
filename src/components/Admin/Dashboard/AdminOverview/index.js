import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { API } from '../../../../Backend'
import Card from './Card'

const AdminOverview = () =>{

    const userState = useSelector(state => state.auth)
    const [countState, setCountState] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        setLoading(true)
        fetch(`${API}/count/admin/${userState.user._id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${userState.token}`
            }
        }).then((response) =>{
            return response.json()
        }).then((data) =>{
            if(data.error){
                console.log(data.error)
            }else{
                console.log(data)
                setTimeout(() => {
                    setCountState(data)
                    setLoading(false)
                }, 100)
            }
        }).catch((err) =>{
            console.log(err)
        })
    }, [userState.token, userState.user._id])

    return(
        <div className="col-md-9">
            <div className="card">
                <div className="card-body">
                    <div className="p-3">
                        <h4 className="text-center">Dashboard</h4>
                        <div className="row mt-5 ">
                            <Card title="Total Active User" loading={loading} count={countState.activeUserCount}/>
                            <Card title="Total User" loading={loading} count={countState.userCount}/>  
                            <Card title="New Seller Requests" loading={loading} count={countState.newSellerRequestCount}/>  
                            <Card title="Resubmitted Seller Request" loading={loading} count={countState.resubmitedSellerCount}/>  
                            <Card title="Completed Seller Request" loading={loading} count={countState.completedSellerCount}/>  
                            <Card title="Total Active Sellers" loading={loading} count={countState.activeSellerCount}/>  
                            <Card title="Total Categories" loading={loading} count={countState.categoryCount}/>  
                            <Card title="Total Sub Categories" loading={loading} count={countState.subCategoryCount}/>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminOverview