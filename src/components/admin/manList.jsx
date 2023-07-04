import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import css from './adm.module.css';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useDropzone } from 'react-dropzone';
// export default function ProductList() {
//     const [products, setProducts] = useState([]);
//     const [selectedProductId, setSelectedProductId] = useState(null);
  
//     useEffect(() => {
//       fetchProducts();
//     }, []);
  
//     const fetchProducts = async () => {
//       const productCollection = collection(db, 'product');
//       const querySnapshot = await getDocs(productCollection);
//       const productsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), isEditing: false }));
//       setProducts(productsData);
//     };
  
//     const handleProductClick = (productId) => {
//       setSelectedProductId((prevSelectedProductId) => {
//         if (prevSelectedProductId === productId) {
//           return null;
//         } else {
//           return productId;
//         }
//       });
//     };
  
//     const handleFieldBlur = async (productId, field, value) => {
//       const productRef = doc(db, 'product', productId);
//       await updateDoc(productRef, { [field]: value });
  
//       const updatedProducts = products.map((product) => {
//         if (product.id === productId) {
//           return { ...product, [field]: value, isEditing: false };
//         } else {
//           return product;
//         }
//       });
//       setProducts(updatedProducts);
//     };
  
//     return (
//       <div className={css.productList}>
//         <h1 className={css.productListHeading}>Список товарів</h1>
//         {products.map((product) => (
//           <div key={product.id} className={css.productItem}>
//             <div className={css.smalDescBookWr}  onClick={() => handleProductClick(product.id)}>
//             <p
//               className={css.bookName}
//             >
//               {product.bookName}
//             </p>
//             <p
//               className={css.bookName}
//             >
//               {product.price}грн
//             </p>
//             </div>
//             {selectedProductId === product.id && (
//               <div className={css.ProductDetails}>
//                 {Object.entries(product).map(([field, value]) => (
//                   <div key={field} className={css.Field}>
//                     {field !== 'bookName' ? (
//                       <>
//                         <label htmlFor={field} className={css.FieldLabel}>{field}:</label>
//                         {product.isEditing && product.editingField === field ? (
//                           <input
//                             type="text"
//                             id={field}
//                             value={value}
//                             onBlur={(event) => handleFieldBlur(product.id, field, event.target.value)}
//                             autoFocus
//                             onChange={(event) => {
//                               const newValue = event.target.value;
//                               const updatedProducts = products.map((p) => {
//                                 if (p.id === product.id) {
//                                   return { ...p, [field]: newValue };
//                                 } else {
//                                   return p;
//                                 }
//                               });
//                               setProducts(updatedProducts);
//                             }}
//                           />
//                         ) : (
//                           <p
//                             className={css.FieldValue}
//                             onDoubleClick={() => {
//                               const updatedProducts = products.map((p) => {
//                                 if (p.id === product.id) {
//                                   return { ...p, isEditing: true, editingField: field };
//                                 } else {
//                                   return p;
//                                 }
//                               });
//                               setProducts(updatedProducts);
//                             }}
//                           >
//                             {value}
//                           </p>
//                         )}
//                       </>
//                     ) : null}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   }
export default function ManList() {
    const [products, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [objList, setObjList] = useState([
        {
            name: "ISBN",
            transliter: "ISBN",
        },
        {
            name: "СЕО Имя літопису",
            transliter: "ceoName",
        },
        {
            name: "Назва літопису",
            transliter: "bookName",
        },
        {
            name: "Прізвисько літопису",
            transliter: "prizvusko",
        },
        {
            name: "Серія",
            transliter: "seria",
        },
        {
            name: "Автор тексту",
            transliter: "textAutor",
        },
        {
            name: "Художник",
            transliter: "picWriter",
        },
        {
            name: "Автор ідеї",
            transliter: "autorIdea",
        },
        {
            name: "Перекладач",
            transliter: "bookTranslater",
        },
        {
            name: "Редактор",
            transliter: "bRedaktor",
        },
        
        {
            name: "Психологічна експертиза",
            transliter: "psExpert",
        },
        {
            name: "Мовознавча експертиза",
            transliter: "lnExpert",
        },
         {
            name: "Дизайн",
            transliter: "bDesign",
        },
        {
            name: "Над макетом працювали",
            transliter: "onMakWork",
        },
         {
            name: "вид продукту",
            transliter: "prodType",
        },
        
        {
            name: "Ціна",
            transliter: "price",
        },
        {
            name: "Палітурка",
            transliter: "paliturka",
        },
        {
            name: "Кількість сторінок",
            transliter: "pageCount",
        },
        {
            name: "формат (мм)",
            transliter: "bookFormat",
        },
        {
            name: "Товщина (мм)",
            transliter: "booksH",
        },
        {
            name: "Вага (гр)",
            transliter: "booksWei",
        },
        {
            name: "Рік видання",
            transliter: "bookYear",
        },
        {
            name: "Мова видання",
            transliter: "bookLanguage",
        },
        {
            name: "Папір",
            transliter: "bookPaper",
        },
        {
            name: "Ілюстрації",
            transliter: "ilystracii",
        },
        {
            name: "Підбірки книг",
            transliter: "pidbirkuBoo",
        },
        {
            name: "Категорія за ціною",
            transliter: "proceCat",
        },
        {
            name: "Категрорія за об'ємом",
            transliter: "priceMas",
        },
        {
            name: "Навантаження текстом",
            transliter: "moreText",
        },
        {
            name: "Любов до читання",
            transliter: "readLove",
        },
        {
            name: "Вікова група",
            transliter: "yearGroup",
        },
        {
            name: "Жанр",
            transliter: "ganr",
        },
        {
            name: "Спосіб взаємодії",
            transliter: "metVzaem",
        },
        {
            name: "За призначенням",
            transliter: "forWho",
        },
        {
            name: "Комплектація книги",
            transliter: "complectation",
        },
        {
            name: "Книжкові відзнаки",
            transliter: "vidznaku",
        },
        {
            name: "Популярність",
            transliter: "popular",
        },
        {
            name: "Герої книги",
            transliter: "bookHero",
        },
        {
            name: "Дивіз",
            transliter: "duviz",
        },
        {
            name: "Сила книги",
            transliter: "bookPower",
        },
        {
            name: "фото",
            transliter: "bookFoto",
        },
        {
            name: "фото розгорток",
            transliter: "fotoRozgort",
        },
        {
            name: "Відео",
            transliter: "bookVideo",
        },
        {
            name: "Короткий опис",
            transliter: "smallDesc",
        },
        {
            name: "Середній опис",
            transliter: "descriptionSe",
        },
        {
            name: "Довгий опис",
            transliter: "longDesk",
        },
        {
            name: "цитати з книги",
            transliter: "bookChu",
        },
        {
            name: "Ceo title",
            transliter: "ceoTitle",

        },
        {
            name: "Ceo description",
            transliter: "coeDescription",
            
        },
        {
            name: "Ceo keyWord",
            transliter: "coekeyWord",
            
        },
        {
            name: "Новинка",
            transliter: "novunka",
            
        },
        {
            name: "скорочений PDF",
            transliter: "shortPdf",
            
        },
        {
            name: "повний PDF",
            transliter: "longPdf",
            
        },
    ]);
    useEffect(() => {
      fetchProducts();
    }, []);
  
    const fetchProducts = async () => {
      const productCollection = collection(db, 'manuscript');
      const querySnapshot = await getDocs(productCollection);
      const productsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), isEditing: false }));
      setProducts(productsData);
    };
  
    const handleProductClick = (productId) => {
      setSelectedProductId((prevSelectedProductId) => {
        if (prevSelectedProductId === productId) {
          return null;
        } else {
          return productId;
        }
      });
    };
  
    const handleFieldBlur = async (productId, field, value) => {
      const productRef = doc(db, 'manuscript', productId);
      await updateDoc(productRef, { [field]: value });
  
      const updatedProducts = products.map((product) => {
        if (product.id === productId) {
          return { ...product, [field]: value, isEditing: false };
        } else {
          return product;
        }
      });
      setProducts(updatedProducts);
    };
    const handleFileUpload = async (productId, field, file) => {
        const storage = getStorage();
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
      
        // Оновити посилання на файл в Firebase
        updatePhotoUrl(productId, field, downloadURL);
      };
      const updatePhotoUrl = async (productId, field, downloadURL) => {
        const productRef = doc(db, 'manuscript', productId);
        await updateDoc(productRef, { [field]: downloadURL });
      
        const updatedProducts = products.map((product) => {
          if (product.id === productId) {
            return {
              ...product,
              [field]: downloadURL,
            };
          }
          return product;
        });
        setProducts(updatedProducts);
      };
      const FileField = ({ productId, field }) => {
        const onDrop = (acceptedFiles) => {
          const file = acceptedFiles[0];
          handleFileUpload(productId, field, file);
        };
    
        const { getRootProps, getInputProps } = useDropzone({ onDrop });
    
        return (
          <div   {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Перетягніть файл сюди або клацніть, щоб вибрати файл</p>
          </div>
        );
      };   
      const handleDeleteProduct = async (event, productId) => {
        event.stopPropagation(); // Щоб подія не спрацьовувала на батьківському елементі
      
        const confirmDelete = window.confirm('Ви впевнені, що хочете видалити цей літопис?');
        if (!confirmDelete) {
          return;
        }
      
        try {
          const productRef = doc(db, 'manuscript', productId);
          await deleteDoc(productRef);
      
          const updatedProducts = products.filter((product) => product.id !== productId);
          setProducts(updatedProducts);
        } catch (error) {
          console.error('Помилка при видаленні товару:', error);
        }
      }; 
  
    return (
      <div className={css.productList}>
        <h1 className={css.productListHeading}>Список товарів</h1>
        {products.map((product) => (
          <div key={product.id} className={css.productItem}>
            <div className={css.smalDescBookWr} onClick={() => handleProductClick(product.id)}>
              <p className={css.bookName}>{product.bookName}</p>
              <p className={css.bookName}>{product.price}грн</p>
              <button className={css.delProd} onClick={(event) => handleDeleteProduct(event, product.id)}>Видалити літопис</button>
            </div>
            {selectedProductId === product.id && (
              <div className={css.ProductDetails}>
                {objList.map((obj) => {
                  const field = obj.transliter;
                  const name = obj.name;
                  const value = product[field];
  
                  if (field === 'fotoRozgort' || field === 'bookFoto' || field === 'shortPdf' || field === 'longPdf') {
                    return (
                      <div className={css.Field} key={field}>
                        <label htmlFor={field}>{name}:</label>
                        <FileField productId={product.id} field={field} />
                      </div>
                    );
                  }

                  return field !== 'bookName' ? (
                    <div key={field} className={css.Field}>
                      <label htmlFor={field} className={css.FieldLabel}>
                        {name}:
                      </label>
                      {product.isEditing && product.editingField === field ? (
                        <input
                          type="text"
                          id={field}
                          value={value}
                          onBlur={(event) => handleFieldBlur(product.id, field, event.target.value)}
                          autoFocus
                          onChange={(event) => {
                            const newValue = event.target.value;
                            const updatedProducts = products.map((p) => {
                              if (p.id === product.id) {
                                return { ...p, [field]: newValue };
                              } else {
                                return p;
                              }
                            });
                            setProducts(updatedProducts);
                          }}
                        />
                      ) : (
                        <p
                          className={css.FieldValue}
                          onDoubleClick={() => {
                            const updatedProducts = products.map((p) => {
                              if (p.id === product.id) {
                                return { ...p, isEditing: true, editingField: field };
                              } else {
                                return p;
                              }
                            });
                            setProducts(updatedProducts);
                          }}
                        >
                          {value}
                        </p>
                      )}
                    </div>
                  ) : null;
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
