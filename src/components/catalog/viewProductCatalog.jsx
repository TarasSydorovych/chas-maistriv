import ProductNewReview from "../standartComponent/productComponent/productNewReview";
import css from "../catalog/catalog.module.css";
import { useState, useEffect } from "react";

export default function ViewProductCatalog({
  products,
  setAddressChanged,
  setCartCounterC,
  setLikeCounterC,
}) {
  const [visitedProducts, setVisitedProducts] = useState([]);

  useEffect(() => {
    // Отримуємо масив відвіданих продуктів з localStorage
    const visitedProductsFromLocalStorage = JSON.parse(
      localStorage.getItem("visitedProducts")
    );
    // Перевіряємо, чи масив існує та чи він не пустий
    if (
      visitedProductsFromLocalStorage &&
      visitedProductsFromLocalStorage.length > 0 &&
      products
    ) {
      const selectedProducts = products.filter((product) =>
        visitedProductsFromLocalStorage.includes(product.uid)
      );

      setVisitedProducts(selectedProducts);
    }
  }, []);

  return (
    <div className="youLikeItWrapNew">
      <div className="youLikewrapSmall">
        <h2 className="ProductCatalogH2">Ви нещодавно переглядали</h2>
        <div className={css.youLikeProductWrap}>
          {visitedProducts.map((el, index) => {
            if (index < 3) {
              return (
                <ProductNewReview
                  key={index}
                  el={el}
                  setAddressChanged={setAddressChanged}
                  setCartCounterC={setCartCounterC}
                  setLikeCounterC={setLikeCounterC}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
