export const fetchregister = async(regdata)=>{
    // console.log(process.env.REACT_APP_BACKEND_URL);
    const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(regdata)
    })
    return await data.json()
}