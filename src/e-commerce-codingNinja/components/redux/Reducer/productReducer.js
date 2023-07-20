import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

var initialState = {
    products: [

    ],

}

const productSlice = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {
        setProduct: (state, action) => {
            state.products = [...action.payload]
        },
        add: (state, action) => {
            state.products = [action.payload, ...state.products];
            toast.success('Product Added');

        },
        delete: (state, action) => {
            const filter = state.products.filter((element) => {
                if (element.id != action.payload) {
                    return element;
                }
            })
            state.products = [...filter];
            toast.success('Product Deleted');
        },
        edit: (state, action) => {
            state.products = state.products.map((element) => {
                if (element.id === action.payload.id) {
                    toast.success('Produc Edited');
                    return { ...element, ...action.payload }

                }
                return element;
            })
        }
    }
})

export const productReducer = productSlice.reducer;
export const productAction = productSlice.actions;
export const productSelector = (state) => state.productReducer.products