// import { useState } from "react";
// import "./header.css";
// import {
//   fetchProductsAll,
//   fetchProducts,
//   clearSearchResults,
// } from "../../../function/productsSlice";
// // import {
// //   fetchProductsAll,
// //   fetchProducts,
// // } from "../../../function/manufacturesSlice";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import NewLinkManuscript from "./newLinkManuscript";
// export default function NavList({
//   setAllBooks,
//   allBooks,
//   setAllManus,
//   allManus,
// }) {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const changState = (e) => {
//     setAllBooks(!allBooks);
//     setAllManus(false);
//   };
//   const changStateFilter = (e) => {
//     setAllBooks(false);
//     setAllManus(!allManus);
//   };
//   const allBooksClose = () => {
//     dispatch(clearSearchResults());
//     dispatch(fetchProductsAll());
//     setAllBooks(false);
//     navigate("/catalog");
//   };

//   return (
//     <div className="navigationWrap">
//       <ul className="navigationUl">
//         <li className="navigationLiHover">
//           <p onClick={allBooksClose}> Усі Книги</p>
//           <div className="filterButton" onClick={changState}>
//             Фільтр книги
//           </div>
//         </li>
//         <li className="navigationLi">
//           <Link to="/opt">Прайс-гурт</Link>
//         </li>
//         <li className="navigationLi">
//           <Link to="/author">Майстри</Link>
//         </li>
//         <li className="navigationLi">
//           <Link to="/hero">Герої</Link>
//         </li>
//         <li className="navigationLi">
//           <Link to="/blog">Блог</Link>
//         </li>
//         <li className="navigationLiHover">
//           <NewLinkManuscript setAllManus={setAllManus} />
//           <div className="filterButton" onClick={changStateFilter}>
//             Фільтр рукописи
//           </div>
//         </li>
//         <li className="navigationLi">
//           <Link to="/video">Відеоогляд за віком</Link>
//         </li>
//       </ul>
//     </div>
//   );
// }
import { useState } from "react";
import "./header.css";
import filteredArrav from "../../../svg/filteredArrav.svg";
import { HandySvg } from "handy-svg";
import {
  fetchProductsAll,
  clearSearchResults,
} from "../../../function/productsSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import NewLinkManuscript from "./newLinkManuscript";

export default function NavList({
  setAllBooks,
  allBooks,
  setAllManus,
  allManus,
  setIsBooksFilterActive,
  isBooksFilterActive,
  setIsManusFilterActive,
  isManusFilterActive,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const changState = () => {
    const newState = !isBooksFilterActive;
    setAllBooks(newState);
    setIsBooksFilterActive(newState);
    setAllManus(false);
    setIsManusFilterActive(false);
  };

  const changStateFilter = () => {
    const newState = !isManusFilterActive;
    setAllManus(newState);
    setIsManusFilterActive(newState);
    setAllBooks(false);
    setIsBooksFilterActive(false);
  };

  const allBooksClose = () => {
    dispatch(clearSearchResults());
    dispatch(fetchProductsAll());
    setAllBooks(false);
    setIsBooksFilterActive(false);
    setIsManusFilterActive(false);
    navigate("/catalog");
  };

  const getLinkClass = (path) => {
    return location.pathname === path ? "navigationUrlVisit" : "navigationLi";
  };

  const getHoverClass = (path) => {
    return location.pathname === path
      ? "navigationUrlVisit"
      : "navigationLiHover";
  };

  return (
    <div className="navigationWrap">
      <ul className="navigationUl">
        <li className={getHoverClass("/catalog")}>
          <p onClick={allBooksClose}> Усі Книги</p>
          <div
            className={`${
              isBooksFilterActive ? "filterButtonClick" : "filterButton"
            }`}
            onClick={changState}
          >
            {isBooksFilterActive ? (
              <>
                Фільтр книги{" "}
                <HandySvg src={filteredArrav} width="16" height="16" />
              </>
            ) : (
              <>Фільтр книги </>
            )}
          </div>
        </li>
        <li className={getLinkClass("/opt")}>
          <Link to="/opt" className="optLinkHeader">
            Прайс-гурт
          </Link>
        </li>
        <li className={getLinkClass("/author")}>
          <Link to="/author" className="optLinkHeader">
            Майстри
          </Link>
        </li>
        <li className={getLinkClass("/hero")}>
          <Link to="/hero" className="optLinkHeader">
            Герої
          </Link>
        </li>
        <li className={getLinkClass("/blog")}>
          <Link to="/blog" className="optLinkHeader">
            Блог
          </Link>
        </li>
        <li className={getHoverClass("/manuscript")}>
          <NewLinkManuscript setAllManus={setAllManus} />
          <div
            className={`${
              isManusFilterActive ? "filterButtonClick" : "filterButton"
            }`}
            onClick={changStateFilter}
          >
            {isManusFilterActive ? (
              <>
                Фільтр рукописи{" "}
                <HandySvg src={filteredArrav} width="16" height="16" />
              </>
            ) : (
              <>Фільтр рукописи </>
            )}
          </div>
        </li>
        <li className={getLinkClass("/video")}>
          <Link to="/video" className="optLinkHeader">
            Відеоогляд за віком
          </Link>
        </li>
      </ul>
    </div>
  );
}
