import React, { useEffect, useState } from 'react'
import Loader from 'react-loader-spinner'
import { useSelector } from 'react-redux'
import { API } from '../../../../Backend'
import Card from './Card'

const SellerRequest = (props) =>{

    const userState = useSelector(state => state.auth)
    const [loading, setLoading] = useState(true)
    const [list, setList] = useState([])

    const getEmptyName = () =>{
        if(props.location.pathname === '/admin/new/seller/request'){
            return 'New request not found'
        }else if(props.location.pathname === '/admin/resubmited/seller/request'){
            return 'Resubmitted request not found'
        }else if(props.location.pathname === '/admin/completed/seller/request'){
            return 'Completed requests not found'
        }else if(props.location.pathname === '/admin/active/sellers'){
            return 'Active Sellers not found'
        }
    }

    useEffect(() => {
        setLoading(true)
        
        const getPath = () =>{
            if(props.location.pathname === '/admin/new/seller/request'){
                return '0'
            }else if(props.location.pathname === '/admin/resubmited/seller/request'){
                return '1'
            }else if(props.location.pathname === '/admin/completed/seller/request'){
                return '2'
            }else if(props.location.pathname === '/admin/active/sellers'){
                return '3'
            }
        }
        
        fetch(`${API}/admin/get/list/seller/${getPath()}/${userState.user._id}`, {
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
                console.log(data.list)
                setList(data.list)
                setTimeout(() => {
                    setLoading(false)
                }, 10)
            }
        }).catch((err) =>{
            console.log(err)
        })
    }, [userState.token, userState.user._id, props.location.pathname])

    return (
        <div className="col-md-9">
            {
                loading &&
                 (<div className="row">
                    <div className="mx-auto" style={{marginTop: 100}}>
                        <Loader type="Circles" color="#FF6A00"/>
                    </div>
                </div>)
            }
            {
                loading === false && (list.length !== 0 ? list.map((item, i) => 
                    <Card 
                        logo={item && item.userId && item.userId.businessId &&  item.userId.businessId.businessLogo.url} 
                        sellerName={`${item && item.userId && item.userId.firstname} ${item && item.userId && item.userId.lastname}`}
                        businessName={item && item.userId && item.userId.businessId.businessName}
                        userId={item.userId && item.userId._id}
                    />
                ) : 
                <div className="card">
                    <div className="card-body">
                        <h4 className="text-center">{getEmptyName()}</h4>
                    </div>
                </div>)
            }
        </div>
    )
}

export default SellerRequest