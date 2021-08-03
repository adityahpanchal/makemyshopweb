const SpecificationSection = ({specificationArr}) =>{
    return(
        <div className="col-md-6 card p-3">
            <h5 className="title-description">Specifications</h5>
                <table className=" my-3 table table-bordered">
                    {
                        specificationArr.length === 0 && 
                        <tr> 
                            <td>No specification added</td> 
                        </tr>
                    }
                    {
                        specificationArr.length !== 0 && specificationArr.map((spec) => {
                            return(
                                <tr> 
                                    <td>{spec.key}</td> <td className="text-black">{spec.value}</td> 
                                </tr>
                            )
                        })
                    }
                </table>
        </div>
    )
}

export default SpecificationSection