import React, { useState, useEffect } from "react";
import { db } from "../../../firebase"; // Імпортуйте конфігурацію Firebase
import { collection, getDocs, doc, setDoc } from "firebase/firestore";

export default function AdminProductSelector() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, "product");
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  const handleSelectProduct = async (productId) => {
    setSelectedProduct(productId);

    // Записуємо вибраний товар у колекцію prodForCatalog
    await setDoc(doc(db, "prodForCatalog", "firstDocument"), {
      selectedProductId: productId,
    });
  };

  return (
    <div>
      <h2>Select Product for Catalog</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.bookName}
            <button onClick={() => handleSelectProduct(product.uid)}>
              Вибрати для банеру
            </button>
          </li>
        ))}
      </ul>
      {selectedProduct && <p>Банер змінено книга з id : {selectedProduct}</p>}
    </div>
  );
}
