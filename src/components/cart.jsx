import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Buynowbtn from './buynowbtn';
import { removeproductinstate } from '../app/slices/productSlice';
import {useDispatch} from 'react-redux'
import { useEffect } from 'react';
import { fetchcarts, removecart } from '../../utils/fetch';
import { removecartinstate, setcartsinstate } from '../app/slices/userSlice';
import { handleremovecartinstate } from '../../utils/dispatch';

const Cart = () => {

    //const cartproduct = useSelector((state) => state.product.carts)
    const cartproduct = useSelector((state) => state.user.usercarts).flat()
    const dispatch  = useDispatch()

    useEffect(()=>{
        // console.log(cartproduct);
        // fetchcarts().then((res)=>{
        //     if(res.length !== 0){
        //         dispatch(setcartsinstate(res))
        //     }
        // })
    },[])


    const handleremovecart = (c,id)=>{ 
        handleremovecartinstate(dispatch,removecartinstate,c,id)
    }

    
    return (
        <div className="container p-2 ">
            <h3 className="text-primary">Cart</h3>
            {cartproduct?.length == 0 ? <div className="row">
                <div className="h4 text-center">No Products in Cart</div>
            </div> : <div className="row">
                {
                    cartproduct.map((c, i) => {
                        return (
                            <div key={i} className="col-lg-8 col-sm-12">
                                <div className="cart-product border border-light-subtle p-2 d-flex gap-5 mb-4 justify-content-between align-items-center mb-3">
                                    <div className="cart-product-img">
                                        <img src='https://rukminim2.flixcart.com/image/312/312/xif0q/dslr-camera/g/o/y/-original-imagvjzkzkpjqsay.jpeg?q=70' alt="" />
                                    </div>
                                    <div className="card-body">
                                        <Link to={`/product/${c.id}`}><h5 className="card-title mb-2">{c.product_name}</h5></Link>
                                        <p><span className="text-primary">Price</span> : {`$ ${c.price}`}</p>
                                        <Buynowbtn/>
                                        <div className="btn btn-primary btn-sm ms-2" onClick={()=>handleremovecart(c,c._id)}> remove</div>
                                    </div>
                                </div>

                            </div>
                        )
                    })
                }
            <div className="btn btn-success"><Link to='/checkout' className='text-white'>Checkout</Link></div>
            </div>}
        </div>
    )
}

export default Cart