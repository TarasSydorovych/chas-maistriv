// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { HandySvg } from "handy-svg";
// import { useMediaQuery } from "react-responsive";
// import { collection, query, where, getDocs } from "firebase/firestore";
// import { PhotoProvider, PhotoView } from "react-photo-view";
// import "react-photo-view/dist/react-photo-view.css";
// import css from "./product.module.css";
// import iconSrc from "../../svg/smallProductLike.svg";
// import iconSrcCard from "../../svg/smallProductCard.svg";
// import audio from "../../svg/newIconBooks.svg";
// import ead from "../../img/ease.png";
// import hearing from "../../img/hearing.png";
// import bookPNG from "../../img/bookPNG.png";
// import arrow from "../../img/arrowToSvg.png";
// import autorPic from "../../img/productAutorPic.png";
// import addToCart from "../../function/addToCard";
// import MusicPop from "../popUp/musicPop";
// import { db } from "../../firebase";

// export default function ProductPageTitle({
//   oneProd,
//   setCartCounterC,
//   setLikeCounterC,
// }) {
//   const [liked, setLiked] = useState(false);
//   const [heroData, setHeroData] = useState(null);
//   const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
//   const [showPlayer, setShowPlayer] = useState(false);
//   const isMobile = useMediaQuery({ maxWidth: 767 });

//   useEffect(() => {
//     const fetchHeroData = async () => {
//       try {
//         const heroQuery = query(
//           collection(db, "author"),
//           where("name", "==", oneProd.textAutor)
//         );
//         const querySnapshot = await getDocs(heroQuery);

//         querySnapshot.forEach((doc) => {
//           const heroData = doc.data();
//           setHeroData(heroData);
//         });
//       } catch (error) {
//         console.error("Помилка при отриманні документів:", error);
//       }
//     };

//     fetchHeroData();
//   }, [oneProd.textAutor]);

//   useEffect(() => {
//     const likedProducts =
//       JSON.parse(localStorage.getItem("likedProducts")) || [];
//     const isLiked = likedProducts.some(
//       (product) => product.uid === oneProd.uid
//     );
//     setLiked(isLiked);
//   }, [oneProd.uid]);

//   const handleLike = () => {
//     let likedProducts = JSON.parse(localStorage.getItem("likedProducts")) || [];

//     if (!liked) {
//       setLikeCounterC((prev) => prev + 1);
//       likedProducts.push(oneProd);
//     } else {
//       likedProducts = likedProducts.filter(
//         (product) => product.uid !== oneProd.uid
//       );
//       setLikeCounterC((prev) => prev + 1);
//     }

//     localStorage.setItem("likedProducts", JSON.stringify(likedProducts));
//     setLiked(!liked);
//   };

//   const handleClick = () => {
//     setShowPlayer(!showPlayer);
//   };

//   const openPhotoViewer = (index) => {
//     setSelectedPhotoIndex(index);
//     // Simulate a click on the image to open it in full screen
//     document.querySelector(`#photo-${index}`).click();
//   };

//   return (
//     <div className={css.productPageTitleWrap}>
//       <div className={css.productPicWrap}>
//         <div className={css.imgWrap}>
//           {/* <PhotoProvider>
//             {oneProd.imageList.map((item, index) => (
//               <PhotoView key={index} src={item}>
//                 <img
//                   id={`photo-${index}`}
//                   src={item}
//                   alt={`Product image ${index + 1}`}
//                   className={css.icon}
//                 />
//               </PhotoView>
//             ))}
//           </PhotoProvider> */}
//           {/* <PhotoProvider>
//             <PhotoView src={oneProd.imageList[0]}>
//               <img
//                 src={oneProd.imageList[0]}
//                 alt={`${oneProd.bookName}`}
//                 className="productBigPictureImg"
//               />
//             </PhotoView> */}
//           {/* Додаємо всі зображення до PhotoView для перегляду в повноекранному режимі */}
//           {/* {oneProd.imageList.map((item, index) => (
//               <PhotoView key={index} src={item}>
//                 <span style={{ display: "none" }} />
//               </PhotoView>
//             ))}

//           </PhotoProvider> */}
//           <PhotoProvider>
//             <PhotoView src={oneProd.imageList[0]}>
//               <img
//                 src={oneProd.imageList[0]}
//                 alt={`${oneProd.bookName}`}
//                 className="productBigPictureImg"
//               />
//             </PhotoView>
//             {/* Додаємо всі зображення до PhotoView для перегляду в повноекранному режимі, окрім першого */}
//             {oneProd.imageList.slice(1).map((item, index) => (
//               <PhotoView key={index} src={item}>
//                 <span style={{ display: "none" }} />
//               </PhotoView>
//             ))}
//           </PhotoProvider>
//           <div className={css.insWrap} onClick={() => openPhotoViewer(0)}>
//             <div className={css.insWrpaimg}>
//               <img src={ead} alt="ins" />
//               <img src={ead} alt="ins" />
//             </div>
//             <p className={css.insaidP}>INSAID</p>
//           </div>

//           <div className={css.insWrapHE} onClick={handleClick}>
//             <img src={hearing} alt="hearing" />
//             <p className={css.insaidP}>LISTEN</p>
//           </div>

//           {showPlayer && <MusicPop oneProd={oneProd.audio} />}

//           <a href={oneProd.pdf} target="_blank" rel="noopener noreferrer">
//             <div className={css.insWrapHER}>
//               <img src={bookPNG} alt="read" />
//               <p className={css.insaidP}>READ</p>
//             </div>
//           </a>

//           {oneProd.novunka === "true" && <div className={css.new}>Новинка</div>}
//           {oneProd.laureat === "true" && (
//             <div className={css.laureat}>Лауреат Корнійчуковської премії</div>
//           )}
//         </div>
//         <div className={css.iconWithPrice}>
//           <div className={css.rombWrap}>
//             <div className={css.rombWrapRotate}>
//               <p className="salePriceCartBigProd">{oneProd.price}</p>
//               <p className="fullPriceCartBigProd">грн</p>
//             </div>
//           </div>
//           <div className={css.wrapIconAu}>
//             <div
//               className={`likeProductBig${liked ? "Click" : ""}`}
//               onClick={handleLike}
//             >
//               <HandySvg src={iconSrc} width="34" height="31" />
//             </div>
//             <div
//               className="likeProductBig"
//               onClick={() => addToCart(oneProd.uid)}
//             >
//               <HandySvg src={iconSrcCard} width="28.33" height="28.33" />
//             </div>
//             <div className={css.audioBook}>
//               <HandySvg src={audio} width="36.24" height="28" />
//               <img src={arrow} alt="arrow" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {oneProd && (
//         <div className={css.productTitleWrap}>
//           <h1 className={css.nameBook}>{oneProd.bookName}</h1>
//           <div className={css.wrapHud}>
//             <p className={css.autor}>
//               Автор:&nbsp;
//               <span className={css.autorNameSpan}>
//                 {heroData ? (
//                   <Link
//                     className={css.autorNameSpan}
//                     to={`/author/${heroData.uid}`}
//                   >
//                     {oneProd.textAutor}{" "}
//                   </Link>
//                 ) : (
//                   <Link className={css.autorNameSpan}>
//                     {oneProd.textAutor}{" "}
//                   </Link>
//                 )}
//                 &nbsp;
//               </span>
//               <span className={css.autorDesc}>- {oneProd.shortAboutAuth}</span>
//             </p>
//             <p className={css.autor}>
//               Художник:&nbsp;
//               <span className={css.autorNameSpan}>
//                 {oneProd.picWriter}&nbsp;
//               </span>
//               <span className={css.autorDesc}>
//                 {" "}
//                 - {oneProd.shortAboutDesig}
//               </span>
//             </p>
//           </div>
//           <div className={css.powerWrap}>
//             <p className={css.power}>Сила</p>
//             <p className={css.powerDesc}>{oneProd.bookPower}</p>
//             <br />
//           </div>
//           <p className={css.opusBook}> {oneProd.descriptionSe}</p>

//           <div className={css.comentAutorWrap}>
//             <div className={css.autorPicWrap}>
//               <div className={css.autorPic}>
//                 <div className={css.autorPicRotate}>
//                   <img
//                     src={autorPic}
//                     alt="Author"
//                     className={css.autorStylePic}
//                   />
//                 </div>
//               </div>
//               <h3 className={css.autorNameInComment}>
//                 Коментар автора
//                 <br />
//                 <span className={css.autorNameInCommentSpan}>
//                   {heroData ? (
//                     <Link
//                       className={css.autorNameInCommentSpan}
//                       to={`/author/${heroData.uid}`}
//                     >
//                       {oneProd.textAutor}
//                     </Link>
//                   ) : (
//                     <Link className={css.autorNameInCommentSpan}>
//                       {oneProd.textAutor}
//                     </Link>
//                   )}
//                 </span>
//               </h3>
//             </div>
//             <div className={css.commentAndMoreWrapp}>
//               {oneProd.autorComment ? (
//                 <p className={css.comment}>{oneProd.autorComment}</p>
//               ) : (
//                 <p className={css.comment}>
//                   Ця книга пренесе у ваш дім диво перед зимовими святами. Лови
//                   мудрість книги! Герої допоможуть
//                 </p>
//               )}
//               <h3 className={css.moreBooks}>
//                 <Link className={css.moreBooks} to="/catalog">
//                   Ще книги автора
//                 </Link>{" "}
//               </h3>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { collection, query, where, getDocs } from "firebase/firestore";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { HandySvg } from "handy-svg";
import { db } from "../../firebase";
import { useMediaQuery } from "react-responsive";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import css from "./product.module.css";
import iconSrc from "../../svg/smallProductLike.svg";
import iconSrcCard from "../../svg/smallProductCard.svg";
import audio from "../../svg/newIconBooks.svg";
import ead from "../../img/ease.png";
import hearing from "../../img/hearing.png";
import bookPNG from "../../img/bookPNG.png";
import arrow from "../../img/arrowToSvg.png";
import autorPic from "../../img/productAutorPic.png";
import addToCart from "../../function/addToCard";
import MusicPop from "../popUp/musicPop";
import Description from "./description";

export default function ProductPageTitle({
  oneProd,
  setCartCounterC,
  setLikeCounterC,
}) {
  const [liked, setLiked] = useState(false);
  const [heroData, setHeroData] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [picWriterData, setPicWriterData] = useState(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        // Отримуємо прізвище автора та художника з продукту
        const productAuthorSurname = oneProd.textAutor
          .split(" ")[0]
          .toLowerCase();
        const productPicWriterSurname = oneProd.picWriter
          .split(" ")[0]
          .toLowerCase();

        // Отримуємо всіх авторів з бази даних
        const authorsSnapshot = await getDocs(collection(db, "author"));
        let foundAuthor = null;
        let foundPicWriter = null;

        // Перебираємо всіх авторів
        authorsSnapshot.forEach((doc) => {
          const authorData = doc.data();
          const authorSurname = authorData.name.split(" ")[0].toLowerCase();

          // Перевіряємо чи прізвище з продукту відповідає прізвищу з бази
          if (productAuthorSurname === authorSurname) {
            foundAuthor = authorData;
          }

          // Перевіряємо чи прізвище художника з продукту відповідає прізвищу з бази
          if (productPicWriterSurname === authorSurname) {
            foundPicWriter = authorData;
          }
        });

        // Якщо знайдено автора, оновлюємо стан
        if (foundAuthor) {
          setHeroData(foundAuthor);
        }

        // Якщо знайдено художника, оновлюємо його інформацію та стан
        if (foundPicWriter) {
          setPicWriterData(foundPicWriter);
        }
      } catch (error) {
        console.error("Помилка при отриманні документів:", error);
      }
    };

    fetchHeroData();
  }, [oneProd.textAutor, oneProd.picWriter]);

  useEffect(() => {
    const likedProducts =
      JSON.parse(localStorage.getItem("likedProducts")) || [];
    const isLiked = likedProducts.some(
      (product) => product.uid === oneProd.uid
    );
    setLiked(isLiked);
  }, [oneProd.uid]);

  const handleLike = () => {
    let likedProducts = JSON.parse(localStorage.getItem("likedProducts")) || [];

    if (!liked) {
      setLikeCounterC((prev) => prev + 1);
      likedProducts.push(oneProd);
    } else {
      likedProducts = likedProducts.filter(
        (product) => product.uid !== oneProd.uid
      );
      setLikeCounterC((prev) => prev + 1);
    }

    localStorage.setItem("likedProducts", JSON.stringify(likedProducts));
    setLiked(!liked);
  };

  const handleClick = () => {
    setShowPlayer(!showPlayer);
  };

  const openPhotoViewer = () => {
    const imageElement = document.querySelector(".productBigPictureImg");
    if (imageElement) {
      imageElement.click();
    }
  };
  const addingToCart = (id) => {
    addToCart(id);

    setCartCounterC((prev) => prev + 1);
  };
  return (
    <div className={css.productPageTitleWrap}>
      <div className={css.productPicWrap}>
        <div className={css.imgWrap}>
          <PhotoProvider className="custom-photo-view" maskOpacity={1}>
            <PhotoView src={oneProd.imageList[0]}>
              <img
                src={oneProd.imageList[0]}
                alt={`${oneProd.bookName}`}
                className="productBigPictureImg"
              />
            </PhotoView>
            {oneProd.imageList.slice(1).map((item, index) => (
              <PhotoView key={index} src={item}>
                <span style={{ display: "none" }} />
              </PhotoView>
            ))}
          </PhotoProvider>

          <div className={css.insWrap} onClick={openPhotoViewer}>
            <div className={css.insWrpaimg}>
              <img src={ead} alt="ins" />
              <img src={ead} alt="ins" />
            </div>
            <p className={css.insaidP}>INSAID</p>
          </div>

          <div className={css.insWrapHE} onClick={handleClick}>
            <img src={hearing} alt="hearing" />
            <p className={css.insaidP}>LISTEN</p>
          </div>

          {showPlayer && <MusicPop oneProd={oneProd.audio} />}

          <a href={oneProd.pdf} target="_blank" rel="noopener noreferrer">
            <div className={css.insWrapHER}>
              <img src={bookPNG} alt="read" />
              <p className={css.insaidP}>READ</p>
            </div>
          </a>

          {oneProd.novunka === "true" && <div className={css.new}>Новинка</div>}
          {oneProd.laureat === "true" && (
            <div className={css.laureat}>Лауреат Корнійчуковської премії</div>
          )}
        </div>
        <div className={css.iconWithPrice}>
          <div className={css.rombWrap}>
            <div className={css.rombWrapRotate}>
              <p className="salePriceCartBigProd">{oneProd.price}</p>
              <p className="fullPriceCartBigProd">грн</p>
            </div>
          </div>
          <div className={css.wrapIconAu}>
            <div
              className={`likeProductBig${liked ? "Click" : ""}`}
              onClick={handleLike}
            >
              <HandySvg src={iconSrc} width="34" height="31" />
            </div>
            <div
              className="likeProductBig"
              onClick={() => addingToCart(oneProd.uid)}
            >
              <HandySvg src={iconSrcCard} width="28.33" height="28.33" />
            </div>
            <div className={css.audioBook}>
              <HandySvg src={audio} width="36.24" height="28" />
              <img src={arrow} alt="arrow" />
            </div>
          </div>
        </div>
        <Description oneProd={oneProd} />
      </div>

      {oneProd && (
        <div className={css.productTitleWrap}>
          <h1 className={css.nameBook}>{oneProd.bookName}</h1>
          <div className={css.wrapHud}>
            <p className={css.autor}>
              Автор:&nbsp;
              <span className={css.autorNameSpan}>
                {heroData ? (
                  <Link
                    className={css.autorNameSpan}
                    to={`/author/${heroData.uid}`}
                  >
                    {oneProd.textAutor}{" "}
                  </Link>
                ) : (
                  <Link className={css.autorNameSpan}>
                    {oneProd.textAutor}{" "}
                  </Link>
                )}
                &nbsp;
              </span>
              <span className={css.autorDesc}>
                {oneProd.shortAboutAuth && <>-</>} {oneProd.shortAboutAuth}
              </span>
            </p>
            <p className={css.autor}>
              Художник:&nbsp;
              <span className={css.autorNameSpan}>
                {picWriterData ? (
                  <Link
                    className={css.autorNameSpan}
                    to={`/author/${picWriterData.uid}`}
                  >
                    {oneProd.picWriter}{" "}
                  </Link>
                ) : (
                  <Link className={css.autorNameSpan}>
                    {oneProd.picWriter}{" "}
                  </Link>
                )}
                {/* {oneProd.picWriter} */}
                &nbsp;
              </span>
              <span className={css.autorDesc}>
                {" "}
                {oneProd.shortAboutDesig && <>-</>} {oneProd.shortAboutDesig}
              </span>
            </p>
          </div>
          <div className={css.powerWrap}>
            <p className={css.power}>Сила</p>
            <p className={css.powerDesc}>{oneProd.bookPower}</p>
            <br />
          </div>
          <p className={css.opusBook}> {oneProd.descriptionSe}</p>

          <div className={css.comentAutorWrap}>
            <div className={css.autorPicWrap}>
              <div className={css.autorPic}>
                {oneProd.autorComment && (
                  <div className={css.autorPicRotate}>
                    {oneProd && oneProd.authPhoto && (
                      <img
                        src={oneProd.authPhoto}
                        alt="Author"
                        className={css.autorStylePic}
                      />
                    )}
                  </div>
                )}
              </div>
              {oneProd.autorComment && (
                <h3 className={css.autorNameInComment}>
                  Коментар автора
                  <br />
                  <span className={css.autorNameInCommentSpan}>
                    {heroData ? (
                      <Link
                        className={css.autorNameInCommentSpan}
                        to={`/author/${heroData.uid}`}
                      >
                        {oneProd.textAutor}
                      </Link>
                    ) : (
                      <Link className={css.autorNameInCommentSpan}>
                        {oneProd.textAutor}
                      </Link>
                    )}
                  </span>
                </h3>
              )}
            </div>
            {oneProd.autorComment && (
              <div className={css.commentAndMoreWrapp}>
                {oneProd.autorComment ? (
                  <p className={css.comment}>{oneProd.autorComment}</p>
                ) : (
                  <></>
                )}
                <h3 className={css.moreBooks}>
                  <Link className={css.moreBooks} to="/catalog">
                    Ще книги автора
                  </Link>{" "}
                </h3>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
