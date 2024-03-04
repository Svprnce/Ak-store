import { useErrorBoundary } from "react-error-boundary";

const Somethingwentwrong = ()=>{
    const { resetBoundary } = useErrorBoundary();
    return(
        <>
        <div className="container text-center my-5">
            <div className="h3 text-danger">Something went Wrong</div>
            <div className="btn btn-danger btn-sm mt-4" onClick={resetBoundary}>Try Again</div>
        </div>
        </>
    )
}

export default Somethingwentwrong