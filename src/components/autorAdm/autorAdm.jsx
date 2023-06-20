
import { useState, useEffect } from 'react';
import css from '../admin/adm.module.css'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import {auth, db} from '../../firebase'
import { getDocs } from 'firebase/firestore';
import { doc, setDoc, addDoc, collection, serverTimestamp } from "firebase/firestore"; 

export default function AutorAdm() {
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
            name: "Книга",
            transliter: "book",
        },
        {
            name: "Малий опис",
            transliter: "smallDesc",
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
       
    ]


    const [formData, setFormData] = useState({});

    const handleFormSubmit = async (event) => {
        event.preventDefault(); // prevent the default form submission behaviour
      
        // Collect form data and update the state
        const form = event.target;
        const data = new FormData(form);
        const formDataObj = Object.fromEntries(data.entries());
        setFormData(formDataObj);
      
        console.log('перший форм дата', formData);
      
        // Додавання товару, якщо є фото
        if (formDataObj.foto) {
          try {
            const newObj = { ...formDataObj };
            const storageRef = ref(storage, formDataObj.foto.name);
            const uploadTask = uploadBytesResumable(storageRef, formDataObj.foto);
      
            uploadTask.on('state_changed', (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('progress1', progress);
            }, (error) => {
              console.log('error uploading file1', error);
            });
      
            await uploadTask;
      
            const downloadURL = await getDownloadURL(storageRef);
            newObj.foto = downloadURL;
            newObj.uid = uuidv4();
      
            const frankDocRef = doc(db, 'author', newObj.uid);
            await setDoc(frankDocRef, { ...newObj, created: serverTimestamp() });
      
            console.log('Товар успішно додано до Firestore:', newObj);
          } catch (error) {
            console.log('Помилка під час додавання товару:', error);
          }
        } else {
          console.log('Фото не вибрано');
        }
      };



    return(
        <div className={css.WrapAdm}>
            <form onSubmit={handleFormSubmit}>
            {objList.map((el, index) => {
                if(el.name === 'Фото'){
                    return  <div key={index} className={css.wrapSmallList}>

<p className={css.paramBooks}>{el.name}</p>
 <input type="file" name={el.transliter} id='nameProp'/>

</div>
                }else{
                    return  <div key={index} className={css.wrapSmallList}>

                    <p className={css.paramBooks}>{el.name}</p>
                     <input type="text" name={el.transliter} id='nameProp'/>
                    
                    </div>
                }
             

            })}
                
<button type='submit'>Додати книгу</button>

</form>

        </div>
    )
}