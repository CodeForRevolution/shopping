import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState={
    products:[
       
    ]
}

const cartSlice=createSlice({
    name:'cart',
    initialState:initialState,
    reducers:{
        setCart:(state,action)=>{
            state.products=[...action.payload];//destructuring the array got from setCart action
        },
        addtoCart:(state,action)=>{
      if(state.products.find((element)=>(element.id==action.payload.id))){
        return;
      }
      state.products.push({...action.payload ,count:1})
      const cartItem=[...state.products];
      localStorage.setItem('cartItem',JSON.stringify(cartItem)); //adding the updated cart to local storage

      toast.success('Product Added to cart')
        },
        remove:(state,action)=>{
           state.products=[...action.payload]
           console.log('current cart is',state.products)
           toast.success('Product Remove from cart');
           const cartItem=[...state.products];
           localStorage.setItem('cartItem',JSON.stringify(cartItem)); //adding the updated cart to local storage
        },
        increase:(state,action)=>{
            state.products=[...action.payload];
            const cartItem=[...state.products];
            localStorage.setItem('cartItem',JSON.stringify(cartItem)); //adding the updated cart to local storage
        },
        decrease:(state,action)=>{
            state.products=[...action.payload]     
            const cartItem=[...state.products];     
            localStorage.setItem('cartItem',JSON.stringify(cartItem)); //adding the updated cart to local storage
        }
    }
})

export const cartReducer=cartSlice.reducer;
export const cartAction=cartSlice.actions;
export const cartSelector=(state)=>state.cartReducer.products