import { useDispatch, useSelector } from 'react-redux'
import { updatecategoryinstate } from '../src/app/slices/productSlice'

export const fetchprofile = async () => {
    const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/me/profile`, {
        method: 'GET',
        credentials: 'include'
    })
    return await data.json()
}
export const fetchcategory = async () => {

    const dispatch = useDispatch()
    const category = useSelector((store) => store.product.categories)
    if (category.length == 0) {
        const data = await fetch('https://fakestoreapi.com/products/categories')
        const d = await data.json()
        return dispatch(updatecategoryinstate(d))
    }
    return null
}


export const fetchcarts = async () => {
    //const a_token = localStorage.getItem('a_token')
    const cartdata = await fetch(`${process.env.REACT_APP_BACKEND_URL}/me/carts`, {
        method: 'GET',
        credentials: 'include'
    })
    const cartresponce = await cartdata.json()
    //console.log(cartresponce.cart);
    return await cartresponce?.cart

}
export const removecart = async (id) => {
    //const a_token = localStorage.getItem('a_token')
    const cartremoveddata = await fetch(`${process.env.REACT_APP_BACKEND_URL}/me/cart/${id}`, {
        method: 'DELETE',
        credentials: 'include'
    })
    const cartremoveresponce = await cartremoveddata.json()
    return await cartremoveresponce
}
export const addcart = async (id) => {
    //const a_token = localStorage.getItem('a_token')
    const cartaddedddata = await fetch(`${process.env.REACT_APP_BACKEND_URL}/me/addtocart/${id}`, {
        method: 'POST',
        credentials: 'include'
    })
    const cartaddedresponce = await cartaddedddata.json()
    return await cartaddedresponce
}

// Orders

export const fetchplacedorders = async () => {
    //const a_token = localStorage.getItem('a_token')
    const orderdata = await fetch(`${process.env.REACT_APP_BACKEND_URL}/me/placedorders`, {
        method: 'GET',
        credentials: 'include'
    })
    const orderresponce = await orderdata.json()
    //console.log(cartresponce.cart);
    return await orderresponce

}
// address

export const fetchaddress = async () => {
    const address = await fetch(`${process.env.REACT_APP_BACKEND_URL}/me/getaddress`, {
        method: 'GET',
        credentials: 'include'
    })
    const addressresponce = await address.json()
    //console.log(addressresponce.address);
    return await addressresponce?.address
}
export const fetchaddressdetail = async (id) => {
    const addressdetail = await fetch(`${process.env.REACT_APP_BACKEND_URL}/me/getaddress/${id}`, {
        method: 'GET',
        credentials: 'include'
    })
    const addressdetailresponce = await addressdetail.json()
    //console.log(addressresponce.address);
    return await addressdetailresponce.addressdetail[0]
}
export const fetchlogout = async () => {
    const cartdata = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, {
        method: 'GET',
        credentials: 'include'
    })
    const responce = await cartdata.json()
    return await responce
}

export const updateorder = async (data) => {
    const order = await fetch(`${process.env.REACT_APP_BACKEND_URL}/me/orderconfirmed`, {
        method: 'POST',
        credentials: 'include', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const orderres = await order.json()
    return orderres
}

export const handlepayment = async (data)=>{
    const responce = await fetch(`${process.env.REACT_APP_BACKEND_URL}/payment/handlepayment`, {
        method: 'POST',
        credentials: 'include', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const paymentres = await responce.json()
    return paymentres
}