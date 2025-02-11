import "./productStyle.css";
import ProductPic from "../../../img/smaPicCart.png";
import { HandySvg } from "handy-svg";
import iconSrc from "../../../svg/howSay.svg";
import iconSrcCard from "../../../svg/cardHowSay.svg";
import { Link, NavLink } from "react-router-dom";
import addToCart from "../../../function/addToCard";
import { useEffect, useState } from "react";
import transliterate from "../../../function/transliterate";
import { PhotoProvider, PhotoSlider, PhotoView } from "react-photo-view";
export default function ProductNewReview({
  el,
  setAddressChanged,
  setCartCounterC,
  setLikeCounterC,
}) {
  const [liked, setLiked] = useState(false);
  const addingToCart = (id) => {
    addToCart(id);

    setCartCounterC((prev) => prev + 1);
  };
  const handleLike = () => {
    // Отримуємо дані з localStorage
    let likedProducts = JSON.parse(localStorage.getItem("likedProducts")) || [];

    if (!liked) {
      // Додаємо товар до масиву подобається
      setLikeCounterC((prev) => prev + 1);
      likedProducts.push(el);
    } else {
      setLikeCounterC((prev) => prev + 1);
      // Видаляємо товар з масиву подобається
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
  useEffect(() => {
    // Отримуємо дані з localStorage
    const likedProducts =
      JSON.parse(localStorage.getItem("likedProducts")) || [];

    // Перевіряємо, чи товар є в масиві подобається
    const isLiked = likedProducts.some((product) => product.uid === el.uid);

    // Встановлюємо відповідний стан liked
    setLiked(isLiked);
  }, []);
  return (
    <div className="smallProductWrap">
      {/* <img src={el.imageList[0]} className="productPicSmall" /> */}
      <PhotoProvider>
        <PhotoView src={el.imageList[0]}>
          <img
            src={el.imageList[0]}
            alt={`${el.bookName}`}
            className="productPicSmall"
          />
        </PhotoView>
        {/* Додаємо всі зображення до PhotoView для перегляду в повноекранному режимі */}
        {el.imageList.map((item, index) => (
          <PhotoView key={index} src={item}>
            <span style={{ display: "none" }} />
          </PhotoView>
        ))}
      </PhotoProvider>
      <div className="prodPricLikeCart">
        <div className="prdeProdPricingCatalogSale">
          <div className="prdeProdPricingRotateCart">
            <p className="salePriceCartSale">{el.price}</p>
            <p className="fullPriceCart">грн</p>
          </div>
        </div>
        <div className="likeCardWrapSmall">
          <div
            className={`likeProductSmallCatalog${liked ? "Click" : ""}`}
            onClick={handleLike}
          >
            <HandySvg src={iconSrc} width="34" height="31" />
          </div>
          <div className="likeProductSmallCatalog">
            <HandySvg
              src={iconSrcCard}
              width="28.33"
              height="28.33"
              onClick={() => addingToCart(el.uid)}
            />
          </div>
        </div>
      </div>
      <h2 className="smallProdNameSaleYouLike">
        <Link
          className="smallProdNameSaleYouLike"
          to={`/product/${transliterate(el.bookName)}`}
          onClick={() => setAddressChanged(true)}
        >
          {el.bookName}
        </Link>
      </h2>

      <div className="autorInformCart">
        <div className="autorInformSectionCart">
          <p className="porodForCatP">
            {" "}
            Автор:&nbsp;<span className="porodForCatPSpan">{el.textAutor}</span>
          </p>
        </div>
        <div className="autorInformSectionCart">
          <p className="porodForCatP">
            Художник:&nbsp;
            <span className="porodForCatPSpan">{el.picWriter}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
