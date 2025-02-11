import { useState, useEffect } from "react";
import WithFieldData from "../HOK/withFieldData";
import SmallProductCart from "../standartComponent/productComponent/smallProductCart";
import css from "./main.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addFilter } from "../../function/filtersSlice";
const OneProdActions = ({ products, setCartCounterC, setLikeCounterC }) => {
  const [randomProduct, setRandomProduct] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (products.length > 0) {
      const randomIndex = Math.floor(Math.random() * products.length);
      setRandomProduct(products[randomIndex]);
    }
  }, [products]);
  const goToSales = () => {
    // Додаємо фільтр "Акція" в Redux
    dispatch(addFilter({ field: "sale", value: "true" }));
    // Перенаправляємо на сторінку каталогу
    navigate("/catalog");
  };
  return (
    <div className={css.oneProdWrapNew}>
      <p className={css.nameOfAcr} onClick={goToSales}>
        Всі Акції
      </p>
      {randomProduct && (
        <SmallProductCart
          el={randomProduct}
          setCartCounterC={setCartCounterC}
          setLikeCounterC={setLikeCounterC}
        />
      )}
    </div>
  );
};

export default WithFieldData("sale", "product", "true")(OneProdActions);
