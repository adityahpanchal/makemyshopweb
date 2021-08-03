import { useState } from "react"

const ProductFour = ({index, setIndex, createProduct, files, setFiles, modalType, updateProduct}) =>{
    
    const [err, setError] = useState(false) 
    const [replace, setReplace] = useState(false)
   
    const nxtbtnwithupdate = () =>{
        if(Object.keys(files).length === 0){
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 2000)
        }else{
            // setData(files)
            updateProduct('updateImage')
        }
    } 
    
    const nxtbtn = () =>{
        if(Object.keys(files).length === 0){
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 2000)
        }else{
            // setData(files)
            createProduct()
        }
    } 

    const nxtbtnwithoutupdate = () =>{
        if(Object.keys(files).length === 0){
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 2000)
        }else{
            // setData(files)
            updateProduct('noUpdateImage')
        }
    }   

    const getRandomInt = (max) =>{
        return Math.floor(Math.random() * Math.floor(max))
    }

    return index === 4 ? (
        <>
            {
                modalType === 'update' &&
                <div class="form-group">
                    {
                        err && 
                        <div className="pb-3"> 
                            <span className="alert alert-danger">Add atleast one file</span>
                        </div>
                    }
                    <div className="row pb-3">
                        {!replace && <button onClick={() => nxtbtnwithoutupdate()} className="btn btn-secondary mx-3">Skip Update Image And Save</button>}
                        {!replace && <button className="btn btn-primary" onClick={() => setReplace(true)}>Update Image</button>}
                    </div>
                    {
                        replace &&
                        <>
                        <div className="pb-3">
                            <h5>Images</h5>
                            <input id={getRandomInt(1223455)} name={getRandomInt(1223455)} type="file" accept="image/jpeg" multiple/>
                        </div>
                        </>
                    }
                    <div class="modal-footer pb-0">
                            <button type="button" onClick={() => nxtbtnwithupdate()} class="btn btn-secondary">Add</button>
                            <button type="button" onClick={() => {
                                if(replace){
                                    setReplace(false)
                                }else{
                                    setIndex(3)
                                }
                            }} class="btn btn-primary">Back</button>
                        </div>
                </div>
            }
            {
                modalType === 'insert' &&
                <div class="form-group">
                    {
                        err && 
                        <div className="pb-3"> 
                            <span className="alert alert-danger">Add atleast one file</span>
                        </div>
                    }
                    <div className="pb-3">
                        <h5>Add Images</h5>
                        <input type="file" onChange={(e) => setFiles(e.target.files)} accept="image/jpeg" multiple/>
                    </div>
                    <div class="modal-footer pb-0">
                            <button type="button" onClick={nxtbtn} class="btn btn-secondary">Add</button>
                            <button type="button" onClick={() => setIndex(3)} class="btn btn-primary">Back</button>
                        </div>
                </div>
            }
        </>
    ) :
    <></>
}

export default ProductFours