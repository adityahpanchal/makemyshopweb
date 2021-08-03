let arr = [
    {
        tId: 't1',
        sId: 's1',
        id: '1',
        pId: 'p1'
    },
    {
        tId: 't1',
        sId: 's2',
        id: '2',
        pId: 'p2'
    },
    {
        tId: 't1',
        sId: 's1',
        id: '3',
        pId: 'p3'
    },
    {
        tId: 't2',
        sId: 's3',
        id: '4',
        pId: 'p4'
    },
    {
        tId: 't2',
        sId: 's2',
        id: '5',
        pId: 'p5'
    },
    {
        tId: 't8',
        sId: 's9',
        id: '6',
        pId: 'p11'
    }
]

const OrderPage = () =>{
    return(
        <div className="card m-5 col-6">
            {
                arr.map(x => x.tId).filter((y, i, ar) => ar.indexOf(y) === i).map(tIdI =>{
                    let sellersByTid = arr.filter(x => {
                        return x.tId === tIdI
                    }).map(y => y.sId).filter(((zx, i2, ar2) => ar2.indexOf(zx) === i2))
                    return(
                        <div className="card p-3">
                            <h5>{tIdI}</h5>
                            {
                                sellersByTid.map(d => {
                                    let ordersBySellerId = arr.filter(rby =>{
                                        return rby.sId === d && rby.tId === tIdI
                                    })
                                    return(
                                        <div className="card p-3">
                                            <h5>{d}</h5>
                                            {
                                                ordersBySellerId.map(x =>{
                                                    return(
                                                        <h4>{x.pId}</h4>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default OrderPage