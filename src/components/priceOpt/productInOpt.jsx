import css from './priceOpt.module.css'
import soonPicProd from '../../img/soonPicProd.png'
import { useState } from 'react'
import { useEffect } from 'react';
import addToCart from '../../function/addToCard';



export default function ProductInOpt({el, setTotalPrice,setHaveProduct, haveProduct}) {
  const [countProd, setCountProd] = useState(0);



  const changeStateDown = () => {
    if (countProd === 1) {
      let cartItems = [];
  
      // Отримуємо корзину з localStorage
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        cartItems = JSON.parse(storedCart);
      }
  
      // Знаходимо індекс товару в корзині
      const existingProductIndex = cartItems.findIndex((item) => item.uid === el.uid);
  
      if (existingProductIndex !== -1) {
        if (cartItems[existingProductIndex].quantity === 1) {
          // Видаляємо товар з корзини в localStorage, якщо його кількість дорівнює 1
          cartItems.splice(existingProductIndex, 1);
        } else {
          // Зменшуємо кількість товару в корзині в localStorage на 1
          cartItems[existingProductIndex].quantity -= 1;
        }
  
        // Оновлюємо корзину в localStorage
        localStorage.setItem('cart', JSON.stringify(cartItems));
      }
  
      setCountProd(0);
    } else {
      const newCount = countProd - 1;
      setCountProd(newCount);
  
      let cartItems = [];
  
      // Отримуємо корзину з localStorage
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        cartItems = JSON.parse(storedCart);
      }
  
      // Знаходимо індекс товару в корзині
      const existingProductIndex = cartItems.findIndex((item) => item.uid === el.uid);
  
      if (existingProductIndex !== -1) {
        // Зменшуємо кількість товару в корзині в localStorage на 1
        cartItems[existingProductIndex].quantity -= 1;
  
        // Оновлюємо корзину в localStorage
        localStorage.setItem('cart', JSON.stringify(cartItems));
      }
    }
    setHaveProduct(!haveProduct)
  };
    
    // const changeStateUp = () => {
    //   if(countProd === 0){
    //     addToCart(el.uid)
    //     setCountProd(1)
    //   }
    //   const newCount = countProd + 1;
    //   setCountProd(newCount);
     
    // }

    const changeStateUp = () => {
      if (countProd === 0) {
        addToCart(el.uid);
        setCountProd(1);
      } else {
        let cartItems = [];
    
        // Отримуємо корзину з localStorage
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
          cartItems = JSON.parse(storedCart);
        }
    
        // Знаходимо індекс товару в корзині
        const existingProductIndex = cartItems.findIndex((item) => item.uid === el.uid);
    
        if (existingProductIndex !== -1) {
          // Якщо товар вже є в корзині, збільшуємо його кількість на 1 в localStorage
          cartItems[existingProductIndex].quantity += 1;
    
          // Оновлюємо корзину в localStorage
          localStorage.setItem('cart', JSON.stringify(cartItems));
        }
    
        const newCount = countProd + 1;
        setCountProd(newCount);
      }
      setHaveProduct(!haveProduct)
    };

  
  
 

    return(
        <div className={css.blockSoonSecond}>
        <img src={el.bookFoto} className={css.soonPicProdSt}/>
        <div className={css.soonPicProdStDesc}>
            <p className={css.soonAuthor}>{el.textAutor}</p>
            <h1 className={css.soonAuthorName}>{el.bookName}</h1>
            <div className={css.rombWrapSecond}>
<div className={css.rombWrapPod}>

<p className={css.pricePodRomb}>{el.price}</p>
<p className={css.pricePodRombText}>грн</p>

</div>
</div>
<div className={css.counterWrapSecond}>
<div onClick={changeStateDown} className={css.boxCount}>-</div>
<p className={css.theCount}>
{countProd}
</p>
<div onClick={changeStateUp} className={css.boxCount}>+</div>
</div>
        </div>
        </div>
    )
}