import { Link } from "react-router-dom"

const Pagenotfound = ()=>{
    return (
        <div className="container text-center my-5">
            <div className="h2 my-5">Page Not Found</div>
            <div className="btn btn-success text-center"><Link to='/' className="text-white">Back to Homepage</Link></div>
        </div>
    )
}

export default Pagenotfound