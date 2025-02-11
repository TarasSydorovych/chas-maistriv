// import Footer from "../standartComponent/footer/footer";
// import Header from "../standartComponent/header/header";
// import CatalogProductComponent from "../standartComponent/productComponent/catalogProductComponent";
// import Filter from "./filter";
// import FirstBlockCat from "./firstBlockCat";
// import DiscountAndAction from "./discountAndAction";
// import ViewProductCatalog from "./viewProductCatalog";
// import ListButtonCount from "./listButtonCount";
// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import withFirebaseCollection from "../HOK/withFirebaseCollection";
// import { AiOutlineApartment } from "react-icons/ai";
// import { AiOutlineUnorderedList } from "react-icons/ai";
// import css from "./catalog.module.css";
// import { fetchProducts, fetchProductsAll } from "../../function/productsSlice";
// import SatalogProductComponentsSmall from "../standartComponent/productComponent/catalogProductComponentsSmall";
// import SmallProductCartTop from "../standartComponent/productComponent/SmallProductCartTop";

// const Catalog = ({
//   setVisitedProducts,
//   visitedProducts,
//   productsAll,
//   data,
//   setCartCounterC,
//   setLikeCounterC,
// }) => {
//   const dispatch = useDispatch();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [changeVisible, setChangeVisible] = useState(false);
//   const productsPerPage = 10;

//   const searchResults = useSelector((state) => state.products.searchResults);
//   const items = useSelector((state) => state.products.items);
//   const products = searchResults.length > 0 ? searchResults : items;
//   const filters = useSelector((state) => state.filters);

//   useEffect(() => {
//     if (filters.length === 0) {
//       dispatch(fetchProductsAll());
//     } else {
//       dispatch(fetchProducts(filters));
//     }
//   }, [filters]);

//   const handlePageClick = (pageNumber) => {
//     setCurrentPage(pageNumber);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const startIndex = (currentPage - 1) * productsPerPage;
//   const endIndex = startIndex + productsPerPage;
//   const currentProducts = products.slice(startIndex, endIndex);

//   const numberOfPages = Math.ceil(products.length / productsPerPage);
//   const maxDisplayedPages = 5;
//   const firstDisplayedPages = Math.max(
//     currentPage - Math.floor(maxDisplayedPages / 2),
//     1
//   );
//   const lastDisplayedPages = Math.min(
//     firstDisplayedPages + maxDisplayedPages - 1,
//     numberOfPages
//   );

//   const pageNumbers = [];
//   for (let i = firstDisplayedPages; i <= lastDisplayedPages; i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <>
//       <Filter filters={filters} />
//       {/* <FirstBlockCat
//         setCartCounterC={setCartCounterC}
//         setLikeCounterC={setLikeCounterC}
//       /> */}
//       <div className={css.wrapCatalogChanges}>
//         <p className={css.nameFormatPere}>Змінити формат перегляду</p>
//         {changeVisible && (
//           <AiOutlineApartment
//             className={css.catalogVisibleCss}
//             onClick={() => setChangeVisible(false)}
//           />
//         )}
//         {!changeVisible && (
//           <AiOutlineUnorderedList
//             className={css.catalogVisibleCss}
//             onClick={() => setChangeVisible(true)}
//           />
//         )}
//       </div>

//       {/* Render products based on view mode */}
//       {!changeVisible &&
//         currentProducts &&
//         currentProducts.map((el, index) => (
//           <CatalogProductComponent
//             visitedProducts={visitedProducts}
//             setVisitedProducts={setVisitedProducts}
//             el={el}
//             key={index}
//             setCartCounterC={setCartCounterC}
//             setLikeCounterC={setLikeCounterC}
//           />
//         ))}

//       {changeVisible && currentProducts && currentProducts.length > 0 && (
//         <>
//           <SatalogProductComponentsSmall
//             visitedProducts={visitedProducts}
//             setVisitedProducts={setVisitedProducts}
//             el={currentProducts[0]}
//             key={0}
//             setCartCounterC={setCartCounterC}
//             setLikeCounterC={setLikeCounterC}
//           />
//           <div className={css.wrapSmallProductTwoType}>
//             {currentProducts.slice(1).map((el, index) => (
//               <SmallProductCartTop
//                 el={el}
//                 key={index + 1}
//                 setCartCounterC={setCartCounterC}
//                 setLikeCounterC={setLikeCounterC}
//               />
//             ))}
//           </div>
//         </>
//       )}

//       <ListButtonCount
//         pageNumbers={pageNumbers}
//         handlePageClick={handlePageClick}
//         currentPage={currentPage}
//       />

//       <DiscountAndAction />
//       <ViewProductCatalog
//         products={productsAll}
//         setCartCounterC={setCartCounterC}
//         setLikeCounterC={setLikeCounterC}
//       />
//     </>
//   );
// };

// export default withFirebaseCollection("seo")(Catalog);
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineApartment, AiOutlineUnorderedList } from "react-icons/ai";
import css from "./catalog.module.css";
import { fetchProducts, fetchProductsAll } from "../../function/productsSlice";
import withFirebaseCollection from "../HOK/withFirebaseCollection";
import Filter from "./filter";
import CatalogProductComponent from "../standartComponent/productComponent/catalogProductComponent";
import SatalogProductComponentsSmall from "../standartComponent/productComponent/catalogProductComponentsSmall";
import SmallProductCartTop from "../standartComponent/productComponent/SmallProductCartTop";
import DiscountAndAction from "./discountAndAction";
import ViewProductCatalog from "./viewProductCatalog";
import ListButtonCount from "./listButtonCount";

const Catalog = ({
  setVisitedProducts,
  visitedProducts,
  productsAll,
  setCartCounterC,
  setLikeCounterC,
}) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [changeVisible, setChangeVisible] = useState(false);
  const productsPerPage = 10;
  const filters = useSelector((state) => state.filters);
  const searchResults = useSelector((state) => state.products.searchResults); // ✅ Отримуємо пошукові результати

  // 🔹 Продукти тепер зберігаються у стейті, але оновлюються при зміні фільтрів або пошуку
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (searchResults.length > 0) {
        // ✅ Якщо є пошукові результати — використовуємо їх
        setProducts(searchResults);
      } else if (filters.length === 0) {
        const result = await dispatch(fetchProductsAll()).unwrap();
        setProducts(result);
      } else {
        const result = await dispatch(fetchProducts(filters)).unwrap();
        setProducts(result);
      }
    };

    fetchData();
  }, [filters, searchResults, dispatch]); // ✅ Додаємо searchResults у залежності

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const numberOfPages = Math.ceil(products.length / productsPerPage);
  const maxDisplayedPages = 5;
  const firstDisplayedPages = Math.max(
    currentPage - Math.floor(maxDisplayedPages / 2),
    1
  );
  const lastDisplayedPages = Math.min(
    firstDisplayedPages + maxDisplayedPages - 1,
    numberOfPages
  );

  const pageNumbers = [];
  for (let i = firstDisplayedPages; i <= lastDisplayedPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <Filter filters={filters} />

      <div className={css.wrapCatalogChanges}>
        <p className={css.nameFormatPere}>Змінити формат перегляду</p>
        {changeVisible ? (
          <AiOutlineApartment
            className={css.catalogVisibleCss}
            onClick={() => setChangeVisible(false)}
          />
        ) : (
          <AiOutlineUnorderedList
            className={css.catalogVisibleCss}
            onClick={() => setChangeVisible(true)}
          />
        )}
      </div>

      {!changeVisible &&
        currentProducts.map((el, index) => (
          <CatalogProductComponent
            visitedProducts={visitedProducts}
            setVisitedProducts={setVisitedProducts}
            el={el}
            key={el.uid}
            setCartCounterC={setCartCounterC}
            setLikeCounterC={setLikeCounterC}
          />
        ))}

      {changeVisible && currentProducts.length > 0 && (
        <>
          <SatalogProductComponentsSmall
            visitedProducts={visitedProducts}
            setVisitedProducts={setVisitedProducts}
            el={currentProducts[0]}
            key={currentProducts[0].uid}
            setCartCounterC={setCartCounterC}
            setLikeCounterC={setLikeCounterC}
          />
          <div className={css.wrapSmallProductTwoType}>
            {currentProducts.slice(1).map((el, index) => (
              <SmallProductCartTop
                el={el}
                key={el.uid}
                setCartCounterC={setCartCounterC}
                setLikeCounterC={setLikeCounterC}
              />
            ))}
          </div>
        </>
      )}

      <ListButtonCount
        pageNumbers={pageNumbers}
        handlePageClick={handlePageClick}
        currentPage={currentPage}
      />

      <DiscountAndAction />
      <ViewProductCatalog
        products={productsAll}
        setCartCounterC={setCartCounterC}
        setLikeCounterC={setLikeCounterC}
      />
    </>
  );
};

export default withFirebaseCollection("seo")(Catalog);
