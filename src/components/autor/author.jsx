// import Footer from "../standartComponent/footer/footer";
// import Header from "../standartComponent/header/header";
// import css from "./hero.module.css";
// import { collection, query, where, getDocs } from "firebase/firestore";
// import arrowImp from "../../img/arrowDownPick.png";
// import authPic from "../../img/illa.png";
// import arrowLeft from "../../img/arrowInHerpLeft.png";
// import arrowRight from "../../img/arrowInHeroRight.png";
// import autorPic from "../../img/productAutorPic.png";
// import { useState, useEffect } from "react";

// import ProductForHero from "./productForHero";
// import YouTube from "react-youtube";
// import kurluk from "../../img/kurluk.png";
// import LitShow from "../standartComponent/litShow/litShow";
// import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
// import { auth, db } from "../../firebase";
// import {
//   getAuth,
//   signInWithPhoneNumber,
//   signOut,
//   onAuthStateChanged,
// } from "firebase/auth";
// export default function Author({ windowDimensions }) {
//   const [products, setProducts] = useState([]);
//   const [heroes, setHeroes] = useState([]);
//   const [startIndex, setStartIndex] = useState(0);
//   const heroesPerPage = 3;
//   const [selectedAuthor, setSelectedAuthor] = useState(0); // Доданий стан для зберігання вибраного автора
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const { id } = useParams();

//   const [selectedHero, setSelectedHero] = useState(null);
//   const [currentHero, setCurrentHero] = useState(null);
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [location]);
//   useEffect(() => {
//     if (selectedHero && selectedHero.name) {
//       const fetchProducts = async () => {
//         try {
//           const q = query(
//             collection(db, "product"),
//             where("textAutor", "==", selectedHero.name)
//           );
//           const querySnapshot = await getDocs(q);

//           const fetchedProducts = querySnapshot.docs.map((doc) => doc.data());
//           setProducts(fetchedProducts);
//         } catch (error) {
//           console.log("Error fetching products:", error);
//         }
//       };

//       fetchProducts();
//     }
//   }, [selectedHero]);
//   const handleClickLeft = () => {
//     setStartIndex((prevIndex) => Math.max(0, prevIndex - heroesPerPage));
//   };

//   const handleClickRight = () => {
//     const maxIndex = Math.max(0, heroes.length - heroesPerPage);
//     setStartIndex((prevIndex) => Math.min(maxIndex, prevIndex + heroesPerPage));
//   };
//   useEffect(() => {
//     const fetchHeroes = async () => {
//       try {
//         const heroesRef = collection(db, "author");
//         const querySnapshot = await getDocs(heroesRef);
//         const heroData = [];

//         querySnapshot.forEach((doc) => {
//           heroData.push(doc.data());
//         });
//         setHeroes(heroData);
//         if (typeof id === "undefined") {
//           setSelectedHero(heroData[0]);
//         } else {
//           const selected = heroData.find((hero) => hero.uid === id);
//           setSelectedHero(selected);
//         }
//       } catch (error) {
//         console.error("Помилка при отриманні документів:", error);
//       }
//     };

//     fetchHeroes();
//   }, [id]);

//   const handleHeroClick = (hero) => {
//     setSelectedHero(hero);
//   };
//   useEffect(() => {}, [selectedHero, product]);
//   const handleAuthorChange = (event) => {
//     const selectedAuthorIndex = parseInt(event.target.value);
//     setSelectedAuthor(selectedAuthorIndex);
//     setSelectedHero(heroes[selectedAuthorIndex]);
//   };

//   const goToBook = () => {
//     navigate(`/product/${product.uid}`);
//   };

//   return (
//     <div>
//       <div className={css.allBooksWrap}>
//         <div className={css.allHero}>
//           <p className={css.yourPerfectHero}>
//             Майстри, яких представляє видавництво “Час майстрів”
//             <br />
//             <span className={css.yourPerfectHeroSpan}>
//               відкриті до безпосереднього спілкування з дітьми, батьками та
//               спеціалістами
//             </span>
//           </p>
//           <div className={css.ageWrap}>
//             <div className={css.chousBooksSelect}>
//               <select
//                 className={css.customSelect}
//                 value={selectedAuthor}
//                 onChange={handleAuthorChange}
//               >
//                 <option className={css.customOpin} value={0}>
//                   Автор
//                 </option>
//                 {heroes.map((hero, index) => (
//                   <option className={css.customOpin} value={index} key={index}>
//                     {hero.name}
//                   </option>
//                 ))}
//               </select>
//               <img src={arrowImp} className={css.customArrowSelect} />
//             </div>
//           </div>
//         </div>

//         <div className={css.autorListSmal}>
//           {heroes
//             .slice(startIndex, startIndex + heroesPerPage)
//             .map((hero, index) => (
//               <div
//                 key={index}
//                 onClick={() => handleHeroClick(hero)}
//                 className={css.imgAutorWrapSmall}
//               >
//                 <img
//                   src={hero.foto}
//                   className={`${css.imgAutorSmall} ${
//                     selectedHero && selectedHero.uid === hero.uid
//                       ? css.selectedHeroImage
//                       : ""
//                   }`}
//                 />
//                 <p className={css.autorNameM}>{hero.name}</p>
//                 <p className={css.autorNameMSma}>
//                   Автор книги:&nbsp;{hero.book}
//                 </p>
//                 <p className={css.autorNameMbigCol}>{hero.descSecond}</p>
//               </div>
//             ))}
//         </div>
//         <div className={css.arrowWrap}>
//           <img
//             src={arrowLeft}
//             onClick={handleClickLeft}
//             className={css.arrowLeftSt}
//           />
//           <img
//             src={arrowRight}
//             onClick={handleClickRight}
//             className={css.arrowRightSt}
//           />
//         </div>
//       </div>
//       {/* наступний пункт велике фото героя + опис */}
//       {selectedHero && (
//         <div className={css.wrapHeroBigFoto}>
//           <div className={css.wrapHeroBigFotoTwo}>
//             <div className={css.imgAutorWrapBig}>
//               <img src={selectedHero.foto} className={css.imgAutorBig} />
//             </div>
//             <div className={css.descHeroOP}>
//               <h1 className={css.heroName}>{selectedHero.name}</h1>
//               <div className={css.descrWithDot}>
//                 <div className={css.dot}></div>
//                 <p className={css.dotP}>{selectedHero.descOne}</p>
//               </div>
//               <div className={css.descrWithDot}>
//                 <div className={css.dot}></div>
//                 <p className={css.dotP}>{selectedHero.descSecond}</p>
//               </div>
//               <p className={css.whatBook}>
//                 {selectedHero.autor}&nbsp; {selectedHero.book}
//               </p>
//             </div>
//           </div>
//           {/* жовтий блок */}
//           <div className={css.yellowFitchWrap}>
//             <p className={css.yellowFitchWrapP}>{selectedHero.smallDesc}</p>
//             <div className={css.hvist}></div>
//           </div>
//           {/* блок автора */}

//           {/* закінчення блок автора */}
//           {/* блок історії */}
//           <div className={css.historiCreateBlock}>
//             <p className={css.hictoryP}>{selectedHero.history}</p>
//           </div>
//           {/* блок інтервю */}
//           <div className={css.blockInturv}>
//             <div className={css.blockInturvSmall}>
//               <h3 className={css.inturvH3}>Інтерв’ю з автором</h3>
//               <p className={css.inturvP}>{selectedHero.internOne}</p>
//               <p className={css.inturvP}>{selectedHero.internSecond}</p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* блок товарів */}
//       <div className={css.theSameBooksWrap}>
//         <div className={css.theSameBooksWrapSmall}>
//           <h4 className={css.theSameH4}>Книги автора</h4>
//           <div className={css.smallBookLikeWrap}>
//             {products.map((el, index) => {
//               if (index < 3) {
//                 return <ProductForHero el={el} key={index} />;
//               }
//             })}
//           </div>
//         </div>
//       </div>
//       {/* блок товарів */}
//       {/* блок відео */}
//       <div className={css.videoBlockWrap}>
//         <div className={css.videoBlockWrapSmall}>
//           <h4 className={css.seeBook}>Відеознайомство</h4>
//           <div className={css.video}>
//             {selectedHero && (
//               <>
//                 {windowDimensions && (
//                   <YouTube
//                     videoId={selectedHero.video}
//                     opts={{ width: "1193.03px", height: "714.56px" }}
//                   />
//                 )}
//                 {!windowDimensions && (
//                   <YouTube
//                     videoId={selectedHero.video}
//                     opts={{ width: "300px", height: "196px" }}
//                   />
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//       {/* блок відео */}
//       {/* блок умови проведення */}
//       <LitShow />

//       <Footer />
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import css from "./hero.module.css";
import arrowImp from "../../img/arrowDownPick.png";
import arrowLeft from "../../img/arrowInHerpLeft.png";
import arrowRight from "../../img/arrowInHeroRight.png";
import YouTube from "react-youtube";
import { db } from "../../firebase";
import Footer from "../standartComponent/footer/footer";
import LitShow from "../standartComponent/litShow/litShow";
import ProductForHero from "./productForHero";
import { query, where } from "firebase/firestore";
import { useRef } from "react";

export default function Author({ windowDimensions }) {
  const [products, setProducts] = useState([]);
  const [heroes, setHeroes] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const heroesPerPage = 3;
  const [selectedHero, setSelectedHero] = useState(null);
  const location = useLocation();
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" }); // Прокрутка вліво
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" }); // Прокрутка вправо
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const heroesRef = collection(db, "author");
        const querySnapshot = await getDocs(heroesRef);
        const heroData = querySnapshot.docs.map((doc) => doc.data());

        setHeroes(heroData);

        if (typeof id === "undefined") {
          setSelectedHero(heroData[0]);
        } else {
          const selected = heroData.find((hero) => hero.uid === id);
          setSelectedHero(selected);

          // Обчислення стартового індексу для вибраного автора
          const selectedIndex = heroData.findIndex((hero) => hero.uid === id);
          if (selectedIndex !== -1) {
            setStartIndex(
              Math.floor(selectedIndex / heroesPerPage) * heroesPerPage
            );
          }
        }
      } catch (error) {
        console.error("Помилка при отриманні документів:", error);
      }
    };

    fetchHeroes();
  }, [id]);

  const normalizeString = (str) => {
    if (!str) return ""; // Якщо значення undefined або null, повертаємо порожній рядок
    return String(str) // Перетворюємо значення у рядок
      .toLowerCase()
      .replace(/\./g, "")
      .replace(/\s+/g, " ")
      .trim();
  };
  useEffect(() => {
    if (selectedHero && selectedHero.name) {
      const fetchProducts = async () => {
        try {
          const q = query(collection(db, "product")); // Отримуємо всі товари
          const querySnapshot = await getDocs(q);

          // 🔹 Фільтруємо товари вручну, перевіряючи часткове співпадіння
          const fetchedProducts = querySnapshot.docs
            .map((doc) => doc.data())
            .filter(
              (product) =>
                product.textAutor &&
                normalizeString(selectedHero.name).includes(
                  normalizeString(product.textAutor)
                )
            );

          console.log("fetchedProducts", fetchedProducts);
          setProducts(fetchedProducts);
        } catch (error) {
          console.log("Error fetching products:", error);
        }
      };

      fetchProducts();
    }
  }, [selectedHero]);
  const handleClickLeft = () => {
    setStartIndex((prevIndex) => Math.max(0, prevIndex - heroesPerPage));
  };

  const handleClickRight = () => {
    const maxIndex = Math.max(0, heroes.length - heroesPerPage);
    setStartIndex((prevIndex) => Math.min(maxIndex, prevIndex + heroesPerPage));
  };

  const handleHeroClick = (hero) => {
    setSelectedHero(hero);
  };

  return (
    <div>
      <div className={css.allBooksWrap}>
        <div className={css.allHero}>
          <p className={css.yourPerfectHero}>
            Майстри, яких представляє видавництво “Час майстрів”
            <br />
            <span className={css.yourPerfectHeroSpan}>
              відкриті до безпосереднього спілкування з дітьми, батьками та
              спеціалістами
            </span>
          </p>
          <div className={css.ageWrap}>
            <div className={css.chousBooksSelect}>
              <select
                className={css.customSelect}
                value={heroes.indexOf(selectedHero)}
                onChange={(e) => setSelectedHero(heroes[e.target.value])}
              >
                <option className={css.customOpin} value={0}>
                  Автор
                </option>
                {heroes.map((hero, index) => (
                  <option className={css.customOpin} value={index} key={index}>
                    {hero.name}
                  </option>
                ))}
              </select>
              <img src={arrowImp} className={css.customArrowSelect} />
            </div>
          </div>
        </div>

        <div className={css.autorListSmal}>
          <img
            src={arrowLeft}
            onClick={scrollLeft}
            className={css.arrowLeftSt}
          />
          <div className={css.autorListSmalNew} ref={scrollRef}>
            {heroes.map((hero, index) => (
              <div
                key={index}
                onClick={() => handleHeroClick(hero)}
                className={css.imgAutorWrapSmall}
              >
                <img
                  src={hero.foto}
                  className={`${css.imgAutorSmall} ${
                    selectedHero && selectedHero.uid === hero.uid
                      ? css.selectedHeroImage
                      : ""
                  }`}
                />
                <p className={css.autorNameM}>{hero.name}</p>
                <p className={css.autorNameMSma}>
                  Автор книги:&nbsp;{hero.book}
                </p>
                <p className={css.autorNameMbigCol}>{hero.descSecond}</p>
              </div>
            ))}
          </div>
          <img
            src={arrowRight}
            onClick={scrollRight}
            className={css.arrowRightSt}
          />
        </div>
      </div>
      <div className={css.arrowWrap}></div>

      {selectedHero && (
        <div className={css.wrapHeroBigFoto}>
          <div className={css.wrapHeroBigFotoTwo}>
            <div className={css.imgAutorWrapBig}>
              <img src={selectedHero.foto} className={css.imgAutorBig} />
            </div>
            <div className={css.descHeroOP}>
              <h1 className={css.heroName}>{selectedHero.name}</h1>
              <div className={css.descrWithDot}>
                <div className={css.dot}></div>
                <p className={css.dotP}>{selectedHero.descOne}</p>
              </div>
              <div className={css.descrWithDot}>
                <div className={css.dot}></div>
                <p className={css.dotP}>{selectedHero.descSecond}</p>
              </div>
              <p className={css.whatBook}>
                {selectedHero.autor}&nbsp; {selectedHero.book}
              </p>
            </div>
          </div>
          <div className={css.yellowFitchWrap}>
            <p className={css.yellowFitchWrapP}>{selectedHero.smallDesc}</p>
            <div className={css.hvist}></div>
          </div>
          <div className={css.historiCreateBlock}>
            <p className={css.hictoryP}>{selectedHero.history}</p>
          </div>
          <div className={css.blockInturv}>
            <div className={css.blockInturvSmall}>
              <h3 className={css.inturvH3}>Інтерв’ю з автором</h3>
              <p className={css.inturvP}>{selectedHero.internOne}</p>
              <p className={css.inturvP}>{selectedHero.internSecond}</p>
            </div>
          </div>
        </div>
      )}

      <div className={css.theSameBooksWrap}>
        <div className={css.theSameBooksWrapSmall}>
          <h4 className={css.theSameH4}>Книги автора</h4>
          <div className={css.smallBookLikeWrap}>
            {products.map((el, index) => {
              if (index < 3) {
                return <ProductForHero el={el} key={index} />;
              }
            })}
          </div>
        </div>
      </div>

      <div className={css.videoBlockWrap}>
        <div className={css.videoBlockWrapSmall}>
          <h4 className={css.seeBook}>Відеознайомство</h4>
          <div className={css.video}>
            {selectedHero && (
              <>
                {windowDimensions && (
                  <YouTube
                    videoId={selectedHero.video}
                    opts={{ width: "1193.03px", height: "714.56px" }}
                  />
                )}
                {!windowDimensions && (
                  <YouTube
                    videoId={selectedHero.video}
                    opts={{ width: "300px", height: "196px" }}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <LitShow />
      <Footer />
    </div>
  );
}
