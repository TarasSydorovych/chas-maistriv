import css from "./like.module.css";
import { HandySvg } from "handy-svg";
import pic from "../../img/picprodff.png";
import iconSrc from "../../svg/smallProductLike.svg";
import iconSrcCard from "../../svg/smallProductCard.svg";
import audio from "../../svg/audioSvg.svg";
import addToCart from "../../function/addToCard";
import { useNavigate } from "react-router-dom";
import transliterate from "../../function/transliterate";
import { PhotoProvider, PhotoSlider, PhotoView } from "react-photo-view";
export default function ProductToLike({
  el,
  handleRemove,
  setCartCounterC,
  setLikeCounterC,
}) {
  const navigate = useNavigate();
  const addingToCart = (id) => {
    addToCart(id);

    setCartCounterC((prev) => prev + 1);
  };

  const sendToF = () => {
    navigate(`/product/${transliterate(el.bookName)}`);
  };
  return (
    <div className={css.productWrap}>
      {/* <img src={el.imageList[0]} className={css.likePicWrap} /> */}
      <PhotoProvider>
        <PhotoView src={el.imageList[0]}>
          <img
            src={el.imageList[0]}
            alt={`${el.bookName}`}
            className={css.likePicWrap}
          />
        </PhotoView>
        {/* Додаємо всі зображення до PhotoView для перегляду в повноекранному режимі */}
        {el.imageList.map((item, index) => (
          <PhotoView key={index} src={item}>
            <span style={{ display: "none" }} />
          </PhotoView>
        ))}
      </PhotoProvider>
      <div className={css.dexcriptionProdactWrap}>
        <h1 className={css.h1DescName} onClick={sendToF}>
          {el.bookName}
        </h1>
        <p className={css.autorDesc}>
          Автор:&nbsp;<span className={css.autorDescSpan}>{el.textAutor}</span>
        </p>
        <p className={css.autorDesc}>
          Художник:&nbsp;<span className={css.autorDescSpan}>{el.bDesign}</span>
        </p>
        <p className={css.powerBook}>Сила</p>
        <p className={css.powerBookDesc} sendToF>
          {el.bookPower}
        </p>
        <p className={css.smallDescription}>Вік: {el.yearGroup}</p>
        <p className={css.smallDescription}>Жанр: {el.ganr}</p>
        <p className={css.smallDescription}>Призначення: {el.forWho}</p>
      </div>

      <div className={css.iconWithPrice}>
        <div className={css.rombWrap}>
          <div className={css.rombWrapRotate}>
            <p className={css.salePriceCartBigProd}>{el.price}</p>
            <p className={css.fullPriceCartBigProd}>грн</p>
          </div>
        </div>
        <div className={css.wrapIconAu}>
          <div
            className={css.likeProductBig}
            onClick={() => handleRemove(el.uid)}
          >
            <HandySvg src={iconSrc} width="34" height="31" />
          </div>
          <div
            className={css.likeProductBig}
            onClick={() => addingToCart(el.uid)}
          >
            <HandySvg src={iconSrcCard} width="28.33" height="28.33" />
          </div>
        </div>
      </div>
    </div>
  );
}
