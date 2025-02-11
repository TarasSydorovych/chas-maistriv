import css from "./catalog.module.css";
import picBook from "../../img/catfirstBook.png";

import React, { useState, useEffect } from "react";
import { db } from "../../firebase"; // Імпортуйте конфігурацію Firebase
import { doc, getDoc } from "firebase/firestore";
import { PhotoProvider, PhotoSlider, PhotoView } from "react-photo-view";
import { HandySvg } from "handy-svg";
import iconSrc from "../../svg/likeSvgSale.svg";
import iconSrcCard from "../../svg/shapCartSale.svg";
import addToCart from "../../function/addToCard";
import transliterate from "../../function/transliterate";
import { Link } from "react-router-dom";
export default function FirstBlockCat({ setCartCounterC, setLikeCounterC }) {
  const [product, setProduct] = useState(null);
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    // Отримуємо дані з localStorage
    const likedProducts =
      JSON.parse(localStorage.getItem("likedProducts")) || [];

    // Перевіряємо, чи товар є в масиві подобається
    const isLiked = likedProducts.some(
      (product) => product.uid === product.uid
    );

    // Встановлюємо відповідний стан liked
    setLiked(isLiked);
  }, []);
  useEffect(() => {
    const fetchSelectedProduct = async () => {
      const prodForCatalogDoc = await getDoc(
        doc(db, "prodForCatalog", "firstDocument")
      );
      const selectedProductId = prodForCatalogDoc.data()?.selectedProductId;

      if (selectedProductId) {
        const productDoc = await getDoc(doc(db, "product", selectedProductId));
        setProduct({ id: productDoc.id, ...productDoc.data() });
      }
    };

    fetchSelectedProduct();
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }
  const handleLike = () => {
    // Отримуємо дані з localStorage
    let likedProducts = JSON.parse(localStorage.getItem("likedProducts")) || [];

    if (!liked) {
      // Додаємо товар до масиву подобається
      setLikeCounterC((prev) => prev + 1);
      likedProducts.push(product);
    } else {
      // Видаляємо товар з масиву подобається
      setLikeCounterC((prev) => prev + 1);
      const updatedLikedProducts = likedProducts.filter(
        (product) => product.uid !== product.uid
      );
      likedProducts = updatedLikedProducts;
    }

    // Зберігаємо оновлений масив у localStorage
    localStorage.setItem("likedProducts", JSON.stringify(likedProducts));

    // Змінюємо стан liked
    setLiked(!liked);
  };
  const addingToCart = (id) => {
    addToCart(id);

    setCartCounterC((prev) => prev + 1);
  };
  return (
    <div className={css.firstBlockBooksHoNeedWrap}>
      <div className={css.firstBlockWhisPic}>
        {/* <img src={picBook} className={css.picBookTitle} /> */}
        <PhotoProvider>
          <PhotoView src={product.imageList[0]}>
            <img
              src={product.imageList[0]}
              alt={`${product.bookName}`}
              className={css.picBookTitle}
            />
          </PhotoView>
          {/* Додаємо всі зображення до PhotoView для перегляду в повноекранному режимі */}
          {product.imageList.map((item, index) => (
            <PhotoView key={index} src={item}>
              <span style={{ display: "none" }} />
            </PhotoView>
          ))}
        </PhotoProvider>
      </div>
      <div className={css.secondBlockWhisPic}>
        <Link
          to={`/product/${transliterate(product.bookName)}`}
          className={css.firstBlockBooksHoNeedH1}
        >
          {product.bookName}
        </Link>
        <div className={css.descParametr}>
          <p className={css.descForRecoPage}>Формат: {product.bookFormat}</p>
          <p className={css.descForRecoPage}>
            {" "}
            Кількість сторінок: {product.pageCount}
          </p>
          <p className={css.descForRecoPage}>
            Ілюстрації: {product.ilystracii}
          </p>
        </div>
        <p className={css.firstBlockCatPFullDesc}>{product.smallDesc}</p>
        <div className={css.wrapIconBlocCatFirst}>
          <div className={css.prdeProdPricingCart}>
            <div className={css.prdeProdPricingRotateCart}>
              {product.priceSale && (
                <p className={css.fullPriceCart}>{product.price}</p>
              )}
              {product.priceSale && (
                <p className={css.salePriceCart}>{product.priceSale}</p>
              )}
              {!product.priceSale && (
                <p className={css.salePriceCart}>{product.price}</p>
              )}
              <p className={css.fullPriceCart}>грн</p>
            </div>
          </div>
          <div className={css.likeCardWrapSmall}>
            <div
              className={
                liked ? css.likeProductSmallClick : css.likeProductSmallSale
              }
              onClick={handleLike}
            >
              <HandySvg src={iconSrc} width="34" height="31" />
            </div>
            <div
              className={css.likeProductSmallSale}
              onClick={() => addingToCart(product.uid)}
            >
              <HandySvg src={iconSrcCard} width="28.33" height="28.33" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// import React, { useState, useEffect } from "react";
// import { db } from "../../firebase"; // Імпортуйте конфігурацію Firebase
// import { doc, getDoc } from "firebase/firestore";
// import css from "./catalog.module.css";
// import { HandySvg } from "handy-svg";
// import iconSrc from "../../svg/likeSvgSale.svg";
// import iconSrcCard from "../../svg/shapCartSale.svg";

// export default function FirstBlockCat() {
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     const fetchSelectedProduct = async () => {
//       const prodForCatalogDoc = await getDoc(
//         doc(db, "prodForCatalog", "firstDocument")
//       );
//       const selectedProductId = prodForCatalogDoc.data()?.selectedProductId;

//       if (selectedProductId) {
//         const productDoc = await getDoc(doc(db, "product", selectedProductId));
//         setProduct({ id: productDoc.id, ...productDoc.data() });
//       }
//     };

//     fetchSelectedProduct();
//   }, []);

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className={css.firstBlockBooksHoNeedWrap}>
//       <div className={css.firstBlockWhisPic}>
//         <img
//           src={product.imageUrl}
//           alt={product.name}
//           className={css.picBookTitle}
//         />
//       </div>
//       <div className={css.secondBlockWhisPic}>
//         <h2 className={css.firstBlockBooksHoNeedH1}>{product.name}</h2>
//         <div className={css.descParametr}>
//           <p className={css.descForRecoPage}>Language: {product.language}</p>
//           <p className={css.descForRecoPage}>Genre: {product.genre}</p>
//           <p className={css.descForRecoPage}>Age: {product.age}</p>
//         </div>
//         <p className={css.firstBlockCatPFullDesc}>{product.description}</p>
//         <div className={css.wrapIconBlocCatFirst}>
//           <div className={css.prdeProdPricingCart}>
//             <div className={css.prdeProdPricingRotateCart}>
//               <p className={css.fullPriceCart}>{product.fullPrice}</p>
//               <p className={css.salePriceCart}>{product.salePrice}</p>
//               <p className={css.fullPriceCart}>UAH</p>
//             </div>
//           </div>
//           <div className={css.likeCardWrapSmall}>
//             <div className={css.likeProductSmallSale}>
//               <HandySvg src={iconSrc} width="34" height="31" />
//             </div>
//             <div className={css.likeProductSmallSale}>
//               <HandySvg src={iconSrcCard} width="28.33" height="28.33" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
