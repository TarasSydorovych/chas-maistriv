
import css from './adm.module.css'
import { useState } from 'react';

import { getStorage, ref, uploadBytesResumable, getDownloadURL,uploadBytes  } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import {auth, db} from '../../firebase'
import { doc, setDoc, addDoc, collection, serverTimestamp, getFirestore  } from "firebase/firestore"; 

// export default function AddRuk() {
//     const storage = getStorage();


//     const objList = [
//         {
//             name: "ISBN",
//             transliter: "ISBN",
//         },
//         {
//             name: "СЕО Имя книги",
//             transliter: "ceoName",
//         },
//         {
//             name: "Назва книги",
//             transliter: "bookName",
//         },
//         {
//             name: "Прізвисько книги(коротка назва для короткої корзини)",
//             transliter: "prizvusko",
//         },
//         {
//             name: "Серія",
//             transliter: "seria",
//         },
//         {
//             name: "Автор тексту",
//             transliter: "textAutor",
//         },
//         {
//             name: "Художник",
//             transliter: "picWriter",
//         },
//         {
//             name: "Автор ідеї",
//             transliter: "autorIdea",
//         },
//         {
//             name: "Перекладач",
//             transliter: "bookTranslater",
//         },
//         {
//             name: "Редактор",
//             transliter: "bRedaktor",
//         },
        
//         {
//             name: "Психологічна експертиза",
//             transliter: "psExpert",
//         },
//         {
//             name: "Мовознавча експертиза",
//             transliter: "lnExpert",
//         },
//          {
//             name: "Дизайн",
//             transliter: "bDesign",
//         },
//         {
//             name: "Над макетом працювали",
//             transliter: "onMakWork",
//         },
//          {
//             name: "вид продукту",
//             transliter: "prodType",
//         },
        
//         {
//             name: "Ціна",
//             transliter: "price",
//         },
//         {
//             name: "Палітурка",
//             transliter: "paliturka",
//         },
//         {
//             name: "Кількість сторінок",
//             transliter: "pageCount",
//         },
//         {
//             name: "формат (мм)",
//             transliter: "bookFormat",
//         },
//         {
//             name: "Товщина (мм)",
//             transliter: "booksH",
//         },
//         {
//             name: "Вага (гр)",
//             transliter: "booksWei",
//         },
//         {
//             name: "Рік видання",
//             transliter: "bookYear",
//         },
//         {
//             name: "Мова видання",
//             transliter: "bookLanguage",
//         },
//         {
//             name: "Папір",
//             transliter: "bookPaper",
//         },
//         {
//             name: "Ілюстрації",
//             transliter: "ilystracii",
//         },
//         {
//             name: "Підбірки книг",
//             transliter: "pidbirkuBoo",
//         },
//         {
//             name: "Категорія за ціною",
//             transliter: "proceCat",
//         },
//         {
//             name: "Категрорія за об'ємом",
//             transliter: "priceMas",
//         },
//         {
//             name: "Навантаження текстом",
//             transliter: "moreText",
//         },
//         {
//             name: "Любов до читання",
//             transliter: "readLove",
//         },
//         {
//             name: "Вікова група",
//             transliter: "yearGroup",
//         },
//         {
//             name: "Жанр",
//             transliter: "ganr",
//         },
//         {
//             name: "Спосіб взаємодії",
//             transliter: "metVzaem",
//         },
//         {
//             name: "За призначенням",
//             transliter: "forWho",
//         },
//         {
//             name: "Комплектація книги",
//             transliter: "complectation",
//         },
//         {
//             name: "Книжкові відзнаки",
//             transliter: "vidznaku",
//         },
//         {
//             name: "Популярність",
//             transliter: "popular",
//         },
//         {
//             name: "Герої книги",
//             transliter: "bookHero",
//         },
//         {
//             name: "Дивіз",
//             transliter: "duviz",
//         },
//         {
//             name: "Сила книги",
//             transliter: "bookPower",
//         },
//         {
//             name: "фото",
//             transliter: "bookFoto",
//         },
//         {
//             name: "фото розгорток",
//             transliter: "fotoRozgort",
//         },
//         {
//             name: "Відео",
//             transliter: "bookVideo",
//         },
//         {
//             name: "Короткий опис",
//             transliter: "smallDesc",
//         },
//         {
//             name: "Середній опис",
//             transliter: "descriptionSe",
//         },
//         {
//             name: "Довгий опис",
//             transliter: "longDesk",
//         },
//         {
//             name: "цитати з книги",
//             transliter: "bookChu",
//         },
//         {
//             name: "Ceo title",
//             transliter: "ceoTitle",

//         },
//         {
//             name: "Ceo description",
//             transliter: "coeDescription",
            
//         },
//         {
//             name: "Ceo keyWord",
//             transliter: "coekeyWord",
            
//         },
//         {
//             name: "Новинка",
//             transliter: "novunka",
            
//         },
//         {
//             name: "скорочений PDF",
//             transliter: "shortPdf",
            
//         },
//         {
//             name: "повний PDF",
//             transliter: "longPdf",
            
//         },
//     ]


//     const [formData, setFormData] = useState({});

//     const handleFormSubmit = (event) => {
//       event.preventDefault(); // prevent the default form submission behaviour
  
//       // Collect form data and update the state
//       const form = event.target;
      
//       const data = new FormData(form);
//       const formDataObj = Object.fromEntries(data.entries());
//       setFormData(formDataObj);

//       console.log('перший форм дата',formData)
//       //добавка товару якщо є два фото
//       if (formData.bookFoto.name && formData.fotoRozgort.name){
//         const newObj = formData;
//         const storageRef1 = ref(storage, formData.bookFoto.name);
//   const storageRef2 = ref(storage, formData.fotoRozgort.name);
//   const uploadTask1 = uploadBytesResumable(storageRef1, formData.bookFoto);
//   const uploadTask2 = uploadBytesResumable(storageRef2, formData.fotoRozgort);
//   const uploadTask3 = uploadBytesResumable(storageRef2, formData.shortPdf);
//   const uploadTask4 = uploadBytesResumable(storageRef2, formData.longPdf);
//   uploadTask1.on('state_changed',
//   (snapshot) => {
//     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//     console.log('progress1', progress);
//   },
//   (error) => {
//     console.log('error uploading file1', error);
//   }
// );
// uploadTask2.on('state_changed',
// (snapshot) => {
//   const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//   console.log('progress2', progress);
// },
// (error) => {
//   console.log('error uploading file2', error);
// }
// );
// uploadTask3.on('state_changed',
// (snapshot) => {
//   const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//   console.log('progress2', progress);
// },
// (error) => {
//   console.log('error uploading file2', error);
// }
// );
// uploadTask4.on('state_changed',
// (snapshot) => {
//   const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//   console.log('progress2', progress);
// },
// (error) => {
//   console.log('error uploading file2', error);
// }
// );


// uploadTask1.on('state_changed', async () => {
//     const downloadURL1 = await getDownloadURL(uploadTask1.snapshot.ref);
//     uploadTask2.on('state_changed', async () => {
//       const downloadURL2 = await getDownloadURL(uploadTask2.snapshot.ref);
//       uploadTask3.on('state_changed', async () => {
//         const downloadURL3 = await getDownloadURL(uploadTask3.snapshot.ref);
//         uploadTask4.on('state_changed', async () => {
//             const downloadURL4 = await getDownloadURL(uploadTask4.snapshot.ref);

//       newObj.bookFoto = downloadURL1;
//       newObj.fotoRozgort = downloadURL2;
//       newObj.shortPdf = downloadURL3;
//       newObj.longPdf = downloadURL4;
//       newObj.uid = uuidv4();
//       const frankDocRef = doc(db, 'manuscript', newObj.uid);
//       await setDoc(frankDocRef, newObj);
//     });
//   });
// });
// });


        



//       }else if(formData.fotoRozgort.name){
//         console.log('нема імя')
//       }

//       // Log the form data to the console

      

      
//     };



//     return(
//         <div className={css.WrapAdm}>
//             <form onSubmit={handleFormSubmit}>
//             {objList.map((el, index) => {
//                 if(el.name === 'фото' || el.name === 'фото розгорток' || el.name === 'скорочений PDF' || el.name === 'повний PDF'){
//                     return  <div key={index} className={css.wrapSmallList}>

// <p className={css.paramBooks}>{el.name}</p>
//  <input type="file" name={el.transliter} id={el.transliter}/>

// </div>
//                 }else{
//                     return  <div key={index} className={css.wrapSmallList}>

//                     <p className={css.paramBooks}>{el.name}</p>
//                      <input type="text" name={el.transliter} id={el.transliter}/>
                    
//                     </div>
//                 }
             

//             })}
                
// <button type='submit'>Додати книгу</button>

// </form>

//         </div>
//     )
// }
export default function AddRuk() {
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
            ]);
  
            const storage = getStorage();
            const manuscriptRef = collection(db, "manuscript");
            const manuscriptId = uuidv4();
            const newManuscript = {
              uid: manuscriptId,
              createdAt: serverTimestamp(),
              rating: 1,
            };
          
            const handleSubmit = async () => {
              try {
                for (const obj of objList) {
                  if (
                    obj.transliter === "longPdf" ||
                    obj.transliter === "shortPdf" ||
                    obj.transliter === "fotoRozgort" ||
                    obj.transliter === "bookFoto"
                  ) {
                    if (obj.file) {
                      const file = obj.file;
                      const storageRef = ref(storage, `manuscript/${manuscriptId}/${obj.transliter}`);
                      await uploadBytes(storageRef, file);
                      const downloadURL = await getDownloadURL(storageRef);
                      newManuscript[obj.transliter] = downloadURL;
                    }
                  } else {
                    newManuscript[obj.transliter] = obj.value;
                  }
                }
          
                if (Object.keys(newManuscript).length > 2) {
                  const docRef = doc(manuscriptRef, manuscriptId);
                  await setDoc(docRef, newManuscript);
          
                  console.log("Document written with ID:", manuscriptId);
                } else {
                  console.log("No data to write.");
                }
              } catch (error) {
                console.error("Error adding document or uploading file:", error);
              }
            };
          
            const handleFileChange = (transliter, file) => {
              const updatedObjList = objList.map((obj) => {
                if (obj.transliter === transliter) {
                  return {
                    ...obj,
                    file: file,
                  };
                }
                return obj;
              });
              setObjList(updatedObjList);
            };
          
            const handleInputChange = (transliter, value) => {
              const updatedObjList = objList.map((obj) => {
                if (obj.transliter === transliter) {
                  return {
                    ...obj,
                    value: value,
                  };
                }
                return obj;
              });
              setObjList(updatedObjList);
            };
          
    return (
      <div className={css.WrapAdm}>
         <h1 className={css.addBooksAdmH1}>Для додавання літопису заповніть всі дані</h1>
      <div className={css.formAddBook}>
        {objList.map((obj) => (
          <div className={css.wrapSmallList} key={obj.transliter}>
            <p className={css.paramBooks}>{obj.name}</p>
            {obj.transliter === "longPdf" ||
            obj.transliter === "shortPdf" ||
            obj.transliter === "fotoRozgort" ||
            obj.transliter === "bookFoto" ? (
              <input
                type="file"
                accept="application/pdf,image/*"
                onChange={(e) => handleFileChange(obj.transliter, e.target.files[0])}
              />
            ) : (
              <input
                type="text"
                className={css.inputBooks}
                onChange={(e) => handleInputChange(obj.transliter, e.target.value)}
              />
            )}
          </div>
        ))}
        <button className={css.addBookButton} onClick={handleSubmit}>Додати рукопис</button>
      </div>
      </div>
    );
  }