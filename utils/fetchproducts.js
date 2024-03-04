const fetchproducts = async ()=>{
    const productdata = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products`,{
        method : 'GET',
        credentials : 'include'
    })
        const prodcutdatajson = await productdata.json()
        return await prodcutdatajson
}

export const fetchproduct = async(id)=>{
    const productdata = await fetch(`${process.env.REACT_APP_BACKEND_URL}/product/${id}`,{
        method : 'GET',
        credentials : 'include'
    })
        const prodcutdatajson = await productdata.json()
        return await prodcutdatajson
}

export const fetchsearchproduct = async (query) => {
    const products = await fetch(`${process.env.REACT_APP_BACKEND_URL}/search?q=${query}`, {
        method: 'GET',
        credentials: 'include'
    })
    const productsresponce = await products.json()
    return await productsresponce
}

export default fetchproducts