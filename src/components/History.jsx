import { useEffect, useState } from "react"
import { fetchaddressdetail, fetchplacedorders } from "../../utils/fetch"
import { Link } from "react-router-dom"

const Historycomponent = () => {

    const [placedorders, setplacedorders] = useState([])
    
    useEffect(() => {

        fetchplacedorders().then((res) => {
            setplacedorders(res.placedorders)
            if (placedorders) {
                let placedorderswithaddress = res.placedorders
                const fn = async () => await Promise.all(
                    placedorderswithaddress.map(async (c) => ({
                        ...c,
                        selectedaddress : await fetchaddress()
                    }))
                )
                fn().then((newres)=>{
                    setplacedorders(newres)
                })
            }
        })
    }, [])
    const fetchaddress = async () => {
        let a = await fetchaddressdetail("65c0943b6f905732da920f5a")
        return `${a.landmark}, ${a.pincode} - ${a.state}`
    }

    const handleordercancel = (e,id)=>{
        console.log('order cancelled', id);
    }

    return (
        <section className=" p-2">
            <div className="history row row-cols-sm-2 row-cols-md-3 row-cols-lg-5">
                {placedorders.map((order, i) => {
                    console.log(order.placeddate.split('T')[0]);
                    return (
                        <div key={i} className="history-card h-100 p-0 border-primary rounded">
                            <div className="card-header p-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <div className="p text-muted mb-2"> Order ID <span className="h6 text-primary">1222528743</span></div>
                                    </div>
                                    <div>
                                        <div className="p text-muted mb-2"> Placed On <span className="h6 text-primary">{order.placeddate.split('T')[0]}</span> </div>
                                        {/* <div className="mb-0 h6 btn btn-sm btn-primary"><Link to={`/product/${order._id}`} className="text-white">View Product</Link> </div> */}
                                    </div>
                                </div>
                            </div>
                            <div className="card-body p-3">
                                {order.products.map((c, i) => {
                                    // console.log(order);
                                    return (
                                        <div key={i} className="d-flex flex-row mb-4 pb-2 border rounded p-1">
                                            <div className="flex-fill">
                                                <div className="h6 fw-bold text-primary">{i + 1} : {c.productid.product_name}</div>
                                                <div className="p"> Quantity: <span className="fw-bold text-primary">{c.quantity}</span></div>
                                                <div className="h5 my-2 text-primary"> $ {c.productid.price} <span className="small text-muted"> via (COD) </span></div>
                                                <div className="p text-muted">Address : <span className="p text-primary">{order.selectedaddress}</span></div>
                                            </div>
                                            <div className="border">
                                                <img className="align-self-center img-fluid"
                                                    src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/6.webp" width="250" />
                                            </div>
                                        </div>
                                    )
                                })}
                                <ul id="progressbar-1" className="mx-0 mt-0 mb-2 px-0 pt-0 pb-4">
                                    <li className="step0 active" id="step1"><span>PLACED</span></li>
                                    <li className="step0 text-center" id="step2"><span>SHIPPED</span></li>
                                    <li className="step0 text-muted text-end" id="step3"><span>DELIVERED</span></li>
                                </ul>
                            </div>
                            <div className="card-footer p-4">
                                <div className="d-flex justify-content-between">
                                    <div className="btn btn-sm btn-primary">Track</div>
                                    <div className="btn btn-sm btn-danger" onClick={(e)=>handleordercancel(e, order._id)}>Cancel</div>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>


        </section>

    )
}

export default Historycomponent