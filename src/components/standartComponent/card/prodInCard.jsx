import css from "./card.module.css";
import pic from "../../../img/prodInCardPic.png";
import { HandySvg } from "handy-svg";
import iconSrc from "../../../svg/deleteSrc.svg";
import arrowImp from "../../../img/arrowDownPick.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import transliterate from "../../../function/transliterate";
export default function ProdInCard({
  el,
  handleQuantityChange,
  removeProduct,
}) {
  const navigate = useNavigate();

  const [countProd, setCountProd] = useState(el.quantity);
  const changeStateDown = () => {
    if (countProd > 1) {
      const newCount = countProd - 1;
      setCountProd(newCount);
      handleQuantityChange(el.uid, newCount);
    }
  };

  const changeStateUp = () => {
    const newCount = countProd + 1;
    setCountProd(newCount);
    handleQuantityChange(el.uid, newCount);
  };

  const sendToF = () => {
    navigate(`/product/${transliterate(el.bookName)}`);
  };

  return (
    <div className={css.prodInCardWrap}>
      <img src={el.imageList[0]} className={css.bookFoto} />

      <div className={css.prodInfoWrap}>
        <h1 className={css.booksNameCard} onClick={sendToF}>
          {el.bookName}
        </h1>
        <div className={css.chousLangSelect}>
          <select className={css.customSelectInCard}>
            <option className="customOpin" value="0">
              Українською
            </option>
            <option className="customOpin" value="1">
              дітям до 4 року
            </option>
          </select>
          <img src={arrowImp} className={css.arrowDown} />
        </div>

        <div className={css.chousLangSelect}>
          <select className={css.customSelectInCard}>
            <option className="customOpin" value="0">
              Паперова
            </option>
            <option className="customOpin" value="1">
              дітям до 4 року
            </option>
          </select>
          <img src={arrowImp} className={css.arrowDown} />
        </div>

        <div className={css.counterWrap}>
          <div className={css.countPlusMinusValue}>
            <div className={css.minus} onClick={changeStateDown}>
              -
            </div>
            <div className={css.countValue}>{countProd}</div>
            <div className={css.plus} onClick={changeStateUp}>
              +
            </div>
          </div>
          <h4 className={css.price}>
            {el.price}
            <span className={css.priceSpan}>грн</span>
          </h4>
        </div>
        <div className={css.delete} onClick={() => removeProduct(el.uid)}>
          <HandySvg src={iconSrc} width="25" height="29" />
        </div>
      </div>
    </div>
  );
}
