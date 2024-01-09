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

const HeroFotoEditor = () => {
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
      const imageRef = ref(storage, `images/${newImage.name}`);
      await uploadBytes(imageRef, newImage);
      const imageUrl = await getDownloadURL(imageRef);

      const productRef = doc(db, "product", selectedProduct.id);
      await updateDoc(productRef, {
        heroFoto: imageUrl,
      });

      setNewImage(null);
      window.location.reload();
    }
  };

  const handleDeleteHeroFoto = async () => {
    if (selectedProduct) {
      const productRef = doc(db, "product", selectedProduct.id);
      await updateDoc(productRef, {
        heroFoto: "",
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
            {product.heroFoto && (
              <div className={css.wrapHeroF}>
                <img
                  src={product.heroFoto}
                  alt={`Hero for ${product.autoName}`}
                />
                <p></p>
              </div>
            )}

            {selectedProduct === product && (
              <div>
                {product.heroFoto ? (
                  <>
                    <button onClick={handleDeleteHeroFoto}>
                      Видалити фото
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setNewImage(e.currentTarget.files[0])}
                    />
                    <button onClick={handleUpdateHeroFoto}>Додати фото</button>
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

export default HeroFotoEditor;
