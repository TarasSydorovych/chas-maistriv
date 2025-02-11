// import React, { useState, useEffect } from "react";
// import css from "./adm.module.css";
// import {
//   getStorage,
//   ref,
//   deleteObject,
//   getDownloadURL,
//   uploadBytesResumable,
// } from "firebase/storage";
// import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
// import { auth, db } from "../../firebase";
// import Swal from "sweetalert2";

// const ProductListEditor = () => {
//   const storage = getStorage();
//   const [products, setProducts] = useState([]); // Стан для збереження списку товарів
//   const [selectedProduct, setSelectedProduct] = useState(null); // Стан для вибраного товару
//   const [newImage, setNewImage] = useState(null); // Стан для нового фото
//   const [selectedProductId, setSelectedProductId] = useState(null); // Стан для ідентифікатора вибраного продукту

//   // Отримати список товарів з Firebase Firestore
//   useEffect(() => {
//     const fetchProducts = async () => {
//       const productsCollection = collection(db, "product");
//       const productsSnapshot = await getDocs(productsCollection);
//       const productsData = productsSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setProducts(productsData);
//     };

//     fetchProducts();
//   }, []);

//   const handleDeleteImage = async (product, imageIndex) => {
//     const updatedImageList = [...product.imageList];
//     updatedImageList.splice(imageIndex, 1);

//     // Оновити поле imageList товару в Firestore
//     const productRef = doc(db, "product", product.id);
//     await updateDoc(productRef, {
//       imageList: updatedImageList,
//     });

//     // Оновлення стану компоненту
//     setProducts((prevProducts) =>
//       prevProducts.map((p) =>
//         p.id === product.id ? { ...p, imageList: updatedImageList } : p
//       )
//     );

//     // Оновлення стану selectedProduct
//     setSelectedProduct((prevProduct) =>
//       prevProduct
//         ? { ...prevProduct, imageList: updatedImageList }
//         : prevProduct
//     );
//   };

//   // Функція для оновлення фото товару
//   const handleUpdateImage = async (product, imageIndex) => {
//     if (newImage) {
//       const imageRef = ref(storage, `images/${newImage.name}`);
//       const uploadTask = uploadBytesResumable(imageRef, newImage);

//       Swal.fire({
//         title: "Uploading...",
//         html: "Please wait while the image is being uploaded.",
//         didOpen: () => {
//           Swal.showLoading();
//         },
//         allowOutsideClick: false,
//       });

//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           const progress =
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           Swal.getContent().querySelector("b").textContent = `${Math.round(
//             progress
//           )}%`;
//         },
//         (error) => {
//           console.error("Error uploading file:", error);
//           Swal.close();
//           Swal.fire(
//             "Error!",
//             "There was an error uploading the image.",
//             "error"
//           );
//         },
//         async () => {
//           const imageUrl = await getDownloadURL(imageRef);

//           // Оновити поле imageList товару в Firestore
//           const productRef = doc(db, "product", product.id);
//           const updatedImageList = [...product.imageList];
//           updatedImageList[imageIndex] = imageUrl;

//           await updateDoc(productRef, {
//             imageList: updatedImageList,
//           });

//           // Скинути значення newImage та оновити стан компоненту
//           setNewImage(null);
//           setProducts((prevProducts) =>
//             prevProducts.map((p) =>
//               p.id === product.id ? { ...p, imageList: updatedImageList } : p
//             )
//           );

//           // Оновлення стану selectedProduct
//           setSelectedProduct((prevProduct) =>
//             prevProduct
//               ? { ...prevProduct, imageList: updatedImageList }
//               : prevProduct
//           );

//           Swal.close();
//           Swal.fire("Success!", "Image updated successfully.", "success");
//         }
//       );
//     }
//   };

//   // Функція для додавання нової фотографії до вибраного товару
//   const handleAddImage = async () => {
//     if (selectedProduct && newImage) {
//       const imageRef = ref(storage, `images/${newImage.name}`);
//       const uploadTask = uploadBytesResumable(imageRef, newImage);

//       Swal.fire({
//         title: "Uploading...",
//         html: "Please wait while the image is being uploaded.",
//         didOpen: () => {
//           Swal.showLoading();
//         },
//         allowOutsideClick: false,
//       });

//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           const progress =
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           Swal.getContent().querySelector("b").textContent = `${Math.round(
//             progress
//           )}%`;
//         },
//         (error) => {
//           console.error("Error uploading file:", error);
//           Swal.close();
//           Swal.fire(
//             "Error!",
//             "There was an error uploading the image.",
//             "error"
//           );
//         },
//         async () => {
//           const imageUrl = await getDownloadURL(imageRef);

//           // Оновити поле imageList товару в Firestore
//           const productRef = doc(db, "product", selectedProduct.id);

//           const updatedImageList = [...selectedProduct.imageList, imageUrl];

//           await updateDoc(productRef, {
//             imageList: updatedImageList,
//           });

//           // Очистити поле вводу нової фотографії після додавання та оновити стан компоненту
//           setNewImage(null);
//           setProducts((prevProducts) =>
//             prevProducts.map((p) =>
//               p.id === selectedProduct.id
//                 ? { ...p, imageList: updatedImageList }
//                 : p
//             )
//           );

//           // Оновлення стану selectedProduct
//           setSelectedProduct((prevProduct) =>
//             prevProduct
//               ? { ...prevProduct, imageList: updatedImageList }
//               : prevProduct
//           );

//           Swal.close();
//           Swal.fire("Success!", "Image added successfully.", "success");
//         }
//       );
//     }
//   };

//   const viewClick = (product, uid) => {
//     setSelectedProduct(product);
//     setSelectedProductId(uid);
//   };

//   return (
//     <div className={css.wrapPicList}>
//       <h2>Список фото</h2>
//       <ul className={css.ulWrapPic}>
//         {products.map((product) => (
//           <>
//             <li key={product.id} className={css.liWrapPic}>
//               <h3>{product.bookName}</h3>

//               <button onClick={() => viewClick(product, product.id)}>
//                 Показати фото
//               </button>
//             </li>
//             {selectedProductId === product.id && (
//               <div>
//                 <h3>{selectedProduct.name} Images</h3>
//                 {selectedProduct.imageList.length === 0 && (
//                   <>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => setNewImage(e.currentTarget.files[0])}
//                     />
//                     <button onClick={handleAddImage}>Додати фото</button>
//                   </>
//                 )}
//                 {selectedProduct.imageList.map((imageUrl, index) => {
//                   return (
//                     <div key={index}>
//                       <img
//                         className={css.imgInWr}
//                         src={imageUrl}
//                         alt={`Product ${index}`}
//                       />
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={(e) => setNewImage(e.currentTarget.files[0])}
//                       />
//                       <button
//                         onClick={() =>
//                           handleUpdateImage(selectedProduct, index)
//                         }
//                       >
//                         Змінити фото
//                       </button>
//                       <button
//                         onClick={() =>
//                           handleDeleteImage(selectedProduct, index)
//                         }
//                       >
//                         Видалити фото
//                       </button>
//                     </div>
//                   );
//                 })}
//                 <div>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => setNewImage(e.currentTarget.files[0])}
//                   />
//                   <button onClick={handleAddImage}>Додати нове фото</button>
//                 </div>
//               </div>
//             )}
//           </>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProductListEditor;
import React, { useState, useEffect } from "react";
import css from "./adm.module.css";
import {
  getStorage,
  ref,
  deleteObject,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../../firebase";

const ProductListEditor = () => {
  const storage = getStorage();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);

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

    const productRef = doc(db, "product", product.id);
    await updateDoc(productRef, {
      imageList: updatedImageList,
    });

    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === product.id ? { ...p, imageList: updatedImageList } : p
      )
    );

    setSelectedProduct((prevProduct) =>
      prevProduct
        ? { ...prevProduct, imageList: updatedImageList }
        : prevProduct
    );
  };

  const handleUpdateImage = async (product, imageIndex) => {
    if (newImage) {
      const imageRef = ref(storage, `images/${newImage.name}`);
      const uploadTask = uploadBytesResumable(imageRef, newImage);

      Swal.fire({
        title: "Uploading...",
        html: "Please wait while the image is being uploaded.",
        didOpen: () => {
          Swal.showLoading();
        },
        allowOutsideClick: false,
      });

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          Swal.getContent().querySelector("b").textContent = `${Math.round(
            progress
          )}%`;
        },
        (error) => {
          console.error("Error uploading file:", error);
          Swal.close();
          Swal.fire(
            "Error!",
            "There was an error uploading the image.",
            "error"
          );
        },
        async () => {
          const imageUrl = await getDownloadURL(imageRef);

          const productRef = doc(db, "product", product.id);
          const updatedImageList = [...product.imageList];
          updatedImageList[imageIndex] = imageUrl;

          await updateDoc(productRef, {
            imageList: updatedImageList,
          });

          setNewImage(null);
          setProducts((prevProducts) =>
            prevProducts.map((p) =>
              p.id === product.id ? { ...p, imageList: updatedImageList } : p
            )
          );

          setSelectedProduct((prevProduct) =>
            prevProduct
              ? { ...prevProduct, imageList: updatedImageList }
              : prevProduct
          );

          Swal.close();
          Swal.fire("Success!", "Image updated successfully.", "success");
        }
      );
    }
  };

  const handleAddImage = async () => {
    if (selectedProduct && newImage) {
      const imageRef = ref(storage, `images/${newImage.name}`);
      const uploadTask = uploadBytesResumable(imageRef, newImage);

      Swal.fire({
        title: "Uploading...",
        html: "Please wait while the image is being uploaded.",
        didOpen: () => {
          Swal.showLoading();
        },
        allowOutsideClick: false,
      });

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          Swal.getContent().querySelector("b").textContent = `${Math.round(
            progress
          )}%`;
        },
        (error) => {
          console.error("Error uploading file:", error);
          Swal.close();
          Swal.fire(
            "Error!",
            "There was an error uploading the image.",
            "error"
          );
        },
        async () => {
          const imageUrl = await getDownloadURL(imageRef);

          const productRef = doc(db, "product", selectedProduct.id);

          const updatedImageList = [...selectedProduct.imageList, imageUrl];

          await updateDoc(productRef, {
            imageList: updatedImageList,
          });

          setNewImage(null);
          setProducts((prevProducts) =>
            prevProducts.map((p) =>
              p.id === selectedProduct.id
                ? { ...p, imageList: updatedImageList }
                : p
            )
          );

          setSelectedProduct((prevProduct) =>
            prevProduct
              ? { ...prevProduct, imageList: updatedImageList }
              : prevProduct
          );

          Swal.close();
          Swal.fire("Success!", "Image added successfully.", "success");
        }
      );
    }
  };

  const viewClick = (product, uid) => {
    setSelectedProduct(product);
    setSelectedProductId(uid);
  };

  return (
    <div className={css.wrapPicList}>
      <h2>Список фото</h2>
      <ul className={css.ulWrapPic}>
        {products.map((product) => (
          <React.Fragment key={product.id}>
            <li className={css.liWrapPic}>
              <h3>{product.bookName}</h3>
              <button onClick={() => viewClick(product, product.id)}>
                Показати фото
              </button>
            </li>
            {selectedProductId === product.id && selectedProduct && (
              <div>
                <h3>{selectedProduct.bookName} Images</h3>
                {selectedProduct.imageList.length === 0 && (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setNewImage(e.currentTarget.files[0])}
                    />
                    <button onClick={handleAddImage}>Додати фото</button>
                  </>
                )}
                {selectedProduct.imageList.map((imageUrl, index) => (
                  <div key={index}>
                    <img
                      className={css.imgInWr}
                      src={imageUrl}
                      alt={`Product ${index}`}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setNewImage(e.currentTarget.files[0])}
                    />
                    <button
                      onClick={() => handleUpdateImage(selectedProduct, index)}
                    >
                      Змінити фото
                    </button>
                    <button
                      onClick={() => handleDeleteImage(selectedProduct, index)}
                    >
                      Видалити фото
                    </button>
                  </div>
                ))}
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewImage(e.currentTarget.files[0])}
                  />
                  <button onClick={handleAddImage}>Додати нове фото</button>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default ProductListEditor;
