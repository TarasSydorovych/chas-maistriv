import { useState, useEffect } from "react";
import WithFieldData from "../HOK/withFieldData";
import SmallProductCart from "../standartComponent/productComponent/smallProductCart";
import css from "./main.module.css";
import SmallProductCartSale from "../standartComponent/productComponent/smallProductCartSale";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addFilter } from "../../function/filtersSlice";
const AllRozprodagNew = ({ products, setCartCounterC, setLikeCounterC }) => {
  const [randomProduct, setRandomProduct] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (products.length > 0) {
      const randomIndex = Math.floor(Math.random() * products.length);
      setRandomProduct(products[randomIndex]);
    }
  }, [products]);
  const goToRozprodag = () => {
    // Додаємо фільтр "Розпродаж" в Redux
    dispatch(addFilter({ field: "rozprodaz", value: "true" }));
    // Перенаправляємо на сторінку каталогу
    navigate("/catalog");
  };
  return (
    <div className={css.oneProdWrapNew}>
      <p className={css.nameOfAcrRozprodag} onClick={goToRozprodag}>
        Весь Розпродаж
      </p>
      {randomProduct && (
        <SmallProductCartSale
          el={randomProduct}
          setCartCounterC={setCartCounterC}
          setLikeCounterC={setLikeCounterC}
        />
      )}
    </div>
  );
};

export default WithFieldData("rozprodaz", "product", "true")(AllRozprodagNew);
