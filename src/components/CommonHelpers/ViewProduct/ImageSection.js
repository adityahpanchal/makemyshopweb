import { useState } from "react"
import { Link } from "react-router-dom"
import { API } from "../../../Backend"

const ImageSection = ({imageArr}) =>{
    
    const [index, setIndex] = useState(0)

    return(
        <aside className="col-md-6">
            <div className="card">
                <article className="gallery-wrap"> 
                    <div className="img-big-wrap">
                        <div> 
                            <Link ><div style={{height: '50vh', padding: 20}}><img alt="w" style={{objectFit: 'contain', height: 300}} src={`${API}/seller/docs/${imageArr[index]}`} /></div></Link>
                        </div>
                    </div>
                    <div className="thumbs-wrap">
                        {
                            imageArr.map((url, i) =>{
                                return <Link onClick={() => setIndex(i)} className="item-thumb"> <img alt="s" src={`${API}/seller/docs/${url}`} /></Link>
                            })
                        }
                    </div> 
                </article> 
                {/* <a href={`${API}/seller/docs/${url}`} target="_blank" rel="noreferrer" className="item-thumb"> <img alt="s" src={`${API}/seller/docs/${url}`} /></a> */}
            </div>
        </aside>
    )
}

export default ImageSection