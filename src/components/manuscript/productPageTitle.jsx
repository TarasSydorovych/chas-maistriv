import css from "./product.module.css";
import icon from "../../img/productPageImg.png";
import { HandySvg } from "handy-svg";
import iconSrc from "../../svg/smallProductLike.svg";
import iconSrcCard from "../../svg/smallProductCard.svg";
import audio from "../../svg/audioSvg.svg";
import arrow from "../../img/arrowToSvg.png";
import autorPic from "../../img/productAutorPic.png";
import addToCart from "../../function/addToCard";
import { useState, useEffect } from "react";
export default function ProductPageTitle({ oneProd }) {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    // Отримуємо дані з localStorage
    const likedProducts =
      JSON.parse(localStorage.getItem("likedProducts")) || [];

    // Перевіряємо, чи товар є в масиві подобається
    const isLiked = likedProducts.some(
      (product) => product.uid === oneProd.uid
    );

    // Встановлюємо відповідний стан liked
    setLiked(isLiked);
  }, []);
  const handleLike = () => {
    // Отримуємо дані з localStorage
    let likedProducts = JSON.parse(localStorage.getItem("likedProducts")) || [];

    if (!liked) {
      // Додаємо товар до масиву подобається

      likedProducts.push(oneProd);
    } else {
      // Видаляємо товар з масиву подобається
      const updatedLikedProducts = likedProducts.filter(
        (product) => product.uid !== oneProd.uid
      );
      likedProducts = updatedLikedProducts;
    }

    // Зберігаємо оновлений масив у localStorage
    localStorage.setItem("likedProducts", JSON.stringify(likedProducts));

    // Змінюємо стан liked
    setLiked(!liked);
  };

  return (
    <div className={css.productPageTitleWrap}>
      <div className={css.productPicWrap}>
        <div className={css.imgWrap}>
          <img src={oneProd.bookFoto} className={css.icon} />
        </div>
      </div>
      <div className={css.productTitleWrap}>
        <p className="autorAndHudP">
          Дітям:{" "}
          <span className="autorAndHudPSpan">
            {oneProd.yearGroup.join(", ")} років
          </span>
        </p>
        <p className="autorAndHudP">
          Унікальні читачі:{" "}
          <span className="autorAndHudPSpan">{oneProd.rating}</span>
        </p>
        <h1 className={css.nameBook}>{oneProd.bookName}</h1>
        <div className={css.wrapHud}>
          <p className={css.autor}>
            Автор:&nbsp;
            <span className={css.autorNameSpan}>
              {oneProd.textAutor} &nbsp;
            </span>
          </p>
          <div className={css.pidWrap}>
            <p className={css.descP}>
              Фізичні характеристики: {oneProd.priceMas}, {oneProd.pageCount}{" "}
              стр,{oneProd.bookFormat} мм, {oneProd.ilystracii},{" "}
              {oneProd.booksWei} гр, {oneProd.bookLanguage}, дизайн{" "}
              {oneProd.bDesign}
            </p>
            <p className={css.descP}>Жанр: {oneProd.ganr}</p>
            <p className={css.descP}>Призначення: {oneProd.forWho}</p>
          </div>
        </div>
        <div className={css.powerWrap}>
          <p className={css.power}>Сила</p>
          <p className={css.powerDesc}>{oneProd.bookPower}</p>
          <br />
        </div>
        <p className={css.opusBook}> {oneProd.descriptionSe}</p>
      </div>
    </div>
  );
}
