import { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux'
import { addcart, fetchaddress, fetchcarts, removecart, updateorder } from '../../utils/fetch';
import { setdeliveryaddressid, setorderidinstate, setpaymentidinstate, setproductsinstate, settotalamountinstate, settotalquantityinstate } from '../app/slices/orderSlice';
import { handleremovecartinstate } from '../../utils/dispatch';
import { removecartinstate, setcartsinstate } from '../app/slices/userSlice';
import { Link, useLocation } from 'react-router-dom'
import Paymentcomponent from './payment';
import { fetchproduct } from '../../utils/fetchproducts';

const Deliveryaddress = ({ handletabchange }) => {
    const [dbaddress, setdbaddress] = useState([])
    const dispath = useDispatch()
    useEffect(() => {
        fetchaddress().then((res) => {

            if (res) {
                setdbaddress(res)
                dispath(setdeliveryaddressid(res[1]?._id))
            }
        })

    }, [])

    const handleaddress = (e) => {

        dispath(setdeliveryaddressid(e))
    }
    return (
        <div className="container">
            <div className="h2 my-4 mx-0 text-primary">Select Your Delivery Address : </div>
            {dbaddress?.map((c, i) => {
                return (
                    <div className="form-check my-2" key={i}>
                        <input className="form-check-input" type="radio" name="flexRadioDefault" defaultChecked={i == 0 ? true : false} id="flexRadioDefault1" onClick={(e) => handleaddress(c._id)} />
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            <div className="container-fluid border p-2">
                                <div className="name d-flex justify-content-between">
                                    <div className="name_info d-flex">
                                        <p className=''>{c.name}</p>
                                        <p className=' border mx-2'>{c.type}</p>
                                        <p>+91 {c.ph}</p>
                                    </div>
                                    <button className='btn btn-outline-primary m-0 p-1'>Edit</button>
                                </div>
                                <div className="address my-2">
                                    <p>LandMark : {c.landmark}</p>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, necessitatibus.</p>
                                </div>
                                {/* <button className='btn btn-primary' onClick={(e)=>handletabchange(e)}>Delivery Here</button> */}
                            </div>
                        </label>

                    </div>
                )
            })}
            {/* <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked onClick={(e) => handleaddress(e)} />
                <label className="form-check-label" for="flexRadioDefault2">
                    <div className="container-fluid border p-2">
                        <div className="name d-flex justify-content-between">
                            <div className="name_info d-flex">
                                <p className=''>Prince</p>
                                <p className=' border mx-2'>Home</p>
                                <p>+91 7868081106</p>
                            </div>
                            <button className='btn btn-outline-primary m-0 p-1'>Edit</button>
                        </div>
                        <div className="address my-2">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, necessitatibus.</p>
                        </div>
                        <button className='btn btn-primary' onClick={(e)=>handletabchange(e)}>Delivery Here</button>
                    </div>
                </label>
            </div> */}
        </div>
    )
}

const Ordersummary = () => {

    const [carts, setcarts] = useState([])
    const [updatestate, setupdatestate] = useState(false)
    // const [ordersummary, setordersummary] = useState([])

    const cartsstate = useSelector((state) => state.user.usercarts).flat()
    // const location = useLocation()
    const dispatch = useDispatch()
    useEffect(() => {
        // let pathname = location.split('/')
        // console.log(pathname);
        // console.log('use effecr')
        fetchcarts().then((res) => {
            setcarts(res)
            setupdatestate(true)

        }).finally((res) => {

            setcarts(oldcart => oldcart.map(olditem => ({
                ...olditem,
                quantity: 1
            })))
        })

    }, [])

    useEffect(() => {
        handleconfirm()
    }, [updatestate])

    const handlequantity = (e, idx) => {

        const action = e.target.name.split(' ')[0]
        const cartid = e.target.name.split(' ')[1]

        let newCarts = [...carts];

        if (action == 'increase') {

            if (newCarts[idx].quantity === 50) {
                newCarts[idx].quantity = 50;
                setcarts(newCarts)
            }
            newCarts[idx].quantity += 1;

            setcarts(newCarts)

        }
        else {
            if (newCarts[idx].quantity === 1) {
                newCarts[idx].quantity = 2;
                setcarts(newCarts)
            }
            newCarts[idx].quantity -= 1;

            setcarts(newCarts)

        }
        handleconfirm()
    }

    const handleconfirm = () => {

        const mapcarts = carts?.map((c, i) => {
            return { 'productid': c._id, "quantity": c.quantity }
        })

        dispatch(setproductsinstate(mapcarts))

    }

    const handleremovecart = (c, id) => {
        handleremovecartinstate(dispatch, removecartinstate, c, id)
    }



    return (
        <div className="container-fluid ">
            <Row xs={1} md={2} className="row row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3">
                {cartsstate ? carts?.map((c, idx) => (
                    <Col key={idx} className='p-1'>
                        <Card style={{ height: '19rem', }} className='order_card_container'>
                            <div className="order_img">
                                <Card.Img className='order_product_img my-2' variant="top" src="https://rukminim2.flixcart.com/image/100/100/ky7lci80/mobile/e/j/x/-original-imagag2gatsxzcuv.jpeg?q=90" />
                            </div>
                            <div className="order_body">
                                <Card.Body>
                                    <Card.Title>{c.product_name}</Card.Title>
                                    <Card.Text>
                                        <div className='d-flex flex-column align-content-between align-content-sm-between gap-3'>

                                            <div>
                                                <div className="order_price">$ {c.price}</div>
                                                <div className="stock mt-1">Stock : {c.stock}</div>
                                                <div className="h6 mt-3">Increase Quatity</div>
                                                <div className="input-group">
                                                    <button className='btn border' name={`decrease ${c._id}`} onClick={(e) => handlequantity(e, idx)}>-</button>
                                                    {/* <input type="number" min="0" name="ff" id="ff"  onClick={(e=>handleinp(e.target.value))}/> */}
                                                    <input type="text" id="quantity" name={c._id} className="form-control input-number" value={c.quantity} min="1" max="5" />
                                                    <button className='btn border' name={`increase ${c._id}`} onClick={(e) => handlequantity(e, idx)}>+</button>

                                                </div>
                                            </div>
                                            <button className='btn btn-danger mt-3 btn-sm' onClick={() => handleremovecart(c, c._id)}>Remove</button>

                                        </div>
                                    </Card.Text>
                                </Card.Body>


                            </div>
                        </Card>
                    </Col>
                )) : <div><div className="h2">No Product in Cart</div></div>}
            </Row>
            {/* <button className='btn btn-success my-3 w-100 btn-sm' onClick={() => handleconfirm()}>{ordersummary.length == 0 ? 'Confirm Your Orders' : 'Click next to process further'}</button> */}
        </div>
    )
}

const Paymentoption = () => {
    const orderinfo = useSelector((store) => store.orderstate.orderedinfo)
    let products = [...orderinfo.products]
    //console.log(products);
    return (
        <div className="container" >
            <div className="border border-primary rounded p-3">
                <div className="h6 text-center">No of Products : <span className="h5 text-success"> {orderinfo.products.length}</span> </div>
                <div className="h6 text-center my-2">Total Quantity : <span className="h5 text-success ms-1"> {orderinfo.totalquantity}</span> </div>
                <div className="h4 text-center mt-4">Total Amount to be Paid :<span className='h3 text-primary ms-3'>${orderinfo.totalamount}</span></div>
                <Paymentcomponent />
            </div>
        </div >
    )
}

const Checkout = () => {
    let isbuypage;
    let buyproduct;
    const islogged = useSelector((state) => state.user.islogged)
    const userdetails = useSelector((store) => store.user.userdetail)
    const orderinfo = useSelector((store) => store.orderstate.orderedinfo)
    const cartstate = useSelector((store) => store.user.usercarts)
    const [selectedtab, setselectedtab] = useState(2)
    // const location = useLocation()
    const dispatch = useDispatch()

    const location = useLocation()
    let buyid = location.pathname.split('/')[2]
    if (location.pathname.split('/')[1] == 'buy') {
        isbuypage = true;
    }
    //console.log(isbuypage);
    useEffect(() => {
        if (isbuypage) {
            fetchproduct(buyid).then((res) => {
                console.log(res.product);
                buyproduct = res.product
                //dispatch(setcartsinstate(res.product))
            })
            // addcart(buyid).then((res)=>{ 
            //     console.log(res);
            // })
        }
    }, [])
    const handletabchange = (e) => {
        //console.log();
        if (e.target.innerText === 'Next' || e.target.innerText === 'Delivery Here') {

            if (selectedtab === 4) {
                return true
            }

            if (selectedtab === 3) {
                let orderedinfoi = {
                    orderedinfo: {
                        products: orderinfo.products,
                        selectedaddress: orderinfo.selectedaddress
                    }
                }

                updateorder(orderedinfoi).then((res) => {
                    //console.log(res);
                    if (res.status == 'ok') {
                        dispatch(settotalamountinstate(res.totalamount))
                        dispatch(settotalquantityinstate(res.totalquantity))
                        dispatch(setpaymentidinstate(res.payment))
                        dispatch(setorderidinstate(res.orderid))
                    }
                })

            }
            setselectedtab(selectedtab + 1)
        }
        else {
            setselectedtab(selectedtab - 1)
        }

    }
    return (
        <div className="container-fluid p-3">
            <Tabs
                activeKey={selectedtab}
                id="fill-tab-example"
                className="my-3 bg-primary-subtle rounded"
                fill
            >
                <Tab eventKey={1} title="Login" >
                    <div className="container">
                        {islogged ? <div className="h3 my-4">You are Logged in as <span className='h3 text-primary'>{userdetails.profile.name}</span></div> : <div className="h3 my-4"> Login to see details</div>}
                        {islogged ? <div className='h2 btn btn-primary' onClick={(e) => handletabchange(e)}>Next</div>
                            : <div className={`h2 btn btn-primary`} onClick={(e) => handletabchange(e)}>Login</div>}
                    </div>
                    {/* <div className={`h2 btn btn-primary`} onClick={(e) => handletabchange(e)}>Next</div> */}

                </Tab>
                <Tab eventKey={2} title="Delivery Address" disabled={selectedtab > 1 ? false : true} >
                    <Deliveryaddress handletabchange={handletabchange} />
                    <div className="container d-flex justify-content-between">
                        <div className="h2 btn btn-primary my-3" onClick={(e) => handletabchange(e)}>Back</div>
                        <div className="h2 btn btn-primary my-3" onClick={(e) => handletabchange(e)}> Delivery Here</div>
                    </div>
                    {/* <div className="h2 btn btn-primary" onClick={(e) => handletabchange(e)}>Next</div> */}
                </Tab>
                <Tab eventKey={3} title="Order Summary" disabled={selectedtab > 2 ? false : true}>
                    <div className="w-85 mx-auto">
                        {isbuypage ? <div> Buy Page</div> : <>
                            {cartstate.length >= 1 ? <Ordersummary /> : <div> <div className="h2 text-center my-5 text-primary">No products in your Cart</div></div>}

                            {cartstate.length >= 1 ? <><div className="mt-3 container d-flex justify-content-between">
                                <div className="h2 btn btn-primary mx-2 w-25" onClick={(e) => handletabchange(e)}>Back</div>
                                <div className="h2 btn btn-primary w-25" onClick={(e) => handletabchange(e)}>Next</div>
                            </div></> : <><div className='text-center'><div className="btn btn-success"> <Link to='/' className='text-white'>Explore More Products</Link></div></div></>}
                        </>}

                    </div>

                </Tab>
                <Tab eventKey={4} title="Payment Options" disabled={selectedtab > 3 ? false : true}>
                    <Paymentoption />
                    <div className="btn-group m-3 gap-3">
                        <div className="h2 btn btn-primary" onClick={(e) => handletabchange(e)}>Back</div>
                        {/* <div className="h2 btn btn-primary" onClick={(e) => handletabchange(e)}>Next</div> */}
                    </div>

                </Tab>
            </Tabs>
        </div>
    )
}

export default Checkout