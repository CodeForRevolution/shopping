import React, { Children, useEffect, useState } from 'react'
import { createBrowserRouter, router, RouterProvider, Route, BrowserRouter } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import ProductContainer from './components/productContainer/productContainer';
import Create from './components/create/Create';
import './App.css'
import Cart from './components/cartContainer/Cart';
import { Provider, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { productAction, productSelector } from './components/redux/Reducer/productReducer';
import ProductInfo from "./components/productInfo/productInfo"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { cartAction } from './components/redux/Reducer/cartReducer';









const App = () => {



  const dispatch = useDispatch();//acquire the dispatcher for dispaching the action of reducers
  const settproduct = useSelector(productSelector);
  const [products, setProducts] = useState([]);




  //this use effect will run only once when app will mounted
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch('https://dummyjson.com/products?limit=2000', { method: "GET" }); //fetching the product from url 
      const products = await response.json();
      const newP = products.products
      setProducts(newP)                                                     //setting the product to product useState
      var cartItem = [];                                                       //checking whether user have the cart product in local storage
      if (localStorage.getItem('cartItem')) {
        cartItem = await JSON.parse(localStorage.getItem('cartItem'));
        console.log('you come to fetch the data from the local storage', cartItem);
        dispatch(cartAction.setCart(cartItem));                                 //after checking add the product from local storage to cart reducer 
      }

      const ReduxProduct = [...newP];
      dispatch(productAction.setProduct(ReduxProduct));                       //add the intial product of api to product reducer
    }
    fetchProduct();
  }, [])



  const browerrouter = createBrowserRouter(
    [
      {
        path: 'shopping', element: <Navbar />, children: [
          { index: true, element: <ProductContainer /> },
          { path: 'cart', element: <Cart /> },
          { path: 'create', element: <Create /> },
          { path: 'moreInfo', element: <ProductInfo /> },
        ],
      },
    ])



  return (
    <>
      <div className='App_main'>
        <RouterProvider router={browerrouter} />
        < ToastContainer
          position='top-right'
          autoClose={1000}
        />
      </div>
    </>
  )
}




export default App;