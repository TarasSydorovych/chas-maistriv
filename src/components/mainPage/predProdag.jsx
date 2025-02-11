import pic from "../../img/predProd.png";
import arrow from "../../svg/arrow.svg";
import "./mainPage.css";
import { HandySvg } from "handy-svg";
import React, { useState, useEffect } from "react";
import transliterate from "../../function/transliterate";
import { Link, useNavigate } from "react-router-dom";
import addToCart from "../../function/addToCard";
import withFieldData from "../HOK/withFieldData";
import { PhotoProvider, PhotoSlider, PhotoView } from "react-photo-view";
const PredProdag = ({ products, windowDimensions, setCartCounterC }) => {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0 });
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isExpired, setIsExpired] = useState(false);

  const [targetDate, setTargetDate] = useState("");
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (currentProduct) {
  //     const intervalId = setInterval(() => {
  //       const timeDiff = targetDate - new Date();
  //       const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  //       const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
  //       const minutes = Math.floor((timeDiff / 1000 / 60) % 60);

  //       setCountdown({ days, hours, minutes });

  //       if (timeDiff <= 0) {
  //         clearInterval(intervalId);
  //       }
  //     }, 1000);

  //     return () => clearInterval(intervalId);
  //   }
  // }, [targetDate]);
  useEffect(() => {
    if (currentProduct) {
      const intervalId = setInterval(() => {
        const timeDiff = targetDate - new Date();

        if (timeDiff <= 0) {
          setIsExpired(true);
          clearInterval(intervalId);
        } else {
          const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
          setCountdown({ days, hours, minutes });
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [targetDate]);
  useEffect(() => {
    setCurrentProduct(products[currentProductIndex]);

    if (products.length > 0) {
      const predprodDate = new Date(products[currentProductIndex].predprodDate);
      setTargetDate(predprodDate);
    }
  }, [products, currentProductIndex]);

  const handleNextProduct = () => {
    setCurrentProductIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= products.length ? 0 : nextIndex;
    });
  };
  const orderPredProdag = () => {
    addToCart(currentProduct.uid);
    setCartCounterC((prev) => prev + 1);
    navigate("/order");
  };

  const openPhotoViewer = (index) => {
    setSelectedPhotoIndex(index);
    document.querySelector(`#photo-${index}`).click();
  };

  return (
    <>
      {windowDimensions && (
        <div className="predProdazWrap">
          {currentProduct && (
            <>
              <div className="imgPredProdag">
                {/* <div className="imgRelDiv">
               
                  <PhotoProvider>
                    {currentProduct.imageList.map((item, index) => (
                      <PhotoView key={index} src={item}>
                        <img
                          id={`photo-${index}`}
                          src={item}
                          alt={`Product image ${index + 1}`}
                          className="imgRelDivImg"
                        />
                      </PhotoView>
                    ))}
                  </PhotoProvider>
                  <div className="prdeProdPricing">
                    <div className="prdeProdPricingRotate">
                      <p className="fullPriceKr">
                        {currentProduct.priceSale}грн
                      </p>
                      <h2 className="salePrice">{currentProduct.price}</h2>
                      <p className="fullPrice">грн</p>
                    </div>
                  </div>
                </div> */}
                <div className="imgRelDiv">
                  <PhotoProvider>
                    <PhotoView src={currentProduct.imageList[0]}>
                      <img
                        src={currentProduct.imageList[0]}
                        alt={`${currentProduct.bookName}`}
                        className="productPicSmall"
                      />
                    </PhotoView>
                    {/* Додаємо всі зображення до PhotoView для перегляду в повноекранному режимі */}
                    {currentProduct.imageList.map((item, index) => (
                      <PhotoView key={index} src={item}>
                        <span style={{ display: "none" }} />
                      </PhotoView>
                    ))}
                  </PhotoProvider>
                </div>
              </div>

              <div className="infoPredProdag">
                <div className="timerWrap">
                  <div className="redBlock">
                    <h1>Предпродаж</h1>
                  </div>
                  <div className="timerBlue">
                    {/* <h2>Заллишилось</h2>
                    <div className="timer">
                      <div className="time">
                        <h1>{countdown.days}</h1>
                        <h2>День</h2>
                      </div>
                      <div className="time">
                        <h1>{countdown.hours}</h1>
                        <h2>Годин</h2>
                      </div>
                      <div className="time">
                        <h1>{countdown.minutes}</h1>
                        <h2>Хвилини</h2>
                      </div>
                    </div> */}
                    {isExpired ? (
                      <div className="timer">
                        <div className="time">
                          <h2>Предпродаж закінчився</h2>
                        </div>
                      </div>
                    ) : (
                      <>
                        {" "}
                        <h2>Залишилось</h2>
                        <div className="timer">
                          <div className="time">
                            <h1>{countdown.days}</h1>
                            <h2>Днів</h2>
                          </div>
                          <div className="time">
                            <h1>{countdown.hours}</h1>
                            <h2>Годин</h2>
                          </div>
                          <div className="time">
                            <h1>{countdown.minutes}</h1>
                            <h2>Хвилини</h2>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <h1 className="nameBooks">
                  <Link
                    className="nameBooks"
                    // to={`/product/${currentProduct.uid}`}
                    to={`/product/${transliterate(currentProduct.bookName)}`}
                  >
                    {currentProduct.bookName}
                  </Link>
                </h1>
                <div className="autorInform">
                  <div className="wrapInFgAuth">
                    <div className="autorInformSection">
                      <p>Автор:&nbsp;</p>
                      <h4>{currentProduct.textAutor}</h4>
                    </div>

                    <div className="autorInformSection">
                      <p>Художник:&nbsp;</p>
                      <h4>{currentProduct.bDesign}</h4>
                    </div>
                  </div>
                  <div className="autorInformSection">
                    <p>Вік:&nbsp;</p>

                    <h4>{currentProduct.yearGroup.join(", ")}</h4>
                  </div>
                </div>
                <p className="descriptionBooks">
                  {currentProduct.descriptionSe}
                </p>
                <div className="blockOrderBooksWrap">
                  <button
                    className="kOrderBooksPredButton"
                    onClick={orderPredProdag}
                  >
                    Замовити
                  </button>

                  <HandySvg
                    onClick={handleNextProduct}
                    src={arrow}
                    className="arrovIconBanner"
                    width="52"
                    height="49.56"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      )}
      {!windowDimensions && (
        <div className="predProdazWrap">
          {currentProduct && (
            <>
              <div className="timerWrap">
                <div className="redBlock">
                  <h1>Предпродаж</h1>
                </div>
                <div className="timerBlue">
                  <h2>Заллишилось</h2>
                  <div className="timer">
                    <div className="time">
                      <h1>{countdown.days}</h1>
                      <h2>День</h2>
                    </div>
                    <div className="time">
                      <h1>{countdown.hours}</h1>
                      <h2>Годин</h2>
                    </div>
                    <div className="time">
                      <h1>{countdown.minutes}</h1>
                      <h2>Хвилини</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="imgPredProdag">
                <div className="imgRelDiv">
                  {/* <img
                    src={currentProduct.imageList[0]}
                    className="imgRelDivImg"
                    alt={`${currentProduct.bookName}`}
                  /> */}
                  <PhotoProvider>
                    {currentProduct.imageList.map((item, index) => (
                      <PhotoView key={index} src={item}>
                        <img
                          id={`photo-${index}`}
                          src={item}
                          alt={`Product image ${index + 1}`}
                          className="imgRelDivImg"
                        />
                      </PhotoView>
                    ))}
                  </PhotoProvider>
                  <div className="prdeProdPricing">
                    <div className="prdeProdPricingRotate">
                      <p className="fullPriceKr">
                        {currentProduct.priceSale}грн
                      </p>
                      <h2 className="salePrice">{currentProduct.price}</h2>
                      <p className="fullPrice">грн</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="blockOrderBooksWrap">
                <button
                  className="kOrderBooksPredButton"
                  onClick={orderPredProdag}
                >
                  Замовити
                </button>

                <HandySvg
                  onClick={handleNextProduct}
                  src={arrow}
                  className="arrovIconBanner"
                  width="52"
                  height="49.56"
                />
              </div>

              <div className="infoPredProdag">
                <h1 className="nameBooks">
                  <Link
                    className="nameBooks"
                    to={`/product/${currentProduct.uid}`}
                  >
                    {currentProduct.bookName}
                  </Link>
                </h1>
                <div className="autorInform">
                  <div className="autorInformSection">
                    <p>Автор:&nbsp;</p>
                    <h4>{currentProduct.textAutor}</h4>
                  </div>

                  <div className="autorInformSection">
                    <p>Художник:&nbsp;</p>
                    <h4>{currentProduct.bDesign}</h4>
                  </div>
                  <div className="autorInformSection">
                    <p>Вік:&nbsp;</p>
                    <h4>{currentProduct.yearGroup}</h4>
                  </div>
                </div>
                <p className="descriptionBooks">{currentProduct.smallDesc}</p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
export default withFieldData("predprodag", "product", "true")(PredProdag);
