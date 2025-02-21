import css from "./priceOpt.module.css";
import soonPicProd from "../../img/soonPicProd.png";
import { useState } from "react";
import { useEffect } from "react";
import addToCart from "../../function/addToCard";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { Link } from "react-router-dom";
import transliterate from "../../function/transliterate";

export default function ProductInOpt({
  el,
  setTotalPrice,
  setHaveProduct,
  haveProduct,
  setCartCounterC,
}) {
  const [countProd, setCountProd] = useState(0);

  const changeStateDown = () => {
    setCartCounterC((prev) => prev + 1);
    if (countProd > 0) {
      if (countProd === 1) {
        let cartItems = [];

        // Отримуємо корзину з localStorage
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
          cartItems = JSON.parse(storedCart);
        }

        // Знаходимо індекс товару в корзині
        const existingProductIndex = cartItems.findIndex(
          (item) => item.uid === el.uid
        );

        if (existingProductIndex !== -1) {
          if (cartItems[existingProductIndex].quantity === 1) {
            // Видаляємо товар з корзини в localStorage, якщо його кількість дорівнює 1
            cartItems.splice(existingProductIndex, 1);
          } else {
            // Зменшуємо кількість товару в корзині в localStorage на 1
            cartItems[existingProductIndex].quantity -= 1;
          }

          // Оновлюємо корзину в localStorage
          localStorage.setItem("cart", JSON.stringify(cartItems));
        }

        setCountProd(0);
      } else {
        const newCount = countProd - 1;
        setCountProd(newCount);

        let cartItems = [];

        // Отримуємо корзину з localStorage
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
          cartItems = JSON.parse(storedCart);
        }

        // Знаходимо індекс товару в корзині
        const existingProductIndex = cartItems.findIndex(
          (item) => item.uid === el.uid
        );

        if (existingProductIndex !== -1) {
          // Зменшуємо кількість товару в корзині в localStorage на 1
          cartItems[existingProductIndex].quantity -= 1;

          // Оновлюємо корзину в localStorage
          localStorage.setItem("cart", JSON.stringify(cartItems));
        }
      }
      setHaveProduct(!haveProduct);
    }
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
    setCartCounterC((prev) => prev + 1);
    if (countProd === 0) {
      addToCart(el.uid);
      setCountProd(1);
    } else {
      let cartItems = [];

      // Отримуємо корзину з localStorage
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        cartItems = JSON.parse(storedCart);
      }

      // Знаходимо індекс товару в корзині
      const existingProductIndex = cartItems.findIndex(
        (item) => item.uid === el.uid
      );

      if (existingProductIndex !== -1) {
        // Якщо товар вже є в корзині, збільшуємо його кількість на 1 в localStorage
        cartItems[existingProductIndex].quantity += 1;

        // Оновлюємо корзину в localStorage
        localStorage.setItem("cart", JSON.stringify(cartItems));
      }

      const newCount = countProd + 1;
      setCountProd(newCount);
    }
    setHaveProduct(!haveProduct);
  };

  return (
    <div className={css.blockSoonSecond}>
      {/* <img src={el.imageList[0]} className={css.soonPicProdSt} /> */}
      <PhotoProvider>
        <PhotoView src={el.imageList[0]}>
          <img
            src={el.imageList[0]}
            alt={`${el.bookName}`}
            className={css.soonPicProdSt}
          />
        </PhotoView>
        {el.imageList.slice(1).map((item, index) => (
          <PhotoView key={index} src={item}>
            <span style={{ display: "none" }} />
          </PhotoView>
        ))}
      </PhotoProvider>
      <div className={css.soonPicProdStDesc}>
        <p className={css.soonAuthor}>{el.textAutor}</p>
        <Link
          to={`/product/${transliterate(el.bookName)}`}
          className={css.soonAuthorName}
        >
          {el.bookName}
        </Link>
        <div className={css.rombWrapSecond}>
          <div className={css.rombWrapPod}>
            <p className={css.pricePodRomb}>{el.price}</p>
            <p className={css.pricePodRombText}>грн</p>
          </div>
        </div>
        <div className={css.counterWrapSecond}>
          <div onClick={changeStateDown} className={css.boxCount}>
            -
          </div>
          <p className={css.theCount}>{countProd}</p>
          <div onClick={changeStateUp} className={css.boxCount}>
            +
          </div>
        </div>
      </div>
    </div>
  );
}
