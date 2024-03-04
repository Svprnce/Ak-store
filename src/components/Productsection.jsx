import { Suspense, memo, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Spinner from "./spinner"
import { useDispatch, useSelector } from 'react-redux'
import { updateproductsinstate } from "../app/slices/productSlice"
import Card from "./card"
import Carousel from "./carousel"
import fetchproducts from "../../utils/fetchproducts"
import { useErrorBoundary } from "react-error-boundary";

const Productsection = () => {
    const [loading, setloading] = useState(true)
    const dispatch = useDispatch()
    const product = useSelector((state) => state.product.products)
    const { showBoundary } = useErrorBoundary();

    useEffect(() => {
        async function fetchproduct() {
            if (product.length == 0) {
                try {
                    const productdata = await fetchproducts()
                    //console.log(productdata);
                    if(!productdata) throw new Error('Network response was not ok');
                    dispatch(updateproductsinstate(productdata.products))
                    setloading(false)
                } catch (error) {
                    
                    //console.log('eorr on fetch',error);
                    showBoundary(error);
                }
            }
            else {
                setloading(false)
            }
        }
        fetchproduct()
    }, [])

    if (loading) {
        return <Spinner />
    }
    return (
        <div className="container-fluid p-3 product-section">
            <Carousel />
            <h3 className="h2 text-primary">Products</h3>
            <div className="row row-cols-sm-2 row-cols-md-3 row-cols-lg-6 g-4" >
                {product[0]?.map((c, i) => {
                    return (
                        <Suspense key={i} fallback={<Spinner />}>
                            <Card c={c} />
                        </Suspense>
                    )
                })}
            </div>
        </div>

    )
}

export default memo(Productsection)