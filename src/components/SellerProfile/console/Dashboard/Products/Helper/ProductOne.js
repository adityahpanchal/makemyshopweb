import { useEffect, useState } from "react"
import Select from "react-select"

const ProductOne = ({index, setIndex, setData, subcategories, categories, modalType, dataForUpdate}) =>{

    const [val, setval] = useState({value: 'no', label: 'choose...'})
    const [val1, setval1] = useState({value: 'no', label: 'choose...'})

    const [details, setDetails] = useState({
        productName: 'Intact Multipurpose Study/Office Table Engineered Wood Study Table  (Free Standing, Finish Color - Brown, Frosty White)',
        category: '607a7e5785f53c6738abf5a6',
        subCategory: '607a7ea185f53c6738abf5a7',
        maxQauntity: '5',
        dCharge: '150',
        description: 'Expand the storage capabilities of your workspace with this budget-friendly desk, perfect for any home office or study. Its clean-lined Particle Board frame is understated enough to work in both classic and contemporary settings, As you get to work on its flat top and can be usable for ironing and much more'
    })
    const [err, setError] = useState(false) 

    const { productName, maxQauntity, dCharge, description } = details
    const [subcate, setsubcate] = useState([{value: 'no', label: 'choose...'}])
    console.log(details)
    const handleSelect = (id) =>{
        setDetails({...details, category: id})
        let arr = subcategories.filter(x => x.categoryId === id).map((x) =>{
            const obj = {
                label: x.subCategory,
                value: x._id
            }
            return obj
        })
        arr.unshift({value: 'no', label: 'choose...'})
        setsubcate(arr)
        setval1({value: 'no', label: 'choose...'})
        setDetails({...details, subCategory: 'no', category: id})
    }

    const nextbtn = () =>{
        let validate = Object.values(details).filter(x => x !== 'category' || "subCategory").every((x) => x !== '')

        console.log(details, Object.values(details).filter(x => x !== 'category' || "subCategory"))
        if(validate && details.category !== 'no' && details.subCategory !== 'no'){
            setIndex(2)
            setData(details)
        }
        else{
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 2000)
        }
    } 

    useEffect(() =>{
        if(modalType === 'update'){
            console.log(dataForUpdate, 'dataforupdate')
            let obj= {
                productName: dataForUpdate.productName,
                category: dataForUpdate && dataForUpdate.category._id && dataForUpdate.category._id,
                subCategory: dataForUpdate && dataForUpdate.category._id && dataForUpdate.subCategory._id,
                maxQauntity: dataForUpdate.maxQauntity,
                dCharge: dataForUpdate.dCharge,
                description: dataForUpdate.description
            }

            setDetails(obj)

            let filterCategory = categories.filter((val) => {
                return val.value === dataForUpdate.category._id
            })[0]
            setval(filterCategory)
            // console.log(filterCategory)
            let filterSubCategory = subcategories.filter(x => x.categoryId === dataForUpdate.category._id).map((x) =>{
                const obj1 = {
                    label: x.subCategory,
                    value: x._id
                }
                return obj1
            })
            setsubcate(filterSubCategory)

            let subcateDefault = filterSubCategory.filter(x => x.value === dataForUpdate.subCategory._id)[0]
            setval1(subcateDefault)
            // console.log(subcateDefault, filterSubCategory)
        }
    }, [modalType, dataForUpdate, categories, subcategories])

    return (index === 1) ?
        (
        <div class="form-group">
            {
                err && 
                <div className="pb-3"> 
                    <span className="alert alert-danger">All fields are required</span>
                </div>
            }
            <div class="row">
                <div class="col-9">
                    <label className="ml-1">Product Name</label>
                    <input type="text" class="form-control" value={productName} onChange={(e) => setDetails({...details, productName: e.target.value})} placeholder="Product Name" />
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <label>Select Category</label>
                    <Select  onChange={(val) => {handleSelect(val.value); setval(val)}}  value={val} options={categories} />
                    {/* <Select  onChange={(val) => setDetails({...details, category: val.value})} defaultValue={{value: 'no', label: 'choose...'}} options={categories} /> */}
                </div>
                <div className="col">
                    <label>Select Sub Category</label>
                    <Select  onChange={(val) => {setDetails({...details, subCategory: val.value}); setval1(val)}} value={val1} options={subcate} />
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <label>Max qauntity to purchase</label>
                    <input type="number" class="form-control" value={maxQauntity} onChange={(e) => setDetails({...details, maxQauntity: e.target.value})} placeholder="max qauntity to purchase" />
                </div>
                <div className="col">
                    <label>Delivery Charge</label>
                    <input type="number" class="form-control" value={dCharge} onChange={(e) => setDetails({...details, dCharge: e.target.value})} placeholder="Delivery Charge" />
                </div>
            </div>
            <div className="row mt-3">
                <div class="col-9 form-group">
                    <label for="exampleFormControlTextarea1">Product Description</label>
                    <textarea class="form-control" value={description} onChange={(e) => setDetails({...details, description: e.target.value})} rows="3">{description}</textarea>
                </div>
            </div>
            <div class="modal-footer pb-0">
                <button type="button" onClick={() => nextbtn()} class="btn btn-secondary">Next</button>
                <button type="button" onClick={() => { setDetails({
                     productName: '',
                     category: '',
                     subCategory: '',
                     price: '',
                     mrp: '',
                     maxQauntity: '',
                     dCharge: '',
                     description: ''
                }); }} class="btn btn-info">Reset</button>
            </div>
        </div>    
    ) : <></>
}

export default ProductOne