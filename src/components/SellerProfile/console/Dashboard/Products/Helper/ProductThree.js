import { useEffect, useState } from "react"

const ProductThree = ({index, setIndex, setData, modalType, dataForUpdate}) =>{
    
    //common
    const [isMultiType, setIsMultiType] = useState(false)
    const [hasSubType, sethasSubType] = useState(false)

    //for single
    const [stock, setStock] = useState({stock: '50', price: '8999', mrp: '9999'})

    //for mutli no sub *
    const [newVariation, setnewVariation] = useState({
        key: '',
        value: '',
        mrp: '',
        price: ''
    })
    const [arr, setArr] = useState([])
    const [tval, settval] = useState({key: '', value: '', mrp: '', price: ''})

    //for sub and multi
    const [newV, setnewN] = useState({
        name: '',
        tSubName: '',
        tSubStock: '',
        tSubMRP: '',
        tSubPrice: '',
        confirmed: false,
        arr: []
    })
    const [existedErr, setExistedErr] = useState({isErr: true, err: ''})
    const [subvArray, setSubVArray] = useState({})
    const [largeSubArr, setLargeSubArr] = useState([]) 
    const [changeV, setChangeV] = useState({
        subvr: '',
        stck: '',
        umrp: '',
        uprice: ''
    })
    /////

    useEffect(() =>{
        if(modalType === 'update'){
            if(dataForUpdate.isSingleVariant === true){
                let singlevarobj = {stock: dataForUpdate.stock, price: dataForUpdate.price, mrp: dataForUpdate.mrp}
                setStock(singlevarobj)
                setIsMultiType(false)
            }

            if(dataForUpdate.isMultiVariant === true){
                setIsMultiType(true)
                setArr(dataForUpdate.multiVariantStock)
            }

            if(dataForUpdate.isSubVariant === true){
                setIsMultiType(true)
                sethasSubType(true)
                setSubVArray(dataForUpdate.subVariantStock)

                let tempobj = dataForUpdate.subVariantStock
                let mutlidimentionalarr = Object.values(tempobj)
                let largearrr = [].concat.apply([], mutlidimentionalarr)
                setLargeSubArr(largearrr)
            }
        }
    }, [modalType, dataForUpdate])

    const singleType = () =>{
        console.log(stock)
        const nxtbtn = () =>{
            if(parseInt(stock.price) > parseInt(stock.mrp)){
                setExistedErr({isErr: true, err: 'Price should be less than mrp'})
                setTimeout(() => {
                    setExistedErr({isErr: false, err: ''})
                }, 800)
                return
            }
            if(isNaN(stock.stock) || isNaN(stock.price) || stock.stock === "" || stock.price === ''){
                setExistedErr({isErr: true, err: 'please fill all inputs'})
                setTimeout(() => {
                    setExistedErr({isErr: false, err: ''})
                }, 800)
                return
                
            }else{
                setData({
                    type: 0,
                    data: stock
                })
                setIndex(4)
            }
        }

        // const test = () =>{
        //     console.log(!isNaN(stock))
        //     if(isNaN(stock.stock) || isNaN(stock.price) || stock.stock === "" || stock.price === ''){
        //         setError(true)
        //         setTimeout(() => {
        //             setError(false)
        //         }, 2000)
        //     }else{
        //         setData({
        //             type: 0,
        //             data: stock
        //         })
        //         console.log(({
        //             type: 0,
        //             data: stock
        //         }))
        //     }
        // }

        return(
            <>
                {existedErr.isErr && <p style={{fontSize: 16, textAlign:'center', color: 'red'}}>{existedErr.err}</p>}
                <div className="my-3">
                    <label>Stocks</label>
                    <input type="number" onChange={(e) => setStock({...stock, stock: e.target.value})} value={stock.stock} className="form-control col-3"/>
                </div>
                <div className="my-3">
                    <label>MRP</label>
                    <input type="number" onChange={(e) => setStock({...stock, mrp: e.target.value})} value={stock.mrp} className="form-control col-3"/>
                </div>
                <div className="my-3">
                    <label>Price</label>
                    <input type="number" onChange={(e) => setStock({...stock, price: e.target.value})} value={stock.price} className="form-control col-3"/>
                </div>
                <div class="modal-footer pb-0">
                {/* <button type="button" onClick={() => test()} class="btn btn-secondary">Next</button> */}
                    <button type="button" onClick={() => nxtbtn()} class="btn btn-secondary">Next</button>
                    <button type="button" onClick={() => setIndex(2)} class="btn btn-primary">Back</button>
                </div>
            </>
        )
    }

    const multiType = () =>{

        // const test = () =>{
        //     if(arr.length === 0){
        //         setError(true)
        //         setTimeout(() => {
        //             setError(false)
        //         }, 2000)
        //     }else{
        //         setData({
        //             type: 1,
        //             data: arr
        //         })
        //       console.log({
        //         type: 1,
        //         data: arr
        //     })
        //     }
        // }

        const nxtbtn = () =>{
            if(arr.length === 0){
                setExistedErr({isErr: true, err: 'please add stocks'})
                setTimeout(() => {
                    setExistedErr({isErr: false, err: ''})
                }, 800)
            }else{
                setData({
                    type: 1,
                    data: arr
                })
                setIndex(4)
            }
        }

        const deleteVariation = (id) =>{
            const newArr = arr.filter((val) => val.id !== id)
            setArr(newArr)
        }
        console.log(newVariation)
        const addVariation = () =>{
            const {key, value, mrp, price} = newVariation
            if(!key || !value || !mrp || !price){
                return
            }
            if(arr.filter(x => x.key === key).length !== 0){
                setExistedErr({isErr: true, err: 'This Variant is already exists'})
                setTimeout(() => {
                    setExistedErr({isErr: false, err: ''})
                }, 800)
                return
            }
            if(parseInt(price) > parseInt(mrp)){
                setExistedErr({isErr: true, err: 'price should be less than mrp'})
                setTimeout(() => {
                    setExistedErr({isErr: false, err: ''})
                }, 800)
                return
            }
            const newVar = {...newVariation, id: `${new Date()}`}
            setArr([...arr, newVar])
            setnewVariation({key: '', value: '', mrp: '', price: ''})
        }

        const edit = (id) =>{
            let newArr = arr.map((x) =>{
                if(x.id === id){
                    x.isEditing = true
                    settval({key: x.key, value: x.value, mrp: x.mrp, price: x.price})
                    return x
                }else{
                    x.isEditing = false
                    return x
                }
            })
            setArr(newArr)
        }

        const cancelEdit = () =>{
            let newArr = arr.map((x) => {
                x.isEditing = false
                return x
            })
            settval({key: '', value: '', mrp: '', price: ''})
            setArr(newArr)
        }

        const saveEdit = (id) =>{
            if(tval.key === '' || tval.value === '' || tval.mrp === '' || tval.price === ''){
                setExistedErr({isErr: true, err: 'Please fill all inputs'})
                setTimeout(() => {
                    setExistedErr({isErr: false, err: ''})
                }, 800)
                return
            }
            if(parseInt(tval.price) > parseInt(tval.mrp)){
                setExistedErr({isErr: true, err: 'Price should be less than mrp'})
                setTimeout(() => {
                    setExistedErr({isErr: false, err: ''})
                }, 800)
                return
            }
            let newArr = arr.map((x) => {
                if(x.id === id){
                    x.isEditing = false
                    x.key = tval.key
                    x.value = tval.value
                    x.mrp = tval.mrp
                    x.price = tval.price
                    return x
                }else{
                    return x
                }
            })
            settval({key: '', value: '', mrp: '', price: ''})
            setArr(newArr)
        }

        return(
            <>
               <div className="mt-3">
                    {arr.length === 0 && <p style={{fontSize: 16, textAlign:'center'}}>No variation added</p>}
                    {existedErr.isErr && <p style={{fontSize: 16, textAlign:'center', color: 'red'}}>{existedErr.err}</p>}
                    <table class="table col-9 mx-auto">
                        <thead>
                            {arr && arr.map((row) =>
                                row.isEditing ? 
                                <tr>
                                    <td><input className="form-control" type="text" onChange={(e) => settval({...tval, key: e.target.value.toUpperCase()})} value={tval.key} /></td>
                                    <td><input className="form-control" type="number" onChange={(e) => settval({...tval, value: e.target.value})} value={tval.value}/></td>
                                    <td><input className="form-control" type="number" onChange={(e) => settval({...tval, mrp: e.target.value})} value={tval.mrp}/></td>
                                    <td><input className="form-control" type="number" onChange={(e) => settval({...tval, price: e.target.value})} value={tval.price}/></td>
                                    <td><i onClick={() => saveEdit(row.id)} className="p-1 bg-success white fas fa-check"></i></td>
                                    <td><i onClick={() => cancelEdit(row.id)} className="p-1 bg-primary white fas fa-times"></i></td>
                                </tr> : 
                                <tr>
                                    <td>{row.key}</td>
                                    <td>{row.value}</td>
                                    <td>MRP: {row.mrp}</td>
                                    <td>Price: {row.price}</td>
                                    <td><i onClick={() => edit(row.id)} className="p-1 bg-info white fas fa-pen"></i></td>
                                    <td><i onClick={() => deleteVariation(row.id)} className="p-1 bg-danger white fas fa-minus"></i></td>
                                </tr> 
                            )}
                        </thead>
                    </table>        
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <label>Variation Name</label>
                        <input type="text" class="form-control" onChange={(e) => setnewVariation({...newVariation, key: e.target.value.toUpperCase()})} value={newVariation.key} placeholder="key" />
                    </div>
                    <div className="col">
                        <label>Variation Stock</label>
                        <input class="form-control" type="number" onChange={(e) => setnewVariation({...newVariation, value: e.target.value})} value={newVariation.value} placeholder="Value" />
                    </div>
                    <div className="col">
                        <label>Variation MRP</label>
                        <input class="form-control" type="number" onChange={(e) => setnewVariation({...newVariation, mrp: e.target.value})} value={newVariation.mrp} placeholder="MRP" />
                    </div>
                    <div className="col">
                        <label>Variation price</label>
                        <input class="form-control" type="number" onChange={(e) => setnewVariation({...newVariation, price: e.target.value})} value={newVariation.price} placeholder="Price" />
                    </div>
                    <div className="col">
                        <label>Add</label>
                        <br></br>
                        <button className="btn btn-primary" onClick={addVariation}><i className="fas fa-plus"></i></button>
                    </div>
                </div> 
                <div class="modal-footer pb-0">
                {/* <button type="button" onClick={() => test()} class="btn btn-secondary">test</button> */}
                    <button type="button" onClick={() => nxtbtn()} class="btn btn-secondary">Next</button>
                    <button type="button" onClick={() => setIndex(2)} class="btn btn-primary">Back</button>
                </div>
            </>
        )
    }

    const multiTypewithSub = () =>{

        // const test = () =>{
        //         if(Object.keys(subvArray).length === 0 || largeSubArr.length === 0){
        //             setError(true)
        //             setTimeout(() => {
        //                 setError(false)
        //             }, 2000)
        //         }else{
        //             let sendObj = {}
    
        //             for (const key in subvArray) {
        //                 if(subvArray[key].length !== 0){
        //                     sendObj[key] = subvArray[key]
        //                 }
        //             }
    
        //             setData({
        //                 type: 2,
        //                 data: sendObj
        //             })
        //             console.log({
        //                 type: 2,
        //                 data: sendObj
        //             })
        //         }
        // }

        const nxtbtn = () =>{
            if(Object.keys(subvArray).length === 0 || largeSubArr.length === 0){
                setExistedErr({isErr: true, err: 'please add stocks'})
                setTimeout(() => {
                    setExistedErr({isErr: false, err: ''})
                }, 800)
            }else{
                let sendObj = {}
    
                for (const key in subvArray) {
                    if(subvArray[key].length !== 0){
                        sendObj[key] = subvArray[key]
                    }
                }

                setData({
                    type: 2,
                    data: sendObj
                })
                setIndex(4)
            }
        }

        const confirmKey = () =>{
            if(newV.name === ""){
                setExistedErr({isErr: true, err: 'Please Fill Name'})
                setTimeout(() => {
                    setExistedErr({isErr: false, err: ''})
                }, 800)
                return
            }
            if(subvArray[newV.name] === undefined || subvArray[newV.name].length === 0){
                setnewN({...newV, confirmed: true})
            }
            if(subvArray[newV.name] !== undefined){
                setnewN({...newV, confirmed: true, exists: true})                
            }
        }

        const addSubVariant = () =>{
            if(!newV.tSubName || !newV.tSubStock || !newV.tSubMRP || !newV.tSubPrice){
                setExistedErr({isErr: true, err: 'Please Fill all inputs'})
                setTimeout(() => {
                    setExistedErr({isErr: false, err: ''})
                }, 800)
                return
            }
            if(parseInt(newV.tSubMRP) < parseInt(newV.tSubPrice)){
                setExistedErr({isErr: true, err: 'Price should be less than mrp'})
                setTimeout(() => {
                    setExistedErr({isErr: false, err: ''})
                }, 800)
                return
            }
            if(newV.exists){
                const data = {
                    id: new Date(),
                    subVariant: newV.tSubName,
                    stock: newV.tSubStock,
                    mrp: newV.tSubMRP,
                    price: newV.tSubPrice,
                    variant: newV.name
                }
                let validator = largeSubArr.filter((v) => v.subVariant === newV.tSubName && v.variant === newV.name).length
                if(validator > 0){
                    setExistedErr({isErr: true, err: 'this record already exists'})
                    setTimeout(() => {
                        setExistedErr({isErr: false, err: ''})
                    }, 800)
                    return
                }
                setSubVArray({...subvArray, [newV.name]: [...subvArray[newV.name], data]})
                setLargeSubArr([...largeSubArr, data])
                setnewN({...newV, arr: [], tSubName: '', tSubStock: '', tSubMRP: '', tSubPrice: ''})
            }else{
                const data = {
                    id: new Date(),
                    subVariant: newV.tSubName,
                    stock: newV.tSubStock,
                    mrp: newV.tSubMRP,
                    price: newV.tSubPrice,
                    variant: newV.name
                }
                let validator = newV.arr.filter((v) => v.subVariant === newV.tSubName && v.variant === newV.name).length
                if(validator > 0){
                    setExistedErr({isErr: true, err: 'this record already exists'})
                    setTimeout(() => {
                        setExistedErr({isErr: false, err: ''})
                    }, 800)
                    return
                }
                setnewN({...newV, arr: [...newV.arr, data], tSubName: '', tSubStock: '', tSubMRP: '', tSubPrice: ''})
            }
        }

        const addsVariant = () =>{
            if(!newV.exists){
                setLargeSubArr([...largeSubArr, ...newV.arr])
                setSubVArray({...subvArray, [newV.name]: newV.arr})
            }
            setnewN({...newV, name: '', tSubName: '', tSubStock: '', tSubMRP: '', tSubPrice: '', confirmed: false, arr: [], exists: false})
        }

        const edit = (id) =>{
            const newArr = largeSubArr.map((r) => {
                if(r.id === id){
                    setChangeV({subvr: r.subVariant, stck: r.stock, umrp: r.mrp, uprice: r.price})
                    r.isEdit = true
                    return r
                }else{
                    r.isEdit = false
                    return r
                }
            })
            setLargeSubArr(newArr)
        }
    
        const cancelEdit = () =>{
            setChangeV({
                subvr: '',
                stck: '',
                umrp: '',
                uprice: ''
            })
            const newArr = largeSubArr.map((r) => {
                r.isEdit = false
                return r
            })
            setLargeSubArr(newArr)
        }
    
        const deleteV = (id, variant) =>{
            const arr = subvArray[variant].filter(x => x.id !== id)
            setSubVArray({...subvArray, [variant]: arr})
    
            const aarr2 = largeSubArr.filter(x => x.id !== id)
            setLargeSubArr(aarr2)
        }
    
        const saveEdit = (id, variant) =>{
            if(changeV.subvr === '' || changeV.stck === '' || changeV.umrp === '' || changeV.uprice === ''){
                setExistedErr({isErr: true, err: 'Please Fill all inputs'})
                setTimeout(() => {
                    setExistedErr({isErr: false, err: ''})
                }, 800)
                return
            }
            if(parseInt(changeV.uprice) > parseInt(changeV.umrp)){
                setExistedErr({isErr: true, err: 'price should be less than mrp'})
                setTimeout(() => {
                    setExistedErr({isErr: false, err: ''})
                }, 800)
                return
            }
            const arr = subvArray[variant].map(x => {
                if(x.id === id){
                        x.subVariant = changeV.subvr
                        x.stock = changeV.stck
                        x.mrp = changeV.umrp
                        x.price = changeV.uprice
                    return x
                }
                return x
            })
            setSubVArray({...subvArray, [variant]: arr})
    
            const aarr2 = largeSubArr.filter(x => {
                if(x.id === id){
                        x.subVariant = changeV.subvr
                        x.stock = changeV.stck
                        x.mrp = changeV.umrp
                        x.price = changeV.uprice
                        x.isEdit = false
                    return x
                }
                return x
            })
            setLargeSubArr(aarr2)
        }

        return(
            <div className="mt-3">
                {existedErr.isErr && <p style={{fontSize: 16, textAlign:'center', color: 'red'}}>{existedErr.err}</p>}
                {
                    !newV.confirmed &&
                    <div className="row">
                        <div className="col-3">
                            <label>Variation Name</label>
                            <input  onChange={(e) => setnewN({...newV, name: e.target.value.toUpperCase()})} type="text" className="form-control" value={newV.name}/>
                        </div>
                        <div>
                            <label>confirm</label>
                            <br></br>
                            <button className="btn btn-primary" onClick={confirmKey}><i className="fas fa-check"></i></button>
                        </div>
                    </div>
                }

                {
                    newV.confirmed &&
                    <>
                        <div className="mt-3">
                            {newV.arr.length === 0 && <p style={{fontSize: 16, textAlign:'center'}}>{newV.exists ? 't will add in existing variant!' : 'No sub variant added'}</p>}
                            <table class="table col-9 mx-auto">
                                <thead>
                                    {newV.arr && newV.arr.map((row) =>
                                        <tr>
                                            <td>{row.subVariant}</td>
                                            <td>{row.stock}</td>
                                            <td>{row.mrp}</td>
                                            <td>{row.price}</td>
                                            <td><i onClick={() => {
                                                let newArr = newV.arr.filter((x) => x.id !== row.id)
                                                setnewN({...newV, arr: newArr})
                                            }} className="p-1 bg-primary white fas fa-minus"></i></td>
                                        </tr>   
                                    )}
                                </thead>
                            </table>        
                        </div>
                        <div className="row mt-3">
                            <p className="mt-3 mr-3">Variant: {newV.name}</p>
                            <div className="col">
                                <label>Sub variant</label>
                                <input type="text" onChange={(e) => setnewN({...newV, tSubName: e.target.value.toUpperCase()})} value={newV.tSubName} className="form-control"/>
                            </div>
                            <div className="col">
                                <label>stock</label>
                                <input type="number" onChange={(e) => setnewN({...newV, tSubStock: e.target.value})} value={newV.tSubStock} className="form-control"/>
                            </div>
                            <div className="col">
                                <label>MRP</label>
                                <input type="number" onChange={(e) => setnewN({...newV, tSubMRP: e.target.value})} value={newV.tSubMRP} className="form-control"/>
                            </div>
                            <div className="col">
                                <label>Price</label>
                                <input type="number" onChange={(e) => setnewN({...newV, tSubPrice: e.target.value})} value={newV.tSubPrice} className="form-control"/>
                            </div>
                            <div className="ml-3">
                                <label>Add</label>
                                <br></br>
                                <button onClick={addSubVariant} className="btn btn-primary"><i className="fas fa-plus"></i></button>
                            </div>
                            <div className="ml-3">
                                <label>save and add new variant</label>
                                <br></br>
                                <button onClick={addsVariant} className="btn btn-success"><i className="fas fa-plus"></i> Save</button>
                            </div>
                        </div> 
                    </>
                }
                <div className="mt-3">
                    <table class="table col-9 mx-auto">
                        <thead>
                        
                            {
                            largeSubArr.map((row) => {
                                return row.isEdit ? <tr>
                                <td>{row.variant}</td>
                                <td><input onChange={(e) => setChangeV({...changeV, subvr: e.target.value.toUpperCase()})} value={changeV.subvr} className="form-control col-9"/></td>
                                <td><input onChange={(e) => setChangeV({...changeV, stck: e.target.value})} value={changeV.stck} className="form-control col-9"/></td>
                                <td><input onChange={(e) => setChangeV({...changeV, umrp: e.target.value})} value={changeV.umrp} className="form-control col-9"/></td>
                                <td><input onChange={(e) => setChangeV({...changeV, uprice: e.target.value})} value={changeV.uprice} className="form-control col-9"/></td>
                                <td><i className="fas fa-check white bg-success p-1"  onClick={() => saveEdit(row.id, row.variant)}></i></td>    
                                <td><i className="fas fa-times white bg-primary p-1"  onClick={() => cancelEdit()}></i></td>    
                            </tr> : <tr>
                                        <td>{row.variant}</td>
                                        <td>{row.subVariant}</td>
                                        <td>{row.stock}</td>
                                        <td>{row.mrp}</td>
                                        <td>{row.price}</td>
                                        <td><i className="fas fa-pen white bg-primary p-1" onClick={() => edit(row.id)}></i></td>
                                        <td><i className="fas fa-times white bg-danger p-1" onClick={() => deleteV(row.id, row.variant)}></i></td>    
                                    </tr>
                            })  
                            }
                        </thead>
                    </table>
                </div>
                <div class="modal-footer pb-0">
                {/* <button type="button" onClick={() => test()} class="btn btn-secondary">test</button> */}
                    <button type="button" onClick={() => nxtbtn()} class="btn btn-secondary">Next</button>
                    <button type="button" onClick={() => setIndex(2)} class="btn btn-primary">Back</button>
                </div>
            </div>
        )
    }

    return index === 3 ?  (
        <>
            <div className="ml-1 mt-1">
                <label>Do you product have multiple variant?</label>
                <div class="form-check">
                    <button onClick={() => setIsMultiType(!isMultiType)} className={`btn rounded-circle btn-icon btn-${isMultiType ? 'danger' : 'success'} mr-3`}><i class={`fa fa-${isMultiType ? 'times' : 'check'}`}></i></button>
                    <label class="form-check-label" checked={isMultiType} for="exampleCheck1">{isMultiType ? 'no' : 'yes'}</label>
                </div>
                {!isMultiType && singleType(setIndex)}
                
                {isMultiType &&
                    <div className="my-3">
                        <label>Do you product have sub variant?</label>
                        <div class="form-check">
                            <button onClick={() => sethasSubType(!hasSubType)} className={`btn rounded-circle btn-icon btn-${hasSubType ? 'danger' : 'success'} mr-3`}><i class={`fa fa-${hasSubType ? 'times' : 'check'}`}></i></button>
                            <label class="form-check-label" checked={hasSubType} for="exampleCheck1">{hasSubType ? 'no' : 'yes'}</label>
                        </div>
                    </div>
                }

                {isMultiType && !hasSubType && multiType()}
                {isMultiType && hasSubType && multiTypewithSub()}
            </div>
        </>
    ) 
    :  
    <></>
}

export default ProductThree