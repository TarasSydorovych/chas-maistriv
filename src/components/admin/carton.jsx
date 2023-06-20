
import css from './adm.module.css'
import { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import {auth, db} from '../../firebase'
import { doc, setDoc, addDoc, collection, serverTimestamp } from "firebase/firestore"; 

export default function Carton() {
    const storage = getStorage();

    const objList = [
        {
            name: "Назва першої книги",
            transliter: "firstBook",
        },
        {
            name: "Назва другої книги",
            transliter: "secondBook",
        },
        {
            name: "фото",
            transliter: "bookFoto",
        },
        {
            name: "фото розгорток",
            transliter: "fotoRozgort",
        },
    
    ]


    const [formData, setFormData] = useState({});

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formDataObj = Object.fromEntries(new FormData(form));
        setFormData((prevFormData) => ({ ...prevFormData, ...formDataObj }));
        console.log('форма даних:', formData);
      
        if (formDataObj.bookFoto && formDataObj.fotoRozgort) {
          const newObj = { ...formDataObj };
          const storageRef1 = ref(storage, formDataObj.bookFoto.name);
          const storageRef2 = ref(storage, formDataObj.fotoRozgort.name);
      
          try {
            const uploadTask1 = uploadBytesResumable(storageRef1, formDataObj.bookFoto);
            const uploadTask2 = uploadBytesResumable(storageRef2, formDataObj.fotoRozgort);
      
            uploadTask1.on(
              'state_changed',
              (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('progress1', progress);
              },
              (error) => {
                console.log('error uploading file1', error);
              }
            );
      
            uploadTask2.on(
              'state_changed',
              (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('progress2', progress);
              },
              (error) => {
                console.log('error uploading file2', error);
              }
            );
      
            await Promise.all([uploadTask1, uploadTask2]);
      
            const downloadURL1 = await getDownloadURL(uploadTask1.snapshot.ref);
            const downloadURL2 = await getDownloadURL(uploadTask2.snapshot.ref);
      
            newObj.bookFoto = downloadURL1;
            newObj.fotoRozgort = downloadURL2;
            newObj.uid = uuidv4();
            newObj.firsUid = uuidv4();
            newObj.secondUid = uuidv4();
            newObj.firsRating = '';
            newObj.secondRating = '';
      
            const frankDocRef = doc(db, 'rating', newObj.uid);
            await setDoc(frankDocRef, newObj);
      
            console.log('Дані успішно збережено');
          } catch (error) {
            console.log('Помилка при завантаженні або збереженні даних:', error);
          }
        } else {
          console.log('Немає фото');
        }
      };
    
    return(
        <div className={css.WrapAdm}>
            <form onSubmit={handleFormSubmit}>
            {objList.map((el, index) => {
                if(el.name === 'фото' || el.name === 'фото розгорток'){
                    return  <div key={index} className={css.wrapSmallList}>

<p className={css.paramBooks}>{el.name}</p>
 <input type="file" name={el.transliter} id={`nameProp${index}`}/>

</div>
                }else{
                    return  <div key={index} className={css.wrapSmallList}>

                    <p className={css.paramBooks}>{el.name}</p>
                     <input type="text" name={el.transliter} id={`nameProp${index}`}/>
                    
                    </div>
                }
             

            })}
                
<button type='submit'>Додати книгу</button>

</form>

        </div>
    )
}