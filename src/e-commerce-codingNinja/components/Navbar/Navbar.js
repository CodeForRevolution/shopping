import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import './Navbar.css'
import { useSelector } from 'react-redux'
import { cartSelector } from '../redux/Reducer/cartReducer'
const Navbar = () => {

    const cartlength = useSelector(cartSelector).length
    return (
        <>
         <nav>
           <div className="nav_logo">
                    <span><Link to={'/shopping'}><i class="fa-solid fa-house"></i></Link></span>
                    <span><Link to={'/shopping/create'}>Add Product</Link></span>        
                </div>
                <span>E-shop.com</span>
                <div className="nav_side">
                    <span className='Nav_cart'><Link to={'/shopping/cart'}><i class="fa-solid fa-cart-shopping"></i> <span className='cart_number'>{cartlength}</span></Link></span>
                </div>
            </nav>
            <div className='navMain'>
                <div className="page">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Navbar;
