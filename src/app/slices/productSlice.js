import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    products: [],
    searchedproducts : [],
    carts: [],
    categories: [],
    totalamount: 0,
}

const productSlice = createSlice({

    name: 'product',
    
    initialState,

    reducers: {
        updateproductsinstate: (state, action) => {
            state.products.push(action.payload)
        },
        updatecategoryinstate: (state, action) => {
            state.categories.push(action.payload)
        },
        addtocartinstate: (state, action) => {
            const product = action.payload
            const isexited = state.carts.some((cartproduct) => {
               return cartproduct.id == action.payload.id
            })
            if (!isexited) {
                return {
                    ...state,
                    carts: [
                        ...state.carts,
                        product
                    ]

                }
            }
            else {
                return state
            }

        },
        removeproductinstate: (state, action) => {

            return {
                ...state,
                carts: state.carts.filter((cartsproduct) => cartsproduct.id !== action.payload)
            }


        },
        updatesearchproductsinstate : (state,action)=>{
            // if(action.payload == undefined){
            //     console.log(action.payload);
            //     state.searchedproducts = []
            // }
            state.searchedproducts = action.payload
        }
    }
})

export const { updateproductsinstate, addtocartinstate, removeproductinstate, updatecategoryinstate, updatesearchproductsinstate} = productSlice.actions

export default productSlice.reducer


