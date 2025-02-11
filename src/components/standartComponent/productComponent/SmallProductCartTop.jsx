import "./productStyle.css";
import ProductPic from "../../../img/smaPicCart.png";
import { HandySvg } from "handy-svg";
import iconSrc from "../../../svg/smallProductLike.svg";
import iconSrcCard from "../../../svg/smallProductCard.svg";
import { useState, useEffect } from "react";
import addToCart from "../../../function/addToCard";
import { Link } from "react-router-dom";
import transliterate from "../../../function/transliterate";
import { PhotoProvider, PhotoSlider, PhotoView } from "react-photo-view";
export default function SmallProductCartTop({
  el,
  setCartCounterC,
  setLikeCounterC,
}) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // Отримуємо дані з localStorage
    const likedProducts =
      JSON.parse(localStorage.getItem("likedProducts")) || [];

    // Перевіряємо, чи товар є в масиві подобається
    const isLiked = likedProducts.some((product) => product.uid === el.uid);

    // Встановлюємо відповідний стан liked
    setLiked(isLiked);
  }, []);
  const handleLike = () => {
    // Отримуємо дані з localStorage
    let likedProducts = JSON.parse(localStorage.getItem("likedProducts")) || [];

    if (!liked) {
      // Додаємо товар до масиву подобається
      setLikeCounterC((prev) => prev + 1);
      likedProducts.push(el);
    } else {
      // Видаляємо товар з масиву подобається
      setLikeCounterC((prev) => prev + 1);
      const updatedLikedProducts = likedProducts.filter(
        (product) => product.uid !== el.uid
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
    <div className="smallProductWrap">
      {/* <img src={el.imageList[0]} className="productPicSmall" /> */}
      {/* <PhotoProvider>
        <PhotoView src={el.imageList[0]}>
          <img
            src={el.imageList[0]}
            alt={`${el.bookName}`}
            className="productPicSmall"
          />
        </PhotoView>
     
        {el.imageList.map((item, index) => (
          <PhotoView key={index} src={item}>
            <span style={{ display: "none" }} />
          </PhotoView>
        ))}
      </PhotoProvider> */}
      <PhotoProvider>
        <PhotoView src={el.imageList[0]}>
          <img
            src={el.imageList[0]}
            alt={`${el.bookName}`}
            className="productBigPictureImg"
          />
        </PhotoView>
        {/* Додаємо всі зображення до PhotoView для перегляду в повноекранному режимі, окрім першого */}
        {el.imageList.slice(1).map((item, index) => (
          <PhotoView key={index} src={item}>
            <span style={{ display: "none" }} />
          </PhotoView>
        ))}
      </PhotoProvider>
      <div className="prodPricLikeCart">
        <div className="prdeProdPricingCartTop">
          <div className="prdeProdPricingRotateCart">
            <p className="salePriceCartSale">{el.price}</p>
            <p className="fullPriceCartG">грн</p>
          </div>
        </div>
        <div className="likeCardWrapSmall">
          <div
            className={`likeProductSmallSale${liked ? "Click" : ""}`}
            onClick={handleLike}
          >
            <HandySvg src={iconSrc} width="34" height="31" />
          </div>
          <div
            className="likeProductSmallSale"
            onClick={() => addingToCart(el.uid)}
          >
            <HandySvg src={iconSrcCard} width="28.33" height="28.33" />
          </div>
        </div>
      </div>
      <h2 className="smallProdName">
        <Link
          className="smallProdName"
          to={`/product/${transliterate(el.bookName)}`}
        >
          {el.bookName}
        </Link>
      </h2>

      <div className="autorInformCart">
        <div className="autorInformSectionCart">
          <p>Автор:&nbsp;</p>
          <h4>{el.textAutor}</h4>
        </div>
        <div className="autorInformSectionCart">
          <p>Художник:&nbsp;</p>
          <h4>{el.picWriter}</h4>
        </div>
      </div>
      <Link
        to={`/product/${transliterate(el.bookName)}`}
        className="descriptionBooksCart"
      >
        {el.smallDesc}
      </Link>
    </div>
  );
}
