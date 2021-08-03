import Loader from "react-loader-spinner"

const Card = (props) =>{
    return(
        <div className="col-md-4 ">
            <div className="card text-center my-3 border border-danger border-top-0 ">
                <div className="card-header" style={{backgroundColor: '#bf2e0a'}}>
                    <h6 className="text-white text-center">{props.title}</h6>
                </div>
                <div className="card-body">
                    {
                        props.loading ? <div className="mx-auto"><Loader type="Circles" color="#FF6A00"/></div> :
                        <h5 className="card-title text-center">{props.count}</h5>
                    }
                </div>
            </div>  
        </div>
    )
}

export default Card
