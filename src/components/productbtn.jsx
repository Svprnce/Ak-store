import { useDispatch, useSelector } from 'react-redux'
import { addtocartinstate } from "../app/slices/productSlice";
import Buynowbtn from './buynowbtn';
import { setcartsinstate } from "../app/slices/userSlice"
import { handleaddcartinstate } from '../../utils/dispatch';
import { Link } from 'react-router-dom';

const Productbtn = ({ data}) => {

    const dispatch = useDispatch()
    const usercarts = useSelector((store) => store.user.usercarts)
    const islogged = useSelector((store) => store.user.islogged)

    const handlecart = (c) => {
        const isexist = usercarts.find((product)=>product._id == c._id)

        if(isexist == undefined){
            handleaddcartinstate(dispatch,setcartsinstate,c,c._id)
        }
    }
    return (
        islogged ? <div className="d-flex align-items-center justify-content-between btn-group gap-2 ">
        <button type="button" onClick={() => handlecart(data)} className="btn btn-success rounded btn-sm"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
        </svg></button>
        <Buynowbtn/>
        
    </div> : <Link to='/login'><div className="h4 btn btn-sm w-100 btn-success mt--3 text-white">Login to Buy</div></Link>
    )
}

export default Productbtn