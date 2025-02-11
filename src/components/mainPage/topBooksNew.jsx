// import { useState, useEffect } from "react";
// import WithFieldData from "../HOK/withFieldData";
// import SmallProductCart from "../standartComponent/productComponent/smallProductCart";
// import css from "./main.module.css";
// import SmallProductCartTop from "../standartComponent/productComponent/SmallProductCartTop";

// const TopBooksNew = ({ products, setCartCounterC, setLikeCounterC }) => {
//   const [randomProduct, setRandomProduct] = useState(null);

//   useEffect(() => {
//     if (products.length > 0) {
//       const randomIndex = Math.floor(Math.random() * products.length);
//       setRandomProduct(products[randomIndex]);
//     }
//   }, [products]);

//   return (
//     <div className={css.oneProdWrapNew}>
//       <p className={css.nameOfAcrAllTop}>Всі ТОП книги</p>
//       {randomProduct && (
//         <SmallProductCartTop
//           el={randomProduct}
//           setCartCounterC={setCartCounterC}
//           setLikeCounterC={setLikeCounterC}
//         />
//       )}
//     </div>
//   );
// };

// export default WithFieldData("top", "product", "true")(TopBooksNew);
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Додаємо useNavigate
import { useDispatch } from "react-redux"; // Додаємо useDispatch
import { addFilter } from "../../function/filtersSlice"; // Імпортуємо дію для фільтра
import WithFieldData from "../HOK/withFieldData";
import SmallProductCartTop from "../standartComponent/productComponent/SmallProductCartTop";
import css from "./main.module.css";

const TopBooksNew = ({ products, setCartCounterC, setLikeCounterC }) => {
  const [randomProduct, setRandomProduct] = useState(null);
  const navigate = useNavigate(); // Ініціалізуємо навігацію
  const dispatch = useDispatch(); // Ініціалізуємо dispatch

  useEffect(() => {
    if (products.length > 0) {
      const randomIndex = Math.floor(Math.random() * products.length);
      setRandomProduct(products[randomIndex]);
    }
  }, [products]);

  const goToTopBooks = () => {
    // Додаємо фільтр "ТОП книги" в Redux
    dispatch(addFilter({ field: "top", value: "true" }));
    // Перенаправляємо на сторінку каталогу
    navigate("/catalog");
  };

  return (
    <div className={css.oneProdWrapNew}>
      <p className={css.nameOfAcrAllTop} onClick={goToTopBooks}>
        Всі ТОП книги
      </p>
      {randomProduct && (
        <SmallProductCartTop
          el={randomProduct}
          setCartCounterC={setCartCounterC}
          setLikeCounterC={setLikeCounterC}
        />
      )}
    </div>
  );
};

export default WithFieldData("top", "product", "true")(TopBooksNew);
