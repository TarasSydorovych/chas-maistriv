// export default function AddRuk() {
//     const [objList, setObjList] = useState([
//                 {
//                     name: "ISBN",
//                     transliter: "ISBN",
//                 },
//                 {
//                     name: "СЕО Имя літопису",
//                     transliter: "ceoName",
//                 },
//                 {
//                     name: "Назва літопису",
//                     transliter: "bookName",
//                 },
//                 {
//                     name: "Прізвисько літопису",
//                     transliter: "prizvusko",
//                 },
//                 {
//                     name: "Серія",
//                     transliter: "seria",
//                 },
//                 {
//                     name: "Автор тексту",
//                     transliter: "textAutor",
//                 },
//                 {
//                     name: "Художник",
//                     transliter: "picWriter",
//                 },
//                 {
//                     name: "Автор ідеї",
//                     transliter: "autorIdea",
//                 },
//                 {
//                     name: "Перекладач",
//                     transliter: "bookTranslater",
//                 },
//                 {
//                     name: "Редактор",
//                     transliter: "bRedaktor",
//                 },

//                 {
//                     name: "Психологічна експертиза",
//                     transliter: "psExpert",
//                 },
//                 {
//                     name: "Мовознавча експертиза",
//                     transliter: "lnExpert",
//                 },
//                  {
//                     name: "Дизайн",
//                     transliter: "bDesign",
//                 },
//                 {
//                     name: "Над макетом працювали",
//                     transliter: "onMakWork",
//                 },
//                  {
//                     name: "вид продукту",
//                     transliter: "prodType",
//                 },

//                 {
//                     name: "Палітурка",
//                     transliter: "paliturka",
//                 },
//                 {
//                     name: "Кількість сторінок",
//                     transliter: "pageCount",
//                 },
//                 {
//                     name: "формат (мм)",
//                     transliter: "bookFormat",
//                 },
//                 {
//                     name: "Товщина (мм)",
//                     transliter: "booksH",
//                 },
//                 {
//                     name: "Вага (гр)",
//                     transliter: "booksWei",
//                 },
//                 {
//                     name: "Рік видання",
//                     transliter: "bookYear",
//                 },
//                 {
//                     name: "Мова видання",
//                     transliter: "bookLanguage",
//                 },
//                 {
//                     name: "Папір",
//                     transliter: "bookPaper",
//                 },
//                 {
//                     name: "Ілюстрації",
//                     transliter: "ilystracii",
//                 },
//                 {
//                     name: "Підбірки книг",
//                     transliter: "pidbirkuBoo",
//                 },

//                 {
//                     name: "Категрорія за об'ємом",
//                     transliter: "priceMas",
//                 },
//                 {
//                     name: "Навантаження текстом",
//                     transliter: "moreText",
//                 },
//                 {
//                     name: "Любов до читання",
//                     transliter: "readLove",
//                 },
//                 {
//                     name: "Вікова група",
//                     transliter: "yearGroup",
//                 },
//                 {
//                     name: "Жанр",
//                     transliter: "ganr",
//                 },
//                 {
//                     name: "Спосіб взаємодії",
//                     transliter: "metVzaem",
//                 },
//                 {
//                     name: "За призначенням",
//                     transliter: "forWho",
//                 },
//                 {
//                     name: "Комплектація книги",
//                     transliter: "complectation",
//                 },
//                 {
//                     name: "Книжкові відзнаки",
//                     transliter: "vidznaku",
//                 },
//                 {
//                     name: "Популярність",
//                     transliter: "popular",
//                 },

//                 {
//                     name: "Герої книги",
//                     transliter: "bookHero",
//                 },
//                 {
//                     name: "Дивіз",
//                     transliter: "duviz",
//                 },
//                 {
//                     name: "Сила книги",
//                     transliter: "bookPower",
//                 },
//                 {
//                     name: "фото",
//                     transliter: "bookFoto",
//                 },
//                 {
//                     name: "фото розгорток",
//                     transliter: "fotoRozgort",
//                 },

//                 {
//                     name: "Короткий опис",
//                     transliter: "smallDesc",
//                 },
//                 {
//                     name: "Середній опис",
//                     transliter: "descriptionSe",
//                 },
//                 {
//                   name: "Відгук експерта",
//                   transliter: "expert",
//               },
//               {
//                 name: "Відгук читача",
//                 transliter: "respUser",
//             },
//                 {
//                     name: "Довгий опис",
//                     transliter: "longDesk",
//                 },
//                 {
//                     name: "цитати з книги",
//                     transliter: "bookChu",
//                 },
//                 {
//                     name: "Ceo title",
//                     transliter: "ceoTitle",

//                 },
//                 {
//                     name: "Ceo description",
//                     transliter: "coeDescription",

//                 },
//                 {
//                     name: "Ceo keyWord",
//                     transliter: "coekeyWord",

//                 },
//                 {
//                     name: "Новинка",
//                     transliter: "novunka",

//                 },
//                 {
//                     name: "скорочений PDF",
//                     transliter: "shortPdf",

//                 },
//                 {
//                     name: "повний PDF",
//                     transliter: "longPdf",

//                 },
//             ]);

//             const storage = getStorage();
//             const manuscriptRef = collection(db, "manuscript");
//             const manuscriptId = uuidv4();
//             const newManuscript = {
//               uid: manuscriptId,
//               createdAt: serverTimestamp(),
//               rating: 1,
//             };

//             const handleSubmit = async () => {
//               try {
//                 for (const obj of objList) {
//                   if (
//                     obj.transliter === "longPdf" ||
//                     obj.transliter === "shortPdf" ||
//                     obj.transliter === "fotoRozgort" ||
//                     obj.transliter === "bookFoto"
//                   ) {
//                     if (obj.file) {
//                       const file = obj.file;
//                       const storageRef = ref(storage, `manuscript/${manuscriptId}/${obj.transliter}`);
//                       await uploadBytes(storageRef, file);
//                       const downloadURL = await getDownloadURL(storageRef);
//                       newManuscript[obj.transliter] = downloadURL;
//                     }
//                   } else {
//                     newManuscript[obj.transliter] = obj.value;
//                   }
//                 }

//                 if (Object.keys(newManuscript).length > 2) {
//                   const docRef = doc(manuscriptRef, manuscriptId);
//                   await setDoc(docRef, newManuscript);

//                   console.log("Document written with ID:", manuscriptId);
//                 } else {
//                   console.log("No data to write.");
//                 }
//               } catch (error) {
//                 console.error("Error adding document or uploading file:", error);
//               }
//             };

//             const handleFileChange = (transliter, file) => {
//               const updatedObjList = objList.map((obj) => {
//                 if (obj.transliter === transliter) {
//                   return {
//                     ...obj,
//                     file: file,
//                   };
//                 }
//                 return obj;
//               });
//               setObjList(updatedObjList);
//             };

//             const handleInputChange = (transliter, value) => {
//               const updatedObjList = objList.map((obj) => {
//                 if (obj.transliter === transliter) {
//                   return {
//                     ...obj,
//                     value: value,
//                   };
//                 }
//                 return obj;
//               });
//               setObjList(updatedObjList);
//             };

//     return (
//       <div className={css.WrapAdm}>
//          <h1 className={css.addBooksAdmH1}>Для додавання літопису заповніть всі дані</h1>
//       <div className={css.formAddBook}>
//         {objList.map((obj) => (
//           <div className={css.wrapSmallList} key={obj.transliter}>
//             <p className={css.paramBooks}>{obj.name}</p>
//             {obj.transliter === "longPdf" ||
//             obj.transliter === "shortPdf" ||
//             obj.transliter === "fotoRozgort" ||
//             obj.transliter === "bookFoto" ? (
//               <input
//                 type="file"
//                 accept="application/pdf,image/*"
//                 onChange={(e) => handleFileChange(obj.transliter, e.target.files[0])}
//               />
//             ) : (
//               <input
//                 type="text"
//                 className={css.inputBooks}
//                 onChange={(e) => handleInputChange(obj.transliter, e.target.value)}
//               />
//             )}
//           </div>
//         ))}
//         <button className={css.addBookButton} onClick={handleSubmit}>Додати рукопис</button>
//       </div>
//       </div>
//     );
//   }

import css from "./adm.module.css";
import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { auth, db } from "../../firebase";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

export default function AddRuk() {
  const storage = getStorage();
  const [shortPdfSt, setShortPdfSt] = useState("");
  const objList = [
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
      name: "Короткий опис",
      transliter: "smallDesc",
    },
    {
      name: "Середній опис",
      transliter: "descriptionSe",
    },
    {
      name: "Відгук експерта",
      transliter: "expert",
    },
    {
      name: "Відгук читача",
      transliter: "respUser",
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
  ];

  const [photoInputs, setPhotoInputs] = useState([1]);
  const [formData, setFormData] = useState({});
  const [photoURLs, setPhotoURLs] = useState([]);
  const [heroFotoUrl, setHeroFotoUrl] = useState("");

  const handlePhotoInputChange = (e, index) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      const fieldName = `bookFoto${index}`;

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

    // Перевірка кожного елементу formDataObj
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

    formData.longPdf = pdfURL;
    formData.heroFoto = heroFotoUrl;
    formData.shortPdf = shortPdfSt;
    await setDoc(doc(collection(db, "manuscript"), formData.uid), formData);
    window.location.reload();
  };

  const [audioURL, setAudioURL] = useState("");
  const [pdfURL, setPdfURL] = useState("");

  // Решта вашого коду

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
  const handlePdfInputChangeLong = (e) => {
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
              setShortPdfSt(url);
            }
          });
        }
      );
    }
  };
  const handleHeroFotoChange = (e) => {
    if (e.target.files[0]) {
      const pdfFile = e.target.files[0];

      const uploadTask = uploadBytesResumable(
        ref(storage, `${pdfFile.name}`),
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
              setHeroFotoUrl(url);
            }
          });
        }
      );
    }
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
        <label>Довгий пдф файл</label>
        <input
          type="file"
          accept=".pdf"
          onChange={handlePdfInputChange}
          name="longPdf"
        />
      </div>
    );
  };
  const renderPdfInputShort = () => {
    return (
      <div>
        <label>Короткий пдф файл</label>
        <input
          type="file"
          accept=".pdf"
          onChange={handlePdfInputChangeLong}
          name="shortPdf"
        />
      </div>
    );
  };
  const renderHeroFoto = () => {
    return (
      <div>
        <label>ФотоГероя</label>
        <input type="file" onChange={handleHeroFotoChange} name="heroFoto" />
      </div>
    );
  };
  const uploadPhoto = (photo) => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `images/${photo.name}`);
      const uploadTask = uploadBytesResumable(storageRef, photo);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload progress: ${progress}%`);
        },
        (error) => {
          console.log("Error uploading photo:", error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              resolve(downloadURL);
            })
            .catch((error) => {
              console.log("Error getting photo URL:", error);
              reject(error);
            });
        }
      );
    });
  };

  const addPhotoInput = () => {
    setPhotoInputs((prevInputs) => [...prevInputs, prevInputs.length + 1]);
  };
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

      // Перетворюємо рядок в масив, якщо значення не є масивом
      return {
        ...prevData,
        [name]: prevValue !== undefined ? [prevValue, value] : value,
      };
    });
  };
  // const handleNewMessage = (e, fieldName) => {
  //   e.preventDefault();
  //   setFormData((prevData) => {
  //     const currentValue = prevData[fieldName] || [];
  //     console.log("currentValue", currentValue);
  //     const newValue = [currentValue];
  //     console.log("newValue", newValue);
  //     return {
  //       ...prevData,
  //       [fieldName]: [currentValue, ""],
  //     };
  //   });
  // };
  const handleNewMessage = (e, fieldName) => {
    e.preventDefault();
    console.log(fieldName);
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
    console.log(formData);
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
            Додати повідомлення
          </button>
        </div>
      );
    });
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

  return (
    <div>
      <h2>Add Books</h2>
      <form onSubmit={handleFormSubmit}>
        {renderInputs()}
        {renderPhotoInputs()}
        {renderPdfInput()}
        {renderPdfInputShort()}
        {renderHeroFoto()}
        <button type="button" onClick={addPhotoInput}>
          Add Photo Input
        </button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
