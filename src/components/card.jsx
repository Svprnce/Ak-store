import { useState, memo } from "react";
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import Buynowbtn from './buynowbtn'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Loginform } from "./login";
import { addcart } from "../../utils/fetch";
import { setcartsinstate } from "../app/slices/userSlice";

const Card = ({ c }) => {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch()
    const islogged = useSelector((store) => store.user.islogged)
    const usercarts = useSelector((store) => store.user.usercarts)

    const handlecart = (c,id) => {
        if (islogged) {
            const isexist = usercarts.find((product)=>product._id == id)
           
            if(isexist == undefined){
                addcart(id).then((res)=>{ 
                    dispatch(setcartsinstate(c))
                })
            }
        }
        else {
            handleShow()
        }
    }
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div key={c.id} className="col">
            <div className="card p-1">
                {c.image ? (<img src='https://rukminim2.flixcart.com/image/312/312/xif0q/dslr-camera/g/o/y/-original-imagvjzkzkpjqsay.jpeg?q=70' className="card-img-top img-thumbnail rounded" alt="..." />) : <Spinner />}
                <div className="card-body p-1">
                    <Link to={`/product/${c._id}`}><h5 className="card-title">{c.product_name ? c.product_name.substring(0, 45) : ''}</h5></Link>
                    <p className="card-text">{c.description ? c.description.substring(0, 130) : ''}</p>
                </div>
                <div className="d-flex align-items-center justify-content-between btn-group gap-2 mb-2 ">
                    <div ><p className="m-auto">{`$${c.price}`}</p></div>
                    {/* <Buynowbtn /> */}
                    <div className="btn btn-primary btn-sm rounded-1"><Link to={`/buy/${c._id}`} className="text-light">Buy Now</Link></div>
                    <button type="button" onClick={() => { handlecart(c,c._id) }} className="btn btn-success btn-sm rounded-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                    </svg></button>
                </div>
            </div>
            <>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>You Need to Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><Loginform close={handleClose}/></Modal.Body>
                    {/* <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer> */}
                </Modal>
            </>
        </div>
    )
}

export default memo(Card)