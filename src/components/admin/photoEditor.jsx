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

const ProductListEditor = () => {
  const storage = getStorage();
  const [products, setProducts] = useState([]); // Стан для збереження списку товарів
  const [selectedProduct, setSelectedProduct] = useState(null); // Стан для вибраного товару
  const [newImage, setNewImage] = useState(null); // Стан для нового фото
  const [selectedProductId, setSelectedProductId] = useState(null); // Стан для ідентифікатора вибраного продукту

  // Отримати список товарів з Firebase Firestore
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
  const handleDeleteImage = async (product, imageIndex) => {
    const updatedImageList = [...product.imageList];
    updatedImageList.splice(imageIndex, 1);

    // Оновити поле imageList товару в Firestore
    const productRef = doc(db, "product", product.id);
    await updateDoc(productRef, {
      imageList: updatedImageList,
    });
    window.location.reload();
  };
  // Функція для оновлення фото товару
  const handleUpdateImage = async (product, imageIndex) => {
    if (newImage) {
      const imageRef = ref(storage, `images/${newImage.name}`);
      await uploadBytes(imageRef, newImage);
      const imageUrl = await getDownloadURL(imageRef);

      // Оновити поле imageList товару в Firestore
      const productRef = doc(db, "product", product.id);
      const updatedImageList = [...product.imageList];
      updatedImageList[imageIndex] = imageUrl;

      await updateDoc(productRef, {
        imageList: updatedImageList,
      });

      // Скинути значення newImage
      setNewImage(null);
      window.location.reload();
    }
  };

  // Функція для додавання нової фотографії до вибраного товару
  const handleAddImage = async () => {
    if (selectedProduct && newImage) {
      const imageRef = ref(storage, `images/${newImage.name}`);
      await uploadBytes(imageRef, newImage);
      const imageUrl = await getDownloadURL(imageRef);

      // Оновити поле imageList товару в Firestore
      const productRef = doc(db, "product", selectedProduct.id);

      const updatedImageList = [...selectedProduct.imageList, imageUrl];

      await updateDoc(productRef, {
        imageList: updatedImageList,
      });

      // Очистити поле вводу нової фотографії після додавання
      setNewImage(null);
      window.location.reload();
    }
  };
  const viewClick = (product, uid) => {
    setSelectedProduct(product);
    setSelectedProductId(uid);
  };
  return (
    <div className={css.wrapPicList}>
      <h2>Product List</h2>
      <ul className={css.ulWrapPic}>
        {products.map((product) => (
          <>
            <li key={product.id} className={css.liWrapPic}>
              <h3>{product.autoName}</h3>
              <h2>{product.uid}</h2>
              <button onClick={() => viewClick(product, product.id)}>
                Показати фото
              </button>
            </li>
            {selectedProductId === product.id && (
              <div>
                <h3>{selectedProduct.name} Images</h3>
                {selectedProduct.imageList.map((imageUrl, index) => {
                  return (
                    <div key={index}>
                      <img
                        className={css.imgInWr}
                        src={imageUrl}
                        alt={`Product ${index}`}
                      />
                      <button
                        onClick={() =>
                          handleUpdateImage(selectedProduct, index)
                        }
                      >
                        Змінити фото
                      </button>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setNewImage(e.currentTarget.files[0])}
                      />
                      <button onClick={handleAddImage}>Додати фото</button>
                      <button
                        onClick={() =>
                          handleDeleteImage(selectedProduct, index)
                        }
                      >
                        Видалити фото
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        ))}
      </ul>
    </div>
  );
};

export default ProductListEditor;
