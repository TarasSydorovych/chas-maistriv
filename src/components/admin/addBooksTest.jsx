import css from './adm.module.css'
import { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import {auth, db} from '../../firebase'
import { doc, setDoc, addDoc, collection, serverTimestamp } from "firebase/firestore"; 

export default function AddBooksTest() {
  const storage = getStorage();

  const objList = [
    {
        name: "ISBN",
        transliter: "ISBN",
    },
    {
        name: "СЕО Имя книги",
        transliter: "ceoName",
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
]

  const [photoInputs, setPhotoInputs] = useState([1]);
  const [formData, setFormData] = useState({});
  const [photoURLs, setPhotoURLs] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhotoInputChange = (e, index) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      const fieldName = `bookFoto${index}`;
  
      const uploadTask = uploadBytesResumable(ref(storage, `images/${image.name}`), image);
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
          formDataObj[key] = '';
        }
      }
    }
  
    if (photoInputs.length > 0) {
      formDataObj.imageList = photoURLs;
    }
  
    formDataObj.uid = uuidv4();
    formDataObj.audio = audioURL;
    formDataObj.pdf = pdfURL;
    console.log('formDataObj', formDataObj);
    await setDoc(doc(collection(db, 'product'), formDataObj.uid), formDataObj);
  };
  const [audioURL, setAudioURL] = useState('');
  const [pdfURL, setPdfURL] = useState('');

  // Решта вашого коду

  const handleAudioInputChange = (e) => {
    if (e.target.files[0]) {
      const audioFile = e.target.files[0];

      const uploadTask = uploadBytesResumable(ref(storage, `audio/${audioFile.name}`), audioFile);
      uploadTask.on(
        'state_changed',
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

      const uploadTask = uploadBytesResumable(ref(storage, `pdf/${pdfFile.name}`), pdfFile);
      uploadTask.on(
        'state_changed',
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

  const renderAudioInput = () => {
    return (
      <div>
        <label>Аудіо</label>
        <input type="file" accept="audio/*" onChange={handleAudioInputChange} name="audio" />
      </div>
    );
  };

  const renderPdfInput = () => {
    return (
      <div>
        <label>Пдф файл</label>
        <input type="file" accept=".pdf" onChange={handlePdfInputChange} name="pdfFile" />
      </div>
    );
  };

  const uploadPhoto = (photo) => {
    console.log('photo',photo)
    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, `images/${photo.name}`);
      const uploadTask = uploadBytesResumable(storageRef, photo);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload progress: ${progress}%`);
        },
        (error) => {
          console.log('Error uploading photo:', error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              resolve(downloadURL);
            })
            .catch((error) => {
              console.log('Error getting photo URL:', error);
              reject(error);
            });
        }
      );
    });
  };

  const addPhotoInput = () => {
    setPhotoInputs((prevInputs) => [...prevInputs, prevInputs.length + 1]);
  };

  const renderInputs = () => {
    return objList.map((obj) => (
      <div key={obj.transliter}>
        <label>{obj.name}</label>
        <input
          type="text"
          name={obj.transliter}
          onChange={handleInputChange}
          value={formData[obj.transliter] || ''}
    />
  </div>
));   
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
    {renderAudioInput()}
    {renderPdfInput()}
    <button type="button" onClick={addPhotoInput}>
    Add Photo Input
    </button>
    <button type="submit">Submit</button>
    </form>
    </div>
    );
    }