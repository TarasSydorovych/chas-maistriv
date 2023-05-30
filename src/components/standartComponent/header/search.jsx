import {HandySvg} from 'handy-svg';
import iconSrc from '../../../svg/searsh.svg';
import iconSrctele from '../../../svg/like.svg';
import iconSrcYou from '../../../svg/cabinetIcon.svg';
import shopIco from '../../../svg/shopIco.svg';
import { Link, useNavigate } from 'react-router-dom';
import './header.css'
import { GrInstagram } from "react-icons/gr";
import React, { useState, useEffect } from 'react';


export default function Search({user, login, setLogin, setCart, countProductForCart}) {
    const [cartItems, setCartItems] = useState([]);
    const [countProduct, setCountProduct] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        let count = 0;
        if (storedCart) {
          const cartItems = JSON.parse(storedCart);
          for(let i = 0; i < cartItems.length; i++){
            count += cartItems[i].quantity;
          }
        }
        setCountProduct(count);
      }, [cartItems]);
const loginFun = () => {
    if(user){
        navigate('/user')
    }else{
    setLogin(!login)
    }
}
const openCart = () => {
 
    setCart(true)

}

    return(
        <div className='wrapSearch'>
            <a href='/'>
            <div className='searchBlock'>
                <div className='socialIcon'>
                    <HandySvg 
                    src={iconSrc}
                    width="28"
        height="28"
                    />
                </div>
            </div>
            </a>
           
            <Link to='/like'>
            <div className='searchBlock'>
                <div className='socialIcon'>
                    <HandySvg 
                    src={iconSrctele}
                    width="30"
        height="28"
                    />
                </div>
            </div>
            </Link>
            
            <div className='searchBlock' onClick={openCart}>
                <div className='socialIcon'>
                <HandySvg 
                    src={shopIco}
                    width="28.33"
        height="28"
                    />
                    {countProductForCart &&
                   <div className='counterProd'>
                  {countProductForCart} 
                   </div>
                   }
                </div>
            </div>
            
            
            <div className='searchBlock'>
                <div className='socialIcon'>
                    <HandySvg 
                    src={iconSrcYou}
                    width="28"
        height="28"
        onClick={loginFun}
                    />
                </div>
            </div>
           
        </div>
    )
}