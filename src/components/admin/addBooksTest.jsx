// import css from "./adm.module.css";
// import { useState } from "react";
// import {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
// } from "firebase/storage";
// import { v4 as uuidv4 } from "uuid";
// import { auth, db } from "../../firebase";
// import {
//   doc,
//   setDoc,
//   addDoc,
//   collection,
//   serverTimestamp,
// } from "firebase/firestore";

// export default function AddBooksTest() {
//   const storage = getStorage();
//   const [formData, setFormData] = useState({
//     ISBN: "",
//     cod: "",
//     ean: "",
//     perecaz: "",
//     kilcastInpachka: "",
//     rikPerevudania: "",
//     deviz: "",
//     ceoName: "",
//     bookName: "",
//     prizvusko: "",
//     seria: "",
//     textAutor: "",
//     autorComment: "",
//     shortAboutAuth: "",
//     picWriter: "",
//     shortAboutDesig: "",
//     autorIdea: "",
//     bookTranslater: "",
//     bRedaktor: "",
//     bDesign: "",
//     onMakWork: "",
//     prodType: "",
//     price: "",
//     priceSale: "",
//     predprodDate: "",
//     isNew: "",
//     top: "",
//     rozprodaz: "",
//     sale: "",
//     predprodag: "",
//     paliturka: "",
//     pageCount: "",
//     bookFormat: "",
//     booksH: "",
//     booksWei: "",
//     yearWrite: "",
//     bookLanguage: "",
//     bookPaper: "",
//     ilystracii: "",
//     pidbirkuBoo: "",
//     whyNeedReadO: "",
//     whyNeedReadT: "",
//     whyNeedReadTH: "",
//     laureat: "",
//     bookYear: "",
//     proceCat: "",
//     priceMas: "",
//     moreText: "",
//     readLove: "",
//     yearGroup: "",
//     yearGroupFor: "",
//     ganr: "",
//     metVzaem: "",
//     forWho: "",
//     complectation: "",
//     vidznaku: "",
//     popular: "",
//     bookHero: "",
//     duviz: "",
//     bookPower: "",
//     bookFoto: "",
//     fotoRozgort: "",
//     bookVideo: "",
//     smallDesc: "",
//     descriptionSe: "",
//     longDesk: "",
//     bookChu: "",
//     ceoTitle: "",
//     coeDescription: "",
//     coekeyWord: "",
//     novunka: "",
//     labelOneName: "",
//     labelOneText: "",
//     labelTwoName: "",
//     labelTwoText: "",
//     labelThreName: "",
//     lastExam: "",
//     svjatkovi: "",
//     labelThreText: "",
//     labelFourName: "",
//     labelFourText: "",
//     labelFiveName: "",
//     labelFiveText: "",
//     heroLabelText: "",
//     heroParagrafText: "",
//     heroFoto: "",
//   });
//   const objList = [
//     {
//       name: "ISBN",
//       transliter: "ISBN",
//     },
//     { name: "Код", transliter: "cod" },
//     { name: "EAN", transliter: "ean" },
//     { name: "Переказ", transliter: "perecaz" },
//     { name: "Кількість в пачці", transliter: "kilcastInpachka" },
//     { name: "Рік перевидання", transliter: "rikPerevudania" },
//     { name: "Девіз", transliter: "deviz" },
//     {
//       name: "СЕО Імя книги",
//       transliter: "ceoName",
//     },
//     {
//       name: "Назва книги",
//       transliter: "bookName",
//     },
//     {
//       name: "Прізвисько книги(коротка назва для короткої корзини)",
//       transliter: "prizvusko",
//     },
//     {
//       name: "Серія",
//       transliter: "seria",
//     },
//     {
//       name: "Автор тексту",
//       transliter: "textAutor",
//     },
//     {
//       name: "Коментар автора",
//       transliter: "autorComment",
//     },
//     {
//       name: "Коротко про автора",
//       transliter: "shortAboutAuth",
//     },
//     {
//       name: "Художник",
//       transliter: "picWriter",
//     },
//     {
//       name: "Коротко про художника",
//       transliter: "shortAboutDesig",
//     },
//     {
//       name: "Автор ідеї",
//       transliter: "autorIdea",
//     },
//     {
//       name: "Перекладач",
//       transliter: "bookTranslater",
//     },
//     {
//       name: "Редактор",
//       transliter: "bRedaktor",
//     },
//     {
//       name: "Дизайн",
//       transliter: "bDesign",
//     },
//     {
//       name: "Над макетом працювали",
//       transliter: "onMakWork",
//     },
//     {
//       name: "вид продукту",
//       transliter: "prodType",
//     },
//     {
//       name: "Ціна",
//       transliter: "price",
//     },
//     {
//       name: "Ціна без знижки",
//       transliter: "priceSale",
//     },
//     {
//       name: "Дата закінчення пред продажу",
//       transliter: "predprodDate",
//     },
//     {
//       name: "Новинка",
//       transliter: "isNew",
//     },
//     {
//       name: "Топ",
//       transliter: "top",
//     },
//     {
//       name: "Розпродаж",
//       transliter: "rozprodaz",
//     },
//     {
//       name: "Акція",
//       transliter: "sale",
//     },
//     {
//       name: "Предпродаж",
//       transliter: "predprodag",
//     },
//     {
//       name: "Палітурка",
//       transliter: "paliturka",
//     },
//     {
//       name: "Кількість сторінок",
//       transliter: "pageCount",
//     },
//     {
//       name: "формат (мм)",
//       transliter: "bookFormat",
//     },
//     {
//       name: "Товщина (мм)",
//       transliter: "booksH",
//     },
//     {
//       name: "Вага (гр)",
//       transliter: "booksWei",
//     },
//     {
//       name: "Рік видання",
//       transliter: "yearWrite",
//     },
//     {
//       name: "Мова видання",
//       transliter: "bookLanguage",
//     },
//     {
//       name: "Папір",
//       transliter: "bookPaper",
//     },
//     {
//       name: "Ілюстрації",
//       transliter: "ilystracii",
//     },
//     {
//       name: "Підбірки книг",
//       transliter: "pidbirkuBoo",
//     },
//     {
//       name: "Чому варто читати 1",
//       transliter: "whyNeedReadO",
//     },
//     {
//       name: "Чому варто читати 2",
//       transliter: "whyNeedReadT",
//     },
//     {
//       name: "Чому варто читати 3",
//       transliter: "whyNeedReadTH",
//     },
//     {
//       name: "Лауреат Корнійчуковської премії",
//       transliter: "laureat",
//     },
//     {
//       name: "Книга року",
//       transliter: "bookYear",
//     },
//     {
//       name: "Категорія за ціною",
//       transliter: "proceCat",
//     },
//     {
//       name: "Категрорія за об'ємом",
//       transliter: "priceMas",
//     },
//     {
//       name: "Навантаження текстом",
//       transliter: "moreText",
//     },
//     {
//       name: "Любов до читання",
//       transliter: "readLove",
//     },
//     {
//       name: "Вікова група",
//       transliter: "yearGroup",
//     },
//     {
//       name: "Вікова група для відображення",
//       transliter: "yearGroupFor",
//     },
//     {
//       name: "Жанр",
//       transliter: "ganr",
//     },
//     {
//       name: "Спосіб взаємодії",
//       transliter: "metVzaem",
//     },
//     {
//       name: "За призначенням",
//       transliter: "forWho",
//     },
//     {
//       name: "Комплектація книги",
//       transliter: "complectation",
//     },
//     {
//       name: "Книжкові відзнаки",
//       transliter: "vidznaku",
//     },
//     {
//       name: "Популярність",
//       transliter: "popular",
//     },
//     {
//       name: "Герої книги",
//       transliter: "bookHero",
//     },
//     {
//       name: "Дивіз",
//       transliter: "duviz",
//     },
//     {
//       name: "Сила книги",
//       transliter: "bookPower",
//     },
//     {
//       name: "фото",
//       transliter: "bookFoto",
//     },
//     {
//       name: "фото розгорток",
//       transliter: "fotoRozgort",
//     },
//     {
//       name: "Відео",
//       transliter: "bookVideo",
//     },
//     {
//       name: "Короткий опис",
//       transliter: "smallDesc",
//     },
//     {
//       name: "Середній опис",
//       transliter: "descriptionSe",
//     },
//     {
//       name: "Довгий опис",
//       transliter: "longDesk",
//     },
//     {
//       name: "цитати з книги",
//       transliter: "bookChu",
//     },
//     {
//       name: "Ceo title",
//       transliter: "ceoTitle",
//     },
//     {
//       name: "Ceo description",
//       transliter: "coeDescription",
//     },
//     {
//       name: "Ceo keyWord",
//       transliter: "coekeyWord",
//     },

//     {
//       name: "Новинка",
//       transliter: "novunka",
//     },
//     {
//       name: "Перша кнопка назва",
//       transliter: "labelOneName",
//     },
//     {
//       name: "перша кнопка текст",
//       transliter: "labelOneText",
//     },
//     {
//       name: "Друга кнопка назва",
//       transliter: "labelTwoName",
//     },
//     {
//       name: "Друга кнопка текст",
//       transliter: "labelTwoText",
//     },
//     {
//       name: "Третя кнопка назва",
//       transliter: "labelThreName",
//     },
//     {
//       name: "Останній екземпляр",
//       transliter: "lastExam",
//     },

//     {
//       name: "Святкові",
//       transliter: "svjatkovi",
//     },
//     {
//       name: "Третя кнопка текст",
//       transliter: "labelThreText",
//     },
//     {
//       name: "Четверта кнопка назва",
//       transliter: "labelFourName",
//     },
//     {
//       name: "Четверта кнопка текст",
//       transliter: "labelFourText",
//     },
//     {
//       name: "П'ята кнопка назва",
//       transliter: "labelFiveName",
//     },
//     {
//       name: "П'ята кнопка текст",
//       transliter: "labelFiveText",
//     },
//     {
//       name: "Заголовок для блоку героя",
//       transliter: "heroLabelText",
//     },
//     {
//       name: "Параграф для блоку героя",
//       transliter: "heroParagrafText",
//     },
//     {
//       name: "Фото героя",
//       transliter: "heroFoto",
//     },
//   ];

//   const [photoInputs, setPhotoInputs] = useState([1]);

//   const [photoURLs, setPhotoURLs] = useState([]);
//   const [heroFotoUrl, setHeroFotoUrl] = useState("");

//   const handlePhotoInputChange = (e, index) => {
//     if (e.target.files[0]) {
//       const image = e.target.files[0];
//       const fieldName = `bookFoto${index}`;

//       const uploadTask = uploadBytesResumable(
//         ref(storage, `images/${image.name}`),
//         image
//       );
//       uploadTask.on(
//         "state_changed",
//         null,
//         (error) => {
//           console.log(error);
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then((url) => {
//             if (url) {
//               setPhotoURLs((prevURLs) => {
//                 const updatedURLs = [...prevURLs];
//                 updatedURLs[index] = url;
//                 return updatedURLs.filter((url) => url !== undefined);
//               });
//             }
//           });
//         }
//       );
//     }
//   };
//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     const form = event.target;
//     const data = new FormData(form);
//     const formDataObj = Object.fromEntries(data.entries());

//     // Перевірка кожного елементу formDataObj
//     for (const key in formDataObj) {
//       if (Object.prototype.hasOwnProperty.call(formDataObj, key)) {
//         const value = formDataObj[key];
//         if (value instanceof File) {
//           formDataObj[key] = "";
//         }
//       }
//     }

//     if (photoInputs.length > 0) {
//       formData.imageList = photoURLs;
//     }

//     formData.uid = uuidv4();
//     formData.audio = audioURL;
//     formData.pdf = pdfURL;
//     formData.heroFoto = heroFotoUrl;

//     await setDoc(doc(collection(db, "product"), formData.uid), formData);
//     window.location.reload();
//   };

//   const [audioURL, setAudioURL] = useState("");
//   const [pdfURL, setPdfURL] = useState("");

//   // Решта вашого коду

//   const handleAudioInputChange = (e) => {
//     if (e.target.files[0]) {
//       const audioFile = e.target.files[0];

//       const uploadTask = uploadBytesResumable(
//         ref(storage, `audio/${audioFile.name}`),
//         audioFile
//       );
//       uploadTask.on(
//         "state_changed",
//         null,
//         (error) => {
//           console.log(error);
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then((url) => {
//             if (url) {
//               setAudioURL(url);
//             }
//           });
//         }
//       );
//     }
//   };

//   const handlePdfInputChange = (e) => {
//     if (e.target.files[0]) {
//       const pdfFile = e.target.files[0];

//       const uploadTask = uploadBytesResumable(
//         ref(storage, `pdf/${pdfFile.name}`),
//         pdfFile
//       );
//       uploadTask.on(
//         "state_changed",
//         null,
//         (error) => {
//           console.log(error);
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then((url) => {
//             if (url) {
//               setPdfURL(url);
//             }
//           });
//         }
//       );
//     }
//   };
//   const handleHeroFotoChange = (e) => {
//     if (e.target.files[0]) {
//       const pdfFile = e.target.files[0];

//       const uploadTask = uploadBytesResumable(
//         ref(storage, `${pdfFile.name}`),
//         pdfFile
//       );
//       uploadTask.on(
//         "state_changed",
//         null,
//         (error) => {
//           console.log(error);
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then((url) => {
//             if (url) {
//               setHeroFotoUrl(url);
//             }
//           });
//         }
//       );
//     }
//   };
//   const renderAudioInput = () => {
//     return (
//       <div>
//         <label>Аудіо</label>
//         <input
//           type="file"
//           accept="audio/*"
//           onChange={handleAudioInputChange}
//           name="audio"
//         />
//       </div>
//     );
//   };

//   const renderPdfInput = () => {
//     return (
//       <div>
//         <label>Пдф файл</label>
//         <input
//           type="file"
//           accept=".pdf"
//           onChange={handlePdfInputChange}
//           name="pdfFile"
//         />
//       </div>
//     );
//   };
//   const renderHeroFoto = () => {
//     return (
//       <div>
//         <label>ФотоГероя</label>
//         <input type="file" onChange={handleHeroFotoChange} name="heroFoto" />
//       </div>
//     );
//   };
//   const uploadPhoto = (photo) => {
//     return new Promise((resolve, reject) => {
//       const storageRef = ref(storage, `images/${photo.name}`);
//       const uploadTask = uploadBytesResumable(storageRef, photo);

//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           const progress =
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           console.log(`Upload progress: ${progress}%`);
//         },
//         (error) => {
//           console.log("Error uploading photo:", error);
//           reject(error);
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref)
//             .then((downloadURL) => {
//               resolve(downloadURL);
//             })
//             .catch((error) => {
//               console.log("Error getting photo URL:", error);
//               reject(error);
//             });
//         }
//       );
//     });
//   };

//   const addPhotoInput = () => {
//     setPhotoInputs((prevInputs) => [...prevInputs, prevInputs.length + 1]);
//   };
//   const handleInputChange = (e, index) => {
//     const { name, value, id } = e.target;

//     setFormData((prevData) => {
//       const prevValue = prevData[id];

//       if (Array.isArray(prevValue)) {
//         const updatedArray = [...prevValue];

//         updatedArray[index] = value;

//         return {
//           ...prevData,
//           [id]: updatedArray,
//         };
//       }

//       // Перетворюємо рядок в масив, якщо значення не є масивом
//       return {
//         ...prevData,
//         [name]: prevValue !== undefined ? [prevValue, value] : value,
//       };
//     });
//   };
//   // const handleNewMessage = (e, fieldName) => {
//   //   e.preventDefault();
//   //   setFormData((prevData) => {
//   //     const currentValue = prevData[fieldName] || [];
//   //     console.log("currentValue", currentValue);
//   //     const newValue = [currentValue];
//   //     console.log("newValue", newValue);
//   //     return {
//   //       ...prevData,
//   //       [fieldName]: [currentValue, ""],
//   //     };
//   //   });
//   // };
//   const handleNewMessage = (e, fieldName) => {
//     e.preventDefault();
//     console.log(fieldName);
//     if (!Array.isArray(formData[fieldName])) {
//       setFormData((prev) => ({
//         ...prev,
//         [fieldName]: [prev[fieldName]],
//       }));
//     }
//     setFormData((prev) => ({
//       ...prev,
//       [fieldName]: prev[fieldName] ? [...prev[fieldName], ""] : [""],
//     }));
//     console.log(formData);
//   };
//   const renderInputs = () => {
//     return objList.map((obj) => {
//       return (
//         <div key={obj.transliter}>
//           <label>{obj.name}</label>
//           {Array.isArray(formData[obj.transliter]) ? (
//             formData[obj.transliter].map((value, index) => (
//               <div key={`${obj.transliter}_input_${index}`}>
//                 <input
//                   type="text"
//                   id={`${obj.transliter}`}
//                   name={`${obj.transliter}${index}`}
//                   onChange={(e) => handleInputChange(e, index)}
//                   value={value || ""}
//                 />
//               </div>
//             ))
//           ) : (
//             <div>
//               <input
//                 type="text"
//                 name={obj.transliter}
//                 onChange={(e) => handleInputChange(e)}
//                 value={formData[obj.transliter] || ""}
//               />
//             </div>
//           )}
//           <button
//             className={css.standartButSt}
//             onClick={(e) => handleNewMessage(e, obj.transliter)}
//           >
//             Додати ще один елемент
//           </button>
//         </div>
//       );
//     });
//   };
//   const renderPhotoInputs = () => {
//     return photoInputs.map((index) => (
//       <div key={`photoInput_${index}`}>
//         <label>Book Photo {index}</label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => handlePhotoInputChange(e, index)}
//           name={`bookFoto${index}`}
//         />
//       </div>
//     ));
//   };

//   return (
//     <div>
//       <h2>Add Books</h2>
//       <form onSubmit={handleFormSubmit}>
//         {renderInputs()}
//         {renderPhotoInputs()}
//         {renderAudioInput()}
//         {renderPdfInput()}
//         {renderHeroFoto()}
//         <button type="button" onClick={addPhotoInput}>
//           Add Photo Input
//         </button>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }
import css from "./adm.module.css";
import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import "react-quill/dist/quill.snow.css";
import { v4 as uuidv4 } from "uuid";
import { auth, db } from "../../firebase";
import { doc, setDoc, collection } from "firebase/firestore";
import ReactQuill from "react-quill";
export default function AddBooksTest() {
  const storage = getStorage();

  const [formData, setFormData] = useState({
    ISBN: "",
    cod: "",
    ean: "",
    perecaz: "",
    kilcastInpachka: "",
    rikPerevudania: "",
    deviz: "",
    ceoName: "",
    bookName: "",
    prizvusko: "",
    seria: "",
    textAutor: "",
    autorComment: "",
    shortAboutAuth: "",
    picWriter: "",
    shortAboutDesig: "",
    autorIdea: "",
    bookTranslater: "",
    bRedaktor: "",
    bDesign: "",
    onMakWork: "",
    prodType: "",
    price: "",
    priceSale: "",
    predprodDate: "",
    isNew: "",
    top: "",
    rozprodaz: "",
    sale: "",
    predprodag: "",
    paliturka: "",
    pageCount: "",
    bookFormat: "",
    booksH: "",
    booksWei: "",
    yearWrite: "",
    bookLanguage: "",
    bookPaper: "",
    ilystracii: "",
    pidbirkuBoo: "",
    whyNeedReadO: "",
    whyNeedReadT: "",
    whyNeedReadTH: "",
    laureat: "",
    bookYear: "",
    proceCat: "",
    priceMas: "",
    moreText: "",
    readLove: "",
    yearGroup: "",
    yearGroupFor: "",
    ganr: "",
    metVzaem: "",
    forWho: "",
    complectation: "",
    vidznaku: "",
    popular: "",
    bookHero: "",
    duviz: "",
    bookPower: "",
    bookFoto: "",
    fotoRozgort: "",
    bookVideo: "",
    smallDesc: "",
    descriptionSe: "",
    longDesk: "",
    bookChu: "",
    ceoTitle: "",
    coeDescription: "",
    coekeyWord: "",
    novunka: "",
    labelOneName: "",
    labelOneText: "",
    labelTwoName: "",
    labelTwoText: "",
    labelThreName: "",
    lastExam: "",
    svjatkovi: "",
    labelThreText: "",
    labelFourName: "",
    labelFourText: "",
    labelFiveName: "",
    labelFiveText: "",
    heroLabelText: "",
    heroParagrafText: "",
    heroFoto: "",
    sorterNumber: "",
    productVisible: true,
    authPhoto: "", // Додано поле для фото автора
  });

  const [photoInputs, setPhotoInputs] = useState([1]);
  const [photoURLs, setPhotoURLs] = useState([]);
  const [heroFotoUrl, setHeroFotoUrl] = useState("");
  const [audioURL, setAudioURL] = useState("");
  const [pdfURL, setPdfURL] = useState("");
  const [authPhotoUrl, setAuthPhotoUrl] = useState(""); // Стан для URL фото автора
  const addPhotoInput = () => {
    setPhotoInputs((prevInputs) => [...prevInputs, prevInputs.length + 1]);
  };
  const objList = [
    {
      name: "ISBN",
      transliter: "ISBN",
    },
    { name: "Код", transliter: "cod" },
    { name: "EAN", transliter: "ean" },
    { name: "Переказ", transliter: "perecaz" },
    { name: "Кількість в пачці", transliter: "kilcastInpachka" },
    { name: "Рік перевидання", transliter: "rikPerevudania" },
    { name: "Девіз", transliter: "deviz" },
    {
      name: "СЕО Імя книги",
      transliter: "ceoName",
    },
    {
      name: "Порядок відображення",
      transliter: "sorterNumber",
    },
    {
      name: "Відображення товару",
      transliter: "productVisible",
    },
    {
      name: "Назва книги",
      transliter: "bookName",
    },
    {
      name: "Прізвисько книги(коротка назва для короткої корзини)",
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
      name: "Коментар автора",
      transliter: "autorComment",
    },
    {
      name: "Коротко про автора",
      transliter: "shortAboutAuth",
    },
    {
      name: "Художник",
      transliter: "picWriter",
    },
    {
      name: "Коротко про художника",
      transliter: "shortAboutDesig",
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
      name: "Ціна без знижки",
      transliter: "priceSale",
    },
    {
      name: "Дата закінчення пред продажу",
      transliter: "predprodDate",
    },
    {
      name: "Новинка",
      transliter: "isNew",
    },
    {
      name: "Топ",
      transliter: "top",
    },
    {
      name: "Розпродаж",
      transliter: "rozprodaz",
    },
    {
      name: "Акція",
      transliter: "sale",
    },
    {
      name: "Предпродаж",
      transliter: "predprodag",
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
      transliter: "yearWrite",
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
      name: "Чому варто читати 1",
      transliter: "whyNeedReadO",
    },
    {
      name: "Чому варто читати 2",
      transliter: "whyNeedReadT",
    },
    {
      name: "Чому варто читати 3",
      transliter: "whyNeedReadTH",
    },
    {
      name: "Лауреат Корнійчуковської премії",
      transliter: "laureat",
    },
    {
      name: "Книга року",
      transliter: "bookYear",
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
      name: "Вікова група для відображення",
      transliter: "yearGroupFor",
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
      name: "Перша кнопка назва",
      transliter: "labelOneName",
    },
    // {
    //   name: "перша кнопка текст",
    //   transliter: "labelOneText",
    // },
    {
      name: "Друга кнопка назва",
      transliter: "labelTwoName",
    },
    // {
    //   name: "Друга кнопка текст",
    //   transliter: "labelTwoText",
    // },
    {
      name: "Третя кнопка назва",
      transliter: "labelThreName",
    },
    {
      name: "Останній екземпляр",
      transliter: "lastExam",
    },
    {
      name: "Святкові",
      transliter: "svjatkovi",
    },
    // {
    //   name: "Третя кнопка текст",
    //   transliter: "labelThreText",
    // },
    {
      name: "Четверта кнопка назва",
      transliter: "labelFourName",
    },
    // {
    //   name: "Четверта кнопка текст",
    //   transliter: "labelFourText",
    // },
    {
      name: "П'ята кнопка назва",
      transliter: "labelFiveName",
    },
    // {
    //   name: "П'ята кнопка текст",
    //   transliter: "labelFiveText",
    // },
    {
      name: "Заголовок для блоку героя",
      transliter: "heroLabelText",
    },
    {
      name: "Параграф для блоку героя",
      transliter: "heroParagrafText",
    },
    {
      name: "Фото героя",
      transliter: "heroFoto",
    },
  ];

  const handleInputChange = (e, index) => {
    const { name, value, id } = e.target;

    setFormData((prevData) => {
      const prevValue = prevData[id];

      if (Array.isArray(prevValue)) {
        const updatedArray = [...prevValue];
        updatedArray[index] = value;

        return {
          ...prevData,
          [id]: updatedArray,
        };
      }

      return {
        ...prevData,
        [name]: prevValue !== undefined ? [prevValue, value] : value,
      };
    });
  };

  const handlePhotoInputChange = (e, index) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];

      const uploadTask = uploadBytesResumable(
        ref(storage, `images/${image.name}`),
        image
      );
      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            if (url) {
              setPhotoURLs((prevURLs) => {
                const updatedURLs = [...prevURLs];
                updatedURLs[index] = url;
                return updatedURLs.filter((url) => url !== undefined);
              });
            }
          });
        }
      );
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const data = new FormData(form);
    const formDataObj = Object.fromEntries(data.entries());

    for (const key in formDataObj) {
      if (Object.prototype.hasOwnProperty.call(formDataObj, key)) {
        const value = formDataObj[key];
        if (value instanceof File) {
          formDataObj[key] = "";
        }
      }
    }

    if (photoInputs.length > 0) {
      formData.imageList = photoURLs;
    }

    formData.uid = uuidv4();
    formData.audio = audioURL;
    formData.pdf = pdfURL;
    formData.heroFoto = heroFotoUrl;
    formData.authPhoto = authPhotoUrl; // Додано фото автора

    await setDoc(doc(collection(db, "product"), formData.uid), formData);
    window.location.reload();
  };

  const handleAudioInputChange = (e) => {
    if (e.target.files[0]) {
      const audioFile = e.target.files[0];

      const uploadTask = uploadBytesResumable(
        ref(storage, `audio/${audioFile.name}`),
        audioFile
      );
      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            if (url) {
              setAudioURL(url);
            }
          });
        }
      );
    }
  };

  const handlePdfInputChange = (e) => {
    if (e.target.files[0]) {
      const pdfFile = e.target.files[0];

      const uploadTask = uploadBytesResumable(
        ref(storage, `pdf/${pdfFile.name}`),
        pdfFile
      );
      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            if (url) {
              setPdfURL(url);
            }
          });
        }
      );
    }
  };

  const handleHeroFotoChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];

      const uploadTask = uploadBytesResumable(
        ref(storage, `${file.name}`),
        file
      );
      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            if (url) {
              setHeroFotoUrl(url);
            }
          });
        }
      );
    }
  };

  const handleAuthPhotoChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];

      const uploadTask = uploadBytesResumable(
        ref(storage, `authors/${file.name}`),
        file
      );
      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            if (url) {
              setAuthPhotoUrl(url);
            }
          });
        }
      );
    }
  };

  const handleNewMessage = (e, fieldName) => {
    e.preventDefault();
    if (!Array.isArray(formData[fieldName])) {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: [prev[fieldName]],
      }));
    }
    setFormData((prev) => ({
      ...prev,
      [fieldName]: prev[fieldName] ? [...prev[fieldName], ""] : [""],
    }));
  };

  const renderInputs = () => {
    return objList.map((obj) => {
      return (
        <div key={obj.transliter}>
          <label>{obj.name}</label>
          {Array.isArray(formData[obj.transliter]) ? (
            formData[obj.transliter].map((value, index) => (
              <div key={`${obj.transliter}_input_${index}`}>
                <input
                  type="text"
                  id={`${obj.transliter}`}
                  name={`${obj.transliter}${index}`}
                  onChange={(e) => handleInputChange(e, index)}
                  value={value || ""}
                />
              </div>
            ))
          ) : (
            <div>
              <input
                type="text"
                name={obj.transliter}
                onChange={(e) => handleInputChange(e)}
                value={formData[obj.transliter] || ""}
              />
            </div>
          )}
          <button
            className={css.standartButSt}
            onClick={(e) => handleNewMessage(e, obj.transliter)}
          >
            Додати ще один елемент
          </button>
        </div>
      );
    });
  };
  const handleQuillChange = (value, fieldName) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  const renderQuillInputs = () => {
    return (
      <>
        <div>
          <label>Перша кнопка текст</label>
          <div className={css.editorContainer}>
            <ReactQuill
              className={css.quillEditor}
              theme="snow"
              value={formData.labelOneText}
              onChange={(value) => handleQuillChange(value, "labelOneText")}
            />
          </div>
        </div>
        <div>
          <label>Друга кнопка текст</label>
          <div className={css.editorContainer}>
            <ReactQuill
              className={css.quillEditor}
              theme="snow"
              value={formData.labelTwoText}
              onChange={(value) => handleQuillChange(value, "labelTwoText")}
            />
          </div>
        </div>
        <div>
          <label>Третя кнопка текст</label>
          <div className={css.editorContainer}>
            <ReactQuill
              className={css.quillEditor}
              theme="snow"
              value={formData.labelThreText}
              onChange={(value) => handleQuillChange(value, "labelThreText")}
            />
          </div>
        </div>
        <div>
          <label>Четверта кнопка текст</label>
          <div className={css.editorContainer}>
            <ReactQuill
              className={css.quillEditor}
              theme="snow"
              value={formData.labelFourText}
              onChange={(value) => handleQuillChange(value, "labelFourText")}
            />
          </div>
        </div>
        <div>
          <label>П'ята кнопка текст</label>
          <div className={css.editorContainer}>
            <ReactQuill
              className={css.quillEditor}
              theme="snow"
              value={formData.labelFiveText}
              onChange={(value) => handleQuillChange(value, "labelFiveText")}
            />
          </div>
        </div>
      </>
    );
  };
  const renderPhotoInputs = () => {
    return photoInputs.map((index) => (
      <div key={`photoInput_${index}`}>
        <label>Book Photo {index}</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handlePhotoInputChange(e, index)}
          name={`bookFoto${index}`}
        />
      </div>
    ));
  };

  const renderAudioInput = () => {
    return (
      <div>
        <label>Аудіо</label>
        <input
          type="file"
          accept="audio/*"
          onChange={handleAudioInputChange}
          name="audio"
        />
      </div>
    );
  };

  const renderPdfInput = () => {
    return (
      <div>
        <label>Пдф файл</label>
        <input
          type="file"
          accept=".pdf"
          onChange={handlePdfInputChange}
          name="pdfFile"
        />
      </div>
    );
  };

  const renderHeroFoto = () => {
    return (
      <div>
        <label>Фото Героя</label>
        <input type="file" onChange={handleHeroFotoChange} name="heroFoto" />
      </div>
    );
  };

  const renderAuthPhotoInput = () => {
    return (
      <div>
        <label>Фото Автора</label>
        <input type="file" onChange={handleAuthPhotoChange} name="authPhoto" />
      </div>
    );
  };

  return (
    <div>
      <h2>Add Books</h2>
      <form onSubmit={handleFormSubmit}>
        {renderInputs()}
        {renderQuillInputs()}
        {renderPhotoInputs()}
        {renderAudioInput()}
        {renderPdfInput()}
        {renderHeroFoto()}
        {renderAuthPhotoInput()}
        <button type="button" onClick={addPhotoInput}>
          Add Photo Input
        </button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
