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

// const AudioEditor = () => {
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
//       const imageRef = ref(storage, `audio/${newImage.name}`);
//       await uploadBytes(imageRef, newImage);
//       const imageUrl = await getDownloadURL(imageRef);

//       const productRef = doc(db, "product", selectedProduct.id);
//       await updateDoc(productRef, {
//         audio: imageUrl,
//       });

//       setNewImage(null);
//       window.location.reload();
//     }
//   };

//   const handleDeleteHeroFoto = async () => {
//     if (selectedProduct) {
//       const productRef = doc(db, "product", selectedProduct.id);
//       await updateDoc(productRef, {
//         audio: "",
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
//             {product.audio && (
//               <div className={css.wrapHeroF}>
//                 <audio controls src={product.audio}></audio>
//                 <p></p>
//               </div>
//             )}

//             {selectedProduct === product && (
//               <div>
//                 {product.audio ? (
//                   <>
//                     <button onClick={handleDeleteHeroFoto}>
//                       Видалити запис
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <input
//                       type="file"
//                       accept="audio/*"
//                       onChange={(e) => setNewImage(e.currentTarget.files[0])}
//                     />
//                     <button onClick={handleUpdateHeroFoto}>Додати запис</button>
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

// export default AudioEditor;
// import React, { useState, useEffect } from "react";
// import css from "./adm.module.css";
// import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
// import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
// import { db } from "../../firebase";

// const AudioEditor = () => {
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
//       const imageRef = ref(storage, `audio/${newImage.name}`);
//       await uploadBytes(imageRef, newImage);
//       const imageUrl = await getDownloadURL(imageRef);

//       const productRef = doc(db, "product", selectedProduct.id);
//       await updateDoc(productRef, {
//         audio: imageUrl,
//       });

//       setNewImage(null);
//       setProducts((prevProducts) =>
//         prevProducts.map((product) =>
//           product.id === selectedProduct.id
//             ? { ...product, audio: imageUrl }
//             : product
//         )
//       );
//     }
//   };

//   const handleDeleteHeroFoto = async () => {
//     if (selectedProduct) {
//       const productRef = doc(db, "product", selectedProduct.id);
//       await updateDoc(productRef, {
//         audio: "",
//       });

//       setProducts((prevProducts) =>
//         prevProducts.map((product) =>
//           product.id === selectedProduct.id
//             ? { ...product, audio: "" }
//             : product
//         )
//       );
//     }
//   };

//   const openMenu = (product) => {
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
//             {product.audio && (
//               <div className={css.wrapHeroF}>
//                 <audio controls src={product.audio}></audio>
//                 <p></p>
//               </div>
//             )}

//             {selectedProduct === product && (
//               <div>
//                 {product.audio ? (
//                   <>
//                     <button onClick={handleDeleteHeroFoto}>
//                       Видалити запис
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <input
//                       type="file"
//                       accept="audio/*"
//                       onChange={(e) => setNewImage(e.currentTarget.files[0])}
//                     />
//                     <button onClick={handleUpdateHeroFoto}>Додати запис</button>
//                   </>
//                 )}
//               </div>
//             )}
//             <button onClick={() => openMenu(product)}>
//               {selectedProduct === product ? "Закрити меню" : "Відкрити меню"}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AudioEditor;
import React, { useState, useEffect } from "react";
import css from "./adm.module.css";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Swal from "sweetalert2";

const AudioEditor = () => {
  const storage = getStorage();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newAudio, setNewAudio] = useState(null);

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

  const handleUpdateAudio = async () => {
    if (newAudio && selectedProduct) {
      const audioRef = ref(storage, `audio/${newAudio.name}`);
      const uploadTask = uploadBytesResumable(audioRef, newAudio);

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
            "There was an error uploading the audio file.",
            "error"
          );
        },
        async () => {
          const audioUrl = await getDownloadURL(audioRef);

          const productRef = doc(db, "product", selectedProduct.id);
          await updateDoc(productRef, {
            audio: audioUrl,
          });

          setNewAudio(null);
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product.id === selectedProduct.id
                ? { ...product, audio: audioUrl }
                : product
            )
          );

          Swal.close();
          Swal.fire("Success!", "Audio updated successfully.", "success");
        }
      );
    }
  };

  const handleDeleteAudio = async () => {
    if (selectedProduct) {
      const productRef = doc(db, "product", selectedProduct.id);
      await updateDoc(productRef, {
        audio: "",
      });

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === selectedProduct.id
            ? { ...product, audio: "" }
            : product
        )
      );

      Swal.fire("Success!", "Audio deleted successfully.", "success");
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
            {product.audio && (
              <div className={css.wrapHeroF}>
                <audio controls src={product.audio}></audio>
                <p></p>
              </div>
            )}

            {selectedProduct === product && (
              <div>
                {product.audio ? (
                  <>
                    <button onClick={handleDeleteAudio}>Видалити запис</button>
                  </>
                ) : (
                  <>
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={(e) => setNewAudio(e.currentTarget.files[0])}
                    />
                    <button onClick={handleUpdateAudio}>Додати запис</button>
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

export default AudioEditor;
