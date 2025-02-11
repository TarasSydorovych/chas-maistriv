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

// const PdfEditor = () => {
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
//       const imageRef = ref(storage, `pdf/${newImage.name}`);
//       await uploadBytes(imageRef, newImage);
//       const imageUrl = await getDownloadURL(imageRef);

//       const productRef = doc(db, "product", selectedProduct.id);
//       await updateDoc(productRef, {
//         pdf: imageUrl,
//       });

//       setNewImage(null);
//       window.location.reload();
//     }
//   };

//   const handleDeleteHeroFoto = async () => {
//     if (selectedProduct) {
//       const productRef = doc(db, "product", selectedProduct.id);
//       await updateDoc(productRef, {
//         pdf: "",
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
//             {product.pdf && (
//               <div className={css.wrapHeroF}>
//                 <p>{product.pdf}</p>
//               </div>
//             )}

//             {selectedProduct === product && (
//               <div>
//                 {product.pdf ? (
//                   <>
//                     <button onClick={handleDeleteHeroFoto}>
//                       Видалити запис
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <input
//                       type="file"
//                       accept=".pdf"
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

// export default PdfEditor;
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
import { auth, db } from "../../firebase";
import Swal from "sweetalert2";

const PdfEditor = () => {
  const storage = getStorage();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newPdf, setNewPdf] = useState(null);

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

  const handleUpdatePdf = async () => {
    if (newPdf && selectedProduct) {
      const pdfRef = ref(storage, `pdf/${newPdf.name}`);
      const uploadTask = uploadBytesResumable(pdfRef, newPdf);

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
          Swal.fire("Error!", "There was an error uploading the PDF.", "error");
        },
        async () => {
          const pdfUrl = await getDownloadURL(pdfRef);

          const productRef = doc(db, "product", selectedProduct.id);
          await updateDoc(productRef, {
            pdf: pdfUrl,
          });

          setNewPdf(null);
          setProducts((prevProducts) =>
            prevProducts.map((p) =>
              p.id === selectedProduct.id ? { ...p, pdf: pdfUrl } : p
            )
          );

          Swal.close();
          Swal.fire("Success!", "PDF updated successfully.", "success");
        }
      );
    }
  };

  const handleDeletePdf = async () => {
    if (selectedProduct) {
      const productRef = doc(db, "product", selectedProduct.id);
      await updateDoc(productRef, {
        pdf: "",
      });

      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === selectedProduct.id ? { ...p, pdf: "" } : p
        )
      );

      Swal.fire("Success!", "PDF deleted successfully.", "success");
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
            {product.pdf && (
              <div className={css.wrapHeroF}>
                <p>{product.pdf}</p>
              </div>
            )}

            {selectedProduct === product && (
              <div>
                {product.pdf ? (
                  <>
                    <button onClick={handleDeletePdf}>Видалити запис</button>
                  </>
                ) : (
                  <>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setNewPdf(e.currentTarget.files[0])}
                    />
                    <button onClick={handleUpdatePdf}>Додати запис</button>
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

export default PdfEditor;
