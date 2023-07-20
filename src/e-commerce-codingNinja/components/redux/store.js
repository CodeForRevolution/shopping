import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./Reducer/cartReducer";
import { productReducer } from "./Reducer/productReducer";
import { EditReducder } from "./Reducer/EditReducer";

 export const store=configureStore({
reducer:{
   cartReducer,
   productReducer,
   EditReducder
}
})

