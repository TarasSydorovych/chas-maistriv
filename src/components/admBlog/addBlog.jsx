import { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import {auth, db} from '../../firebase'
import { doc, setDoc, addDoc, collection, serverTimestamp } from "firebase/firestore"; 

import css from '../admin/adm.module.css'




// export default function AddBlog() {

//     const objList = [
//         {
//             name: "Заголовок",
//             transliter: "zag",
//         },
//         {
//             name: "Коротки опис",
//             transliter: "chortDesc",
//         },
//         {
//             name: "Довгий опис",
//             transliter: "longDesc",
//         },
//         {
//             name: "ID відео",
//             transliter: "videoId",
//         },
  
//     ]
//     const [formData, setFormData] = useState({});

// const handleFormSubmit = async (event) => {
//     event.preventDefault(); // prevent the default form submission behaviour

//     // Collect form data and update the state
//     const form = event.target;
//     const formDataValue = new FormData(form);
//     const formDataObj = Object.fromEntries(formDataValue.entries());
//     setFormData(formDataObj);

    

//     // Добавка даних блогу
//     const newObj = { ...formDataObj };
//     newObj.uid = uuidv4();
//     newObj.timestamp = serverTimestamp();
//     const frankDocRef = doc(db, 'blog', newObj.uid);
//     await setDoc(frankDocRef, newObj);

//     // Очистити форму після надсилання
//     alert('Ваша стаття додана')
//     form.reset();
//   };
  


//     return(
//         <div className={css.blogWrap}>
//   <form onSubmit={handleFormSubmit}>
//             {objList.map((el, index) => {
             
//                     return  <div key={index} className={css.wrapSmallList}>

//                     <p className={css.paramBooks}>{el.name}</p>
//                      <input type="text" name={el.transliter} id='nameProp'/>
                    
//                     </div>
             
             

//             })}
                
// <button className={css.addBookButtonBlog} type='submit'>Додати статтю</button>

// </form>
//         </div>
//     )
// }
export default function AddBlog() {
    const objList = [
        {
          name: 'Заголовок',
          transliter: 'zag',
        },
        {
          name: 'Перший опис',
          transliter: 'chortDesc',
        },
        {
            name: 'Другий опис',
            transliter: 'centrDesc',
          },
        {
          name: 'Третій',
          transliter: 'longDesc',
        },
        {
          name: 'ID відео',
          transliter: 'videoId',
        },
      ];
    
      const [formData, setFormData] = useState({});
      const [file, setFile] = useState(null);
    
      const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        const form = event.target;
        const formDataValue = new FormData(form);
        const formDataObj = Object.fromEntries(formDataValue.entries());
        setFormData(formDataObj);
    
        console.log('formData', formDataObj);
    
        if (file) {
          try {
            const newObj = { ...formDataObj };
            const storage = getStorage();
            const storageRef = ref(storage, `blog/${uuidv4()}/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
    
            uploadTask.on('state_changed', (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload progress:', progress);
            }, (error) => {
              console.error('Error uploading file:', error);
            });
    
            await uploadTask;
    
            const downloadURL = await getDownloadURL(storageRef);
            newObj.photo = downloadURL;
            newObj.uid = uuidv4();
            newObj.timestamp = serverTimestamp();
            await addDoc(collection(db, 'blog'), newObj);
    
            console.log('Стаття успішно додана до Firestore:', newObj);
          } catch (error) {
            console.error('Помилка під час додавання статті:', error);
          }
        } else {
          console.log('Фото не вибрано');
        }
      };
    
      const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
      };
    

    return (
      <div className={css.blogWrap}>
        <form onSubmit={handleFormSubmit}>
          {objList.map((el, index) => (
            <div key={index} className={css.wrapSmallList}>
              <p className={css.paramBooks}>{el.name}</p>
              <input type="text" name={el.transliter} id="nameProp" />
            </div>
          ))}
  
          <div className={css.wrapSmallList}>
            <p className={css.paramBooks}>Фото</p>
            <input type="file" name="photo" onChange={handleFileChange} />
          </div>
  
          <button className={css.addBookButtonBlog} type="submit">
Додати статтю
</button>
</form>
</div>
);
}