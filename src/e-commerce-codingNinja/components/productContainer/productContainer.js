import React, { useState, useEffect } from 'react'
import styles from './productContainer.module.css'
import ProductItem from '../product/productItem'
import { useSelector } from "react-redux";
import { productSelector } from '../redux/Reducer/productReducer';
import Edit from '../product/Edit/Edit';
import { EdlitToggleSelectort } from '../redux/Reducer/EditReducer';
import { toast } from 'react-toastify';



const ProductContainer = () => {
  const ReduxProduct = useSelector(productSelector);
  const [productItems, setProductItems] = useState(ReduxProduct);
  let [sorfil, setSorfil] = useState({})
  const [toggle,setToggle]=useState(0);//setting initailly toggle to 0 becuase we want that initially it should hidden



  useEffect(() => {
    setProductItems(ReduxProduct);//setting the product State when the Redux or sorfil changes
  }, [ReduxProduct, sorfil])
 
  useEffect(()=>{
    const sideEl=document.getElementById('sidebar');
    const viewportWidth = window.innerWidth;
    if(toggle===0){

      if(viewportWidth>700){
        return;                                             //checking the view port width to decide whether should be give the toggle option or not
      }
      sideEl.style.transform = "translateX(-100%)"
    }
    if(toggle===1){   
      sideEl.style.transform = "translateX(0%)"
    }

  },[toggle])

  useEffect(() => {
    let sorted = [...ReduxProduct];
    if (sorfil.search) {
      const filtered = sorted.filter(product => product.description.toLowerCase().includes(sorfil.search.toLowerCase()) || product.title.toLowerCase().includes(sorfil.search.toLowerCase()))   //filtering the product according to the keyword search
      sorted = [...filtered];
    }

    if (sorfil.price) {
      if (sorfil.price === 1) {
        sorted.sort((a, b) => b.price - a.price);
        toast.success('Sorted Descending fashion')                       //sorting the product in descending fashion
      }

      if (sorfil.price === -1) {
        sorted.sort((a, b) => a.price - b.price);
        toast.success('Sorted Ascending fashion')                          //sorting the product in descending fashion
      }

      if(sorfil.price===0){
        sorted.sort((a,b)=>a.id-b.id)
        toast.success('sorting Removef')                             //removing the sorting 
      }
    }

    setProductItems(sorted);

  }, [sorfil])



  const edit = useSelector(EdlitToggleSelectort);
  return (
    <>
    {
      window.innerWidth>700?null:  <span className={styles.toggle} onClick={(()=>{toggle===0?setToggle(1):setToggle(0)})}>{toggle===0?<i class="fa-solid fa-bars"></i>:<i class="fa-solid fa-square-xmark"></i>}</span> 
    }
    
    <div className={styles.sidemenu} id='sidebar'>
        <div className={styles.sideForm}>
          <div className={styles.search}><span></span><input type="text" placeholder='search....' value={sorfil.search} onChange={(e) => { setSorfil({ ...sorfil, search: e.target.value }) }} /></div>
          <div className={styles.sort}>
            <button  onClick={() => { setSorfil({ ...sorfil, price: 1 }) }} ><i class="fa-solid fa-arrow-up" ></i></button>
            <button   onClick={() => { setSorfil(sorfil.price===0||sorfil.price==undefined?{...sorfil,price:-1}:{...sorfil,price:0})}}>{sorfil.price===0||sorfil.price==undefined?'Sort':'Cancel sort'}</button>
           <button  onClick={() => { setSorfil({ ...sorfil, price: -1 }) }}> <i class="fa-solid fa-arrow-down"></i></button>
            </div>
        </div>
      </div>  
      {edit ? <Edit/> : null}
      <div className={styles.cartContainer_main}>
        {productItems.map((product) => {
          return (<ProductItem products={product} key={product.id} />)
        })}
      </div>
    </>
  )
}

export default ProductContainer;
