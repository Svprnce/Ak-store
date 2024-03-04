import { addcart, removecart } from "./fetch"

export const handleremovecartinstate = (dispatch,reducer,content,id)=>{
    removecart(id).then((res)=>{
        if(res){
            dispatch(reducer(content))
        }
    })
}

export const handleaddcartinstate = (dispatch,reducer,content,id)=>{
    addcart(id).then((res)=>{
        if(res){
            dispatch(reducer(content))
        }
    })
}