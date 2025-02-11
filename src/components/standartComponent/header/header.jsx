// import HeaderApp from "./headerApp";
// import "./header.css";
// import HeaderDown from "./headerDown";
// import { useState, useEffect } from "react";
// import FilterMenu from "./filterMenu";
// import LogIn from "../logIn/logIn";
// import EnterUser from "../enterUser/enterUser";
// import Card from "../card/card";
// import FilterMenuManu from "./filterMenuManu";
// import { useLocation } from "react-router-dom";

// export default function Header({
//   setLogin,
//   login,
//   setEnterUser,
//   enterUser,
//   scrollHeight,
//   cartCounterC,
//   totalQuantity,
//   setCartCounterC,
//   likedCount,
// }) {
//   const [allBooks, setAllBooks] = useState(false);
//   const [windowDimensions, setWindowDimensions] = useState(null);
//   const [allManus, setAllManus] = useState(false);
//   const [cart, setCart] = useState(false);
//   const [countProductForCart, setCountProductForCart] = useState();
//   const location = useLocation();
//   const [isHeaderFixed, setIsHeaderFixed] = useState(false);
//   const [lastScrollTop, setLastScrollTop] = useState(0);
//   const [isAtTop, setIsAtTop] = useState(true);
//   const [isBooksFilterActive, setIsBooksFilterActive] = useState(false);
//   const [isManusFilterActive, setIsManusFilterActive] = useState(false);
//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollTop =
//         window.pageYOffset || document.documentElement.scrollTop;

//       if (currentScrollTop === 0) {
//         // У верхній точці сторінки
//         setIsHeaderFixed(false);
//         setIsAtTop(true);
//       } else if (
//         currentScrollTop > lastScrollTop + 10 &&
//         currentScrollTop > 180
//       ) {
//         // Прокрутка вниз
//         setIsHeaderFixed(false);
//         setIsAtTop(false);
//       } else if (currentScrollTop < lastScrollTop - 10) {
//         // Прокрутка вгору
//         setIsHeaderFixed(true);
//         setIsAtTop(false);
//       }

//       setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [lastScrollTop]);

//   useEffect(() => {
//     function handleResize() {
//       if (window.innerWidth < 1100) {
//         setWindowDimensions(false);
//       } else {
//         setWindowDimensions(true);
//       }
//     }
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [location, allBooks]);

//   const headerStyle = {
//     position: isAtTop ? "static" : isHeaderFixed ? "fixed" : "absolute", // Залежить від прокрутки
//     top: isHeaderFixed ? 0 : "-100px", // Для плавного спуску
//     width: "100%",
//     zIndex: isHeaderFixed ? 1000 : "auto",
//     backgroundColor: "white",
//     transform: isHeaderFixed
//       ? "translateY(0)"
//       : isAtTop
//       ? "none"
//       : "translateY(-100%)", // Анімація спуску
//     transition:
//       "transform 0.5s ease-in-out, top 0.3s ease-in-out, background-color 0.3s ease-in-out",
//     boxShadow: isHeaderFixed ? "0 2px 10px rgba(0, 0, 0, 0.1)" : "none", // Тінь при фіксації
//   };

//   return (
//     <>
//       <div style={headerStyle}>
//         <HeaderApp
//           windowDimensions={windowDimensions}
//           setWindowDimensions={setWindowDimensions}
//           countProductForCart={countProductForCart}
//           setLogin={setLogin}
//           login={login}
//           setCart={setCart}
//           cartCounterC={cartCounterC}
//           totalQuantity={totalQuantity}
//           likedCount={likedCount}
//         />
//         <HeaderDown
//           windowDimensions={windowDimensions}
//           setWindowDimensions={setWindowDimensions}
//           setAllBooks={setAllBooks}
//           allManus={allManus}
//           setAllManus={setAllManus}
//           allBooks={allBooks}
//           setIsBooksFilterActive={setIsBooksFilterActive}
//           isBooksFilterActive={isBooksFilterActive}
//           setIsManusFilterActive={setIsManusFilterActive}
//           isManusFilterActive={isManusFilterActive}
//         />
//         {allBooks && (
//           <FilterMenu
//             allBooks={allBooks}
//             setAllBooks={setAllBooks}
//             windowDimensions={windowDimensions}
//             setWindowDimensions={setWindowDimensions}
//             setIsBooksFilterActive={setIsBooksFilterActive}
//           />
//         )}
//         {allManus && (
//           <FilterMenuManu
//             setAllManus={setAllManus}
//             windowDimensions={windowDimensions}
//             setWindowDimensions={setWindowDimensions}
//             setIsManusFilterActive={setIsManusFilterActive}
//           />
//         )}
//         {login && (
//           <LogIn
//             scrollHeight={scrollHeight}
//             setLogin={setLogin}
//             login={login}
//             setEnterUser={setEnterUser}
//           />
//         )}
//         {enterUser && (
//           <EnterUser
//             setEnterUser={setEnterUser}
//             enterUser={enterUser}
//             setLogin={setLogin}
//           />
//         )}
//         {cart && (
//           <Card
//             setCart={setCart}
//             setCountProductForCart={setCountProductForCart}
//             setCartCounterC={setCartCounterC}
//             cartCounterC={cartCounterC}
//           />
//         )}
//       </div>
//     </>
//   );
// }
import HeaderApp from "./headerApp";
import "./header.css";
import HeaderDown from "./headerDown";
import { useState, useEffect } from "react";
import FilterMenu from "./filterMenu";
import LogIn from "../logIn/logIn";
import EnterUser from "../enterUser/enterUser";
import Card from "../card/card";
import FilterMenuManu from "./filterMenuManu";
import { useLocation } from "react-router-dom";

export default function Header({
  setLogin,
  login,
  setEnterUser,
  enterUser,
  scrollHeight,
  cartCounterC,
  totalQuantity,
  setCartCounterC,
  likedCount,
}) {
  const [allBooks, setAllBooks] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState(
    window.innerWidth >= 1100
  );
  const [allManus, setAllManus] = useState(false);
  const [cart, setCart] = useState(false);
  const [countProductForCart, setCountProductForCart] = useState();
  const location = useLocation();
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isBooksFilterActive, setIsBooksFilterActive] = useState(false);
  const [isManusFilterActive, setIsManusFilterActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      // **Перевіряємо, чи відкритий фільтр**
      if (isBooksFilterActive || isManusFilterActive) {
        return; // Якщо фільтр відкритий, не змінюємо стан хедера
      }

      if (currentScrollTop === 0) {
        setIsHeaderFixed(false);
        setIsAtTop(true);
      } else if (
        currentScrollTop > lastScrollTop + 10 &&
        currentScrollTop > 180
      ) {
        setIsHeaderFixed(false);
        setIsAtTop(false);
      } else if (currentScrollTop < lastScrollTop - 10) {
        setIsHeaderFixed(true);
        setIsAtTop(false);
      }

      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop, isBooksFilterActive, isManusFilterActive]);

  useEffect(() => {
    const handleResize = () => setWindowDimensions(window.innerWidth >= 1100);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location, allBooks]);

  const headerStyle = {
    position:
      isAtTop || isBooksFilterActive || isManusFilterActive
        ? "static"
        : isHeaderFixed
        ? "fixed"
        : "absolute",
    top:
      isBooksFilterActive || isManusFilterActive
        ? 0
        : isHeaderFixed
        ? 0
        : "-100px",
    width: "100%",
    zIndex: isHeaderFixed ? 1000 : "auto",
    backgroundColor: "white",
    transform:
      isBooksFilterActive || isManusFilterActive
        ? "none"
        : isHeaderFixed
        ? "translateY(0)"
        : isAtTop
        ? "none"
        : "translateY(-100%)",
    transition:
      isBooksFilterActive || isManusFilterActive
        ? "none"
        : "transform 0.5s ease-in-out, top 0.3s ease-in-out, background-color 0.3s ease-in-out",
    boxShadow: isHeaderFixed ? "0 2px 10px rgba(0, 0, 0, 0.1)" : "none",
  };

  return (
    <>
      <div style={headerStyle}>
        <HeaderApp
          windowDimensions={windowDimensions}
          setWindowDimensions={setWindowDimensions}
          countProductForCart={countProductForCart}
          setLogin={setLogin}
          login={login}
          setCart={setCart}
          cartCounterC={cartCounterC}
          totalQuantity={totalQuantity}
          likedCount={likedCount}
        />
        <HeaderDown
          windowDimensions={windowDimensions}
          setWindowDimensions={setWindowDimensions}
          setAllBooks={setAllBooks}
          allManus={allManus}
          setAllManus={setAllManus}
          allBooks={allBooks}
          setIsBooksFilterActive={setIsBooksFilterActive}
          isBooksFilterActive={isBooksFilterActive}
          setIsManusFilterActive={setIsManusFilterActive}
          isManusFilterActive={isManusFilterActive}
        />
        {allBooks && (
          <FilterMenu
            allBooks={allBooks}
            setAllBooks={setAllBooks}
            windowDimensions={windowDimensions}
            setWindowDimensions={setWindowDimensions}
            setIsBooksFilterActive={setIsBooksFilterActive}
          />
        )}
        {allManus && (
          <FilterMenuManu
            setAllManus={setAllManus}
            windowDimensions={windowDimensions}
            setWindowDimensions={setWindowDimensions}
            setIsManusFilterActive={setIsManusFilterActive}
          />
        )}
        {login && (
          <LogIn
            scrollHeight={scrollHeight}
            setLogin={setLogin}
            login={login}
            setEnterUser={setEnterUser}
          />
        )}
        {enterUser && (
          <EnterUser
            setEnterUser={setEnterUser}
            enterUser={enterUser}
            setLogin={setLogin}
          />
        )}
        {cart && (
          <Card
            setCart={setCart}
            setCountProductForCart={setCountProductForCart}
            setCartCounterC={setCartCounterC}
            cartCounterC={cartCounterC}
          />
        )}
      </div>
    </>
  );
}
