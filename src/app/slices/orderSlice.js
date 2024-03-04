import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    orderedinfo: {
        selectedaddress: {},
        products: [{
            productid: null,
            quantity: 0
        }],
        totalamount : 0,
        totalquantity : 0,
        paymentid : null,
        orderid : null,
    }
}

const orderSlice = createSlice({
    name: 'orderstate',
    initialState,
    reducers: {
        setproductsinorderstate: (state, action) => {
            console.log('perfect');
        },
        setdeliveryaddressid: (state, action) => {
            state.orderedinfo.selectedaddress = action.payload
        },
        setproductsinstate: (state, action) => {
            return{
                
                orderedinfo: {
                  ...state.orderedinfo,
                  products: action.payload
                }
              };
        },
        settotalamountinstate : (state,action)=>{
            return{
                
                orderedinfo: {
                  ...state.orderedinfo,
                  totalamount: action.payload
                }
              };
        },
        settotalquantityinstate : (state,action)=>{
            return{
                
                orderedinfo: {
                  ...state.orderedinfo,
                  totalquantity: action.payload
                }
              };
        },
        setorderidinstate : (state,action)=>{
            return{
                orderedinfo:{
                    ...state.orderedinfo,
                    orderid: action.payload
                }
            }
        },
        setpaymentidinstate : (state,action)=>{
            return{
                orderedinfo:{
                    ...state.orderedinfo,
                    paymentid: action.payload
                }
            }
        }
    }
})

export const { setproductsinorderstate, setdeliveryaddressid, setproductsinstate , settotalamountinstate,settotalquantityinstate,setorderidinstate,setpaymentidinstate} = orderSlice.actions
export default orderSlice.reducer