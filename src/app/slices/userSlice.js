import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    islogged : false,
    userdetail : {},
    usercarts : []
}
const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        setuserdetail : (state,action)=>{
            state.userdetail = action.payload
        },
        setloginstate : (state)=>{
            state.islogged = true
        },
        setcartsinstate : (state,action)=>{
            
            const product = action.payload
            return {
                ...state,
                usercarts: [
                    ...state.usercarts,
                    product
                ]

            }
        },
        setlogoutstate : (state)=>{
            state.islogged = false
            state.userdetail = {}
            state.usercarts =[]
        },
        removecartinstate: (state, action) => {
            //console.log(action.payload);
            return {
                ...state,
                usercarts: state.usercarts.filter((cartsproduct) => cartsproduct._id !== action.payload._id)
            }


        },
        clearcartinstate : (state,action)=>{
            return{
                ...state,
                usercarts : []
            }
        }

    }
})

export const {setuserdetail, setloginstate,setcartsinstate, setlogoutstate,removecartinstate,clearcartinstate} = userSlice.actions
export default userSlice.reducer