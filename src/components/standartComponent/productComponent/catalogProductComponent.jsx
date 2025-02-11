import "./productStyle.css";
import pic from "../../../img/pictureBigProdCat.png";
import css from "../../catalog/catalog.module.css";
import { HandySvg } from "handy-svg";
import iconSrc from "../../../svg/smallProductLike.svg";
import iconSrcCard from "../../../svg/smallProductCard.svg";
import { Link } from "react-router-dom";
import addToCart from "../../../function/addToCard";
import { useState, useEffect } from "react";
import transliterate from "../../../function/transliterate";
import { PhotoProvider, PhotoSlider, PhotoView } from "react-photo-view";
export default function CatalogProductComponent({
  el,
  index,
  setVisitedProducts,
  visitedProducts,
  setCartCounterC,
  setLikeCounterC,
}) {
  const handleProductClick = (product) => {
    const productId = product;
    // перевіряємо, чи ідентифікатор продукту вже зберігається в масиві visitedProducts
    if (!visitedProducts.includes(productId)) {
      const newVisitedProducts = [...visitedProducts, productId];
      setVisitedProducts(newVisitedProducts);
      // зберігаємо список відвіданих продуктів в localStorage
      localStorage.setItem(
        "visitedProducts",
        JSON.stringify(newVisitedProducts)
      );
    }
  };
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
    <div className="productBigInCatWrap">
      <div className="productBigPicture">
        <div className="productBigPictureImgWrap">
          {/* <img src={el.imageList[0]} className="productBigPictureImg" /> */}
          {/* <PhotoProvider>
            <PhotoView src={el.imageList[0]}>
              <img
                src={el.imageList[0]}
                alt={`${el.bookName}`}
                className="productBigPictureImg"
              />
            </PhotoView> */}
          {/* Додаємо всі зображення до PhotoView для перегляду в повноекранному режимі */}
          {/* {el.imageList.map((item, index) => (
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
          {el.top === "true" && (
            <div className="topBooksMonthLabel">ТОП місяця</div>
          )}
          {el.bookYear === "true" && (
            <div className="topBooksYersLabel">Книга року</div>
          )}
          {el.novunka === "true" && (
            <div className="newBooksLabel">Новинка</div>
          )}
        </div>
      </div>
      <div className="productBigDescription">
        <div className="autorAndHud">
          <p className="autorAndHudP">
            Автор: <span className="autorAndHudPSpan">{el.textAutor}</span>
          </p>
          <p className="autorAndHudP">
            Художник: <span className="autorAndHudPSpan">{el.picWriter}</span>
          </p>
        </div>
        <h1
          className="bookTitleBigProd"
          onClick={() => handleProductClick(el.uid)}
        >
          <Link
            className="bookTitleBigProd"
            to={`/product/${transliterate(el.bookName)}`}
          >
            {" "}
            {el.bookName}
          </Link>
        </h1>
        <div className="pawerWrapBlock">
          {/* <p className="power">Сила</p>
          <p className="powerDescripProdBig">{el.bookPower}</p> */}
          <br />
          <Link
            to={`/product/${transliterate(el.bookName)}`}
            className="powerDescripProdBig"
          >
            {el.descriptionSe}
          </Link>
        </div>
        <div className="ageLanguageWrapBlock">
          <p className="ageLanguagePBigProd">Формат: {el.bookFormat}</p>
          <p className="ageLanguagePBigProd">
            Кількість сторінок: {el.pageCount}
          </p>
          <p className="ageLanguagePBigProd">Ілюстрації: {el.ilystracii}</p>
          {/* <p className="ageLanguagePBigProd">Призначення: {el.forWho}</p> */}
        </div>

        <div className={css.prodPricLikeCartBigProd}>
          <div className="prdeProdPricingCartBigProd">
            <div className="prdeProdPricingRotateCart">
              <p className="salePriceCartBigProd">{el.price}</p>
              <p className="fullPriceCartBigProd">грн</p>
            </div>
          </div>
          <div className="likeCardWrapSmall">
            <div
              className={`likeProductBig${liked ? "Click" : ""}`}
              onClick={handleLike}
            >
              <HandySvg src={iconSrc} width="34" height="31" />
            </div>
            <div
              className="likeProductBig"
              onClick={() => addingToCart(el.uid)}
            >
              <HandySvg src={iconSrcCard} width="28.33" height="28.33" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
