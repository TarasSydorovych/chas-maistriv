
import css from './adm.module.css'
import { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import {auth, db} from '../../firebase'
import { doc, setDoc, addDoc, collection, serverTimestamp } from "firebase/firestore"; 
export default function AddBooks() {
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


    const [formData, setFormData] = useState({});

    const handleFormSubmit = (event) => {
      event.preventDefault(); // prevent the default form submission behaviour
  
      // Collect form data and update the state
      const form = event.target;
      
      const data = new FormData(form);
      const formDataObj = Object.fromEntries(data.entries());
      setFormData(formDataObj);

      console.log('перший форм дата',formData)
      //добавка товару якщо є два фото
      if (formData.bookFoto.name && formData.fotoRozgort.name){
        const newObj = formData;
        const storageRef1 = ref(storage, formData.bookFoto.name);
  const storageRef2 = ref(storage, formData.fotoRozgort.name);
  const uploadTask1 = uploadBytesResumable(storageRef1, formData.bookFoto);
  const uploadTask2 = uploadBytesResumable(storageRef2, formData.fotoRozgort);
  uploadTask1.on('state_changed',
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('progress1', progress);
  },
  (error) => {
    console.log('error uploading file1', error);
  }
);
uploadTask2.on('state_changed',
(snapshot) => {
  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log('progress2', progress);
},
(error) => {
  console.log('error uploading file2', error);
}
);
uploadTask1.on('state_changed', async () => {
    const downloadURL1 = await getDownloadURL(uploadTask1.snapshot.ref);
    uploadTask2.on('state_changed', async () => {
      const downloadURL2 = await getDownloadURL(uploadTask2.snapshot.ref);
      newObj.bookFoto = downloadURL1;
      newObj.fotoRozgort = downloadURL2;
      newObj.uid = uuidv4();
      const frankDocRef = doc(db, 'product', newObj.uid);
      await setDoc(frankDocRef, newObj);
    });
  });
      }else if(formData.fotoRozgort.name){
        console.log('нема імя')
      }
  };
return(
        <div className={css.WrapAdm}>
            <h1 className={css.addBooksAdmH1}>Для додавання книги заповніть всі дані</h1>
            <form className={css.formAddBook} onSubmit={handleFormSubmit}>
            {objList.map((el, index) => {
                if(el.name === 'фото' || el.name === 'фото розгорток'){
                    return  <div key={index} className={css.wrapSmallList}>

<p className={css.paramBooks}>{el.name}</p>
 <input type="file" name={el.transliter}  id='nameProp' />

</div>
                }else{
                    return  <div key={index} className={css.wrapSmallList}>

                    <p className={css.paramBooks}>{el.name}</p>
                     <input type="text" className={css.inputBooks} name={el.transliter} id='nameProp'/>
                    
                    </div>
                }
             

            })}
                
<button className={css.addBookButton} type='submit'>Додати книгу</button>

</form>

        </div>
    )
}