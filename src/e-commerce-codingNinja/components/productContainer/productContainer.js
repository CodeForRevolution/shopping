import React, { useState, useContext, useEffect } from 'react'
import styles from './productContainer.module.css'
import ProductItem from '../product/productItem'
import { useSelector, useDispatch } from "react-redux";
import { productSelector } from '../redux/Reducer/productReducer';
import Edit from '../product/Edit/Edit';
import { EdlitToggleSelectort } from '../redux/Reducer/EditReducer';
import { toast } from 'react-toastify';


const ProductContainer = () => {
  console.log('++++compoent staring render++++=')
  const ReduxProduct = useSelector(productSelector);
  const [productItems, setProductItems] = useState(ReduxProduct);
  let [sorfil, setSorfil] = useState({})
  const [sort, setSort] = useState(false);
  const [toggle,setToggle]=useState(0);



  useEffect(() => {
    console.log('your redux produc is ', ReduxProduct);
    setProductItems(ReduxProduct);
    console.log('your product in state', productItems);
  }, [ReduxProduct, sorfil])
  const filtering = (event) => {
  }

  useEffect(()=>{
    const sideEl=document.getElementById('sidebar');

    const viewportWidth = window.innerWidth;
const vwInPixels = (viewportWidth * 1) / 100; // Replace 1 with the desired vw value

// Example usage
console.log('Viewport Width in Pixels:', viewportWidth + 'px');




    if(toggle==0){

      if(viewportWidth>700){
        return;
      }

      sideEl.style.transform = "translateX(-100%)"

    }
    if(toggle===1){
    
      sideEl.style.transform = "translateX(0%)"

    }

  },[toggle])

  useEffect(() => {
    console.log('+++ filter funtion called+++++')
    console.log('inseting all product in setProductItem', ReduxProduct);
    console.log('after setting all product  setProductItem', productItems);
    let sorted = [...ReduxProduct];

    if (sorfil.search) {
      const filtered = sorted.filter(product => product.description.toLowerCase().includes(sorfil.search.toLowerCase()) || product.title.toLowerCase().includes(sorfil.search.toLowerCase()))
      sorted = [...filtered];
    }

    if (sorfil.price) {
      if (sorfil.price === 1) {
        sorted.sort((a, b) => b.price - a.price);
        toast.success('Sorted Descending fashion')
      }

      if (sorfil.price === -1) {
        sorted.sort((a, b) => a.price - b.price);
        toast.success('Sorted Ascending fashion')
      }

      if(sorfil.price===0){
        sorted.sort((a,b)=>a.id-b.id)
        toast.success('sorting Removef')
      }
    }

    setProductItems(sorted);

  }, [sorfil])






  const edit = useSelector(EdlitToggleSelectort);

  console.log('+++  JSX Rendering started+++++')
  return (
    <>
      <span className={styles.toggle} onClick={(()=>{toggle===0?setToggle(1):setToggle(0)})}>{toggle===0?<i class="fa-solid fa-bars"></i>:<i class="fa-solid fa-square-xmark"></i>}</span> 
    <div className={styles.sidemenu} id='sidebar'>
        <div className={styles.sideForm}>
          <div className={styles.search}><span></span><input type="text" placeholder='search....' value={sorfil.search} onChange={(e) => { setSorfil({ ...sorfil, search: e.target.value }) }} /></div>
          <div className={styles.sort}>
            <button  onClick={() => { setSorfil({ ...sorfil, price: 1 }) }} ><i class="fa-solid fa-arrow-up" ></i></button>
            <button   onClick={() => { setSorfil(sorfil.price===0||sorfil.price==undefined?{...sorfil,price:-1}:{...sorfil,price:0})}}>{sorfil.price===0||sorfil.price==undefined?'Sort':'Cancel sort'}</button>
           <button  onClick={() => { setSorfil({ ...sorfil, price: -1 }) }}> <i class="fa-solid fa-arrow-down"></i></button>
            </div>
          <button type="submit" onClick={(event) => { filtering(event) }}>Apply filter</button>
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
