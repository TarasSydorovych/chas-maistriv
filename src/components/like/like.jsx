import { Link } from "react-router-dom";
import Footer from "../standartComponent/footer/footer";
import Header from "../standartComponent/header/header";
import css from "./like.module.css";
import ProductToLike from "./productToLike";
import { useState, useEffect } from "react";

export default function Like({ setCartCounterC, setLikeCounterC }) {
  const [forRender, setForRender] = useState(false);
  const [likedProducts, setLikedProducts] = useState([]);
  useEffect(() => {
    // Отримуємо дані з localStorage при завантаженні компоненти
    const storedLikedProducts =
      JSON.parse(localStorage.getItem("likedProducts")) || [];
    setLikedProducts(storedLikedProducts);
  }, [forRender]);

  const handleRemove = (uid) => {
    // Отримуємо дані з localStorage
    const storedLikedProducts =
      JSON.parse(localStorage.getItem("likedProducts")) || [];

    // Фільтруємо масив, видаляючи товар з певним uid
    const updatedLikedProducts = storedLikedProducts.filter(
      (product) => product.uid !== uid
    );

    // Оновлюємо дані в localStorage
    localStorage.setItem("likedProducts", JSON.stringify(updatedLikedProducts));

    // Оновлюємо стан компоненти, якщо потрібно
    setLikedProducts(updatedLikedProducts);
    setForRender(!forRender);
    setLikeCounterC((prev) => prev + 1);
  };
  return (
    <div>
      <div className={css.blueBlockHead}>
        <div className={css.blueBlockHeadSmall}>
          <p className={css.countJoin}>Бажане ({likedProducts.length})</p>
          <Link to="/" className={css.countJoinNew}>
            Повернутись на головну
          </Link>
        </div>
      </div>
      <div className={css.likeProductWrap}>
        <div className={css.likeProductWrapSmall}>
          {likedProducts.map((el, index) => {
            return (
              <ProductToLike
                handleRemove={handleRemove}
                key={index}
                el={el}
                setCartCounterC={setCartCounterC}
                setLikeCounterC={setLikeCounterC}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
