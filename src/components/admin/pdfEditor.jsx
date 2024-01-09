import React, { useState, useEffect } from "react";
import css from "./adm.module.css";
import {
  getStorage,
  ref,
  deleteObject,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

const PdfEditor = () => {
  const storage = getStorage();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, "product");
      const productsSnapshot = await getDocs(productsCollection);
      const productsData = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
    };

    fetchProducts();
  }, []);

  const handleUpdateHeroFoto = async () => {
    if (newImage && selectedProduct) {
      const imageRef = ref(storage, `pdf/${newImage.name}`);
      await uploadBytes(imageRef, newImage);
      const imageUrl = await getDownloadURL(imageRef);

      const productRef = doc(db, "product", selectedProduct.id);
      await updateDoc(productRef, {
        pdf: imageUrl,
      });

      setNewImage(null);
      window.location.reload();
    }
  };

  const handleDeleteHeroFoto = async () => {
    if (selectedProduct) {
      const productRef = doc(db, "product", selectedProduct.id);
      await updateDoc(productRef, {
        pdf: "",
      });

      window.location.reload();
    }
  };
  const opneMenu = (product) => {
    if (selectedProduct !== null) {
      setSelectedProduct(null);
    } else {
      setSelectedProduct(product);
    }
  };
  return (
    <div>
      <h2>Список книг</h2>
      <ul className={css.ulHer}>
        {products.map((product) => (
          <li key={product.id} className={css.wrapAllPHL}>
            <h3>{product.bookName}</h3>
            {product.pdf && (
              <div className={css.wrapHeroF}>
                <p>{product.pdf}</p>
              </div>
            )}

            {selectedProduct === product && (
              <div>
                {product.pdf ? (
                  <>
                    <button onClick={handleDeleteHeroFoto}>
                      Видалити запис
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setNewImage(e.currentTarget.files[0])}
                    />
                    <button onClick={handleUpdateHeroFoto}>Додати запис</button>
                  </>
                )}
              </div>
            )}
            <button onClick={() => opneMenu(product)}>
              {selectedProduct === product ? "Закрити меню" : "Відкрити меню"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PdfEditor;
