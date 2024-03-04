import { useEffect, useState } from 'react'
import { useParams, useSearchParams, useLocation } from 'react-router-dom'
import { fetchsearchproduct } from '../../utils/fetchproducts'
import { useDispatch, useSelector } from 'react-redux'
import { updatesearchproductsinstate } from '../app/slices/productSlice'
import Card from './card'
import Spinner from './spinner'


const Searchcomponent = () => {

    const [sq, setsq] = useState()

    const [loading, setloading] = useState(true)
    //const [sortchecked, setsortchecked] = useState(false)

    const location = useLocation()
    const queryparams = new URLSearchParams(location.search)
    const searchquery = queryparams.get('q')

    const dispatch = useDispatch()
    const searchedproducts = useSelector((state) => state.product.searchedproducts)

    useEffect(() => {

        // if searchquery is empty string is empty then dont fetch 

        // when using the sorting method. the component need to rerender. but when rerendering the whole component can cause the useeffect to run again and chech searchquery and fetch again the same products and set in state.

        // thats why,  first checking the length of the searchproducts length in store. if it is not available. then this the first time to render the component. so we need to fetch. but if we have the length, then the cause of rerender of useeffct is to run by the sort method
      
        if (searchquery !== '') {
            //if (searchedproducts.length == 0) {
            fetchsearchproduct(searchquery).then((res) => {
                dispatch(updatesearchproductsinstate(res.products))
                setloading(false)
            })
            // }
        }
        else {
            setloading(false)
        }
    }, [searchquery])
    if (loading) {
        return <Spinner />
    }

    const handlesortchange = (e) => {

        let copysearchedproducts = [...searchedproducts]
        if (e.target.name == 'flexRadioratings') {

            copysearchedproducts.sort((first, second) => second.ratings - first.ratings)
            dispatch(updatesearchproductsinstate(copysearchedproducts))
            //document.getElementById("flexRadioDefault1").checked = true;
            document.getElementById("flexRadioDefault2").checked = false;
        }
        else {
            copysearchedproducts.sort((first, second) => second.price - first.price)
            dispatch(updatesearchproductsinstate(copysearchedproducts))
            document.getElementById("flexRadioDefault1").checked = false;
        }


    }

    return (
        <div className="my-3">
            {searchquery !== '' ? (searchedproducts == null ? <div className='m-5 '> <div className="h2 m-5">No Products found for <span className='h3 text-danger'>{searchquery}</span></div></div> : <><div className="h3 mx-3">You have searched <span className='h3 text-success'>{searchquery}</span></div>
                <div className="searchdiv row row-cols-sm-2 mt-3">
                    <div className='searchdiv-left m-3'>
                        <div className="sort mt-4">
                            <div className="h6 text-primary">Sort</div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioratings" id="flexRadioDefault1" onClick={(e) => handlesortchange(e)} />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    <div className="p">By Ratings</div>
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioprice" id="flexRadioDefault2" onClick={(e) => handlesortchange(e)} />
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                    By Price
                                </label>
                            </div>


                        </div>
                        <div className="brand mt-4">
                            <div className="h6 text-primary">Brand</div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Redmi
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Oppo
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Apple
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Samsung
                                </label>
                            </div>
                        </div>
                        <div className="pricerange mt-4">
                            <div className="h6 text-primary">Price Range</div>
                            <input type="range" className="form-range" min="1" max="5" defaultValue='0' id="customRange2" />

                        </div>
                    </div>
                    <div className='searchdiv-right'>
                        <div className="row row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-auto">
                            {searchedproducts?.map((c, i) => {
                                return (
                                    <Card key={i} c={c} />
                                )
                            })}
                        </div>
                    </div>
                </div></>) : <div className='m-5 text-danger'> <div className="h2 m-5">You haven't searched anything</div></div>}
        </div>
    )
}

export default Searchcomponent