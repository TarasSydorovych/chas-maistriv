// import React, { useState, useEffect } from "react";
// import css from "./adm.module.css";
// import {
//   getStorage,
//   ref,
//   deleteObject,
//   getDownloadURL,
//   uploadBytes,
// } from "firebase/storage";
// import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
// import { auth, db } from "../../firebase";

// const HeroFotoEditor = () => {
//   const storage = getStorage();
//   const [products, setProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [newImage, setNewImage] = useState(null);

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

//   const handleUpdateHeroFoto = async () => {
//     if (newImage && selectedProduct) {
//       const imageRef = ref(storage, `images/${newImage.name}`);
//       await uploadBytes(imageRef, newImage);
//       const imageUrl = await getDownloadURL(imageRef);

//       const productRef = doc(db, "product", selectedProduct.id);
//       await updateDoc(productRef, {
//         heroFoto: imageUrl,
//       });

//       setNewImage(null);
//       window.location.reload();
//     }
//   };

//   const handleDeleteHeroFoto = async () => {
//     if (selectedProduct) {
//       const productRef = doc(db, "product", selectedProduct.id);
//       await updateDoc(productRef, {
//         heroFoto: "",
//       });

//       window.location.reload();
//     }
//   };
//   const opneMenu = (product) => {
//     if (selectedProduct !== null) {
//       setSelectedProduct(null);
//     } else {
//       setSelectedProduct(product);
//     }
//   };
//   return (
//     <div>
//       <h2>Список книг</h2>
//       <ul className={css.ulHer}>
//         {products.map((product) => (
//           <li key={product.id} className={css.wrapAllPHL}>
//             <h3>{product.bookName}</h3>
//             {product.heroFoto && (
//               <div className={css.wrapHeroF}>
//                 <img
//                   src={product.heroFoto}
//                   alt={`Hero for ${product.autoName}`}
//                 />
//                 <p></p>
//               </div>
//             )}

//             {selectedProduct === product && (
//               <div>
//                 {product.heroFoto ? (
//                   <>
//                     <button onClick={handleDeleteHeroFoto}>
//                       Видалити фото
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => setNewImage(e.currentTarget.files[0])}
//                     />
//                     <button onClick={handleUpdateHeroFoto}>Додати фото</button>
//                   </>
//                 )}
//               </div>
//             )}
//             <button onClick={() => opneMenu(product)}>
//               {selectedProduct === product ? "Закрити меню" : "Відкрити меню"}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default HeroFotoEditor;
import React, { useState, useEffect } from "react";
import css from "./adm.module.css";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  uploadBytes,
} from "firebase/storage";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Swal from "sweetalert2";

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
      const uploadTask = uploadBytesResumable(imageRef, newImage);

      Swal.fire({
        title: "Uploading...",
        html: "<b>0%</b> completed",
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
          )}% completed`;
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
          await updateDoc(productRef, {
            heroFoto: imageUrl,
          });

          setNewImage(null);
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product.id === selectedProduct.id
                ? { ...product, heroFoto: imageUrl }
                : product
            )
          );

          Swal.close();
          Swal.fire("Success!", "Hero image updated successfully.", "success");
        }
      );
    }
  };

  const handleDeleteHeroFoto = async () => {
    if (selectedProduct) {
      const productRef = doc(db, "product", selectedProduct.id);
      await updateDoc(productRef, {
        heroFoto: "",
      });

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === selectedProduct.id
            ? { ...product, heroFoto: "" }
            : product
        )
      );

      Swal.fire("Success!", "Hero image deleted successfully.", "success");
    }
  };

  const openMenu = (product) => {
    setSelectedProduct((prevSelectedProduct) =>
      prevSelectedProduct === product ? null : product
    );
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
            <button onClick={() => openMenu(product)}>
              {selectedProduct === product ? "Закрити меню" : "Відкрити меню"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HeroFotoEditor;
