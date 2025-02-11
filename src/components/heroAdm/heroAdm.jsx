// import { useState, useEffect } from 'react';
// import css from '../admin/adm.module.css'
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { v4 as uuidv4 } from 'uuid';
// import {auth, db} from '../../firebase'
// import { getDocs } from 'firebase/firestore';
// import { doc, setDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";

// export default function HeroAdm() {
//     const storage = getStorage();

//     const objList = [
//         {
//             name: "Ім'я",
//             transliter: "name",
//         },
//         {
//             name: "Опис 1",
//             transliter: "descOne",
//         },
//         {
//             name: "Опис 2",
//             transliter: "descSecond",
//         },

//         {
//             name: "Герой",
//             transliter: "autor",
//         },
//         {
//             name: "Книга",
//             transliter: "book",
//         },
//         {
//             name: "Малий опис",
//             transliter: "smallDesc",
//         },
//         {
//             name: "Автор про героя",
//             transliter: "autorAboutHero",
//         },
//         {
//             name: "Історія створення",
//             transliter: "history",
//         },
//         {
//             name: "Інтервю 1",
//             transliter: "internOne",
//         },
//         {
//             name: "Інтервю 2",
//             transliter: "internSecond",
//         },
//         {
//             name: "Відео",
//             transliter: "video",
//         },
//         {
//             name: "Фото",
//             transliter: "foto",
//         },
//         {
//             name: "Вікова група",
//             transliter: "yearGroup",
//         },

//     ]

//     const [formData, setFormData] = useState({});

//     const handleFormSubmit = async (event) => {
//         event.preventDefault(); // prevent the default form submission behaviour

//         // Collect form data and update the state
//         const form = event.target;
//         const data = new FormData(form);
//         const formDataObj = Object.fromEntries(data.entries());
//         setFormData(formDataObj);

//         console.log('перший форм дата', formData);

//         // Додавання товару, якщо є фото
//         if (formData.foto) {
//           try {
//             const newObj = { ...formData };
//             const storageRef = ref(storage, formData.foto.name);
//             const uploadTask = uploadBytesResumable(storageRef, formData.foto);

//             uploadTask.on('state_changed', (snapshot) => {
//               const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//               console.log('progress1', progress);
//             }, (error) => {
//               console.log('error uploading file1', error);
//             });

//             await uploadTask;

//             const downloadURL = await getDownloadURL(storageRef);
//             newObj.foto = downloadURL;
//             newObj.uid = uuidv4();

//             const frankDocRef = doc(db, 'hero', newObj.uid);
//             await setDoc(frankDocRef, { ...newObj, created: serverTimestamp() });

//             console.log('Товар успішно додано до Firestore:', newObj);
//           } catch (error) {
//             console.log('Помилка під час додавання товару:', error);
//           }
//         } else {
//           console.log('Фото не вибрано');
//         }
//       };

//     return(
//         <div className={css.WrapAdm}>
//             <form onSubmit={handleFormSubmit}>
//             {objList.map((el, index) => {
//                 if(el.name === 'Фото'){
//                     return  <div key={index} className={css.wrapSmallList}>

// <p className={css.paramBooks}>{el.name}</p>
//  <input type="file" name={el.transliter} id='nameProp'/>

// </div>
//                 }else{
//                     return  <div key={index} className={css.wrapSmallList}>

//                     <p className={css.paramBooks}>{el.name}</p>
//                      <input type="text" name={el.transliter} id='nameProp'/>

//                     </div>
//                 }

//             })}

// <button type='submit'>Додати книгу</button>

// </form>

//         </div>
//     )
// }import { useState, useEffect } from 'react';
import { useState, useEffect } from "react";
import css from "../admin/adm.module.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { auth, db } from "../../firebase";
import { getDocs } from "firebase/firestore";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import Swal from "sweetalert2";

export default function HeroAdm() {
  const storage = getStorage();

  const objList = [
    {
      name: "Ім'я",
      transliter: "name",
    },
    {
      name: "Опис 1",
      transliter: "descOne",
    },
    {
      name: "Опис 2",
      transliter: "descSecond",
    },
    {
      name: "Автор",
      transliter: "autor",
    },
    {
      name: "Книга",
      transliter: "book",
    },
    {
      name: "Малий опис",
      transliter: "smallDesc",
    },

    {
      name: "Автор про героя",
      transliter: "autorAboutHero",
    },

    {
      name: "Історія створення",
      transliter: "history",
    },
    {
      name: "Інтервю 1",
      transliter: "internOne",
    },
    {
      name: "Інтервю 2",
      transliter: "internSecond",
    },
    {
      name: "Відео",
      transliter: "video",
    },
    {
      name: "Фото",
      transliter: "foto",
    },
    {
      name: "Вікова група",
      transliter: "yearGroup",
    },
  ];

  const [formData, setFormData] = useState({});
  const [fotoFile, setFotoFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "foto" && files.length > 0) {
      setFotoFile(files[0]);
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (fotoFile) {
      try {
        const storageRef = ref(storage, `images/${fotoFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, fotoFile);

        Swal.fire({
          title: "Uploading...",
          html: "Please wait...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            Swal.getHtmlContainer().querySelector(
              "b"
            ).textContent = `${progress.toFixed(2)}%`;

            console.log("progress1", progress);
          },
          (error) => {
            console.log("error uploading file1", error);
            Swal.fire({
              title: "Error!",
              text: "Failed to upload file.",
              icon: "error",
              confirmButtonText: "OK",
            });
          },
          async () => {
            const downloadURL = await getDownloadURL(storageRef);

            const newObj = { ...formData, foto: downloadURL, uid: uuidv4() };

            const frankDocRef = doc(db, "hero", newObj.uid);
            await setDoc(frankDocRef, {
              ...newObj,
              created: serverTimestamp(),
            });

            console.log("Товар успішно додано до Firestore:", newObj);
            Swal.fire({
              title: "Success!",
              text: "File uploaded successfully.",
              icon: "success",
              confirmButtonText: "OK",
            });
          }
        );
      } catch (error) {
        console.log("Помилка під час додавання товару:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to add product.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } else {
      console.log("Фото не вибрано");
      Swal.fire({
        title: "Error!",
        text: "No photo selected.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className={css.WrapAdm}>
      <form onSubmit={handleFormSubmit}>
        {objList.map((el, index) => {
          if (el.name === "Фото") {
            return (
              <div key={index} className={css.wrapSmallList}>
                <p className={css.paramBooks}>{el.name}</p>
                <input
                  type="file"
                  name={el.transliter}
                  onChange={handleInputChange}
                />
              </div>
            );
          } else {
            return (
              <div key={index} className={css.wrapSmallList}>
                <p className={css.paramBooks}>{el.name}</p>
                <input
                  type="text"
                  name={el.transliter}
                  onChange={handleInputChange}
                />
              </div>
            );
          }
        })}
        <button type="submit">Додати героя</button>
      </form>
    </div>
  );
}
