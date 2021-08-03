import { useEffect, useState } from "react"

const ProductTwo = ({index, setIndex, setData, modalType, dataForUpdate}) =>{

    const [arr, setArr] = useState([
        {id: 'Sat Apr 17 2021 11:58:45 GMT+0530 (India Standard Time)', key: 'Brand', value: 'Intact'},
        {id: 'Sat Apr 17 2021 11:54:45 GMT+0530 (India Standard Time)', key: 'Model', value: 'ABC123'}
    ])

    const [newSpec, setNewSpeci] = useState({
        key: '',
        value: ''
    })

    const reset = () =>{
        setNewSpeci({key: '', value: ''})
        setArr([])  
    }

    const deleteSpec = (id) =>{
        const newArr = arr.filter((val) => val.id !== id)
        setArr(newArr)
    }

    const addSpecification = () =>{
        const {key, value} = newSpec
        if(!key || !value){
            return
        }
        const newSpecification = {...newSpec, id: `${new Date()}`}
        setArr([...arr, newSpecification])
        setNewSpeci({key: '', value: ''})
    }

    const nextbtn = () =>{
        setIndex(3)
        setData(arr)
    }

    useEffect(() =>{
        if(modalType === 'update'){
            setArr(dataForUpdate.specifications)
        }
    }, [modalType, dataForUpdate])

    return index === 2 ? (
        <>
            <div className="mt-3">
                {arr.length === 0 && <p style={{fontSize: 16, textAlign:'center'}}>No speccification added</p>}
                <table class="table col-9 mx-auto">
                    <thead>
                        {arr && arr.map((row) =>
                            <tr>
                                <td>{row.key}</td>
                                <td>{row.value}</td>
                                <td><i onClick={() => deleteSpec(row.id)} className="p-1 bg-primary white fas fa-minus"></i></td>
                            </tr>   
                        )}
                    </thead>
                </table>        
            </div>
            <div className="row">
                <div className="col">
                    <label>Specification Key</label>
                    <input type="text" class="form-control" onChange={(e) => setNewSpeci({...newSpec, key: e.target.value})} value={newSpec.key} placeholder="key" />
                </div>
                <div className="col">
                    <label>Specification Value</label>
                    <input type="text" class="form-control"  onChange={(e) => setNewSpeci({...newSpec, value: e.target.value})} value={newSpec.value} placeholder="Value" />
                </div>
                <div className="col">
                    <label>Add</label>
                    <br></br>
                    <button className="btn btn-primary" onClick={addSpecification}><i className="fas fa-plus"></i></button>
                </div>
            </div>
            <br></br>
            <div class="modal-footer pb-0">
                    <button type="button" onClick={() => setIndex(1)} class="btn btn-primary">Back</button>
                    <button type="button" onClick={() => nextbtn()} class="btn btn-secondary">{arr.length === 0 ? 'skip' : 'next'}</button>
                    <button type="button" class="btn btn-info" onClick={reset} >Reset</button>
            </div>
        </>
    ) : <></>
}

export default ProductTwo