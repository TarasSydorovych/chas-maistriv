import "./mainPage.css";
import pictureBook from "../../img/newBooks.png";
import { HandySvg } from "handy-svg";
import iconSrc from "../../svg/arrowLeft.svg";
import arrow from "../../svg/arrow.svg";
import iconSrcWhite from "../../svg/smallProductLike.svg";
import iconSrcCardWhite from "../../svg/smallProductCard.svg";
import iconSrcn from "../../svg/likeSvgSale.svg";
import iconSrcCard from "../../svg/shapCartSale.svg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsAll, fetchProducts } from "../../function/productsSlice";
import withFieldData from "../HOK/withFieldData";
import { PhotoProvider, PhotoSlider, PhotoView } from "react-photo-view";
import addToCart from "../../function/addToCard";
const NewBooks = ({ products, setCartCounterC, setLikeCounterC }) => {
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const handleArrowRightClick = () => {
    setSelectedProductIndex((prevIndex) =>
      prevIndex < products.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handleArrowLeftClick = () => {
    setSelectedProductIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };
  useEffect(() => {
    setCurrentProduct(products[selectedProductIndex]);
  }, [products, selectedProductIndex]);

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // Отримуємо дані з localStorage
    const likedProducts =
      JSON.parse(localStorage.getItem("likedProducts")) || [];

    // Перевіряємо, чи товар є в масиві подобається
    if (currentProduct) {
      const isLiked = likedProducts.some(
        (product) => product.uid === currentProduct.uid
      );

      // Встановлюємо відповідний стан liked
      setLiked(isLiked);
    }
  }, []);
  const handleLike = () => {
    // Отримуємо дані з localStorage
    let likedProducts = JSON.parse(localStorage.getItem("likedProducts")) || [];

    if (!liked) {
      // Додаємо товар до масиву подобається
      setLikeCounterC((prev) => prev + 1);
      likedProducts.push(currentProduct);
    } else {
      // Видаляємо товар з масиву подобається
      setLikeCounterC((prev) => prev + 1);
      const updatedLikedProducts = likedProducts.filter(
        (product) => product.uid !== currentProduct.uid
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
  const openPhotoViewer = (index) => {
    setSelectedPhotoIndex(index);
    // Simulate a click on the image to open it in full screen
    document.querySelector(`#photo-${index}`).click();
  };
  return (
    <div className="newBooksWrapBlock">
      {currentProduct && (
        <>
          <div className="yellowBorderWrap">
            <div className="imgPictureBox">
              {/* <img
                src={currentProduct.imageList[0]}
                className="newBookImgImg"
                alt={`${currentProduct.bookName}`}
              /> */}
              <PhotoProvider>
                <PhotoView src={currentProduct.imageList[0]}>
                  <img
                    src={currentProduct.imageList[0]}
                    alt={`${currentProduct.bookName}`}
                    className="productBigPictureImg"
                  />
                </PhotoView>
                {/* Додаємо всі зображення до PhotoView для перегляду в повноекранному режимі */}
                {currentProduct.imageList.map((item, index) => (
                  <PhotoView key={index} src={item}>
                    <span style={{ display: "none" }} />
                  </PhotoView>
                ))}
              </PhotoProvider>
              <div className="markerNew">Новеньке</div>
            </div>
            <HandySvg
              onClick={handleArrowLeftClick}
              className="arrowLeft"
              src={iconSrc}
              width="42"
              height="40"
            />
          </div>
          <div className="blueBorderWrap">
            <div className="infoPredProdagNewBooks">
              <h1 className="nameBooksNewBooks">Новинки</h1>
              <h2 className="nameBooksNew">{currentProduct.bookName}</h2>
              <div className="autorInformNew">
                <div className="wrapInFgAuthQW">
                  <div className="autorInformSection">
                    <p>Автор:&nbsp;</p>
                    <h4>{currentProduct.textAutor}</h4>
                  </div>

                  <div className="autorInformSection">
                    <p>Художник:&nbsp;</p>
                    <h4>{currentProduct.bDesign}</h4>
                  </div>
                </div>
                <div className="autorInformSectionTwo">
                  <p>Вік:&nbsp;</p>
                  <h4>{currentProduct.yearGroup.join(", ")}</h4>
                </div>
              </div>
              <p className="descriptionBooksNew">
                {currentProduct.descriptionSe}
              </p>
              <div className="blockOrderBooksWrap">
                <div className="prodPricLikeCartNovun">
                  <div className="prdeProdPricingCartSale">
                    <div className="prdeProdPricingRotateCart">
                      <p className="salePriceCartSale">
                        {currentProduct.price}
                      </p>
                      <p className="fullPriceCartG">грн</p>
                    </div>
                  </div>
                  <div className="likeCardWrapSmall">
                    <div
                      className="likeProductSmallSaleNovu"
                      onClick={() => addingToCart(currentProduct.uid)}
                    >
                      <HandySvg
                        src={iconSrcCardWhite}
                        width="28.33"
                        height="28.33"
                      />
                    </div>
                    <div
                      className={`likeProductSmallSaleNovuGr${
                        liked ? "Click" : ""
                      }`}
                      onClick={handleLike}
                    >
                      <HandySvg src={iconSrcWhite} width="34" height="31" />
                    </div>
                  </div>
                </div>

                <HandySvg
                  onClick={handleArrowRightClick}
                  src={arrow}
                  className="arrovIconBanner"
                  width="52"
                  height="49.56"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default withFieldData("isNew", "product", "true")(NewBooks);
