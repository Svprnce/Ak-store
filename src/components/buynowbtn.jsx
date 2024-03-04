const Buynowbtn = ()=>{

    const handlebuynow=()=>{
        console.log('product confirmed');
    }

    return(
        <>
         <button type="button" className="btn btn-primary btn-sm rounded" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Buy Now
            </button>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Confirmation</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Do you confirm your order ? 
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>handlebuynow()} >Yes, confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Buynowbtn