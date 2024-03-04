import { memo, useEffect, useState } from "react"
import Productbtn from "./productbtn"
import { useParams } from 'react-router-dom'
import Spinner from "./spinner"
import { fetchproduct } from "../../utils/fetchproducts"

const Product = () => {
    const { id } = useParams()
    const [data, setdata] = useState({})
    const [loading, setloading] = useState(true)
    
    
    const arrayrating = Array.from({ length: data?.ratings });
    useEffect(() => {

        fetchproduct(id).then((res) => {
            setdata(res.product)
            if (data) {
                setloading(false)
            }
        })
    }, [])
    if (loading) {
        return <Spinner />
    }
    return (
        <div className="product p-3">
            <div className="row" style={{ height: "max-content", overflow: "hidden" }}>
                <div className="product-left col-6 row gap-3">
                    <div className="product-img-div border">
                        <img src={'https://rukminim2.flixcart.com/image/312/312/xif0q/dslr-camera/g/o/y/-original-imagvjzkzkpjqsay.jpeg?q=70'} className="product-img img-fluid rounded-3" alt="..." />
                    </div>
                    <div className="product-btn">
                        <Productbtn data={data}  />
                    </div>
                </div>
                <div className="col-6">
                    <div className="product-breadcumb ms-1">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item"><a href="#">Library</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Data</li>
                            </ol>
                        </nav>
                    </div>
                    <div className="product-details row gap-1">
                        <h5>{data.product_name}</h5>
                        <div className="rating d-inline-flex" >

                            <div className="rating-star m-0">
                                {arrayrating.map((_, i) => (
                                    <svg keys={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                    </svg>)
                                )}
                            </div>
                            <div className="rating-point m-1">
                                <p>{data.ratings}</p>
                            </div>
                        </div>
                        <div className="price d-flex-inline"><span className="h6">Price :</span> {`  ${data.price}.00`}</div>
                        <div className="product-description mt-2">
                            <h6>Description : </h6>
                            <p>{data.description} .... <span className="text-primary">Read more</span></p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

const Memoproduct = memo(Product)
export default Memoproduct